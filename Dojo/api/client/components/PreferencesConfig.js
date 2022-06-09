import axios from 'axios';
import React from 'react';
import Account from './Account';
import { useEffect, useState } from 'react';
import { growl } from '@crystallize/react-growl';
import Tags from './Tags.js'

const PreferencesConfig = () => {

  const email = localStorage.getItem("email");
  const [tags, setTags] = useState([]);
  const fetchUserInterests = () => {
    axios
    .get("/api/user/get-user-interests", {
      params: {email: email}
    })
    .then((res) => {
      setTags(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  useEffect(() => {
    fetchUserInterests();
  }, []);
  console.log(tags);

  const saveOnClick = () => {
    axios
    .post("/api/user/update-user-interests", {
      email: email, interests: tags
    })
    .then((res) => {
      console.log(res.data);
      growl({
        title: 'Dojo',
        message: res.data,
        type: 'success'
      })
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          growl({
            title: 'Dojo',
            message: err.response.data,
            type: 'warning'
        });
        } else {
          growl({
            title: 'Dojo',
            message: err.response.data,
            type: 'error'
        });
        }
      }
    })
  }
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
        <button 
        id="save_btn" 
        style={{width: "150px", fontSize: "15px"}}
        onClick={saveOnClick}> SAVE</button>
        </div>
      </div>
    </div>
  )
}

export default PreferencesConfig;