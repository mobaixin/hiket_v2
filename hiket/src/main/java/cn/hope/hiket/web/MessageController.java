package cn.hope.hiket.web;

import cn.hope.hiket.conf.Constants;
import cn.hope.hiket.entity.Message;
import cn.hope.hiket.service.MessageService;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {
    private static final Logger LOG = LoggerFactory.getLogger(MessageController.class);

    @Autowired
    MessageService messageService;
    @Autowired
    Constants constants;

    @PostMapping("/hasUnreadMessage")
    public ResponseResult hasUnReadMessage(String openId) {
        LOG.info("openId=" + openId + ": has unread message");
        boolean ret = messageService.hasUnreadMessage(openId);
        LOG.info("openId=" + openId + ": has unread message, success with: " + ret);
        return FormatResponseUtil.success(ret);
    }

    @PostMapping("/getMyMessage")
    public ResponseResult getMyMessage(String openId) {
        LOG.info("openId=" + openId + ": get my message");
        List<Message> messages = messageService.getMyMessage(openId);
        LOG.info("openId=" + openId + ": get my message, success with: " + messages);
        return FormatResponseUtil.success(messages);
    }

    @PostMapping("/readMessage")
    public ResponseResult readMessage(@RequestBody Message message) {
        LOG.info("openId=" + message.getOpenId() + ": read message with message: " + message);
        boolean ret = messageService.readMessage(message);
        LOG.info("openId=" + message.getOpenId() + ": read message with message: " + message + ", success with: " + ret);
        return FormatResponseUtil.adapter(ret);
    }

    @PostMapping("/readAllMessage")
    public ResponseResult readAllMessage(String openId) {
        LOG.info("openId=" + openId + ": read all message");
        boolean ret = messageService.readAllMessage(openId);
        LOG.info("openId=" + openId + ": read all message, success with: " + ret);
        return FormatResponseUtil.adapter(ret);
    }

    @GetMapping("/test")
    public ResponseResult get() {
        return FormatResponseUtil.success("message success in serverPort: " + constants.getServerPort() + ", serverName: " + constants.getServerName());
    }
}
