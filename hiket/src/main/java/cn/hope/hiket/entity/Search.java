package cn.hope.hiket.entity;

import lombok.Data;

@Data
public class Search {
    private String openId;
    private Integer section;
    private String pattern;
    private Integer beginIndex;
    private Integer numberIndex;
    private Integer orderByBrowseNumber;
    private Integer orderByCreateTime;
}
