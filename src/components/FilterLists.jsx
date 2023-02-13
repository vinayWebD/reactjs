import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function FilterLists(props) {
  const [searchValue, setSearchValue] = useState({
    optionSelected: 'all',
    value: '',
  });
  function searchTask() {
    let tempArr2;
    if (searchValue.optionSelected == 'all') {
      tempArr2 = props.array;
    } else if (searchValue.optionSelected == 'completed') {
      tempArr2 = props.array.filter((obj) => {
        if (obj.done == true) {
          return obj;
        }
      });
    } else {
      tempArr2 = props.array.filter((obj) => {
        if (obj.done == false) {
          return obj;
        }
      });
    }
    let tempArr = tempArr2.filter((obj) => {
      if (obj.value.includes(searchValue.value)) {
        return obj;
      }
    });
    if (tempArr.length == 0) {
      props.setFilterErrorMsg('Sorry, There is no such task!!');
      setSearchValue({
        optionSelected: searchValue.optionSelected,
        value: '',
      });
      props.setTaskArray(props.array);
    } else {
      props.setTaskArray(tempArr);
    }
  }
  return (
    <>
      <div id="filterDiv">
        <select
          onChange={(e) => {
            props.setErrorMessage(null);
            props.setFilterErrorMsg(null);
            setSearchValue((previousState) => {
              return {
                optionSelected: e.target.value,
                value: previousState.value,
              };
            });
          }}
        >
          <option value={'all'}>All</option>
          <option value={'completed'}>Completed</option>
          <option value={'pending'}>Pending</option>
        </select>
        <input
          type="search"
          placeholder="Search task"
          value={searchValue.value}
          onChange={(e) => {
            props.setErrorMessage(null);
            props.setFilterErrorMsg(null);
            setSearchValue((previousState) => {
              return {
                optionSelected: previousState.optionSelected,
                value: e.target.value,
              };
            });
          }}
        />
        <button onClick={() => searchTask()}>Filter</button>
      </div>
      <p className="todoError">{props.filterErrorMsg}</p>
    </>
  );
}

FilterLists.propTypes = {
  array: PropTypes.func,
  setTaskArray: PropTypes.func,
  filterErrorMsg: PropTypes.func,
  setFilterErrorMsg: PropTypes.func,
  setErrorMessage: PropTypes.func,
};
