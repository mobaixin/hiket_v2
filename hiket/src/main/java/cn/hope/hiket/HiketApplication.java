package cn.hope.hiket;

import cn.hope.hiket.conf.Constants;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.web.bind.annotation.RestController;

@EnableConfigurationProperties({Constants.class})
@SpringBootApplication
@MapperScan("cn.hope.hiket.dao")
@RestController
public class HiketApplication {

    public static void main(String[] args) {
        SpringApplication.run(HiketApplication.class, args);
    }

}
