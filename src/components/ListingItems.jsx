import {FaBath, FaBed} from 'react-icons/fa'
import {AiTwotoneDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt} from 'react-icons/md'
import {GrEdit} from 'react-icons/gr'

import './ListingItems.css'

const ListingItems = ({listing, id}) => {
  return (
    <div className="listing__container-box">
      <div className="listing__container">
        <div className="listing__images">
          <img src={listing.imgUrls} alt={listing.name} />
          <div className="listing__icons">
            <GrEdit />
            <MdSystemUpdateAlt />
            <AiTwotoneDelete style={{width: '20px', height: '20px'}} />
          </div>
        </div>
        <div className="listing__details">
          <h4 className="details__name">{listing.name}</h4>
          <h6 className="details__location">{listing.location}</h6>
          <div className="listing__info">
            <FaBed />
            <p className="info__text">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
          </div>
          <div className="listing__info">
            <FaBath />
            <p className="info__text">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
          <p className="details__price">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice}
            <span>{listing.type === 'rent' && ' /Month'}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
export default ListingItems
