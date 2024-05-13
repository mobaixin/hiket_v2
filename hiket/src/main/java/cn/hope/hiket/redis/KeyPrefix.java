package cn.hope.hiket.redis;

/**
 * 做缓存的前缀接口
 */
public interface KeyPrefix {
    public int getExpireSeconds();

    public String getPrefix();
}
