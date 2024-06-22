// Import the CSS file for styling the Footer component
import './Footer.css';
// Import React from 'react' to use JSX syntax and React features
import React from 'react';

// Define the Footer functional component
const Footer = () => {
  // Return JSX that describes the UI for the Footer component
  return (
    // A div element with a class of 'footer' that will apply styles defined in Footer.css
    <div className='footer'>
      <h1 className='footerText'>Created by Marcela Billingslea</h1>
      <h2 className='footerText'>Meta U Intern 2024</h2>
      <h2 className='footerText'>marcebd@fakeemail.com</h2>
    </div>
  );
}

// Export the Footer component as the default export of this module
export default Footer;
