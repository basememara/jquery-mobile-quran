/**
 * This is a home controller
 */
define([
    'jquery',
    'hijri',
    'controllers/basecontroller'
], function ($, Hijri, BaseController) {

    var Controller = BaseController.extend({
        init: function () {
            //CALL BASE CONSTRUCTOR AND PASS ID
            BaseController.fn.init.call(this, 'home');
        },

        //ACTIONS
        index: function () {
            BaseController.fn.index.call(this);

            //ADD HIJRI DATE TO MAIN PAGE
            this.view('index', {
                HijriDate: Hijri.toDate()
            }, {
                loading: false
            });
        }
    });

    //RETURN CONTROLLER
    return new Controller();
});