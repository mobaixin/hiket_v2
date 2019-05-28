package cn.hope.hiket.web;

import cn.hope.hiket.conf.Constants;
import cn.hope.hiket.entity.Good;
import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {
    private static final Logger LOG = LoggerFactory.getLogger(FavoriteController.class);

    @Autowired
    GoodService goodService;
    @Autowired
    Constants constants;

    @PostMapping("/favoriteGood")
    public ResponseResult favoriteGood(@RequestParam("openId") String openId, @RequestParam("goodId") Long goodId) {
        LOG.info("openId=" + openId + ": favorite good with openId, goodId: "+openId+", "+goodId);
        boolean ret = goodService.favoriteGood(openId, goodId);
        LOG.info("openId=" + openId + ": favorite good with openId, goodId: " + openId + ", " + goodId + ", success with: " + ret);
        return FormatResponseUtil.adapter(ret);
    }

    @PostMapping("/noneFavoriteGood")
    public ResponseResult noneFavoriteGood(@RequestParam("openId") String openId, @RequestParam("goodId") Long goodId) {
        LOG.info("openId=" + openId + ": none favorite good with openId, goodId: "+openId+", "+goodId);
        boolean ret = goodService.noneFavoriteGood(openId, goodId);
        LOG.info("openId=" + openId + ": favorite good with openId, goodId: " + openId + ", " + goodId + ", success with: " + ret);
        return FormatResponseUtil.adapter(ret);
    }

    @PostMapping("/myFavoriteGood")
    public ResponseResult getMyFavoriteGood(@RequestParam("openId") String openId) {
        LOG.info("openId=" + openId + ": get my favorite good");
        List<Good> goodList = goodService.getMyFavoriteGood(openId);
        LOG.info("openId=" + openId + ": get my favorite good, success with: " + goodList);
        return FormatResponseUtil.success(goodList);
    }

    @GetMapping("/test")
    public ResponseResult get() {
        return FormatResponseUtil.success("favorite success in serverPort: " + constants.getServerPort()+", serverName: "+constants.getServerName());
    }
}
