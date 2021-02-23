var path = require('path');
const router = require("express").Router();



// module.exports = (app) => {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });
// };

module.exports =  router;
