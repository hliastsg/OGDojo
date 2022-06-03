import React, { useEffect, useState } from 'react';
import "../css/main.css";
import "../css/home.css";
import "../css/events.css";
import "../css/details.css";
import "../css/tags.css";
import Header from './Header';
import Navbar from './Navbar';
import About from './About';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import NotAuth from './NotAuth';
import NotFound from './NotFound';
import Account from './Account';
import Auth from './Auth';
import AccConfig from './AccConfig';
import NewEvent from './NewEvent';
import EventDetails from './EventDetails.js';
import EditEvent from './EditEvent.js';
import Friends from './Friends.js';
import FriendsEventDetails from './FriendsEventsD.js';
import SavedEvents from './SavedEvents.js';
import Attending from './Attending.js';
import Tags from './Tags.js';
import store, {Persistor} from '../store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GrowlScene } from '@crystallize/react-growl';

const App = () => {
  // State gets updated on change of input
  const [navLink, setNavLink] = useState(false);

  return (
    <Provider store = {store}> 
      <PersistGate loading = {null} persistor = {Persistor}>
      <GrowlScene style={{zIndex:99999999}}/>
        <Router>
          <title>Dojo</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
          <Navbar nav={navLink} setNav={setNavLink}/>
          <Routes>
            <Route path ="/*" element = {<NotFound/>} />
            <Route exact path="/" element={<Header />} />
            <Route path="/about" element={< About nav={navLink} />} />
            <Route path="/register" element={< Register nav={navLink} />} />
            <Route path="/login" element={< Login nav={navLink} />} />
            <Route path="/401" element={<NotAuth />} />
            <Route path="/dashboard" element={<Auth><Dashboard/></Auth>} />
            <Route path="/account" element={<Auth><Account/></Auth>} />
            <Route path="/account/usr-config" element={<Auth><AccConfig/></Auth>}/>
            <Route path="/create-event" element={<Auth><NewEvent/></Auth>}/>
            <Route path="/event-details/:id" element={<Auth><EventDetails/></Auth>}/>
            <Route path="/edit-event" element={<Auth><EditEvent/></Auth>}/>
            <Route path="/friends-events/:id" element={<Auth><Friends/></Auth>}/>
            <Route path="/friends-events-details/:id" element={<Auth><FriendsEventDetails/></Auth>}/>
            <Route path="/myevents" element={<Auth><SavedEvents/></Auth>}/>
            <Route path="/attending-event/:id" element={<Auth><Attending/></Auth>}/>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}



export default App;