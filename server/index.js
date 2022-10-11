const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get('/', (req, res) => {
  res.send('hello');
});


app.listen(3000);
console.log(`Listening at http://localhost:3000`);