const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const router = require('./routes/apiRouter.js')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', router)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => {
  console.log('server is listening to PORT 3000');
})