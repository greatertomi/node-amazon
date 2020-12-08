const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

aws.config.update({
  secretAccessKey: 'rzqXMrIFtHLe5WJRBFXcP78r63mxVsDAqSwoYAyN',
  accessKeyId: 'AKIAISBMAAZE7V4FDIBA'
});

// region: 'us-east-1'

const s3 = new aws.S3();

const fileFilter = async (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    req.badFormatError = 'Bad format!';
    cb(null, false, req.badFormatError);
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: 'johntestybucket1',
    ContentType: 'images/jpeg',
    ContentDisposition: 'inline',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${Date.now()}.${ext}`);
    }
  })
});

module.exports = upload;
