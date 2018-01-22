// run `node server.js` to start a server

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/references', (req, res) => {
  console.log(Date() + " - get references")
  res.send({
    references: [
      {
        name: "Reference1",
        url: "test",
      },
    ],
  })
})

app.post('/signIn', (req, res) => {
  console.log(Date() + " - post sign in")
  res.send({
    authenticated: true,
  })
})

app.listen(port, () => console.log(Date() + ` - Hello! Test server is listening on port ${port}.`))