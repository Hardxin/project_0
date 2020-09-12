$(function () {
    // 点击去注册事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录事件
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 检验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if(pwd != value) {
                return '两次密码不一致！';
            }
        }
    });

    // 监听注册表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()};
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                // return console.log(res.message);
                return layer.msg(res.message);
            }
            // console.log('注册成功！');
            layer.msg('注册成功！');
            // 模拟点击行为
            $('#link_login').click();
        })
    })

    // 监听登录提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: ('/api/login'),
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg('登陆失败！');
                }
                layer.msg('登陆成功！');
                // 将token保存到本地存储中
                localStorage.setItem('token', res.token);
                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})