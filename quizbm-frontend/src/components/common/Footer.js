import React from 'react';

const Footer = () => (
  <footer style={{background: '#5E8BFF', color: '#fff', marginTop: 'auto'}}>
    <div className="container py-4">
      <div className="row">
        <div className="col-md-5 mb-4 mb-md-0 text-center text-md-start">
          <div className="mb-3">
            <span className="fw-bold fs-2" style={{color: '#fff'}}>QuizBm</span>
          </div>
          <p className="fw-semibold" style={{fontSize: '1.1rem'}}>
            QuizBm is a quiz platform to learn while having fun!<br/>
            Discover new quizzes every day to test your general knowledge and curiosity.
          </p>
          
        </div>
        <div className="col-md-3 mb-4 mb-md-0 text-center text-md-start">
          <h5 className="fw-bold mb-3">Quizzes & Games</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-white-50 text-decoration-none">All Quizzes</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">New</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">Popular</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">General Knowledge</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">Personality Tests</a></li>
          </ul>
        </div>
        <div className="col-md-4 text-center text-md-start">
          <h5 className="fw-bold mb-3">Information</h5>
          <ul className="list-unstyled">
            <li><a href="#" className="text-white-50 text-decoration-none">About</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">FAQ</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">Contact Us</a></li>
            <li><a href="#" className="text-white-50 text-decoration-none">Sign In / Create Account</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div style={{background: 'rgb(139, 169, 247)'}} className="py-9">
      <div className="container text-center text-white-50 small">
        <span className="fw-bold text-white">QuizBm</span> &copy; {new Date().getFullYear()} - All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 