package cn.hope.hiket.dao;

import cn.hope.hiket.entity.User;

public interface UserDao {
    int insert(String openId);

    int updateWeixinInfo(User user);

    int updateStudentInfo(User user);

    int updateGraduateStudentInfo(User user);

    int updateUserInfo(User user);

    User selectUserInfoByOpenId(String openId);
}
