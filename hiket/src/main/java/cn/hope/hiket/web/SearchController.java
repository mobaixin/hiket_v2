package cn.hope.hiket.web;

import cn.hope.hiket.conf.Constants;
import cn.hope.hiket.entity.Good;
import cn.hope.hiket.entity.Search;
import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.utils.CommonUtil;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {
    private static final Logger LOG = LoggerFactory.getLogger(SearchController.class);

    @Autowired
    GoodService goodService;
    @Autowired
    Constants constants;

//    @PostMapping("/searchActiveGood")
//    public ResponseResult searchActiveGood(@RequestBody Search search) {
//        LOG.info("openId=" + search.getOpenId() + ": search active good with search: " + search);
//        List<Good> list = goodService.searchActiveGood(
//                search.getOpenId(),
//                search.getSection(),
//                search.getTitle(),
//                search.getBeginIndex(),
//                search.getNumberIndex()
//        );
//        LOG.info("openId=" + search.getOpenId() + ": search active good with search: " + search + ", success with: " + list);
//        return  FormatResponseUtil.success(list);
//    }

    @PostMapping("/searchActiveGood")
    public ResponseResult searchActiveGood(@RequestBody Search search) {
        LOG.info("openId=" + search.getOpenId() + ": search active good with search: " + search);
        List<Good> list = goodService.searchActiveGood(search);
        LOG.info("openId=" + search.getOpenId() + ": search active good with search: " + search + ", success with: " + list);
        return  FormatResponseUtil.success(list);
    }

    @PostMapping("/getGood")
    public ResponseResult getGood(String openId,Long goodId) {
        LOG.info("openId=" + openId + ": get good with goodId: " + goodId);
        Good good = goodService.getGood(openId, goodId);
        LOG.info("openId=" + openId + ": get good with goodId: " + goodId + ", success with: " + good);
        return FormatResponseUtil.adapter(good, CommonUtil.notUndefined(good));
    }

    @PostMapping("/getTodayGood")
    public ResponseResult getTodayGood() {
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");
        String time = ft.format(dNow);
        List<Good> list = goodService.getTodayGood(time);
        return FormatResponseUtil.success(list);
    }

    @GetMapping("/test")
    public ResponseResult get() {
        return FormatResponseUtil.success("search success in serverPort: " + constants.getServerPort()+", serverName: "+constants.getServerName());
    }
}
