package cn.hope.hiket.web;

import cn.hope.hiket.conf.Constants;
import cn.hope.hiket.entity.Good;
import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.utils.CommonUtil;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ImageUploadUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.apache.catalina.core.ApplicationPart;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;

@RestController
@RequestMapping("/release")
public class ReleaseController {
    private static final Logger LOG = LoggerFactory.getLogger(ReleaseController.class);

    @Autowired
    GoodService goodService;
    @Autowired
    Constants constants;

    @PostMapping(value = "/uploadImage", consumes = "multipart/form-data")
    public ResponseResult uploadImage(HttpServletRequest request) throws Exception {
        LOG.info("upload image");
        MultipartHttpServletRequest params = ((MultipartHttpServletRequest) request);
        ApplicationPart image = (ApplicationPart) request.getPart(constants.getUploadImagePartName());
        InputStream in = image.getInputStream();
        String imagePath = ImageUploadUtil.imageInputStreamToFile(in, constants.getImageUploadPath(), constants.getImageAccessPath(), image.getSubmittedFileName(), constants.getOpenIdField(), params.getParameter(constants.getOpenIdField()));
        LOG.info("upload image success with: " + imagePath);
        return FormatResponseUtil.adapter(imagePath, CommonUtil.notUndefined(imagePath));
    }

    @PostMapping("/releaseGood")
    public ResponseResult release(@RequestBody Good good) {
        LOG.info("openId=" + good.getSellerOpenId() + ": release with good: " + good);
        good = goodService.releaseGood(good);
        LOG.info("openId=" + good.getSellerOpenId() + ": release with good: " + good + ", success with: "  + good);
        return FormatResponseUtil.adapter(good, CommonUtil.notUndefined(good));
    }

    @GetMapping("/test")
    public ResponseResult get() {
        return FormatResponseUtil.success("release success in serverPort: " + constants.getServerPort()+", serverName: "+constants.getServerName());
    }
}
