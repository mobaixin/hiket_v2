package cn.hope.hiket.entity;

import lombok.Data;

import java.util.List;

@Data
public class User {
    private String openId;
    private String nickName;
    private Integer gender;
    private String avatarUrl;
    private Integer role;
    private String number;
    private String password;
    private String campus;
    private String college;
    private Integer state;

    private List<Integer> favoriteGoodIdList;
    private List<Message> messageList;
}
