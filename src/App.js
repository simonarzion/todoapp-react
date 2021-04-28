import React, {useRef, useState} from "react";
import styled, {createGlobalStyle} from "styled-components";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const GlobalStyles = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing:border-box;
  font-family:'Courier New', Courier, monospace
}
body {
  display:flex;
  justify-content:center;
  align-items:center;
  min-height:100vh;
}
`;

const Container = styled.div`
  max-width: 800px;
  width: 90vw;
  margin: 40px auto;
  padding: 20px 0;
  min-height: 90vh;
  background: #fbd87f;
  overflow-x: hidden;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
`;

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (input === "") return;
    const newTodo = {
      id: Math.random() * 10000,
      name: input,
      isCompleted: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const handleChange = e => {
    setInput(e.target.value);
  };

  return (
    <Container>
      <GlobalStyles />
      <Title>Todo App</Title>
      <TodoForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        input={input}
      />
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  );
};

export default App;
