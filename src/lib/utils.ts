import { S3 } from 'aws-sdk';

/**
 *  객체가 비어있는지 확인
 *  @param {object} value - 객체
 */
export const isEmpty = function (value: any) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    (typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const uploadS3 = (file, bucket, name) => {
  const s3 = getS3();
  const params = {
    Bucket: bucket,
    Key:
      process.env.NODE_ENV === 'production'
        ? `real-images/${Date.now()}${name.originalname}`
        : `dev-images/${Date.now()}${name.originalname}`,
    Body: file,
  };
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
};

const getS3 = () => {
  return new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  });
};
