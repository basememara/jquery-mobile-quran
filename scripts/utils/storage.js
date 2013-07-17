/**
 * This is the storage
 */
define([
    'jquery',
    'taffy',
    'utils/helpers'
], function ($, TAFFY, Helpers) {
    //PRIVATE PROPERTIES
    var chapters;

    var getChapterById = function (id) {
        return getChapter({ Id: parseInt(id) });
    };

    var getChapter = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!chapters) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('/chapters.txt'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    chapters = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(chapters(filter).first());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(chapters(filter).first());
        }

        return defer.promise();
    };

    var getChapters = function (filter) {
        var me = this;
        var defer = new $.Deferred();

        if (!chapters) {
            //CALL JSON DATA VIA AJAX
            $.getJSON(Helpers.toServicesUrl('/chapters.txt'))
                .done(function (json) {
                    //CREATE DATABASE FOR LATER USE
                    chapters = TAFFY(json);

                    //PASS DATA TO CALLBACK
                    defer.resolve(chapters(filter).get());
                }).fail(function () {
                    defer.reject();
                });
        } else {
            //PASS DATA TO CALLBACK
            defer.resolve(chapters(filter).get());
        }

        return defer.promise();
    };

    //PUBLIC PROPERTIES
    return {
        getChapterById: getChapterById,
        getChapter: getChapter,
        getChapters: getChapters
    };
});