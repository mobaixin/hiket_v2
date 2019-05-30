package cn.hope.hiket.utils.nku.util;

import cn.hope.hiket.utils.CommonUtil;
import cn.hope.hiket.utils.nku.Throw.PasswordError;
import cn.hope.hiket.utils.nku.Throw.Success;
import cn.hope.hiket.utils.nku.model.Student;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.impl.client.CloseableHttpClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class URLFecter {
    public static void ssoLogin(CloseableHttpClient client, Student s) throws Success, PasswordError {
        BufferedReader reader;
        try {
            CloseableHttpResponse response = HttpUtils.ssoLogin(client, s);
            HttpEntity entity = response.getEntity();
            StringBuffer responseContent = new StringBuffer();
            reader = new BufferedReader(
                    new InputStreamReader(
                            entity.getContent(), "utf-8"));
            String result = reader.readLine();
            String resultMessage = CommonUtil.jsonToMap(result).get("message");
            if (resultMessage.equals("")) {
                throw new Success();
            } else if (resultMessage.equals("用户名或密码不正确")) {
                throw new PasswordError();
            } else {
                throw new RuntimeException("未知错误");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void urpLogin(CloseableHttpClient client, Student s) throws PasswordError, Success, UnknownError {
        BufferedReader reader;
        try {
            CloseableHttpResponse response = HttpUtils.urpLogin(client, s);
            HttpEntity entity = response.getEntity();
            reader = new BufferedReader(new InputStreamReader(
                    entity.getContent(), "utf-8"));
            int result = reader.read();
            if (result == 60) {
                throw new Success();
            } else if (result == 13) {
                throw new PasswordError();
            }else {
                throw new RuntimeException("未知错误");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void eamisLogin(CloseableHttpClient client, Student s) throws PasswordError, Success, UnknownError {
        CloseableHttpResponse response = HttpUtils.eamisLogin(client, s);
        int StatusCode = response.getStatusLine().getStatusCode();

        if (StatusCode == 200) {
            throw new PasswordError();
        } else if (StatusCode == 302) {
            throw new Success();
        } else {
            throw new RuntimeException("未知错误");
        }
    }

    public static void getStudentInfo(CloseableHttpClient client, Student s) {
        s.setInfo(HttpUtils.getInfo(client));
    }
}






















