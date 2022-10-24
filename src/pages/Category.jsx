import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  // startAfter,
} from 'firebase/firestore'

import {db} from '../firebase.config.js'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import ListingItems from '../components/ListingItems.jsx'

const Category = () => {
  //States

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //Get Ref
        const listingsRef = collection(db, 'Listings')

        //Query
        const listingsQuery = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10),
        )
        //Query EXECUTION
        const snapShot = await getDocs(listingsQuery)

        const listings = []
        snapShot.forEach(doc => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchListings()
  }, [params.categoryName])

  return (
    <div className="category__wrapper">
      <header>
        <h1 className="header__title">
          {params.categoryName === 'rent'
            ? 'Places for Rent'
            : 'Places for Sale'}
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <ul className="categoryListings">
            {listings && listings.length > 0 ? (
              listings.map(listing => (
                <ListingItems
                  listing={listing.data}
                  id={listing.id}
                  key={listing.id}
                />
              ))
            ) : (
              <p className="header__title">No Items To Show </p>
            )}
          </ul>
        )}
      </header>
    </div>
  )
}

export default Category
