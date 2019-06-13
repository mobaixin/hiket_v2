var encrypt=new JSEncrypt();
encrypt.setPublicKey(publickKey);
var sliderResult=false;
var rand="";
var roles="";


$("#slider2").slider({
        width: 290, // width
        height: 40, // height
        sliderBg: "rgb(226, 226, 226)", // 滑块背景颜色
        color: "#7e7d7e", // 文字颜色
        fontSize: 14, // 文字大小
        bgColor: "#deb1c7", // 背景颜色
        textMsg: "按住滑块，拖拽验证", // 提示文字
        successMsg: "验证通过", // 验证成功提示文字
        successColor: "#ffffff", // 滑块验证成功提示文字颜色
        time: 400, // 返回时间
        callback: function(result) { // 回调函数，true(成功),false(失败)
        sliderResult=result;
            if(result){
                    $.ajax({
                        type : "post",
                        url : "/sso/loadcode",
                        dataType : "json",
                        async:false,
                        success : function(data) {
                            rand=data.rand;
                        }
                    })
            }
        }


 var username=$('.n').val();
        var password=$('.p').val();
        var t = encrypt.encrypt(password);
        if(username==""||password==""||sliderResult==false||rand==""){
            if(username==""||password==""){
                $(".errormsg").empty().html("用户名或密码不能为空").show();
            }else{
                $(".errormsg").empty().html("请拖动滑动验证码").show();
            }
        }else{
            password=hex_md5(password);
            //验证是否有两个角色 
            $.ajax({
                type:"post",
                url:"/sso/checkRole",
                dataType:"json",
                data:{
                    'username':username,
                    'password':password,
                    't':t,
                    'rand':rand,
                    'service':"https://i.nankai.edu.cn/user/simpleSSOLogin"
                },
                async:false,
                success:function(data) {
                    if(data.haserror){
                        sliderResult=false
                        $(".errormsg").empty().html(data.message).show();
                        $("#slider2").slider("restore");
                    }else{
                        if(data.count>1){
                             $(".loginBox").hide();
                             $(".chooseBox").show();
                            $(".chooseBox li").click(function(){
                                var role=$(this).attr("price");
                                loginDosub(username,password,aj,role,t);
                            });
                        }else{
                            // 过滤用户身份选择功能
                            loginDosub(username,password,aj,null,t);
                        } 
                    } 
                },error:function (data1){
                    sliderResult=false
                    $.Pop(data1+"0",{Animation:'showSweetAlert'})
                }
            }); 