package com.example.comafe_api.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

public class UploadUtil {
    public static boolean fazerUploadImagem(MultipartFile imagem, String nomeArquivoUnico) {
        boolean sucessoUpload = false;
        if (!imagem.isEmpty()) {
            try {
                System.out.println("Iniciando o upload do arquivo: " + nomeArquivoUnico);
                String workspaceProjeto = "/home/sd_victor_antonio/Área de trabalho/RepositoriosGit/COMAFE/comafe-api/src/main/resources/static/img/img-produtos";
                File dir = new File(workspaceProjeto);
                if (!dir.exists()) {
                    System.out.println("Diretório não existe, criando o diretório...");
                    dir.mkdirs();
                }
                File serverFile = new File(dir.getAbsolutePath() + File.separator + nomeArquivoUnico);
                System.out.println("Salvando o arquivo em: " + serverFile.getAbsolutePath());
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(imagem.getBytes());
                stream.close();
                System.out.println("Arquivo armazenado em:" + serverFile.getAbsolutePath());
                System.out.println("Você fez o upload do arquivo com sucesso como " + nomeArquivoUnico);
                sucessoUpload = true;
            } catch (Exception e) {
                System.out.println("Você falhou em carregar o arquivo " + nomeArquivoUnico + " => " + e.getMessage());
            }
        } else {
            System.out.println("Você falhou em carregar o arquivo porque ele está vazio");
        }
        return sucessoUpload;
    }


    public static boolean deletarImagem(String imageUrl) {
        File file = new File(imageUrl);
        if (file.exists()) {
            return file.delete();
        }
        return false;
    }
}
