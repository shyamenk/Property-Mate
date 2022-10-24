import {useState, useEffect} from 'react'

import {collection, getDocs, query, where} from 'firebase/firestore'

import {db} from '../firebase.config.js'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import ListingItems from '../components/ListingItems.jsx'

const Offers = () => {
  //States

  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'Listings'), where('offer', '==', true))

        const querySnapshot = await getDocs(q)

        const data = []

        querySnapshot.forEach(doc => {
          return data.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        setListings(data)

        setLoading(false)
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchListings()
  }, [])

  console.log(listings)
  return (
    <div className="category__wrapper">
      <header>
        {/* <h1 className="header__title">Offers</h1> */}
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
              <p className="header__title">
                No offers are Available <br />
                right Now!
              </p>
            )}
          </ul>
        )}
      </header>
    </div>
  )
}

export default Offers
