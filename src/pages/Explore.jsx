import React from 'react'
import {Link} from 'react-router-dom'

import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'
import './Explore.css'
const Explore = () => {
  return (
    <>
      <div className="explore__section">
        <header>
          {/* <h1 className="header__title">
            Its a Big World out There,
            <br />
            <span>Go eXPLORE</span>
            <p>Recommended</p>
          </h1> */}
        </header>
        <Slider />
        <div className="categories">
          <div className="category">
            <img src={rentCategoryImage} alt="rent" />
            <h2 className="category__title ">Rent a house</h2>
            <p className="category__desc">
              Here is an excellent Independent House available for rent Please
              explore the rent property Fully Furnished.Real estate agents have
              resources available to them the public does not, such as current
              market data.
            </p>
            <Link to="/category/rent">
              <button className="category__btn">Rent</button>
            </Link>
          </div>
          <div className="category">
            <img src={sellCategoryImage} alt="rent" />
            <h2 className="category__title ">Sell a house</h2>
            <p className="category__desc">
              Here is an excellent Independent House available for rent Please
              explore the rent property Fully Furnished.Real estate agents have
              resources available to them the public does not, such as current
              market data.
            </p>
            <Link to="/category/sell">
              <button className="category__btn">Sell</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Explore
