import React from 'react';

export default function taskLists(props) {
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
  function strikeOff(e, obj) {
    if (obj.done == false) {
      e.target.className = 'completed';
      obj.done = true;
    } else {
      e.target.className = 'notCompleted';
      obj.done = false;
    }
  }

  return (
    <div>
      {props.taskArray.map((obj, key) => {
        return (
          <div className="div1" key={key}>
            <p
              className={obj.done ? 'completed' : 'notCompleted'}
              onClick={(e) => strikeOff(e, obj)}
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
