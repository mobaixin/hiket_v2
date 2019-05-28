package cn.hope.hiket.service;

import cn.hope.hiket.entity.Good;
import cn.hope.hiket.entity.Message;

import java.util.List;

public interface MessageService {
    boolean hasUnreadMessage(String openId);

    List<Message> getMyMessage(String openId);

    boolean readMessage(Message message);

    boolean readAllMessage(String openId);

    boolean sendMessageAboutUpdateGoodState(String openId, Good good, Integer state);
}
