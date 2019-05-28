package cn.hope.hiket.utils.nku.parse;

import cn.hope.hiket.utils.nku.init.Patterns;
import cn.hope.hiket.utils.nku.model.Info;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InfoParse {
    public static Info getInfo(CloseableHttpResponse response) {
        Info info = new Info();
        try {
            HttpEntity entity = response.getEntity();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(
                            entity.getContent(), "utf-8"));
            String inputLine;
            Pattern p;
            Matcher m;
            while ((inputLine = reader.readLine()) != null) {
                String student_id = Patterns.student_id;
                p = Pattern.compile(student_id);
                m = p.matcher(inputLine);
                if (m.find()) {
                    info.setNumber(m.group(1));
                    for (int k = 0; k < 12; k++) {
                        inputLine = reader.readLine();
                    }
                    int left = inputLine.indexOf(">") + 1;
                    int right = inputLine.lastIndexOf("<");
                    String college = inputLine.substring(left, right);
                    info.setFaculty(college);
                }
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return info;
    }
}

