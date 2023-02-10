import React, { useState, useEffect } from 'react';
import '../assets/css/todoLists.scss';
import { useDispatch, useSelector } from 'react-redux';
import Addtask from '../components/Addtask.jsx';
import DialogBox from '../components/DialogBox.jsx';
import FilterLists from '../components/FilterLists.jsx';
import TaskLists from '../components/TaskLists.jsx';
import { addTodolistData, userInfo, usersList } from '../slice';

export default function TodoLists() {
  const userState = useSelector(userInfo);
  let usersListsArray = useSelector(usersList);

  let firstArray;
  function updateArray() {
    let preArray = usersListsArray.filter((obj) => {
      if (obj.userName == userState.userName) {
        return true;
      }
      return false;
    });
    return preArray[0].todolistData;
  }
  updateArray();
  firstArray = updateArray();

  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState(firstArray);
  const [taskArray, setTaskArray] = useState([]);
  const [modal, setModal] = useState(false);
  const [idValue, setIdValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [filterErrorMsg, setFilterErrorMsg] = useState(null);
  const [dialogBoxError, setDialogBoxError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    setTaskArray(array);
    dispatch(addTodolistData(array));
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
      let stringifiedArray = JSON.stringify(array);
      let parsedArray = JSON.parse(stringifiedArray);
      let newarr = parsedArray.map((obj) => {
        if (obj.id == idValue.id) {
          obj.value = idValue.value;
        }
        return obj;
      });
      setArray(newarr);
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
      <h1 className="heading">Todo Lists</h1>
      <div className="page-content-header">
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
      </div>
      <div className="page-content-wrap" id="listBlockDiv">
        <FilterLists
          array={array}
          setTaskArray={setTaskArray}
          setErrorMessage={setErrorMessage}
          filterErrorMsg={filterErrorMsg}
          setFilterErrorMsg={setFilterErrorMsg}
        />
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
