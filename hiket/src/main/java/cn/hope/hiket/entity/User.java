package cn.hope.hiket.entity;

import lombok.Data;

import java.util.List;

import javax.validation.constraints.NotNull;

@Data
public class User {
    private String openId;
    private String nickName;
    private Integer gender;
    private String avatarUrl;
    private Integer role;
    private String number;
    @NotNull
    private String password;
    private String campus;
    private String college;
    private Integer state;

    private List<Integer> favoriteGoodIdList;
    private List<Message> messageList;
}
