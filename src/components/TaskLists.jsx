import React from 'react';
import PropTypes from 'prop-types';

export default function TaskLists(props) {
  function editTask(obj) {
    props.setIdValue(obj);
    props.setModal(true);
  }
  function deleteTask(id) {
    let newArray = props.array.filter((obj) => {
      if (obj.id != id) {
        return obj;
      }
    });
    props.setArray(newArray);
  }
  function strikeOff(e, strikeObjectId) {
    let stringifiedArray = JSON.stringify(props.taskArray);
    let parsedArray = JSON.parse(stringifiedArray);
    let newArr = parsedArray.map((obj) => {
      if (strikeObjectId == obj.id) {
        if (obj.done == false) {
          e.target.className = 'completed';
          obj.done = true;
        } else {
          e.target.className = 'notCompleted';
          obj.done = false;
        }
      }
      return obj;
    });
    props.setArray(newArr);
  }

  return (
    <div>
      {props.taskArray.map((obj, key) => {
        return (
          <div className="div1" key={key}>
            <p
              className={obj.done ? 'completed' : 'notCompleted'}
              onClick={(e) => strikeOff(e, obj.id)}
            >
              {obj.value}
            </p>
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
  );
}

TaskLists.propTypes = {
  setIdValue: PropTypes.func,
  setModal: PropTypes.func,
  array: PropTypes.func,
  taskArray: PropTypes.func,
  setArray: PropTypes.func,
};
