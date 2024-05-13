package cn.hope.hiket.redis;

// 定义成抽象类
public abstract class BasePrefix implements KeyPrefix {
    private int expireSeconds;

    private String prefix;

    public BasePrefix(String prefix) {  // 0 代表永不过期
        this(0, prefix);
    }

    public BasePrefix(int expireSeconds, String prefix) {   // 覆盖了默认的构造函数
        this.expireSeconds = expireSeconds;
        this.prefix = prefix;
    }

    public int getExpireSeconds() { // 默认0 代表永不过期
        return expireSeconds;
    }

    public String getPrefix() {
        // 前缀为类名:+prefix
        String className = getClass().getSimpleName();
        return className + ":" + prefix;
    }
}
