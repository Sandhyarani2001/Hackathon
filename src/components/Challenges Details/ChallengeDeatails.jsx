import React from 'react'
import './ChallengesDetails.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { useLocation, useNavigate } from 'react-router-dom';

function ChallengesDetails() {
  const navigate = useNavigate();

  const { state } = useLocation(); 
  const { challenge } = state || {};

  const handleDelete = () => {
    const challenges = JSON.parse(localStorage.getItem('challenges')) || [];
    const updatedChallenges = challenges.filter((c) => c.id !== challenge.id);
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    alert('Challenge deleted successfully!');
    navigate('/');
  };

  if (!challenge) {
    return <div>Challenge not found.</div>; 
  }
  return (
    <div className='details-container'>
      <div className="banner">
        <div className='detail-banner'>
          <div className='show-time'>
            <AccessTimeIcon />
            <div className='time-para'>
              Starts on {new Date(challenge.startDate).toLocaleString()} (India Standard Time)
            </div>
          </div>

          <div className='headline'>
            <h1 className='card-heading'>{challenge.name}</h1>
            <p>Identify the class to which each butterfly belongs to</p>
          </div>

          <div className='level'>
            <SignalCellularAltIcon className='time-icon' />
            <span>{challenge.level}</span>
          </div>
        </div>
      </div>

      <div className='over-view'>
        <div className='word'>OverView</div>
        <div className='btns d-flex gap-4 me-5'>
          <button className='edit-btn' onClick={() => navigate('/editdetails', { state: { challenge } })}>Edit</button>
          <button className='dlt-btn' onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <div className="description">
        <p>{challenge.description}</p>
      </div>
    </div>
  )
}

export default ChallengesDetails
