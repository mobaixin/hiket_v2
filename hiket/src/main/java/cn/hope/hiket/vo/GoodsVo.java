package cn.hope.hiket.vo;

import cn.hope.hiket.entity.Good;
import lombok.Data;

import java.util.Date;

@Data
public class GoodsVo extends Good {
    private Double miaoshaPrice;
    private Integer stockCount;
    private Date startDate;
    private Date endDate;
}
