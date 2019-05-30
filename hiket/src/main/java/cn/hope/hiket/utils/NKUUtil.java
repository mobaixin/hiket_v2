package cn.hope.hiket.utils;

import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import cn.hope.hiket.utils.nku.Throw.PasswordError;
import cn.hope.hiket.utils.nku.Throw.Success;
import cn.hope.hiket.utils.nku.model.Student;
import cn.hope.hiket.utils.nku.util.URLFecter;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NKUUtil {
    private static void sleep(long time) {
        try {
            Thread.sleep(time);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private static final long SleepTime = 1;

    private static ResponseResult seleniumLogin(String number, String password, long sleepTime) {
//        System.setProperty("webdriver.gecko.driver", "/nk-hoper/geckodriver");
        WebDriver driver = new FirefoxDriver();
        Map<String, String> info;
        try {
            driver.get("http://eamis.nankai.edu.cn/eams/eamisLogin.action");
            WebElement userNameInput = driver.findElement(By.id("username"));
            WebElement passwordInput = driver.findElement(By.id("password"));
            for (int i = 0; i < number.length(); i++) {
                userNameInput.sendKeys(number.substring(i, i + 1));
                sleep(sleepTime);
            }
            for (int i = 0; i < password.length(); i++) {
                passwordInput.sendKeys(password.substring(i, i + 1));
                sleep(sleepTime);
            }
            passwordInput.submit();
            sleep(sleepTime * 100);
            driver.get("http://eamis.nankai.edu.cn/eams/myPlanCompl.action");
            WebElement infoTable = driver.findElement(By.className("infoTable"));
            List<WebElement> titles = infoTable.findElements(By.className("title"));
            List<WebElement> contents = infoTable.findElements(By.className("content"));
            info = new HashMap<>();
            for (int i = 0; i < titles.size(); i++) {
                info.put(titles.get(i).getText(), contents.get(i).getText());
            }
        } catch (Exception e) {
            return FormatResponseUtil.error();
        } finally {
            driver.quit();
        }
        return FormatResponseUtil.adapter(info,!info.isEmpty());
    }

    public static ResponseResult seleniumLogin(String number, String password) {
        for (int i = 1; i < 2; i++) {
            long sleepTime = SleepTime * i;
            ResponseResult result = seleniumLogin(number, password, sleepTime);
            if (result.isSuccess()) {
                return result;
            }
        }
        return FormatResponseUtil.error();
    }

    public static String nkuEamisLogin(String number, String password) {
        String college;
        CloseableHttpClient client = HttpClients.createDefault();
        Student s = new Student();
        s.setNumber(number);
        s.setPassword(password);
        try {
            URLFecter.eamisLogin(client, s);
        } catch (Success success) {

            URLFecter.getStudentInfo(client, s);
            college = s.getInfo().getFaculty();
            return college;
        } catch (PasswordError passwordError) {
            throw new RuntimeException("用户名或密码错误");
        } catch (Exception e) {
            throw new RuntimeException("未知错误");
        }
        throw new RuntimeException("未知错误");
    }

    public static String nkuUrpLogin(String number, String password) {
//        http://urp.nankai.edu.cn/userPasswordValidate1.portal
        CloseableHttpClient client = HttpClients.createDefault();
        Student s = new Student();
        s.setNumber(number);
        s.setPassword(password);
        try {
            URLFecter.urpLogin(client, s);
        } catch (Success success) {
            return "研究生";
        } catch (PasswordError passwordError) {
            throw new RuntimeException("用户名或密码错误");
        } catch (Exception e) {
            throw new RuntimeException("未知错误");
        }
        throw new RuntimeException("未知错误");
    }

    public static String nkuSsoLogin(String number, String password) {
        System.setProperty("javax.net.ssl.trustStore", "/Users/xuanchuanbu/hiket_v2/hiket/src/main/java/cn/hope/hiket/utils/nku/util/jssecacerts");
//        System.setProperty("javax.net.ssl.trustStore", "/www/web/nk/jssecacerts");
        CloseableHttpClient client = HttpClients.createDefault();
        Student s = new Student();
        s.setNumber(number);
        s.setPassword(password);
        try {
            URLFecter.ssoLogin(client,s);
        } catch (Success success) {
            return "研究生";
        } catch (PasswordError passwordError) {
            throw new RuntimeException("用户名或密码错误");
        } catch (Exception e) {
            throw new RuntimeException("未知错误");
        }
        throw new RuntimeException("未知错误");
    }
}
