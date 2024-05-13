package cn.hope.hiket.redis;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
// 指定配置文件里面前缀为“redis”的配置项，与配置项里面的属性对应起来
@ConfigurationProperties(prefix = "redis")
@Data
public class RedisConfig {
    private String host;
    public int port;
    private int timeout;    // 秒
    private String password;
    private int poolMaxTotal;
    private int poolMaxIdle;
    private int poolMaxWait;    // 秒
}
