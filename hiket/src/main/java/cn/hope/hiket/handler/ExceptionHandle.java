package cn.hope.hiket.handler;

import cn.hope.hiket.utils.http.FormatResponseUtil;
import cn.hope.hiket.utils.http.ResponseResult;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// ControllerAdvice标注的Class的作用是用来辅助Controller的，我们可以在ControllerAdvice标注的Class中使用@ExceptionHandler、@InitBinder和@ModelAttribute标记对应的方法，以便它们可以对指定范围内的Controller起作用。
// 在没有ControllerAdvice时，我们定义的@ExceptionHandler、@InitBinder和@ModelAttribute都只能在Controller中对当前Controller生效，如果需要让更多的Controller应用相同的逻辑，只能把它们定义在共同的父类中。有了ControllerAdvice后则可以把它们定义在使用@ControllerAdvice标注的Class中。
@RestControllerAdvice
public class ExceptionHandle {
    @ExceptionHandler(Exception.class)
    private ResponseResult exceptionHandle(Exception e){
        return FormatResponseUtil.error(e);
    }
}
