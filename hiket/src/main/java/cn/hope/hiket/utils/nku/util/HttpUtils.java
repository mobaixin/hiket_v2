package cn.hope.hiket.utils.nku.util;


import cn.hope.hiket.utils.nku.init.Url;
import cn.hope.hiket.utils.nku.model.Info;
import cn.hope.hiket.utils.nku.model.Student;
import cn.hope.hiket.utils.nku.parse.InfoParse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

public class HttpUtils {

    public static CloseableHttpResponse graduateLogin(CloseableHttpClient client,  Student s) {
        HttpPost httpPost = new HttpPost(Url.GRADUATE_LOGIN_URL);
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

	public static CloseableHttpResponse login(CloseableHttpClient client, Student s) {
		HttpPost httpPost = new HttpPost(Url.LOGIN_URL);
		List <NameValuePair> nvps = new ArrayList<>();
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
