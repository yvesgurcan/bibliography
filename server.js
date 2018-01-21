// run `node server.js` to start a server

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/references', (req, res) => {
  res.send({
      references: [
        {
            name: "Reference1",
            url: "test",
        },
      ],
  })
})

app.listen(port, () => console.log(`Hello! Test server is listening on port ${port}.`))