package cn.hope.hiket.vo;

import cn.hope.hiket.entity.User;
import lombok.Data;

@Data
public class GoodDetailVo {
    // 秒杀状态量初始值
    private int miaoshaStatus = 0;
    // 开始时间倒计时
    private int remainSeconds = 0;
    private GoodsVo goods;
    private User user;
}
