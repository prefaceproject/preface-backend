const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/test", (req, res) => {
  res.send({ express: "Test call to backend" });
});

app.get("/example_saga_request", (req, res) => {
  res.send({ message: "Saga success" });
});
