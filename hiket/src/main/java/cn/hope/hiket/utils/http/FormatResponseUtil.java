package cn.hope.hiket.utils.http;

public class FormatResponseUtil {
    /**
     * 请求成功，不携带数据
     */
    public static ResponseResult success() {
        return success(null);
    }

    private static ResponseResult success(ResponseResult result) {
        if (result == null) {
            result = new ResponseResult(true, "请求成功", null);
        }
        return result;
    }

    /**
     * 请求成功,带数据
     */
    public static ResponseResult success(Object object) {
        return new ResponseResult(true, "请求成功", object);
    }

    /**
     * 请求成功，携带提示信息和数据
     */
    public static ResponseResult success(String msg, Object object) {
        return new ResponseResult(true, msg, object);
    }

    /**
     * 请求失败，返回错误和错误信息
     */
    public static ResponseResult error() {
        return new ResponseResult(false, "未知错误");
    }

    /**
     * 请求失败，返回错误和错误信息
     */
    public static ResponseResult error(Exception e) {
        return new ResponseResult(false, e.getMessage());
    }

    /**
     * 请求失败，返回异常信息
     */
    public static ResponseResult error(String exception) {
        return new ResponseResult(false, exception);
    }

    /**
     * 根据参数适配决定是否成功
     */
    public static ResponseResult adapter(boolean flag) {
        if (flag) {
            return success();
        } else {
            return error();
        }
    }

    public static ResponseResult adapter(Object o, boolean flag) {
        if (flag) {
            return success(o);
        } else {
            return error();
        }
    }

    public static ResponseResult adapter(String msg,Object o, boolean flag) {
        if (flag) {
            return success(msg, o);
        } else {
            return error();
        }
    }
}
