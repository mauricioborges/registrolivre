package br.com.registrolivre.utils;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;

/**
 * Created by idiesel on 8/12/15.
 */
public class AmazonAPI {
    public static final String BUCKET_NAME = "documentos-empresas";
    public static final String ACCESS_KEY_ID = "AKIAISYASUHBH3KPVJ7A";
    public static final String SECRET_ACCESS_KEY = "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";

    public static AmazonS3 getS3Client() {
        AWSCredentials credentials = new BasicAWSCredentials(ACCESS_KEY_ID, SECRET_ACCESS_KEY);
        return new AmazonS3Client(credentials);
    }
}
