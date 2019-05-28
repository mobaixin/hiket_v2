package cn.hope.hiket.web;

import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/browse")
public class BrowseController {
    private static final Logger LOG = LoggerFactory.getLogger(BrowseController.class);

    @Autowired
    GoodService goodService;

    @PostMapping("/browseGood")
    public ResponseResult browseGood(@RequestParam("openId") String openId, @RequestParam("goodId") Long goodId) {
        LOG.info("openId=" + openId + ": browse good with openId, goodId: "+openId+", "+goodId);
        boolean ret = goodService.browse(goodId);
        LOG.info("openId=" + openId + ": browse good with openId, goodId: " + openId + ", " + goodId + ", success with: " + ret);
        return FormatResponseUtil.adapter(ret);
    }
}
