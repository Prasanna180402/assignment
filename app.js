const express = require('express');
const app = express();
const contactRoutes = require('./routes/contacts');

app.use(express.json());
app.use('/contacts', contactRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});