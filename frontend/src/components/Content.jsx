import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Contact from '../pages/Contact'
import AboutUs from '../pages/AboutUs'
import Admin from '../pages/Admin'

function Content() {
  return (
    <div>   <div className="content">
    <Routes>
      <Route path="/" element={
        <>
        <div className="always">
          <div className='side'></div>
          <div className="home_center">
            <p className='main_text'>Welcome to Polaris Tech </p>
            <span className='after_main'>Connect, share, and engage</span>
            <p className='text'>Are you a student or entrepreneur with a tech dream? Join our thriving community, where aspiring founders and learners collaborate, accelerating their journeys towards becoming the future leaders of the tech industry.</p>
            <button className='preference-button'>Learn More</button>
            <button className='preference-button'>See Members</button>
          </div>

          <div className='side'></div>
        </div>
        </>
      } />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/admin_dashboard" element={<Admin />} />
    </Routes>
    </div>
    </div>
  )
}

export default Content