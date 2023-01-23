import React, { useState, useEffect } from 'react';
import '../assets/css/todoLists.css';
import Addtask from '../components/addtask.jsx';
import DialogBox from '../components/dialogBox.jsx';
import FilterLists from '../components/filterLists.jsx';
import TaskLists from '../components/taskLists.jsx';

export default function TodoLists() {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState([]);
  const [taskArray, setTaskArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [idValue, setIdValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filterErrorMsg, setFilterErrorMsg] = useState(null);
  const [dialogBoxError, setDialogBoxError] = useState(null);

  useEffect(() => {
    setTaskArray(array);
  }, [array]);
  useEffect(() => {
    setFilterErrorMsg(null);
    setErrorMessage(null);
    setDialogBoxError(null);
  }, [modal]);
  function checkValue(value) {
    let present = false;
    if (value == '') {
      setDialogBoxError('Sorry, This task cannot be added!');
      setErrorMessage('Sorry, This task cannot be added!');
      present = true;
    }
    array.forEach((obj) => {
      if (obj.value == value) {
        if (idValue != null && idValue.id == obj.id) {
          present = true;
          cancelUpdate();
          return;
        } else {
          setDialogBoxError('Sorry, This task already exist!');
          setErrorMessage('Sorry, This task already exist!');
          present = true;
          setInputValue('');
        }
      }
    });
    return present;
  }

  function updateValue() {
    if (!checkValue(idValue.value)) {
      setErrorMessage(null);
      array.forEach((obj) => {
        if (obj.id == idValue.id) {
          obj.value = idValue.value;
        }
      });
      setModal(false);
      setIdValue(null);
    }
    setErrorMessage(null);
  }
  function cancelUpdate() {
    setModal(false);
  }
  return (
    <div className="page-wrapper">
      <div className="page-content-header">
        <h1 className="heading">To-Do Lists</h1>
        <Addtask
          inputValue={inputValue}
          setInputValue={setInputValue}
          checkValue={checkValue}
          setArray={setArray}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setDialogBoxError={setDialogBoxError}
          setFilterErrorMsg={setFilterErrorMsg}
        />
        <FilterLists
          array={array}
          setTaskArray={setTaskArray}
          setErrorMessage={setErrorMessage}
          filterErrorMsg={filterErrorMsg}
          setFilterErrorMsg={setFilterErrorMsg}
        />
      </div>
      <div className="page-content-wrap" id="listBlockDiv">
        <TaskLists
          taskArray={taskArray}
          setIdValue={setIdValue}
          setArray={setArray}
          array={array}
          setModal={setModal}
        />
        <DialogBox
          modal={modal}
          cancelUpdate={cancelUpdate}
          updateValue={updateValue}
          idValue={idValue}
          setIdValue={setIdValue}
          dialogBoxError={dialogBoxError}
        />
      </div>
    </div>
  );
}
