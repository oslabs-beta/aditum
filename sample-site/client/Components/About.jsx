/**
 * @description About page for our mock store to test React focus management
 */

import React from 'react';

const About = (props) => {
    return (
      <main id='about'>
        <Welcome />
        <div className='story-mission'>
          <Story />
          <Mission />
        </div>
      </main>
    )
}

const Welcome = (props) => {
  return (
    <div id='welcome' aria-labelledby='Welcome'>
      <div id='welcome-content'>
        <h1>Welcome</h1>
        <p>Feta pepper jack port-salut. Roquefort croque monsieur emmental cheese slices pecorino port-salut pepper jack chalk and cheese. The big cheese cottage cheese cauliflower cheese cheese strings cheddar goat bavarian bergkase port-salut.</p>
      </div>
      <img src='https://images.unsplash.com/photo-1568038100292-c75e7d6b9d82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80' alt='group of cows looking at the camera'></img>
    </div>
  )
}

const Story = (props) => {
  return (
    <div id='ourStory' aria-labelledby='Our Story'>
      <h1>Our Story</h1>
      <p>Cheese slices roquefort monterey jack. Cream cheese pepper jack edam camembert de normandie cheese and biscuits cheddar fromage stilton. Red leicester the big cheese croque monsieur croque monsieur gouda hard cheese fondue babybel. Mozzarella stilton cheddar say cheese cheeseburger caerphilly pecorino cheese and biscuits. Dolcelatte fondue rubber cheese monterey jack fromage airedale ricotta cut the cheese. Lancashire airedale cut the cheese emmental monterey jack hard cheese fromage frais gouda. Who moved my cheese swiss hard cheese parmesan halloumi airedale cauliflower cheese babybel. Cheese slices macaroni cheese st. agur blue cheese cheesecake mascarpone ricotta port-salut cow. Cheese triangles caerphilly danish fontina when the cheese comes out everybody's happy everyone loves queso.</p>
    </div>
  )
}

const Mission = (props) => {
  return (
    <div id='ourMission' aria-labelledby='Our Mission'>
      <h1>Our Mission</h1>
      <p>Blue castello goat gouda. Emmental gouda cheesy grin dolcelatte smelly cheese mascarpone dolcelatte cheese on toast. Melted cheese babybel squirty cheese dolcelatte pepper jack cheddar rubber cheese edam. Cheese and biscuits cheesecake st. agur blue cheese gouda gouda jarlsberg rubber cheese danish fontina. The big cheese swiss smelly cheese parmesan ricotta hard cheese pepper jack danish fontina. Smelly cheese cottage cheese paneer mascarpone airedale blue castello jarlsberg caerphilly. Rubber cheese when the cheese comes out everybody's happy halloumi bavarian bergkase say cheese macaroni cheese.</p>
    </div>
  )
}
export default About;