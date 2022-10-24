import React from 'react'
import {Routes, Route} from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import Authentication from '../pages/Authentication'
import Category from '../pages/Category'
import Explore from '../pages/Explore'
import ForgotPassword from '../pages/ForgotPassword'
import CreateListings from '../pages/CreateListings'
import Listing from '../pages/Listing'

import Offers from '../pages/Offers'
import Profile from '../pages/Profile'
import Contact from '../pages/Contact'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />

        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/category" element={<ProtectedRoute />}>
          <Route path="/category/:categoryName" element={<Category />} />
        </Route>
        <Route path="/contact" element={<ProtectedRoute />}>
          <Route path="/contact/:contactId" element={<Contact />} />
        </Route>
        <Route path="/create-listings" element={<ProtectedRoute />}>
          <Route path="/create-listings" element={<CreateListings />} />
        </Route>
        <Route
          path="/category/:categoryName/:listingId"
          element={<ProtectedRoute />}
        >
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
        </Route>

        {/* If not logged-in Then only Show Authentication */}

        <Route path="/sign-In" element={<Authentication />} />

        <Route path="/offers" element={<Offers />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default AppRouter
