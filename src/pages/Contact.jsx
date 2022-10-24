import {useState, useEffect} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {db} from '../firebase.config.js'
import {doc, getDoc} from 'firebase/firestore'
import {TextField} from '@mui/material'

const Contact = () => {
  const [message, setmessage] = useState('')
  const [contactPerson, setcontactPerson] = useState(null)
  const [searchParams, setsearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getContactPerson = async () => {
      const docRef = doc(db, 'users', params.contactId)

      const docSnap = await getDoc(docRef)
      console.log(docSnap)

      if (docSnap.exists()) {
        setcontactPerson(docSnap.data())
      } else {
        toast.error('Could not find contact Person')
      }
    }

    getContactPerson()
  }, [params.contactId])

  const onChange = e => {
    setmessage(e.target.value)
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="header__title">Contact Person</p>
      </header>
      {contactPerson !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact- {contactPerson.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <TextField
                id=""
                label="Message"
                multiline
                xs={'large'}
                value={message}
                onChange={onChange}
              />
            </div>

            <a
              href={`mailto:${contactPerson.email}?Subject=${searchParams.get(
                'listingName',
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
