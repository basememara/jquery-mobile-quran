define([
	'jquery',
	'toastr'
], function ($, toastr) {

    return {
        initLoading: function (message, timeout) {
            $.mobile.loading('show', {
                text: 'Loading...',
                textVisible: true,
                theme: 'b'
            });
        },

        exitLoading: function () {
            $.mobile.loading('hide');
        },

        success: function (message, title) {
            this.exitLoading();
            toastr.success(message, title);
        },

        info: function (message, title) {
            this.exitLoading();
            toastr.info(message, title);
        },

        warning: function (message, title, icon, timeout) {
            this.exitLoading();
            toastr.warning(message, title);
        },

        error: function (message, title) {
            this.exitLoading();
            toastr.error(message, title);
        }
    };
});