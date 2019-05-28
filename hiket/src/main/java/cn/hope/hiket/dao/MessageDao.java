package cn.hope.hiket.dao;

import cn.hope.hiket.entity.Message;

import java.util.List;

public interface MessageDao {
    int insert(Message message);

    int insertSome(Message message);

    List<Message> selectMessageByOpenId(String openId);

    int selectUnread(String openId);

    int updateStateRead(Message message);

    int updateStateReadAll(String openId);
}
