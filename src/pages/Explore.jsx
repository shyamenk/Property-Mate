import React from 'react'
import {Link} from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import './Explore.css'
const Explore = () => {
  return (
    <>
      <div className="explore-section">
        <header>
          <p className="explore-header">EXPLORE</p>
        </header>
        <main>
          {/* {Slider} */}
          <p className="explore-category-heading">Categories</p>
          <div className="explore-categories">
            <Link to="/category/rent">
              <img
                src={rentCategoryImage}
                alt="rent"
                className="explore-category-image"
              />
              <p className="explore-category-name">Places for Rent</p>
            </Link>
            <Link to="/category/sell">
              <img
                src={sellCategoryImage}
                alt="rent"
                className="explore-category-image "
              />
              <p className="explore-category-name">Places for Sell</p>
            </Link>
          </div>
        </main>
      </div>
    </>
  )
}

export default Explore
