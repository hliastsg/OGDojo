import React from 'react';
import {useState} from 'react'

const Explore = () => {

  const [isClicked, setIsClicked] = useState(false);

  const isDropdownClicked = () => {
    setIsClicked(!isClicked)
  }

  const renderCssClass = () => {
    let classes = "categories";

    if(isClicked) {
      classes += " active-drop"
    }
    return classes;
  }
  console.log(isClicked);
  return (
    <div className="d-header">
      <div onClick={isDropdownClicked} className="categories-header">
      <h1>Choose a Category</h1>
      {isClicked ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>}
      </div>
        <div className={renderCssClass()}>
          <ul>
            <li>aq</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
            <li>a</li>
          </ul>
        </div>
      </div>
  )
}

export default Explore;