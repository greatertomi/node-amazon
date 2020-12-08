const { Router } = require('express');

const multer = require('../middleware/multer');

const router = Router();

router.post('/upload', multer.single('image'), (req, res) => {
  const maxSize = 0.5 * 1024 * 1024;
  if (req.badFormatError) {
    return res.status(400).send({ message: 'Image format not supported!' });
  } else if (req.file.size > maxSize) {
    return res.status(400).send({ message: 'Image too large!' });
  }

  res.status(201).send(req.file);
});

router.post('/rdsSave', (req, res) => {});

module.exports = router;
