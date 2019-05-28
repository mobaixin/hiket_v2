package cn.hope.hiket.conf;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Data
@ConfigurationProperties(prefix = "constants")
public class Constants {

    private String openIdField;
    private String uploadPath;
    private String accessPath;
    private String imageUploadPath;
    private String imageAccessPath;
    private String uploadImagePartName;

    private String appId;
    private String secret;
    private String weixinLoginUrl;

    private String serverPort;
    private String serverName;
}
