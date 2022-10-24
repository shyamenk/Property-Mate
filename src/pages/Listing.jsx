import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
import {db} from '../firebase.config.js'
import Spinner from '../components/Spinner.jsx'
import {useUserAuth} from '../store/AuthContext.js'
import './Listings.css'
const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setcurrentImage] = useState(null)

  const params = useParams()

  const {user} = useUserAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'Listings', params.listingId)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [params.listingId])

  if (loading) {
    return <Spinner />
  }

  const changeThumbnail = e => {
    setcurrentImage(e.target.src)
  }
  return (
    <>
      <div className="grid-wrapper">
        <div className="grid-container">
          <div className="grid-items-image">
            <img
              src={currentImage ? currentImage : listing.imgUrls[0]}
              alt=""
            />
          </div>
          <div className="grid-items-contents">
            <h3>{listing.name}</h3>
            <p>{listing.location}</p>
            <p className="price">
              ${listing.regularPrice}
              <span className="tag regular">Regular</span>
            </p>
            <p className="price">
              ${listing.discountedPrice}
              <span className=" tag discounted">Discounted</span>
            </p>
            <p className="price">
              $
              {listing.discountedPrice > 0 &&
                listing.discountedPrice - listing?.regularPrice}
              <span className=" tag save">Saved</span>
            </p>
            <p className="price">
              {listing.bedrooms} <span className=" tag regular">Bedrooms</span>
            </p>
            <p className="price">
              {listing.bathrooms}
              <span className=" tag save">Bathrooms</span>
            </p>
            <p className="price">{listing.parking ? 'ParkingSpot' : ''}</p>
            <p className="price">{listing.furnished ? 'Furnished' : ''}</p>
          </div>
          <div className="grid-items-thumbnail">
            {listing.imgUrls.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumbnail"
                onClick={changeThumbnail}
              />
            ))}
          </div>
          <div className="grid-items-buttons">
            {user?.uid !== listing.userRef && (
              <Link
                className="contact-button"
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
              >
                Contact person
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Listing
