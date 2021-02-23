// DEPENDENCIES
const express = require('express');
const app = express();
const htmlRoute = require('./routes/routesHtml');

// Sets initial port
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(htmlRoute);


//route locations
require('./routes/routesAPI')(app);
// require('./Develop/routes/routesHtml')(app);

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});
