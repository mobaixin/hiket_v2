package cn.hope.hiket.service.impl;

import cn.hope.hiket.dao.UserDao;
import cn.hope.hiket.entity.User;
import cn.hope.hiket.service.UserService;
import cn.hope.hiket.utils.CommonUtil;
import cn.hope.hiket.utils.NKUUtil;
import cn.hope.hiket.web.UserController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserDao userDao;

    @Override
    public boolean register(String openId) {
        if (CommonUtil.notUndefined(openId)) {
            User user = userDao.selectUserInfoByOpenId(openId);
            if (CommonUtil.notUndefined(user)) {
                return true;
            } else {
                return userDao.insert(openId) > 0;
            }
        } else {
            throw new RuntimeException("获取 OpenId 失败");
        }
    }

    @Override
    public boolean weixinRegister(User user) {
        if (CommonUtil.notUndefined(user.getOpenId())) {
            if (CommonUtil.notUndefined(user.getNickName()) &&
                    CommonUtil.notUndefined(user.getGender()) &&
                    CommonUtil.notUndefined(user.getAvatarUrl())) {
                int ret = userDao.updateWeixinInfo(user);
                if (ret > 0) {
                    return true;
                } else {
                    throw new RuntimeException("未知错误，微信认证失败");
                }
            } else {
                throw new RuntimeException("获取微信用户信息失败");
            }
        } else {
            throw new RuntimeException("获取 OpenId 失败");
        }
    }

    @Override
    public boolean studentRegister(User user) {
        if (CommonUtil.notUndefined(user.getOpenId())) {
            if (CommonUtil.notUndefined(user.getNumber()) &&
                    CommonUtil.notUndefined(user.getPassword())) {
                getStudentInfo(user);
                int ret = userDao.updateStudentInfo(user);
                if (ret > 0) {
                    return true;
                } else {
                    throw new RuntimeException("未知错误，学生认证失败");
                }
            } else {
                throw new RuntimeException("获取学号或密码失败");
            }
        } else {
            throw new RuntimeException("获取 OpenId 失败");
        }
    }

    private void getStudentInfo(User user) {
        String number = user.getNumber();
        String password = user.getPassword();
        String college;
        if (number.length() == 10/*&&number.startsWith("2120")*/) {
//            LOG.info("sso login");
//            college = NKUUtil.nkuSsoLogin(number, password);
            if (number.startsWith("2")){
                college = "研究生";
                user.setRole(2);
            } else if (number.startsWith("1")){
                college = "博士生";
                user.setRole(3);
            } else {
                throw new RuntimeException("学号或密码错误");
            }
        } else if (number.length() == 7) {
//            LOG.info("eamis login");
//            college = NKUUtil.nkuEamisLogin(number, password);
            college = "本科生";
            user.setRole(1);
        } else {
            throw new RuntimeException("学号或密码错误");
        }
        user.setCollege(college);
    }

    @Override
    public User login(String openId) {
        if (CommonUtil.notUndefined(openId)) {
            User user = userDao.selectUserInfoByOpenId(openId);
            if (CommonUtil.notUndefined(user)) {
                return user;
            } else {
                throw new RuntimeException("用户未进行认证");
            }
        } else {
            throw new RuntimeException("获取 OpenId 失败");
        }
    }

    @Override
    public User updateUserInfo(User user) {
        if (CommonUtil.notUndefined(user.getOpenId())) {
            userDao.updateUserInfo(user);
            return userDao.selectUserInfoByOpenId(user.getOpenId());
        } else {
            throw new RuntimeException("获取 OpenId 失败");
        }
    }
}
