import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [listTodo, setListTodo] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setListTodo(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    });

    setListTodo(listTodo.filter((todo) => todo.todo_id !== id));
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <h1 className="text-center mt-5 mb-3">ListTodo</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {listTodo.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td className="d-flex">
                <EditTodo todo={todo} />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
