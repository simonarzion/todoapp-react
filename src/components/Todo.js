import React, {useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import {FaCheck, FaEdit, FaTrash} from "react-icons/fa";

const rotate = keyframes`
  from {
  clip-path: circle(10% at 90% 20%);
  }

  to {
  clip-path: circle(130% at 90% 20%);
  }
`;

const StyledTask = styled.div`
  background: #fff;
  padding: 10px 10px 10px 15px;
  margin: 10px auto;
  word-break: break-all;
  display: Flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  border-radius: 5px;
  position: relative;
  animation: ${rotate} 0.5s ease;
  transition: all 0.5s ease;

  @media (max-width: 576px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  &.remove {
    transform: translateX(100%);
    opacity: 0;
  }

  &.completed {
    background-color: #f6fff7;
  }

  &::after {
    content: "";
    width: 5px;
    height: 0;
    background-color: #b3ccb7;
    position: absolute;
    transition: height 1s ease;
    top: 0;
    left: 0;
  }
  &.completed::after {
    content: "";
    width: 5px;
    height: 100%;
    background-color: #b3ccb7;
    transition: height 1s ease;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const StyledEditInput = styled.input`
  flex: 1;
  padding: 20px 10px;
  font-size: 1.17em;
`;

const StyledName = styled.h3`
  flex: 1;
  text-transform: capitalize;
`;

const StyledButtonContainer = styled.div`
  flex: 1;
  text-align: right;
`;

const StyledButton = styled.button`
  padding: 10px;
  background: ${props => props.bg};
  color: #fff;
  border: none;
  margin: 10px 10px 10px 0;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.212);
  text-transform: uppercase;
  border-radius: 5px;
  transition: background 0.3s ease;
  cursor: pointer;

  & svg {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: ${props =>
      props.bg === "#E76D83"
        ? "#aa4d5e"
        : props.bg === "#91AEC1"
        ? "#6c8799"
        : "#6b9772"};
  }
`;

const StyledEditForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  flex-wrap: wrap;
  width: 90%;
  border-radius: 5px;
`;

const StyledError = styled.div`
  color: #860000;
  padding-left: 5%;
`;

const Todo = ({todo, todos, setTodos}) => {
  const [task, setTask] = useState({
    id: todo.id,
    name: todo.name,
    isCompleted: todo.isCompleted,
  });
  const [edit, setEdit] = useState(false);
  const [inputUpdate, setInputUpdate] = useState("");
  const [err, setErr] = useState(false);
  const taskRef = useRef(null);

  const handleSave = e => {
    e.preventDefault();
    if (inputUpdate === "") {
      setErr(true);
    } else {
      setTask({...task, name: inputUpdate});
      setEdit(!edit);
      setInputUpdate("");
      setErr(false);
    }
  };

  const handleCancel = e => {
    setTask({...task, name: task.name});
    setEdit(!edit);
    setInputUpdate("");
  };

  const changeUpdate = e => {
    setInputUpdate(e.target.value);
  };

  const handleComplete = () => {
    setTask({...task, isCompleted: !task.isCompleted});
    taskRef.current.classList.toggle("completed");
  };

  const deleteTodo = id => {
    const newTodos = todos.filter(t => t.id !== id);
    setTimeout(() => {
      setTodos(newTodos);
    }, 500);
    taskRef.current.classList.toggle("remove");
  };

  return (
    <div>
      {edit ? (
        <div>
          <StyledEditForm>
            <StyledEditInput
              type='text'
              onChange={changeUpdate}
              value={inputUpdate}
              required
            />
            <StyledButtonContainer>
              <StyledButton bg='#91C499' onClick={handleSave}>
                save
              </StyledButton>
              <StyledButton bg='#E76D83' onClick={handleCancel}>
                cancel
              </StyledButton>
            </StyledButtonContainer>
          </StyledEditForm>
          {err && <StyledError>Please complete the field.</StyledError>}
        </div>
      ) : (
        <StyledTask ref={taskRef}>
          <StyledName>{task.name}</StyledName>
          <StyledButtonContainer>
            <StyledButton bg='#E76D83' onClick={() => deleteTodo(task.id)}>
              <FaTrash />
            </StyledButton>
            <StyledButton bg='#91AEC1' onClick={() => setEdit(!edit)}>
              <FaEdit />
            </StyledButton>
            <StyledButton bg='#91C499' onClick={handleComplete}>
              <FaCheck />
            </StyledButton>
          </StyledButtonContainer>
        </StyledTask>
      )}
    </div>
  );
};

export default Todo;
