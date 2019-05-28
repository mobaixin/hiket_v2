package cn.hope.hiket.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.Map;

public class CommonUtil {
    public static boolean notUndefined(String s) {
        return s!=null || !s.trim().equals("");
    }

    public static boolean notUndefined(Object o) {
        return o != null;
    }

    private static final Gson GSON = new Gson();

    public static Map<String, String> jsonToMap(String jsonString) {
        return GSON.fromJson(jsonString, new TypeToken<Map<String, String>>(){}.getType());
    }
}
