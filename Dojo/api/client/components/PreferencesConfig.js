import axios from 'axios';
import React from 'react';
import Account from './Account';
import { useEffect, useState } from 'react';
import { growl } from '@crystallize/react-growl';
import Tags from './Tags.js'

const PreferencesConfig = () => {
  const [tags, setTags] = useState([
    "Music",
    "Concert",
    "Theatre",
    "Party",
    "Arts",
    "Performance",
    "Photography",
    "Conference",
  ]);
  const email = localStorage.getItem("email");
  useEffect(() => {
    
  }, []);
  console.log(tags);
  return (
    <div>
      <Account/>
      <div className="config">
        <h1>Preferences Configuration</h1>
        <p>In this section, you can edit prefered event categories and interests.
        </p>
        <div className="prefered-tags-config">
        <h1>Select or type some event categories that you're interested in</h1>
        <Tags tags={tags} setTags={setTags} />
        <button id="save_btn" style={{width: "150px", fontSize: "15px"}}> SAVE</button>
        </div>
      </div>
    </div>
  )
}

export default PreferencesConfig;