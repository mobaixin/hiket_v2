package cn.hope.hiket.dao;

import cn.hope.hiket.entity.MiaoshaUser;
import org.apache.ibatis.annotations.Param;

public interface MiaoshaUserDao {
    public MiaoshaUser getById(@Param("id") long id);

    public void update(MiaoshaUser toBeUpdate);
}
