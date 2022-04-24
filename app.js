const connection = require("./db-config");
const express = require("express");
const app = express();

const port = process.env.PORT ?? 3000;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());

app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM quest_exp_3", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});

app.post("/api/users", (req, res) => {
  const { firstname , lastname, email } = req.body;
  connection.query(
    "INSERT INTO users (firstname , lastname, email) VALUES (?, ?, ? )",
    [firstname , lastname, email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving user");
      } else {
        res.status(200).send("user saved");
      }
    }
  );
});

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
