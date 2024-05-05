package cn.hope.hiket.vo;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

@Data
public class LoginVo {
    @NotNull
    private String mobile;

    @NotNull
    @Length(min = 8)
    private String password;
}
