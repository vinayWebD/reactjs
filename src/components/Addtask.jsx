import React from 'react';
import PropTypes from 'prop-types';

const date = new Date();
let nextId = date.getTime();
function Addtask({
  checkValue,
  inputValue,
  setDialogBoxError,
  setArray,
  setInputValue,
  setErrorMessage,
  setFilterErrorMsg,
  errorMessage,
}) {
  function addValue() {
    if (!checkValue(inputValue)) {
      setDialogBoxError(null);
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
    setDialogBoxError(null);
  }
  return (
    <>
      <div className="addTaskDiv">
        <input
          type="text"
          id="toDoInput"
          value={inputValue}
          placeholder="Enter a Task"
          onChange={(e) => {
            setErrorMessage(null);
            setFilterErrorMsg(null);
            setInputValue(e.target.value);
          }}
        />
        <button id="addBtn" onClick={addValue}>
          Add
        </button>
      </div>
      <p className="todoError">{errorMessage}</p>
    </>
  );
}

Addtask.propTypes = {
  checkValue: PropTypes.func,
  inputValue: PropTypes.func,
  setDialogBoxError: PropTypes.func,
  setArray: PropTypes.func,
  setInputValue: PropTypes.func,
  setErrorMessage: PropTypes.func,
  setFilterErrorMsg: PropTypes.func,
  errorMessage: PropTypes.func,
};

export default Addtask;
