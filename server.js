// DEPENDENCIES
const express = require('express');
const htmlRoute = require('./routes/routesHtml');

// Sets initial port
const app = express();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//middleware
app.use(express.static("public"));

//route locations
app.use(htmlRoute);
require('./routes/routesAPI')(app);


app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
