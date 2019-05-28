package cn.hope.hiket.entity;

import lombok.Data;

@Data
public class Search {
    private String openId;
    private Integer section;
    private String title;
    private Integer beginIndex;
    private Integer numberIndex;
}
