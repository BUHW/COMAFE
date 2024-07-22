package com.example.comafe_api.util;

import org.apache.tomcat.util.codec.binary.Base64;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

public class UploadUtil {

    public static String saveBase64Image(String base64Image) {

        String imageUrl = null;

        try {
            String[] parts = base64Image.split(",");
            String imageString = parts[1];
            byte[] imageBytes = Base64.decodeBase64(imageString);

            String UploadImageFolder = "/home/sd_victor_antonio/Área de trabalho/RepositoriosGit/COMAFE/comafe-api/src/main/resources/static/img/img-produtos";
            File dir = new File(UploadImageFolder);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String fileName = "image_" + System.currentTimeMillis() + ".png";
            File serverFile = new File(dir.getAbsolutePath() + File.separator + fileName);

            try (OutputStream stream = new FileOutputStream(serverFile)) {
                stream.write(imageBytes);
            }

            imageUrl = "/static/img/img-produtos/" + fileName;

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return imageUrl;
    }

}
