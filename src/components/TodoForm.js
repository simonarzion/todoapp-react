import React from "react";
import styled from "styled-components";

const StyledTodoForm = styled.form`
  display: Flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const StyledInput = styled.input`
  font-size: 1.2rem;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #e76d83;
  @media (max-width: 576px) {
    width: 90%;
  }
`;

const StyledBtn = styled.button`
  font-size: 1.2rem;
  padding: 10px;
  border: none;
  background: #e76d83;
  color: #fff;
  @media (max-width: 576px) {
    width: 90%;
  }
`;

const TodoForm = ({handleSubmit, handleChange, input}) => {
  return (
    <StyledTodoForm onSubmit={handleSubmit}>
      <StyledInput
        type='text'
        placeholder='Add a task'
        value={input}
        onChange={handleChange}
      />
      <StyledBtn>Add</StyledBtn>
    </StyledTodoForm>
  );
};

export default TodoForm;
