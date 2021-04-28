import React from "react";
import Todo from "./Todo";

const TodoList = ({todos, setTodos}) => {
  return (
    <div>
      {todos.map(todo => {
        return (
          <Todo key={todo.id} todos={todos} todo={todo} setTodos={setTodos} />
        );
      })}
    </div>
  );
};

export default TodoList;
