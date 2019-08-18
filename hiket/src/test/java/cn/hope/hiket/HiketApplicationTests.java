package cn.hope.hiket;

import cn.hope.hiket.entity.Good;
import cn.hope.hiket.service.GoodService;
import cn.hope.hiket.utils.TimeUtil;
import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ImageUploadUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HiketApplicationTests {
    @Test
    public void getImageNameTest() {
        System.out.println(ImageUploadUtil.getImageName("123.3131.da13.jpg", "openId", "test_open_id"));
    }

    @Test
    public void timeUtilTest() {
        try {
            Date date = TimeUtil.sdf.parse("2019-05-18 17:26:09");
            System.out.println(date.toLocaleString());
            System.out.println(TimeUtil.getTimePast("2019-05-18 17:26:09"));
        } catch (ParseException e) {
            System.out.println("err");
        }
    }

//    @Test
//    public void eamisTest() {
//        System.out.println(NKUUtil.nkuEamisLogin("1612831", "912161"));
//    }
//
//    @Test
//    public void eamisErrorTest0() {
//        System.out.println(NKUUtil.nkuEamisLogin("16120", "11904"));
//    }
//
//    @Test
//    public void eamisErrorTest1() {
//        System.out.println(NKUUtil.nkuEamisLogin("161260", "11904"));
//    }
//
//    @Test
//    public void urpTest() {
//        System.out.println(NKUUtil.nkuUrpLogin("2120182362", "141592"));
//    }
//
//    @Test
//    public void ssoTest() {
//        System.out.println(NKUUtil.nkuSsoLogin("2120182362", "141592"));
//    }

//    @Test
//    public void ssoErrorTest0() {
//        System.out.println(NKUUtil.nkuSsoLogin("212018262", "141592"));
//    }
//
//    @Test
//    public void ssoErrorTest1() {
//        System.out.println(NKUUtil.nkuSsoLogin("2120182362", "14192"));
//    }

    @Autowired
    GoodService goodService;

    @Test
    public void todayGoodTest() {
        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd");
        String time = ft.format(dNow);
        List<Good> list = goodService.getTodayGood(time);
        System.out.println(list);
    }
}
