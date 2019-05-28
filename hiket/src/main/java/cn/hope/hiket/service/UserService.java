package cn.hope.hiket.service;

import cn.hope.hiket.entity.User;

public interface UserService {
    boolean register(String openId);

    boolean weixinRegister(User user);

    boolean studentRegister(User user);

    User login(String openId);

    User updateUserInfo(User user);
}
