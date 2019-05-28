package cn.hope.hiket.service.impl;

import cn.hope.hiket.dao.MessageDao;
import cn.hope.hiket.entity.Good;
import cn.hope.hiket.entity.Message;
import cn.hope.hiket.service.MessageService;
import cn.hope.hiket.utils.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageDao messageDao;

    private boolean sendMessage(String openId, String title, String content,Long goodId) {
        Message message = new Message();
        message.setOpenId(openId);
        message.setTitle(title);
        message.setContent(content);
        message.setGoodId(goodId);
        int ret = messageDao.insert(message);
        return ret > 0;
    }

    private boolean sendMessage(List<String> openIdList, String title, String content,Long goodId) {
        if (openIdList == null || openIdList.size() == 0) {
            return false;
        }
        Message message = new Message();
        message.setOpenIdList(openIdList);
        message.setTitle(title);
        message.setContent(content);
        message.setGoodId(goodId);
        int ret = messageDao.insertSome(message);
        return ret > 0;
    }

    @Override
    public boolean hasUnreadMessage(String openId) {
        int ret = messageDao.selectUnread(openId);
        return ret > 0;
    }

    @Override
    public List<Message> getMyMessage(String openId) {
        List<Message> messageList = messageDao.selectMessageByOpenId(openId);
        fillMessage(messageList);
        return messageList;
    }

    private void fillMessage(List<Message> messageList) {
        for (Message message : messageList) {
            fillMessage(message);
        }
    }

    private void fillMessage(Message message) {
        message.setTimePast(TimeUtil.getTimePast(message.getCreateTime()));
    }

    @Override
    public boolean readMessage(Message message) {
        int ret = messageDao.updateStateRead(message);
        return ret > 0;
    }

    @Override
    public boolean readAllMessage(String openId) {
        int ret = messageDao.updateStateReadAll(openId);
        return ret > 0;
    }

    @Override
    public boolean sendMessageAboutUpdateGoodState(String openId, Good good, Integer state) {
        switch (state) {
            case 0: {
                return sendMessage(
                        good.getFavoriteOpenIdList(),
                        "你收藏的商品重新上架了",
                        "你收藏的商品重新上架了：" + good.getTitle(),
                        good.getGoodId());
            }
            case 1: {
                return sendMessage(
                        good.getFavoriteOpenIdList(),
                        "你收藏的商品下架了",
                        "你收藏的商品下架了：" + good.getTitle(),
                        good.getGoodId());
            }
            case 2: {
                return sendMessage(
                        good.getFavoriteOpenIdList(),
                        "你收藏的商品卖出了",
                        "你收藏的商品卖出了：" + good.getTitle(),
                        good.getGoodId());
            }
            case 3: {
                return sendMessage(
                        good.getSellerOpenId(),
                        "你的商品被举报了",
                        "你的商品被举报了：" + good.getTitle(),
                        good.getGoodId());
            }
            case 5: {
                return sendMessage(
                        good.getFavoriteOpenIdList(),
                        "你收藏的商品过期了",
                        "你收藏的商品过期了：" + good.getTitle(),
                        good.getGoodId());
            }
        }
        return false;
    }
}
