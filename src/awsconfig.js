import AWS from "aws-sdk";

const awsConfig = {
  region: "YOUR_AWS_REGION",
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
};

AWS.config.update(awsConfig);

const rekognition = new AWS.Rekognition();

export default rekognition;
