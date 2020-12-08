const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/picture', require('./routes/picture'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
