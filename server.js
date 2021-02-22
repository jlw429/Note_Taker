// DEPENDENCIES

const express = require('express');
const app = express();

// Sets initial port
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//route locations
require('./Develop/routes/routesAPI')(app);
require('./Develop/routes/routesHtml')(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
