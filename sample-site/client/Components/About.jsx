/**
 * @description About page for our mock store to test React focus management
 */

import React from 'react';

const About = () => {
    return (
      <div id='about'>
        <img id='coffee' src='https://images.unsplash.com/photo-1518966377293-74c63a1ec149?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2800&q=80' alt='person pouring coffee into mug' aria-labelledby='Coffee Image'></img>
        <div id='about-main-content' className='wrapper' aria-labelledby='About Page Main Content'>
          <div className='text'>
            <h1>About AdiStore</h1>
            <p><strong>Our mission?</strong> To provide fare-trade, delicious coffee to the tired masses of Codesmith cohorts 16 and 17.</p>
            <p><strong>Our why?</strong> We need to test out our accessability functionality. We also like coffee.</p>
            <p><strong>Who are we?</strong> Kelvin, Nicole, Will, and Ben.</p>
            <p><strong>How do I buy?</strong> You don't. We don't actually have coffee for you.</p>
          </div>
          <img id='shape' src='https://images.homedepot-static.com/productImages/305d4d68-b0ae-4233-8896-8b1ca4035659/svn/gray-home-decorators-collection-area-rugs-509781-64_1000.jpg' alt='textured gray square for page decoration'></img>
        </div>
      </div>
    )
}
export default About;