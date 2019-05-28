package cn.hope.hiket.web;

import cn.hope.hiket.conf.Constants;
import cn.hope.hiket.entity.User;
import cn.hope.hiket.service.UserService;
import cn.hope.hiket.utils.CommonUtil;
import cn.hope.hiket.utils.NKUUtil;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.HttpUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger LOG = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserService userService;
    @Autowired
    Constants constants;

    @PostMapping("/register")
    public ResponseResult register(String code) {
        LOG.info("get openId with code: " + code);
        String url = String.format(constants.getWeixinLoginUrl(), code);
        String key = HttpUtil.accessUrl(url, "");
        Map<String, String> keyMap = CommonUtil.jsonToMap(key);
        String openId = keyMap.get("openid");
        LOG.info("get openId with code: " + code + ", success with: " + openId);
        LOG.info("openId=" + openId + ": register with openId: " + openId);
        boolean ret = userService.register(openId);
        LOG.info("openId=" + openId + ": register with openId: " + openId + ", success with: " + ret);
        LOG.info("openId=" + openId + ": login with openId: " + openId);
        User user = userService.login(openId);
        LOG.info("openId=" + openId + ": login with openId: " + openId + ", success with: " + user);
        return FormatResponseUtil.adapter(user, ret && user != null);
    }

    @PostMapping("/weixinRegister")
    public ResponseResult weixinRegister(@RequestBody User user) {
        LOG.info("openId=" + user.getOpenId() + ": weixin register with user: " + user);
        boolean ret = userService.weixinRegister(user);
        LOG.info("openId=" + user.getOpenId() + ": weixin register with user: " + user + ", success  with: " + ret);
        return FormatResponseUtil.adapter("微信认证成功", ret, ret);
    }

    @PostMapping("/studentRegister")
    public ResponseResult studentRegister(@RequestBody User user) {
        LOG.info("openId=" + user.getOpenId() + ": student register with user: " + user);
        boolean ret = userService.studentRegister(user);
        LOG.info("openId=" + user.getOpenId() + ": student register with user: " + user + ", success  with: " + ret + ", " + user);
        return FormatResponseUtil.adapter("学生认证成功", user, ret);
    }

    @PostMapping("/updateUserInfo")
    public ResponseResult updateUserInfo(@RequestBody User user) {
        LOG.info("openId=" + user.getOpenId() + ": update user info with user: " + user);
        user = userService.updateUserInfo(user);
        LOG.info("openId=" + user.getOpenId() + ": update user info with user: " + user + ", success  with: " + user);
        return FormatResponseUtil.adapter("更新信息成功", user, user != null);
    }

    @PostMapping("/getTopBanner")
    public ResponseResult getTopBanner() {
        List<String> banner = new ArrayList<>();
        banner.add("https://www.werehunter.com/upload/banner/tiny/1.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/2.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/3.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/4.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/5.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/6.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/7.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/8.png");
        banner.add("https://www.werehunter.com/upload/banner/tiny/9.png");
        return FormatResponseUtil.success(banner);
    }


    @GetMapping("/test")
    public ResponseResult get() {
        return FormatResponseUtil.success("user success in serverPort: " + constants.getServerPort() + ", serverName: " + constants.getServerName());
    }

    @GetMapping("/nku")
    public ResponseResult nku(String number, String password) {
        return NKUUtil.seleniumLogin(number, password);
    }
}
