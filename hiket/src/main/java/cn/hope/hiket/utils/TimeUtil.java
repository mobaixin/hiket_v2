package cn.hope.hiket.utils;


import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

//TODO To test
public class TimeUtil {
    public static final int SecInMs = 1000;
    public static final int MinInMs = 60 * SecInMs;
    public static final int HourInMs = 60 * MinInMs;
    public static final int DayInMs = 24 * HourInMs;

    public static final String[] TimeLabel = {"天","小时","分钟","秒"};
    public static final String PastLabel = "前";

    public static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    private static int[] past(String createTime) {
        Date createDate = null;
        try {
            createDate = sdf.parse(createTime);
        } catch (ParseException e) {
            return null;
        }
        long current = new Date().getTime();
        long create = createDate.getTime();
        long diff = current - create;
        // TODO database bigint
        if (diff < 0) {
            return null;
        }
        int day = (int) (diff / DayInMs);
        diff = diff % DayInMs;
        int hour = (int) (diff / HourInMs);
        diff = diff % HourInMs;
        int min = (int) (diff / MinInMs);
        diff = diff % MinInMs;
        int sec = (int) (diff / SecInMs);
        return new int[]{day, hour, min, sec};
    }

    public static String getTimePast(String createTime) {
        int[] past = past(createTime);
        StringBuilder buf = new StringBuilder();
        if (past != null) {
            for (int i = 0; i < past.length; i++) {
                if (past[i] > 0) {
                    buf.append(past[i]);
                    buf.append("&nbsp;");
                    buf.append(TimeLabel[i]);
                    buf.append(PastLabel);
                    break;
                }
            }
        }
        return buf.toString();
    }
}
