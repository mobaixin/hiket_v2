package cn.hope.hiket.entity;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Good {
    private Long goodId;
    private String sellerOpenId;
    private String nickName;
    private Integer gender;
    private String avatarUrl;
    private String campus;
    private String college;
    private String title;
    private String content;
    private String phoneNumber;
    private String weixinNumber;
    private String qqNumber;
    private String createTime;
    private Integer state;
    private Integer type;
    private Double price;
    private Double oldPrice;
    private Integer section;
    private String sectionTag;
    private Integer elseTag;
    private Integer helpTag;
    private Integer favoriteNumber;
    private String reward;
    private Integer period;
    private Integer backGroundId;
    private String backGroundImagePath;
    private Integer limitSize;
    private String fontColor;
    private Integer fontSize;
    private Integer marginTop;
    private Integer marginBottom;
    private Integer marginRight;
    private Integer marginLeft;
    private Date finishTime;
    private String buyerOpenId;
    private Integer browseNumber;

    private String timePast;
    private boolean isMyFavorite;
    private boolean isMine;

    private List<String> uploadImagePathList;

    private List<String> favoriteOpenIdList;
}
