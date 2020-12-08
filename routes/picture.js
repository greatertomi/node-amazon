const { Router } = require('express');
const util = require('util');

const router = Router();

const multer = require('../middleware/multer');
const db = require('../database/index');

const query = util.promisify(db.query).bind(db);

db.getConnection((err) => {
  if (err) throw err;
  console.log('MySQL is connected...');
});

router.post('/upload', multer.single('image'), (req, res) => {
  const maxSize = 0.5 * 1024 * 1024;
  if (req.badFormatError) {
    return res.status(400).send({ message: 'Image format not supported!' });
  } else if (req.file.size > maxSize) {
    return res.status(400).send({ message: 'Image too large!' });
  }

  res.status(201).send(req.file);
});

router.post('/createDb', async (request, response) => {
  try {
    const res = await query(`CREATE TABLE IF NOT EXISTS images(id int NOT NULL AUTO_INCREMENT, description varchar(300),
    fileType varchar(50), fileSize int(50), location varchar, PRIMARY KEY(id)`);
    console.log(res);
    response.send(res);
  } catch (err) {
    console.log(err);
  }
});

router.post('/rdsSave', (req, res) => {});

module.exports = router;
