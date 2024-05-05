package cn.hope.hiket.entity;

import lombok.Data;

import java.util.Date;

@Data
public class MiaoshaGoods {
    private Long id;
    private Long goodsId;
    private Integer StockCount;
    private Date startDate;
    private Date endDate;
}
