const jsonDB = require('../db/db.json');


module.exports = (app) => {
  
    app.get('/api/notes', (req, res) => {
        res.json(jsonDB)
    })
    
    app.post('/api/notes', (req, res) => {
        jsonDB.push(req.body);
        res.json(true);
        })

    app.delete('/api/notes/:id', (req, res) => {
        const id = req.params.id;
        jsonDB.splice(id, 1);
        res.json(jsonDB)
    })
   
};