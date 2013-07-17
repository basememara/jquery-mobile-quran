/**
 * This is a special chapters controller
 */
define([
    'jquery',
    'jsurl',
    'controllers/basecontroller',
    'utils/storage',
    'kendoui/kendo.core.min',
    'jqmsort'
], function ($, url, BaseController, Storage) {

    var Controller = BaseController.extend({
        init: function () {
            //CALL BASE CONSTRUCTOR AND PASS ID
            BaseController.fn.init.call(this, 'chapters');
        },

        initEvents: function () {
            BaseController.fn.initEvents.call(this);
            var me = this;

            //SUBSCRIBE TO EVENTS
            $(document).on('click', this.getSelector('[data-role="listview"] li:not(".jqmts") a'), this.onItemClick); //EXCLUDE SORT CONTROLS
            $(document).on('pagebeforeshow', '#chapter-dialog', function (e) { me.onDialogShow.call(this, e, me); });
        },

        //EVENTS
        onItemClick: function (e) {
            //PREVENT DIALOG TRANSITION BEFORE GETTING ID
            e.preventDefault();

            //GET ID OF CLICKED ITEM
            var item = $(this).closest('li').data('item');

            //REDIRECT TO DIALOG
            $.mobile.changePage(this.href, {
                role: 'dialog',
                data: {
                    item: item
                }
            });
        },

        onDialogShow: function (e, me) {
            var $this = $(this);

            //GET THE ID FROM DATA
            var item = url('?item', $this.data('url'));

            //GET SPECIFIC CHAPTER IF APPLICABLE
            if (item) {
                Storage.getChapterById(item)
                    .done(function (data) {
                        //BIND DATA TO DIALOG CONTENT
                        me.view('detail', data, {
                            element: $this.find('[data-role="content"]'),
                            loading: false
                        });

                        //BIND DATA TO TITLE
                        var template = kendo.template('#= Id # - #= Name #');
                        $this.find('[data-role="header"] h1').html(template(data));
                    });
            }
        },

        //ACTIONS
        index: function () {
            BaseController.fn.index.call(this);

            //LOAD CHAPTERS INTO VIEW
            this.view('index', Storage.getChapters())
                .done(function (el) {
                    //ENABLE SORTING AFTER LOAD
                    el.find('[data-role="listview"]').jqmts({
                        useNativeMenu: false,
                        attributes: {
                            id: 'Chapter',
                            name: 'Name',
                            verses: 'Verses',
                            chronology: 'Chronology',
                            period: 'Period'
                        }
                    });
                });
        }
    });

    //RETURN CONTROLLER
    return new Controller();
});