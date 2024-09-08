import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import './EditDetails.css'
import '../page/Admin/Admin.css'
import glry from '../../assets/icons/glry.png'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import EastIcon from '@mui/icons-material/East';
import { useLocation, useNavigate } from 'react-router-dom';


function EditDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { challenge } = state || {};

  const [name, setName] = useState(challenge?.name || '');
  const [startDate, setStartDate] = useState(challenge?.startDate || '');
  const [endDate, setEndDate] = useState(challenge?.endDate || '');
  const [description, setDescription] = useState(challenge?.description || '');
  const [level, setLevel] = useState(challenge?.level || 'easy');
  const [image, setImage] = useState(challenge?.image || '');

  useEffect(() => {
    if (challenge) {
      setName(challenge.name);
      setStartDate(challenge.startDate);
      setEndDate(challenge.endDate);
      setDescription(challenge.description);
      setLevel(challenge.level);
      setImage(challenge.image);
    }
  }, [challenge]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];

    const updatedChallenges = challenges.map((c) =>
      c.id === challenge.id
        ? { ...c, name, startDate, endDate, description, level, image }
        : c
    );


    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    alert('Challenge updated successfully!');
    navigate('/'); 
  };


  return (
    <div>
      <>
        <div className="admin-head p-3 mb-2 bg-light">
          <p>Challenge Details</p>
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
            placeholder="name" 
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
            value={description}
              onChange={(e) => setDescription(e.target.value)}
            className=" p-1" 
            rows="10" 
              required
            />
          </div>

          <div className="d-flex flex-column w-25 mb-4 gap-3">
            <label htmlFor="" className="fw-semibold">Image</label>
            <label htmlFor="upload" className=" edit-inputfile">
              <img src={image} alt="" className='upload-img' />
              <div className='d-flex gap-2'>
                <div><img src={glry} alt="upload" /></div>
                <div>Upload</div>
                <EastIcon />
              </div>
            </label>
            <input 
            type="file" 
            id="upload" 
            className=" p-1  uplaod-img" 
            onChange={handleImageUpload}
            />
          </div>

          <div className="d-flex flex-column w-25 mb-4 gap-3 ">
            <label htmlFor="levelType" className="fw-semibold">Level Type</label>
            <select id="levelType" 
            className="p-1"
            value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <Button variant="contained" type='submit' color="success" className="button">
            Save Changes
          </Button>
        </form>




      </>
    </div>
  )
}

export default EditDetails
