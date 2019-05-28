package cn.hope.hiket.web;

import cn.hope.hiket.conf.Constants;
import cn.hope.hiket.entity.Good;
import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.service.MessageService;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/operation")
public class OperationController {
    private static final Logger LOG = LoggerFactory.getLogger(OperationController.class);

    @Autowired
    GoodService goodService;
    @Autowired
    MessageService messageService;
    @Autowired
    Constants constants;

    @PostMapping("/myGood")
    public ResponseResult getMyGood(String openId) {
        LOG.info("openId=" + openId + ": get my good");
        List<Good> goodList = goodService.getMyGood(openId);
        LOG.info("openId=" + openId + ": get my good, success with: " + goodList);
        return FormatResponseUtil.success(goodList);
    }

    @PostMapping("/updateGoodState")
    public ResponseResult updateGoodState(String openId,Long goodId, int state) {
        LOG.info("openId=" + openId + ": updateGoodState with goodId, state: " + goodId + ", " + state);
        boolean ret = goodService.updateGoodState(goodId, state);
        LOG.info("openId=" + openId + ": updateGoodState with goodId, state: " + goodId + ", " + state + ", success with: " + ret);
        if (ret) {
            LOG.info("openId=" + openId + ": send message about update good state with openId, goodId, state: " + openId + ", " + goodId + ", " + state);
            Good good = goodService.getGood(openId, goodId);
            boolean retTmp = messageService.sendMessageAboutUpdateGoodState(openId, good, state);
            LOG.info("openId=" + openId + ": send message about update good state with openId, goodId, state: "+openId+", " + goodId + ", " + state + ", success with: " + retTmp);
        }
        return FormatResponseUtil.adapter(ret);
    }

    @GetMapping("/test")
    public ResponseResult get() {
        return FormatResponseUtil.success("operation success in serverPort: " + constants.getServerPort()+", serverName: "+constants.getServerName());
    }
}
