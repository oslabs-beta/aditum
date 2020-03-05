/**
 * @description store container component that houses products
 * will need to be class component for the react router focus management 
 * 
 * 
 */

 import React from 'react';
 
 // the store component that will be displayed on route
const Store = (props) => {
  const photoUrls = [
    'https://i0.wp.com/fullofplants.com/wp-content/uploads/2017/05/vegan-aged-blue-cheese-thumb-300x300.jpg?fit=300%2C300&ssl=1',
    'https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/dairyreporter.com/news/markets/everything-you-wanted-to-know-about-feta/10510021-1-eng-GB/Everything-you-wanted-to-know-about-Feta_wrbm_large.jpg',
    'https://goldenagecheese.com/wp-content/uploads/2014/01/smoked_gouda-768x512.jpg',
    'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ihPVg4pIMBxo/v1/1000x-1.jpg'
  ];

  const items = [];
  for (let i = 0; i < photoUrls.length; i += 1) {
    items.push((
      <Item photoUrl={photoUrls[i]} itemNo={i+1} />
    ))
  }

  return (
    <main id='Store' aria-labelledby='Store'>
      <h1>Store</h1>
      <div className='product_container'>
        { items }
      </div>
    </main>
  )
}

const Item = (props) => {
  const { photoUrl, itemNo } = props;
  return (
    <div className='product'>
      <img className='productImg' src={photoUrl} alt='cheese'></img>
      <h1>Item {itemNo}</h1>
      <p>Swiss melted cheese paneer. Emmental port-salut cheese and wine fromage frais cheese slices emmental taleggio hard cheese. Feta port-salut boursin dolcelatte when the cheese comes out everybody's happy cheese slices croque monsieur gouda. Cheesy grin smelly cheese stinking bishop cheeseburger st. agur blue cheese say cheese cheeseburger airedale. Halloumi croque monsieur.</p>
    </div>
  )
}

export default Store;