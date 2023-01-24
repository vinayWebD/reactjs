import React from 'react';

let nextId = 0;
export default function addtask(props) {
  function addValue() {
    if (!props.checkValue(props.inputValue)) {
      props.setDialogBoxError(null);
      props.setArray((previousState) => {
        return [
          ...previousState,
          {
            id: nextId++,
            value: props.inputValue,
            done: false,
          },
        ];
      });
      props.setInputValue('');
    }
    props.setDialogBoxError(null);
  }
  return (
    <>
      <div className="addTaskDiv">
        <input
          type="text"
          id="toDoInput"
          value={props.inputValue}
          placeholder="Enter a Task"
          onChange={(e) => {
            props.setErrorMessage(null);
            props.setFilterErrorMsg(null);
            props.setInputValue(e.target.value);
          }}
        />
        <button id="addBtn" onClick={addValue}>
          Add
        </button>
      </div>
      <p className="error">{props.errorMessage}</p>
    </>
  );
}
