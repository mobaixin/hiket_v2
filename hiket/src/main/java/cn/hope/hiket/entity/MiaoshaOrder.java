package cn.hope.hiket.entity;

import lombok.Data;

@Data
public class MiaoshaOrder {
    private Long id;
    private Long userId;
    private Long orderId;
    private Long goodsId;
}
