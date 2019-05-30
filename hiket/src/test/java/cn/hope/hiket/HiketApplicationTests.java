package cn.hope.hiket;

import cn.hope.hiket.utils.NKUUtil;
import cn.hope.hiket.utils.TimeUtil;
import cn.hope.hiket.utils.http.ImageUploadUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.Date;

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

    @Test
    public void eamisTest() {
        System.out.println(NKUUtil.nkuEamisLogin("1612831", "912161"));
    }

//    @Test
//    public void studentErrorTest() {
//        System.out.println(test.nkuEamisLogin("161260", "11904"));
//    }

    @Test
    public void urpTest() {
        System.out.println(NKUUtil.nkuUrpLogin("2120182362", "141592"));
    }

//    @Test
//    public void ssoTest() {
//        System.out.println(test.nkuSsoLogin("2120182362", "141592"));
//    }

//    @Test
//    public void ssoErrorTest0() {
//        System.out.println(test.nkuSsoLogin("212018262", "141592"));
//    }
//
//    @Test
//    public void ssoErrorTest1() {
//        System.out.println(test.nkuSsoLogin("2120182362", "14192"));
//    }
}
