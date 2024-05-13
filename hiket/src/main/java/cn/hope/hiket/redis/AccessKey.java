package cn.hope.hiket.redis;

public class AccessKey extends BasePrefix{
    // 考虑页面缓存有效期比较短
    public AccessKey(int expireSeconds, String prefix) {
        super(expireSeconds, prefix);
    }

    // 限制 5s 之内访问 5 次
    public static AccessKey access = new AccessKey(5, "access");

    // 动态设置有效期
    public static AccessKey expire(int expireSeconds) {
        return new AccessKey(expireSeconds, "access");
    }
}
