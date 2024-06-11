// Home.js
import React from 'react';
import Contact from './Contact';
import '../static/Home.css';
import Navbar from '../components/Navbar';
import AboutUs from './AboutUs';

function Home() {
  return (
    <div className="content ">
      <div id="section-1">
        <Navbar />
      <div className="space"></div>

        <div className="always">
          <div className='side'></div>
          <div className="home_center">
            <p className='main_text'>Welcome to Polaris Tech </p>
            <span className='after_main'>Connect, share, & engage</span>
            <p className='text'>Are you a student or entrepreneur with a tech dream! Join our thriving community, where aspiring founders and learners collaborate, accelerating their journeys towards becoming the future leaders of the tech industry.</p>
            <button className='preference-button'>Learn More</button>
            <button className='preference-button'>See Members</button>
          </div>
          <div className='side'></div>
        </div>
      </div>
      <div id="section-2">
        <div className="contact">
          <div className="side_up"></div>
          <Contact />
          <div className="side_down"></div>
        </div>
      </div>
      <div id="section-3">
        <AboutUs />
      </div>
    </div>
  );
}

export default Home;
