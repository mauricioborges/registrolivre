package br.com.registrolivre.controllers.representations;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Value;
import lombok.experimental.FieldDefaults;
import lombok.experimental.Wither;

import static lombok.AccessLevel.PRIVATE;

/**
 * Created by cbustama on 8/31/15.
 */
@NoArgsConstructor
@AllArgsConstructor
@Value
@Wither
@FieldDefaults(level = PRIVATE)
public class FileUploaderOptions {
    @JsonFormat String awsKey;
    @JsonFormat String awsRegion;
    @JsonFormat String bucket;
    @JsonFormat String signerUrl;
}
