/**
 * This is a memorization controller
 */
define([
    'jquery',
    'controllers/basecontroller',
    'utils/storage'
], function ($, BaseController, Storage) {

    var Controller = BaseController.extend({
        init: function () {
            //CALL BASE CONSTRUCTOR AND PASS ID
            BaseController.fn.init.call(this, 'memorization');
        },

        //ACTIONS
        index: function () {
            BaseController.fn.index.call(this);

            //LOAD CHAPTERS INTO VIEW
            this.view('index', Storage.getChapters());
        }
    });

    //RETURN CONTROLLER
    return new Controller();
});