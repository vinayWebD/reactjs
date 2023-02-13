import React from 'react';
import PropTypes from 'prop-types';

export default function DialogBox(props) {
  function handleDialogBox(e) {
    if (e.target.id == 'dialogBoxWrapper') {
      props.cancelUpdate();
    }
  }
  return (
    <>
      {props.modal ? (
        <div id="dialogBoxWrapper" onClick={(e) => handleDialogBox(e)}>
          <div id="dialogBox">
            <h2>Edit your task</h2>
            <input
              value={props.idValue.value}
              placeholder="Enter a Task"
              onChange={(e) =>
                props.setIdValue((previousState) => {
                  return {
                    ...previousState,
                    value: e.target.value,
                  };
                })
              }
            />
            <p className="error">{props.dialogBoxError}</p>
            <button onClick={() => props.updateValue()}>Confirm</button>
            <button onClick={() => props.cancelUpdate()}>Cancel</button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}

DialogBox.propTypes = {
  cancelUpdate: PropTypes.func,
  modal: PropTypes.func,
  setIdValue: PropTypes.func,
  idValue: PropTypes.func,
  dialogBoxError: PropTypes.func,
  updateValue: PropTypes.func,
};
