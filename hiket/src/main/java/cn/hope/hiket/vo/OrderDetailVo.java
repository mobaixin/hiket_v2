package cn.hope.hiket.vo;

import lombok.Data;

@Data
public class OrderDetailVo {
    private GoodsVo goods;
    private OrderDetailVo order;
}
