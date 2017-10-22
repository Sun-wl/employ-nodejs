app.factory('eventService', function ($http, $timeout, $q) {

    var _httpDownload = function (opts) {
        _httpBefore(opts);

        var obj = opts.params;

        var u = opts.url + "?";

        for (var p in obj) { // 方法
            if (typeof ( obj [p]) == " function ") {
                obj [p]();
            } else { // p 为属性名称，obj[p]为对应属性的值

                if (obj[p]) {
                    u += p + "=" + obj[p] + "&";
                }
            }
        } // 最后显示所有的属性

        u = u.substring(0, u.length - 1);

        window.open(u);

    };


    var _preventRepeat = function (e) {
        var edit = false;
        e.attr("disabled", "disabled");
        var elements = $("[name=form]")[0].elements;
        for (var i = 0; i < elements.length; i++) {
            elements[i].onchange = function () {
                if (event.target.value) {
                    edit = true;
                    e.attr("disabled", false);
                }
            }
        }
    };

    return {

        httpDownload: function (opts) {
            opts.url = baseUrl + opts.url;
            _httpDownload(opts);
        },
        preventRepeat: function (e) {
            _preventRepeat(e);
        }
    };
});

