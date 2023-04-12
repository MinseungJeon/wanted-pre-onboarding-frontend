import { useEffect, useState } from "react";
import instance from "../apis";

const token = localStorage.getItem("token");

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editingValue, setEditingValue] = useState("");
  const [editingCheck, setEditingCheck] = useState("");

  const handleAddTodo = () => {
    // 입력된 TODO를 TODO 리스트에 추가
    const newTodo = document.querySelector(
      '[data-testid="new-todo-input"]'
    ).value;

    // 입력된 TODO를 초기화
    document.querySelector('[data-testid="new-todo-input"]').value = "";

    console.log(token);

    instance
      .post(
        `todos`,
        { todo: newTodo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTodos = () => {
    instance
      .get(`todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateTodo = (index) => {
    instance
      .put(
        `todos/${index}`,
        {
          todo: editingValue,
          isCompleted: editingCheck,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteTodo = (index) => {
    instance
      .delete(`todos/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        getTodos();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleEditTodo = (index) => {
    const _todo = todos.filter((todo) => todo.id === index);

    setEditingIndex(index);
    setEditingValue(_todo[0].todo);
    setEditingCheck(_todo[0].isCompleted);
  };

  const handleSaveTodo = (index, value) => {
    setTodos(todos.map((todo) => (todo.id === index ? value : todo, todo)));
    setEditingIndex(-1);
    setEditingValue("");

    updateTodo(index);
  };

  const handleCancelTodo = () => {
    setEditingIndex(-1);
    setEditingValue("");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            {editingIndex === todo.id ? (
              <>
                <input
                  type="checkbox"
                  value={editingCheck}
                  onChange={(event) => setEditingCheck(event.target.checked)}
                />

                <input
                  value={editingValue}
                  onChange={(event) => setEditingValue(event.target.value)}
                />
              </>
            ) : (
              <>
                <input type="checkbox" defaultChecked={todo.isCompleted} />

                <span onClick={() => handleEditTodo(todo.id)}>{todo.todo}</span>
              </>
            )}
          </label>
          {editingIndex !== todo.id ? (
            <button
              data-testid="modify-button"
              onClick={() => handleEditTodo(todo.id)}
            >
              수정
            </button>
          ) : (
            <button
              data-testid="submit-button"
              onClick={() => handleSaveTodo(todo.id, editingValue)}
            >
              제출
            </button>
          )}
          {editingIndex !== todo.id ? (
            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              삭제
            </button>
          ) : (
            <button data-testid="cancel-button" onClick={handleCancelTodo}>
              취소
            </button>
          )}
        </li>
      ))}

      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button" onClick={handleAddTodo}>
        추가
      </button>
    </>
  );
};

export default Todo;
