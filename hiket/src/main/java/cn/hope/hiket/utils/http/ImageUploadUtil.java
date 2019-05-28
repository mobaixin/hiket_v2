package cn.hope.hiket.utils.http;

import java.io.*;

public class ImageUploadUtil {
    public static final char ImageNameSplit = '_';

    public static String getImageName(String imageName, Object... params) {
        String[] tmpStrings = imageName.split("\\.");
        if (tmpStrings.length < 2) {
            throw new RuntimeException("图片命名格式不正确");
        }
        StringBuilder buf = new StringBuilder();
        for (Object s : params) {
            buf.append(s)
                    .append(ImageNameSplit);
        }
        buf.append(System.nanoTime())
                .append(".")
                .append(tmpStrings[tmpStrings.length - 1]);
        return buf.toString();
    }

    public static String imageInputStreamToFile(InputStream ins,String uploadPath,String accessPath, String imageName, Object... params) {
        String imageUploadName = getImageName(imageName, params);
        File file = new File(uploadPath+imageUploadName);
        OutputStream os = null;
        try {
            os = new FileOutputStream(file);
            int bytesRead;
            byte[] buffer = new byte[8192];
            while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException("图片文件路径不存在");
        } catch (IOException e) {
            throw new RuntimeException("IO 异常");
        } finally {
            try {
                if (os != null) {
                    os.close();
                }
                if (ins != null) {
                    ins.close();
                }
            } catch (IOException e) {
                throw new RuntimeException("IO 异常");
            }
        }
        return accessPath+imageUploadName;
    }
}
