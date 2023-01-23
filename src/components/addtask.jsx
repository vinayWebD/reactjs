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
      <p className="error">{props.errorMessage}</p>
      <button id="addBtn" onClick={addValue}>
        Add
      </button>
    </>
  );
}
