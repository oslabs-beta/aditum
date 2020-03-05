/**
 * @description Main container will display on homepage with a more complex component structure to test out our accessability bar
 */

 import React, { Component } from 'react';

 class MainContainer extends Component {
   render() {
     return (
       <main id='homepage-main'>
          <Sidebar />
          <MainContent />
          <Photos />
          <Footer />
       </main>
     )
   }
 }

 const Sidebar = (props) => {
   return (
     <section id='sidebar' aria-labelledby="Sidebar">
       <h1>Sidebar</h1>
       <div className='sb-article'>
          <h2>SubHeading</h2>
          <p>Fromage say cheese mozzarella. Monterey jack fromage st. agur blue cheese when the cheese comes out everybody's happy melted cheese edam cheesecake camembert de normandie.</p>
       </div>
       <div className='sb-article'>
          <h2>SubHeading</h2>
          <p>Babybel cheese on toast boursin cow hard cheese pepper jack smelly cheese say cheese. Croque monsieur cheese strings cauliflower cheese.</p>
       </div>
       <div className='sb-article'>
          <h2>Another SubHeading</h2>
          <p>Gouda mascarpone gouda. Croque monsieur babybel cheese strings paneer cut the cheese squirty cheese hard cheese macaroni cheese. Cut the cheese fromage boursin stinking bishop roquefort bavarian bergkase fromage frais pepper jack.</p>
       </div>
     </section>
   )
 }

 const MainContent = (props) => {
   const articleList = [];
   for (let i = 0; i < 7; i += 1) {
     articleList.push(<Article key={i} />)
   }
   return (
     <section id='main-content' aria-labelledby='Main Content'>
       <h1>Main Content - Article Section</h1>
       {articleList}
     </section>
   )
 }

 const Article = (props) => {
   return (
     <article className='article'>
        <div className='article-header'>
            <h1>Article Title</h1>
            <span>Author of this Article</span>
            <p>Lancashire pepper jack caerphilly. Taleggio swiss camembert de normandie mascarpone pecorino monterey jack pepper jack queso. Fromage cheese triangles fromage cheeseburger smelly cheese mascarpone squirty cheese cauliflower cheese. Cheese and wine bavarian bergkase cheeseburger cheesy grin emmental boursin.</p>
        </div>
        <img className='article-img' src='https://static.toiimg.com/photo/69712708.cms' alt='cheese'></img>
     </article>
   )
 }

 const Photos = (props) => {
   return (
     <section id='photo-sb' aria-labelledby="Photos Sidebar">
       <h1>Photo Sidebar</h1>
       <img className='cheese-photo' src = 'https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='cheese selction at market'></img>
       <img className='cheese-photo' src='https://images.unsplash.com/photo-1578932599431-eb1333a0069f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='charcuterie spread'></img>
       <img className='cheese-photo' src='https://images.unsplash.com/photo-1576512259505-bd5cd2a70ff8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='a goat looking at the camera'></img>
       <img className='cheese-photo' src='https://images.unsplash.com/photo-1519974810907-87738d92813a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='a heard of cows'></img>
       <img className='cheese-photo' src='https://images.unsplash.com/photo-1559130690-3571348e7932?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' alt='cow looking up at camera'></img>
     </section>
   )
 }

 const Footer = (props) => {
   return (
     <footer id='footer' aria-labelledby= "AdiStore Footer">
       <h2>This is a footer</h2>
       <ul>
         <li>Information</li>
         <li>More info!!</li>
         <li>Even More.</li>
         <li>Okay Last bit</li>
       </ul>
     </footer>
   )
 }

 export default MainContainer;