import React from 'react'
import './Challenges.css'
import skill from '../../assets/icons/carbon_notebook-reference.png'
import Robot from '../../assets/icons/Robot.png'
import Vector from '../../assets/icons/Vector.png'
import IdentificationCard from '../../assets/icons/IdentificationCard.png'

function Challenges() {
    return (
        <div className='main-sec'>
            <p className='heading'>Why Participate in <span style={{ color: "green" }}>AI Challenges ?</span></p>

            <div class="container">
                <div class="row row-cols-2 gap-5">
                    <div class="col col-5">
                        <div className="inner-col">
                        <img src={skill} alt="skill" />
                        <p className='p-head'>Prove your skills</p>
                        <p className='para'>gain substancial experiene by real-world 
                        problems and pit against others to come up with innovative solutions.</p>
                        </div>
                    </div>
                    <div class="col col-5">
                    <div className="inner-col">
                    <img src={Vector} alt="Vector" />
                        <p className='p-head'>Learn from community</p>
                        <p className='para'>gain substancial experiene by real-world 
                        problems and pit against others to come up with innovative solutions.</p>
                        </div>
                    </div>
                    <div class="col col-5">
                    <div className="inner-col">
                    <img src={Robot} alt="Robot" />
                        <p className='p-head'>Challenge yourself</p>
                        <p className='para'>gain substancial experiene by real-world 
                        problems and pit against others to come up with innovative solutions.</p>
                    </div>
                    </div>
                    <div class="col col-5">
                    <div className="inner-col">
                    <img src={IdentificationCard} alt="IdentificationCard" />
                        <p className='p-head'>Earn recognition</p>
                        <p className='para'>gain substancial experiene by real-world 
                        problems and pit against others to come up with innovative solutions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Challenges
