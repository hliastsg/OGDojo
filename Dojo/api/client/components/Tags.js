import React from 'react';
import {useState} from 'react';

const Tags = ({tags, setTags}) => {

  const handleKeyDown =(e) => {
    if(e.key !== 'Enter') return
    const value = e.target.value
    if(!value.trim()) return
    setTags([...tags, value])
    e.target.value = ''
  } 
  const removeTag =(index) => {
    setTags(tags.filter((el, i) => i !== index))
}

  return (
    <div className="tags-input-container">
    { tags.map((tag, index) => (
        <div className="tag-item" key={index}>
            <span className="text">{tag}</span>
            <span className="close fa fa-times" onClick={() => removeTag(index)}></span>
        </div>
    )) }
    <input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="Type something" />
  </div>
  )}

export default Tags;