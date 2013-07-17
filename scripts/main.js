; (function () {
    //DETERMINE BASE URL FROM CURRENT SCRIPT PATH
    var scripts = document.getElementsByTagName('script');
    var src = scripts[scripts.length - 1].src;
    var currentPath = src.substring(src.indexOf(window.location.pathname), src.lastIndexOf('/'));

    //REGISTER DEFAULT JS MODULE
    define('baseurl', [], function () { return '../'; });
    define('basescriptsurl', [], function () { return currentPath + '/'; });
    define('baseservicesurl', [], function () { return '~/resources/data'; });
    define('jquery', [], function () { return window.jQuery; });

    //CONFIFURE SHORTCUT ALIASES
    require.config({
        baseUrl: currentPath,
        paths: {
            amplify: 'libs/amplify/amplify.min',
            hijri: 'libs/hijricalendar/hijricalendar.mod',
            jqmsort: 'libs/jquery.mobile/plugins/jquery.jqmts.min',
            jsurl: 'libs/js-url/url.min',
            kendoui: 'libs/kendoui/js', //FOR AMD USE
            moment: 'libs/moment/moment.min',
            text: 'libs/require/text',
            taffy: 'libs/taffy/taffy-min',
            tinysort: 'libs/tinysort/jquery.tinysort.min',
            toastr: 'libs/toastr/toastr.min',
            underscore: 'libs/underscore/underscore-min',
            'underscore.string': 'libs/underscore/underscore.string.min'
        },
        // The shim config allows us to configure dependencies for
        // scripts that do not call define() to register a module
        shim: {
            amplify: {
                exports: 'amplify'
            },
            jqmsort: ['tinysort'],
            jsurl: {
                deps: ['jquery'],
                exports: 'url'
            },
            moment: {
                deps: ['jquery'],
                exports: 'moment'
            },
            taffy: {
                exports: 'TAFFY'
            },
            tinysort: ['jquery'],
            toastr: {
                deps: ['jquery'],
                exports: 'toastr'
            },
            underscore: {
                deps: ['underscore.string'],
                exports: '_',
                init: function (_s) {
                    //MERGE STRING PLUGIN TO UNDERSCORE NAMESPACE
                    _.mixin(_s.exports());
                    return _;
                }
            }
        }
    });

    //INITIALIZE APP
    require([
        'jquery',
        'controllers/home',
        'controllers/memorization',
        'controllers/chapters',
        'kendoui/kendo.core.min'
    ], function ($) {

        //CONSTRUCTOR
        var init = function () {
            //START FIRST PAGE AS DEFAULT
            $('#home').trigger('pageinit');
            $('#home').trigger('pageshow');
        };

        //CALL CONSTRUCTOR
        init();
    });
})();