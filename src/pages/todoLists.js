import { useState, useEffect } from 'react';
import '../assets/css/todoLists.css';

let nextId = 0;
export default function TodoLists() {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [idValue, setIdValue] = useState(null);

  useEffect(() => {
    console.log(array);
  }, [array]);
  function checkValue(value) {
    let present = false;
    if (value == '') {
      alert('This task cannot be added');
      present = true;
    }
    array.forEach((obj) => {
      if (obj.value == value) {
        if (idValue != null && idValue.id == obj.id) {
          present = true;
          cancelUpdate();
          return;
        } else {
          alert('This task already exist');
          present = true;
          setInputValue('');
        }
      }
    });
    return present;
  }
  function addValue() {
    if (!checkValue(inputValue)) {
      setArray((previousState) => {
        return [
          ...previousState,
          {
            id: nextId++,
            value: inputValue,
            done: false,
          },
        ];
      });
      setInputValue('');
    }
  }
  function deleteTask(id) {
    let newArray = array.filter((obj) => {
      if (obj.id != id) {
        return obj;
      }
    });
    setArray(newArray);
  }
  function editTask(obj) {
    setIdValue(obj);
    setModal(true);
  }
  function updateValue() {
    if (!checkValue(idValue.value)) {
      array.forEach((obj) => {
        if (obj.id == idValue.id) {
          obj.value = idValue.value;
        }
      });
      console.log(array);
      setModal(false);
      setIdValue(null);
    }
  }
  function cancelUpdate() {
    setModal(false);
  }
  function strikeOff(e, obj) {
    if (obj.done == false) {
      e.target.style.textDecoration = 'line-through';
      obj.done = true;
    } else {
      e.target.style.textDecoration = 'none';
      obj.done = false;
    }
  }
  function handleDialogBox(e) {
    if (e.target.id == 'dialogBoxWrapper') {
      cancelUpdate();
    }
  }
  const renderModal = () => {
    if (modal == true)
      return (
        <div id="dialogBoxWrapper" onClick={(e) => handleDialogBox(e)}>
          <div id="dialogBox">
            <h2>Edit your task</h2>
            <input
              value={idValue.value}
              placeholder="Enter a Task"
              onChange={(e) =>
                setIdValue((previousState) => {
                  return {
                    ...previousState,
                    value: e.target.value,
                  };
                })
              }
            />
            <button onClick={() => updateValue()}>Confirm</button>
            <button onClick={() => cancelUpdate()}>Cancel</button>
          </div>
        </div>
      );
    else {
      return;
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-content-header">
        <h1 className="heading">To-Do Lists</h1>
        <input
          type="text"
          id="toDoInput"
          value={inputValue}
          placeholder="Enter a Task"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button id="addBtn" onClick={addValue}>
          Add
        </button>
      </div>
      <div className="page-content-wrap" id="listBlockDiv">
        <div>
          {array.map((obj, key) => {
            return (
              <div className="div1" key={key}>
                <p onClick={(e) => strikeOff(e, obj)}>{obj.value}</p>
                <button className="btnStyle" onClick={() => editTask(obj)}>
                  Edit
                </button>
                <button className="btnStyle" onClick={() => deleteTask(obj.id)}>
                  Delete
                </button>
              </div>
            );
          })}
        </div>
        {renderModal()}
      </div>
    </div>
  );
}
