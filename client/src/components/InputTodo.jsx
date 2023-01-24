import React, { Fragment } from "react";
import { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const postData = async () => {
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
      //   const data = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    postData();
    setDescription("");
  };

  return (
    <Fragment>
      <h1 className="text-center mt-4 mb-3">Input Todo</h1>
      <form onSubmit={onSubmitForm} className="d-flex">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
