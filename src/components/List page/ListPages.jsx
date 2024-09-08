import React, { useEffect, useState } from 'react'
import './ListPages.css'
import { useNavigate } from 'react-router-dom'
import TaskAltRoundedIcon from '@mui/icons-material/TaskAltRounded';
import { Button } from '@mui/material';


function ListPages({ searchTerm, filters = { status: null, level: null } }) {
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState([]);
    const [time, setTime] = useState(new Date());
    const [filteredChallenges, setFilteredChallenges] = useState([]);

    useEffect(() => {
        const loadedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
        setChallenges(loadedChallenges);
        setFilteredChallenges(loadedChallenges);

        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000 * 60);

        return () => clearInterval(timer);

    }, [])

    const formatWithZero = (num) => String(num).padStart(2, '0');

    const formatDateWithTime = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = String(date.getFullYear()).slice(-2);
        const hours = date.getHours() % 12 || 12;
        const minutes = formatWithZero(date.getMinutes());
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

        const daySuffix = (day) => {
            if (day >= 11 && day <= 13) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${day}${daySuffix(day)} ${month}'${year} ${formatWithZero(hours)}:${minutes} ${ampm}`;
    };



    const getItemRemaining = (endtime) => {
        const total = Date.parse(endtime) - Date.parse(new Date(time));
        const seconds = formatWithZero(Math.floor((total / 1000) % 60));
        const minutes = formatWithZero(Math.floor((total / 1000 / 60) % 60));
        const hours = formatWithZero(Math.floor((total / (1000 * 60 * 60)) % 24));
        const days = formatWithZero(Math.floor((total / (1000 * 60 * 60 * 24))));

        return {
            total, days, hours, minutes, seconds
        };
    };


    const determineStatus = (challenge) => {
        let timeLeft = getItemRemaining(challenge.startDate);
        if (timeLeft.total > 0) {
            return 'upcoming';
        } else {
            timeLeft = getItemRemaining(challenge.endDate);
            if (timeLeft.total > 0) {
                return 'active';
            } else {
                return 'past';
            }
        }
    };

    useEffect(() => {
        let filtered = challenges;

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(challenge =>
                challenge.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (filters.status && filters.status !== 'all') {
            filtered = filtered.filter(challenge => determineStatus(challenge) === filters.status);
        }

        // Apply level filter
        if (filters.level) {
            filtered = filtered.filter(challenge => challenge.level === filters.level);
        }

        filtered = filtered.sort((a, b) => {
            const statusA = determineStatus(a);
            const statusB = determineStatus(b);

            const statusOrder = { 'upcoming': 1, 'active': 2, 'past': 3 };

            return statusOrder[statusA] - statusOrder[statusB];
        });

        setFilteredChallenges(filtered);
    }, [searchTerm, filters, challenges, time]);


    const renderCard = (challenge) => {
        const { name, startDate, endDate, id } = challenge;
        const status = determineStatus(challenge);
        let timeLeft = getItemRemaining(status === 'upcoming' ? startDate : endDate);

        if (status === 'past') {
            timeLeft = { days: formatDateWithTime(endDate) };
        }



        const handleDetailsClick = (challenge) => {
            navigate('/details', { state: { challenge } });
        };

        return (
            <div key={id} className="card">
                <img src={challenge.image} alt="Event" />
                <div className="test-part">
                    <div className={`status ${status}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</div>
                    <h3>{name}</h3>
                    <div className='bottom'>
                        <p className='update-state'>{status === 'past' ? 'Ended' : (status === 'upcoming' ? 'Starts in' : 'Ends in')}</p>
                        <div className="time-sec">
                            <div className="time"
                                style={{
                                    width: status === 'past' ? '246px' : '142px',
                                    justifyContent: status === 'past' ? 'center' : 'space-between',
                                }}
                            >
                                {status === 'past' ?
                                    <span>{timeLeft.days}</span> :
                                    <>
                                        <span>{timeLeft.days}</span><span>:</span>
                                        <span>{timeLeft.hours}</span><span>:</span>
                                        <span>{timeLeft.minutes}</span>
                                    </>
                                }
                            </div>
                            {status !== 'past' && (
                                <div className="hr">
                                    <p>Days</p>
                                    <p>Hours</p>
                                    <p>Mins</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <button onClick={() => handleDetailsClick(challenge)} className="participate">
                        <TaskAltRoundedIcon className='icon' />
                        Participate Now</button>
                </div>
            </div>
        );

    }

    const handleGoToHomePage = () => {
        navigate('/');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <div className='List-ces'>
            <div class="container">
                {filteredChallenges.length > 0 ? filteredChallenges.map(renderCard) : <div className='no-challenge'>
                    <p>No challenges created</p>
                    <Button variant="contained" onClick={handleGoToHomePage}>
                    Go to the Create Section
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default ListPages