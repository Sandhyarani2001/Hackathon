import React from 'react'
import './style.css'
import AiModel from '../../assets/icons/gropu.png'
import dataScience from '../../assets/icons/group2.png'
import AIChal from '../../assets/icons/group3.png'


function Statistic() {
  return (
    <div>
       <div className='stat-cont'>
            <div class="container-fluid">
                <div class="row">
                    <div class="col">
                        <img src={AiModel} alt="" />
                        <div className='text'>
                            <h4>100K+</h4>
                            <p>AI model submission</p>
                        </div>
                    </div>
                    <div class="col">
                        <img src={dataScience} alt="AImodel" />
                        <div className=' text'>
                            <h4>50K+</h4>
                            <p>Data Scientist</p>
                        </div>
                    </div>
                    <div class="col">
                        <img src={AIChal} alt="" />
                        <div className='text'>
                            <h4>100K+</h4>
                            <p>AI Challenges hosted</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Statistic
