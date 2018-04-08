define(['jquery', 'bootstrap', 'backend', 'addtabs', 'adminlte', 'form', 'upload'], function ($, undefined, Backend, undefined, AdminLTE, Form, Upload) {
    var Controller = {
        index: function () {
            // 离线安装
            Upload.api.plupload("#plupload-file", function (data, ret) {
                Toastr.success(ret.msg);
            });

            $('#submit').on('click', function (e) {
                $.ajax({
                    type: "POST",
                    url:"importpagefile/submit",
                    data:$('#add-form').serialize(),// 序列化表单值
                    async: false,
                    success: function(ret) {
                        if (ret.code == '0'){
                            Toastr.error(ret.msg);
                            return;
                        }
                        Toastr.success(ret.msg);
                        Layer.alert();
                        layer.open({
                            title: '页面链接',
                            content: ret.data,
                            area:['auto', 'auto'],
                            btn:['复制好，点击就没了！']
                        });
                    },
                    error: function(ret) {
                        Toastr.success(ret.msg);
                    }
                })
            });

        }
    };

    return Controller;
});