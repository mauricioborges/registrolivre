package br.com.registrolivre.services;

import br.com.registrolivre.utils.AWSEnviromentVariables;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import org.apache.commons.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.ServletException;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import static br.com.registrolivre.utils.AWSEnviromentVariables.ACCESS_KEY_ID;
import static br.com.registrolivre.utils.AWSEnviromentVariables.SECRET_ACCESS_KEY;

public class AWSService {
    public static final String S3_REGION_NAME = "sa-east-1";
    public static final String BUCKET_NAME = "registro-livre-tw";

    /**
     * http://docs.aws.amazon.com/AmazonSimpleDB/latest/DeveloperGuide/HMACAuth.html#AuthJavaSampleHMACSignature
     *
     * Computes RFC 2104-compliant HMAC signature.
     *
     * @param data
     *           The data to be signed.
     * @param key
     *           The signing key.
     * @return The Base64-encoded RFC 2104-compliant HMAC signature.
     * @throws UnsupportedOperationException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException
     */
    public static String calculateRFC2104HMAC(String data, String key) throws UnsupportedOperationException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException
    {
        final String HMAC_SHA1_ALGORITHM = "HmacSHA1";
        // get an hmac_sha1 key from the raw key bytes
        SecretKeySpec signingKey = new SecretKeySpec(key.getBytes("UTF8"), HMAC_SHA1_ALGORITHM);
        // get an hmac_sha1 Mac instance and initialize with the signing key
        Mac mac = Mac.getInstance(HMAC_SHA1_ALGORITHM);
        mac.init(signingKey);
        // compute the hmac on input data bytes
        byte[] rawHmac = mac.doFinal(data.getBytes("UTF8"));
        // base64-encode the hmac
        return new String(Base64.encodeBase64(rawHmac));
    }
}