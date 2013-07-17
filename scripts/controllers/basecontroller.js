/**
 * This is a base controller
 */
define([
    'jquery',
    'utils/helpers',
    'utils/plugins',
    'kendoui/kendo.core.min'
], function ($, Helpers) {

    //CREATE BASE CLASS FOR LATER INHERITANCE
    var BaseController = kendo.Class.extend({
        elementId: null,

        //CONSTRUCTOR CALLED ON NEW INSTANCES
        init: function (elementId) {
            var me = this;
            this.elementId = elementId;

            //INITIALIZE PARTS
            this.initEvents();

            //SUBSCRIBE TO SHOW EVENT
            $(document).on('pageinit', '#' + this.elementId, function (e) {
                me.onInit($(this));
            });

            //SUBSCRIBE TO SHOW EVENT
            $(document).on('pageshow', '#' + this.elementId, function (e) {
                me.onShow($(this));
            });
        },

        initEvents: function () {

        },

        //EVENTS
        onInit: function (element) {

        },

        onShow: function (element) {
            //CALL DEFAULT ACTION
            this.index();
        },

        //ACTIONS
        index: function () {

        },

        //LOAD VIEW INTO ELEMENT AND BIND DATA
        view: function (name, model, options) {
            var me = this;
            var defer = new $.Deferred();

            //ASSIGN DEFAULT VALUES
            var settings = $.extend({
                element: this.getContent(),
                loading: true
            }, options);

            //CREATE FUNCTION FOR LATER USE
            var deferLocal = function (data) {
                //INJECT VIEW AND MODEL IN BODY
                settings.element.loadView({
                    url: me.getView(name),
                    data: data,
                    loading: settings.loading
                }).done(function (el) {
                    //ENABLE CHAINING AND PASS TO CALLBACK
                    defer.resolve(el);
                });
            };

            //WAIT FOR AJAX DATA IF APPLICABLE
            if (model && model.promise && model.done) {
                model.done(function (data) {
                    deferLocal(data);
                });
            } else deferLocal(model);

            return defer.promise();
        },

        //GET VIEW PATH
        getView: function (name) {
            return Helpers.toViewsUrl('/' + this.elementId + '/' + name + '.html');
        },

        //GET ELEMENTS
        getSelector: function (selector) {
            //FIND CHILD ELEMENT IF APPLICABLE
            return selector
                ? '#' + this.elementId + ' ' + selector
                : '#' + this.elementId;
        },

        getElement: function (selector) {
            return $(this.getSelector(selector));
        },

        getHeader: function () {
            return $(this.getSelector('[data-role="header"]'));
        },

        getContent: function () {
            return $(this.getSelector('[data-role="content"]'));
        },

        getFooter: function () {
            return $(this.getSelector('[data-role="footer"]'));
        }
    });

    return BaseController;
});