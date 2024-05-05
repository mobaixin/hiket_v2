package cn.hope.hiket.entity;

import lombok.Data;

import java.util.Date;

@Data
public class OrderInfo {
    private Long id;
    private String userId;
    private Long goodsId;
    private Long deliveryAddrId;
    private String goodsName;
    private Integer goodsCount;
    private Double goodsPrice;
    private Integer orderChannel;
    private Integer status;
    private Date createDate;
    private Date payDate;

}
