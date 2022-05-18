import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { growl } from "@crystallize/react-growl";

const NewEvent = () => {
  const initialValues = {
    name: "",
    startDate: "",
    startTime: "",
    description: "",
    location: "",
  };
  const [eventDetails, setEventDetails] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
    setIsSubmit(false);
    setErrors(validate(eventDetails));
  };

  const discardOnClick = (e) => {
    setEventDetails(initialValues);
    setIsSubmit(false);
    setErrors({});
  };





  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {

      const data = new FormData();
      data.append('author', localStorage.getItem("email"));
      data.append('name', eventDetails.name);
      data.append('startDate', eventDetails.startDate);
      data.append('startTime', eventDetails.startTime);
      data.append('description', eventDetails.description);
      data.append('location', eventDetails.location);
      data.append('photo', image);
     
      axios
        .post("api/event/create-event", data)
        .then((response) => {
          console.log(response.data);
          growl({
            title: "Dojo",
            message: "Event created succesfully! ",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status === 409) {
            growl({
              title: "Dojo",
              message: error.response.data,
              type: "error",
            });
          }
        });
    } else if (Object.keys(errors).length != 0 && isSubmit) {
      growl({
        title: "Dojo",
        message: "Complete all the fields to create an event ",
        type: "warning",
      });
    }
  }, [errors]);

  return (
    <div style={{ display: "inline-flex" }}>
      <div className="overview" style={{top:"30px"}}>
        <h1>Overview</h1>
        <table>
          <tbody>
            <tr>
              <td>Event Name:</td>
              <td>{eventDetails.name}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Start Date:</td>
              <td>{eventDetails.startDate}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Start Time:</td>
              <td>{eventDetails.startTime}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Location:</td>
              <td>{eventDetails.location}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody id="description">
            <tr>
              <td>Description:</td>
              <td>{eventDetails.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span>
        <i className="fas fa-calendar" />
      </span>
    </div>
  );
};

export default NewEvent;
