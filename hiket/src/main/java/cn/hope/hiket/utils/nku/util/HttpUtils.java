package cn.hope.hiket.utils.nku.util;


import cn.hope.hiket.utils.nku.init.Url;
import cn.hope.hiket.utils.nku.model.Info;
import cn.hope.hiket.utils.nku.model.Student;
import cn.hope.hiket.utils.nku.parse.InfoParse;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class HttpUtils {
    public static CloseableHttpResponse ssoLogin(CloseableHttpClient client, Student s)  {
        HttpPost httpPost = new HttpPost("https://sso.nankai.edu.cn/sso/checkRole");
        httpPost.addHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.160 Safari/537.22");
        String password;
        CloseableHttpResponse response = null;
        try {
            password = MD5Util.GetMD5Code(s.getPassword());
            List<NameValuePair> nvps = new ArrayList<>();
            nvps.add(new BasicNameValuePair("username", s.getNumber()));
            nvps.add(new BasicNameValuePair("password", password));
            nvps.add(new BasicNameValuePair("ssoLogin", "")); //ÃÜÂë¼ÓÃÜ
            nvps.add(new BasicNameValuePair("rand", ""));
            nvps.add(new BasicNameValuePair("service", "https://i.nankai.edu.cn/user/simpleSSOLogin"));
            httpPost.setEntity(new UrlEncodedFormEntity(nvps));
             response = client.execute(httpPost);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return response;
    }

    public static String getRand(CloseableHttpClient client) {
        HttpPost httpPost = new HttpPost("https://sso.nankai.edu.cn/sso/loadcode");
        CloseableHttpResponse response;
        httpPost.addHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.160 Safari/537.22");
        BufferedReader reader;
        String result = null;
        try {
            response = client.execute(httpPost);
            HttpEntity entity = response.getEntity();
            StringBuffer responseContent = new StringBuffer();
            reader = new BufferedReader(
                    new InputStreamReader(
                            entity.getContent(), "utf-8"));
            result = reader.readLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static CloseableHttpResponse urpLogin(CloseableHttpClient client, Student s) {
        HttpPost httpPost = new HttpPost("http://urp.nankai.edu.cn/userPasswordValidate1.portal");
        List<NameValuePair> nvps = new ArrayList<>();
        nvps.add(new BasicNameValuePair("Login.Token1", s.getNumber()));
        nvps.add(new BasicNameValuePair("Login.Token2", s.getPassword()));
        httpPost.addHeader("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.22 (KHTML, like Gecko) Chrome/25.0.1364.160 Safari/537.22");
        CloseableHttpResponse response = null;
        try {
            httpPost.setEntity(new UrlEncodedFormEntity(nvps));
            response = client.execute(httpPost);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return response;
    }

    public static CloseableHttpResponse eamisLogin(CloseableHttpClient client, Student s) {
        HttpPost httpPost = new HttpPost(Url.LOGIN_URL);
        List<NameValuePair> nvps = new ArrayList<>();
        nvps.add(new BasicNameValuePair("username", s.getNumber()));
        nvps.add(new BasicNameValuePair("password", s.getPassword()));
        try {
            httpPost.setEntity(new UrlEncodedFormEntity(nvps));
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        CloseableHttpResponse response = null;
        try {
            response = client.execute(httpPost);
        } catch (ClientProtocolException e1) {
            e1.printStackTrace();
        } catch (IOException e1) {
            e1.printStackTrace();
        }
        return response;
    }

    public static Info getInfo(CloseableHttpClient client) {
        HttpGet httpGet = new HttpGet(Url.GRADE_URL);
        CloseableHttpResponse response = null;
        try {
            response = client.execute(httpGet);
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return InfoParse.getInfo(response);
    }
}
