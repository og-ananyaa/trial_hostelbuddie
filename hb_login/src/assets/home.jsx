// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/Home.css';
// import logo from '../assets/HOSTEL.png';

// function Home() {
//   return (
//     <div>
//       {/* Head Section */}
//       <meta charSet="utf-8" />
//       <title>HostelBuddy</title>
//       <link
//         rel="stylesheet"
//         href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
//       />
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" />
//       <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@500&display=swap" />

//       <div className="blur">
//         {/* Navigation Bar */}
//         <section id="title">
//           <div className="container-fluid">
//             <nav className="navbar navbar-expand-lg navbar-dark">
//               <Link to="/" className="navbar-brand hostel">
//                 <img src={logo} alt="HostelBuddy Logo" />
//               </Link>
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#navbarNav"
//                 aria-controls="navbarNav"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="navbar-toggler-icon" />
//               </button>
//               <div className="collapse navbar-collapse" id="navbarNav">
//                 <ul className="navbar-nav ms-auto">
//                   <li className="nav-item">
//                     <a className="nav-link" href="#about" style={{ color: "hsl(305, 21%, 90%)", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
//                       About
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#testimonials" style={{ color: "hsl(305, 21%, 90%)", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
//                       Testimonials
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#Contact" style={{ color: "hsl(305, 21%, 90%)", fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
//                       Contact Us
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <Link to="/register">
//                       <button className="btn btn-outline-light btn-lg ms-3" style={{ fontWeight: "bold", fontFamily: "Montserrat, sans-serif" }}>
//                         Login / Register
//                       </button>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </nav>
//           </div>
//         </section>

//         {/* Main Content */}
//         <div className="row whaat">
//           <div className="col-lg-6">
//             <h1 className="heading">Your new home away from home!</h1>
//             <h3 style={{ fontSize: "1.5rem", color: "#ffffff", marginTop: "1rem", fontFamily: "Ubuntu, sans-serif", textAlign: "justify" }}>
//               Whether you're a night owl, a study buddy, or the life of the party, HostelBuddy connects you with like-minded friends for an
//               incredible hostel experience. Find your tribe, share epic moments, and create lasting memories. Your next adventure starts here!
//             </h3>
//           </div>
//           <div className="col-lg-6">
//             {/* Carousel */}
//             <img
//             src={logo}
//             alt="Hostel Image"
//             className="img-fluid"/>

              
            
//           </div>
//         </div>
     
//       </div>
      
      
//     </div>
//   );
// }

// export default Home;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [dropdown, setDropdown] = useState({ lostAndFound: false, buyAndSell: false });

  const toggleDropdown = (menu, isOpen) => {
    setDropdown((prevState) => ({ ...prevState, [menu]: isOpen }));
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to HostelBuddy</h1>
        <p>Whether you're a night owl, a study buddy, or the life of the party, HostelBuddie connects you with like-minded friends for an incredible hostel experience. Find your tribe, share epic moments, and create lasting memories. Your next adventure starts here!</p>
        <div className="header-buttons">
        <Link to="/about" className="header-button">About</Link>
<Link to="/testimonials" className="header-button">Testimonials</Link>

        </div>
      </header>
      <main className="home-main">
        <div className="features">
          <div className="feature-card">
            <h2>Roommate Finder</h2>
            <p>Looking for the perfect roommate? Connect with like-minded individuals. Your next great match is just a click away!</p>
          </div>
          <div
            className="feature-card dropdown-card"
            onMouseEnter={() => toggleDropdown("lostAndFound", true)}
            onMouseLeave={() => toggleDropdown("lostAndFound", false)}
          >
            <h2>Lost & Found</h2>
            <p>Report lost items and find what's been found. Quickly connect with others to recover your belongings or help someone else do the same.</p>
            {dropdown.lostAndFound && (
              <div className="dropdown-menu">
              <Link to="/lost">
                <button className="feature-button">Report Lost Item</button>
              </Link>
              <Link to="/found">
                <button className="feature-button">Report Found Item</button>
              </Link>
            </div>
            
            )}
          </div>
          <div
            className="feature-card dropdown-card"
            onMouseEnter={() => toggleDropdown("buyAndSell", true)}
            onMouseLeave={() => toggleDropdown("buyAndSell", false)}
          >
            <h2>Buy & Sell Portal</h2>
            <p>Find great deals, sell your items. Join our community of shoppers and sellers today!</p>
            {dropdown.buyAndSell && (
              <div className="dropdown-menu">
              <Link to="/buy">
                <button className="feature-button">Post an Ad</button>
              </Link>
              <Link to="/sell">
                <button className="feature-button">Buy?</button>
              </Link>
            </div>
            
            )}
          </div>
        </div>
         <div className="home-container">
       {/* About Us Section */}
       <section className="about-section">
        <h2>About Us</h2>
        <div className="about-box">
          <div className="about-card">
            <h3>Our Mission</h3>
            <p>We aim to bring innovative solutions to your daily needs with technology.</p>
          </div>
          <div className="about-card">
            <h3>Our Vision</h3>
            <p>To lead the way in technological advancements and make life easier for everyone.</p>
          </div>
          <div className="about-card">
            <h3>Our Values</h3>
            <p>We believe in integrity, creativity, and putting our users first.</p>
          </div>
        </div>
      </section>
 {/* Testimonials Section */}
 <section className="testimonials-section">
        <h2>What Our Users Say</h2>
        <div className="testimonials-box">
          <div className="testimonial-card">
            <p>"This app has truly transformed my life! It's intuitive and easy to use."</p>
            <span>- John Doe</span>
          </div>
          <div className="testimonial-card">
            <p>"I can’t imagine my daily routine without this! A must-have tool."</p>
            <span>- Jane Smith</span>
          </div>
          <div className="testimonial-card">
            <p>"Fantastic service! The features are all I need and more."</p>
            <span>- Sarah Lee</span>
          </div>
        </div>
      </section>
    </div>
      </main>
      <footer className="home-footer">
  <p>&copy; 2024 codHERs: HostelBuddy Project for Ideathon 4.0</p>
  <h2>Contact Us:</h2>
  <div className="footer-buttons">
    <a
      href="https://github.com/mihira4/hostelbuddie"
      target="_blank"
      rel="noopener noreferrer"
      className="footer-button"
    >
      Visit Our GitHub
    </a>
    <a
      href="ananyaapriyadarshini.bt23cse@pec.edu.in
"
      className="footer-button"
    >
      Email Us
    </a>
  </div>
</footer>


    </div>
  );
};

export default Home;
