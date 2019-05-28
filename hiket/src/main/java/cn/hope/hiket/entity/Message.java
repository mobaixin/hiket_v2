package cn.hope.hiket.entity;

import lombok.Data;

import java.util.List;

@Data
public class Message {
    private Long messageId;
    private String openId;
    private String triggerOpenId;
    private String title;
    private String content;
    private Long goodId;
    private String createTime;
    private Integer state;

    private String timePast;
    private List<String> openIdList;
}
