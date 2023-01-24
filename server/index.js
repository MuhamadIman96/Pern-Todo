const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todo");
    res.json(alltodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    // ambil data dari query
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
    res.json("Berhasil Edit Todo");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

  res.json("Menghapus Todo Berhasil");
});

// Sambungan ke localhost
app.listen(5000, () => {
  console.log("LISTENING ON PORT:5000");
});
