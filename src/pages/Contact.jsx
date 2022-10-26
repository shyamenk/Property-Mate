import {useState, useEffect} from 'react'
import {useParams, useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {db} from '../firebase.config.js'
import {doc, getDoc} from 'firebase/firestore'
import {TextField} from '@mui/material'
import './Contact.css'
const Contact = () => {
  const [message, setmessage] = useState('')
  const [contactPerson, setcontactPerson] = useState(null)
  const [searchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getContactPerson = async () => {
      const docRef = doc(db, 'users', params.contactId)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap)

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
    <div>
      <form className="form">
        <h2 className="header__title">Contact Owner</h2>
        <div className="contact">
          <label>Name</label>
          <TextField
            onChange={onChange}
            size="small"
            value={contactPerson?.name || ''}
          ></TextField>
        </div>
        <div className="contact">
          <label>Email</label>

          <TextField
            onChange={onChange}
            size="small"
            value={contactPerson?.email || ''}
          ></TextField>
        </div>
        <div className="contact">
          <label>Message</label>
          <TextField
            onChange={onChange}
            size="normal"
            multiline
            placeholder=""
            value={message}
          ></TextField>
        </div>
        <div className="submit">
          <a
            href={`mailto:${contactPerson?.email}?Subject=${searchParams.get(
              'listingName',
            )}&body=${message}`}
          >
            <button>Send Message</button>
          </a>
        </div>
      </form>
    </div>
  )
}

export default Contact
