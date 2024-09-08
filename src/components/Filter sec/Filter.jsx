import React, { useState, useEffect, useRef } from 'react'
import './Filter.css'
import SearchIcon from '@mui/icons-material/Search';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';



function Filter({ onSearch,  onFilter }) {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedLevel, setSelectedLevel] = useState(null);
    const dropdownRef = useRef(null);

    const toggleFilter = () => {
        setIsOpen(!isOpen);
    };


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value); 
    };

    const handleStatusChange = (e) => {
        const value = e.target.value;
        setSelectedStatus(value === selectedStatus ? null : value);
        onFilter(value === selectedStatus ? null : value, selectedLevel);
    };

    const handleLevelChange = (e) => {
        const value = e.target.value;
        setSelectedLevel(value === selectedLevel ? null : value);
        onFilter(selectedStatus, value === selectedLevel ? null : value);
    };

    const handleRemoveFilter = (filterType) => {
        if (filterType === 'status') {
            setSelectedStatus(null);
            onFilter(null, selectedLevel);
        } else {
            setSelectedLevel(null);
            onFilter(selectedStatus, null);
        }
    };

    return (
        <>
        
            <div className='filter-sec'>
                <h2>Explore Challenges</h2>

                <div className="search-field">
                    <div className='searchbar'>
                        <SearchIcon className='icon' />
                        <input 
                        type="text" 
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}  
                        />
                    </div>


                    <div className="filter-container">
                    
                        <button className="filter-toggle"
                         style={{width: isOpen? "250px":"100px",borderRadius: isOpen? "10px 10px 0 0" : "10px"}} 
                         onClick={toggleFilter}>
                            Filter
                        </button>
                        {isOpen && (
                            <div className="filter-dropdown"  ref={dropdownRef}>
                                <div className="fil-status">
                                    <h3>Status</h3>
                                    <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedStatus === 'all'} 
                                        onChange={handleStatusChange} 
                                        value="all" 
                                    /> All
                                </label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedStatus === 'active'} 
                                        onChange={handleStatusChange} 
                                        value="active" 
                                    /> Active
                                </label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedStatus === 'upcoming'} 
                                        onChange={handleStatusChange} 
                                        value="upcoming" 
                                    /> Upcoming
                                </label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedStatus === 'past'} 
                                        onChange={handleStatusChange} 
                                        value="past" 
                                    /> Past
                                </label><br />
                                </div>
                                <div className="fil-status">
                                    <h3>Level</h3>
                                    <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedLevel === 'easy'} 
                                        onChange={handleLevelChange} 
                                        value="easy" 
                                    /> Easy
                                </label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedLevel === 'medium'} 
                                        onChange={handleLevelChange} 
                                        value="medium" 
                                    /> Medium
                                </label><br />
                                <label>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedLevel === 'hard'} 
                                        onChange={handleLevelChange} 
                                        value="hard" 
                                    /> Hard
                                </label>
                                </div>
                            </div>
                        )}

                    </div>

                </div>
             
                <div className="option">
                {selectedStatus && (
                    <button className='option-btn' onClick={() => handleRemoveFilter('status')}>
                        {selectedStatus}
                        <CancelRoundedIcon className='cros-icon' />
                    </button>
                )}
                {selectedLevel && (
                    <button className='option-btn' onClick={() => handleRemoveFilter('level')}>
                        {selectedLevel}
                        <CancelRoundedIcon className='cros-icon' />
                    </button>
                )}
                </div>
            
            </div>

        </>

    )
}

export default Filter