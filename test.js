const express = require('express')

const app = express()

app.listen(8080, function() {
    console.log('server start on 8080')
});

app.get('/test', async(req, res) => {
    const rr1 = 'rello';
    res.status(200).send({hi});
  });