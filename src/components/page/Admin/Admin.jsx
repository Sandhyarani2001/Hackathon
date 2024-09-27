import React,  { useState } from "react";
import './Admin.css'
import { Button } from "@mui/material";
import upload from '../../../assets/icons/upload.png'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useNavigate } from "react-router-dom";


function Admin() {

  // Updated
  const [name,setName] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState("easy");
  const[image,setImage] = useState('');


  const navigate = useNavigate();


  const handleSubmit = (e) =>{
    e.preventDefault();

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be later than the end date.");
      return;
    }

    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const challenge = {
      name,
      startDate,
      endDate,
      description,
      level,
      image,
      id: Date.now(),
    };

    challenges.push(challenge);
    localStorage.setItem('challenges', JSON.stringify(challenges));
    alert("challenge created succesfully!");

    setName('');
    setStartDate('');
    setEndDate('');
    setDescription('');
    setLevel('easy');
    setImage('');
    navigate('/');

  }

  const handleImageUpload = (event) =>{

    const file = event.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () =>{
      setImage(reader.result);
    };

    reader.readAsDataURL(file);

  };

  

  return (
    <>
      <div className="admin-head p-3 mb-2 bg-light">
        <p>Create Challenge</p>
      </div>

      <form className="challenge-form flex flex-col mt-5" onSubmit={handleSubmit}>
        <div className="d-flex flex-column w-25 mb-4">
          <label htmlFor="" className="fw-semibold">Challenge Name</label>
          <input
           type="text"
           id="name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           className="mt-3 p-1"
           placeholder="challenge name"
           required
            />
        </div>

        <div className="d-flex flex-column w-25 mb-4 gap-3">
        <label className="fw-semibold">Start Date</label>
          <div className="date-input-wrapper">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-1 date-input"
              required
            />
            <div className="custom-date-display">
              {startDate ? startDate : "Add Start Date"}
              <CalendarMonthOutlinedIcon className="calendar-icon" />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column w-25 mb-4 gap-3">
        <label className="fw-semibold">End Date</label>
          <div className="date-input-wrapper">
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="p-1 date-input"
              required
            />
            <div className="custom-date-display">
              {endDate ? endDate : "Add End Date"}
              <CalendarMonthOutlinedIcon className="calendar-icon" />
            </div>
          </div>
        </div>


        <div className="d-flex flex-column w-50 mb-4 gap-3">
          <label htmlFor="description" className="fw-semibold">Description</label>
          <textarea
          id="description"
          className=" p-1"
          rows="10"
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          required
           />
        </div>

        <div className="d-flex flex-column w-25 mb-4 gap-3">
          <label htmlFor="" className="fw-semibold">Image</label>
          <label htmlFor="upload" className=" file-input">
            <div>Upload</div><div><img src={upload} alt="upload" /></div>
          </label>
          <input
          type="file" 
          id="upload" 
          className=" p-1  uplaod-img" 
          onChange={handleImageUpload}
          required
          />
        </div>

        <div className="d-flex flex-column w-25 mb-4 gap-3 ">
          <label htmlFor="levelType" className="fw-semibold">Level Type</label>
          <select 
          id="levelType" 
          className="p-1"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <Button variant="contained" color="success" type="submit" className="button" >
          Create Challenge
        </Button>
      </form>     


    </>
  )
}

export default Admin;






