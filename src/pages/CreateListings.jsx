import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useUserAuth} from '../store/AuthContext'

// Material UI Components
import Spinner from '../components/Spinner'
import TextField from '@mui/material/TextField'
import {Button, Typography} from '@mui/material'
import {IOSSwitch} from '../components/Switch'
import {Stack} from '@mui/system'
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'
import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import {v4} from 'uuid'
import {db} from '../firebase.config.js'
import {toast} from 'react-toastify'
import './CreateListings.css'
const CreateListings = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    type: 'sell',
    name: '',
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    location: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
  })

  const {user} = useUserAuth()
  const navigate = useNavigate()
  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    location,
    offer,
    regularPrice,
    discountedPrice,
    images,
  } = formData

  useEffect(() => {
    setFormData({...formData, userRef: user.uid})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return <Spinner />
  }

  const imageUpload = async image => {
    return new Promise((resolve, reject) => {
      const storage = getStorage()

      const imageRef = storageRef(storage, `images/${image.name + v4()}`)

      const uploadTask = uploadBytesResumable(imageRef, image)

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(progress)
        },
        error => {
          setLoading(false)
          reject(error)

          return
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL)
            setLoading(false)
          })
        },
      )
    })
  }
  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    if (images.length > 6) {
      setLoading(false)
      toast.error('Maximum image  limit exceeded (6) ')
      return
    }

    const imgUrls = await Promise.all(
      [...images].map(img => imageUpload(img)),
    ).catch(err => {
      setLoading(false)
      toast.error(err.message)
    })
    const cloneFormData = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
    }

    delete cloneFormData.images
    !cloneFormData.offer && delete cloneFormData.discountedPrice

    console.log(cloneFormData)

    const docRef = await addDoc(collection(db, 'Listings'), cloneFormData)

    setLoading(false)

    toast.success('Listings Added Successfully')

    navigate(`/category/${cloneFormData.type}/${docRef.id}`)
  }

  const onMutate = e => {
    const {id, value} = e.target

    if (e.target.files) {
      setFormData({
        ...formData,
        images: e.target.files,
      })
    }
    if (!e.target.files) {
      setFormData(prev => ({
        ...prev,
        [id]: value,
      }))
    }
  }

  const switchHandler = e => {
    const {id, checked} = e.target

    if (checked) {
      setFormData(prev => ({
        ...prev,
        [id]: checked,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: checked,
      }))
    }
  }
  const typeHandler = e => {
    const {checked} = e.target
    if (checked) {
      setFormData({
        ...formData,
        type: 'rent',
      })
    } else {
      setFormData({
        ...formData,
        type: 'sell',
      })
    }
  }

  return (
    <>
      <p className="header__title">Create Listings</p>
      <div className="list-container">
        <div className="list-wrapper">
          <div className="list-contacts">
            <h3>Create Listings</h3>
          </div>

          <div className="list-form">
            <form onSubmit={submitHandler}>
              <div>
                <TextField
                  margin="dense"
                  required
                  id="name"
                  size="small"
                  label="Name"
                  value={name}
                  onChange={onMutate}
                />
              </div>
              <div>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>Sell</Typography>
                  <IOSSwitch onChange={typeHandler} value={type} id="type" />
                  <Typography>Rent</Typography>
                </Stack>
              </div>
              <div>
                <Stack
                  direction="row"
                  margin="dense"
                  spacing={2}
                  alignItems="center"
                >
                  <TextField
                    required
                    id="bedrooms"
                    size="small"
                    label="Bed"
                    type="number"
                    sx={{width: 100}}
                    value={bedrooms}
                    onChange={onMutate}
                  />
                  <TextField
                    required
                    id="bathrooms"
                    size="small"
                    label="Bath"
                    sx={{width: 100}}
                    type="number"
                    value={bathrooms}
                    onChange={onMutate}
                  />
                </Stack>
              </div>

              <div>
                <Stack
                  margin='dense"'
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <Typography>No</Typography>
                  <IOSSwitch
                    onChange={switchHandler}
                    value={parking}
                    id="parking"
                  />
                  <Typography>Parking</Typography>
                </Stack>
              </div>
              <div>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>No</Typography>
                  <IOSSwitch
                    value={furnished}
                    margin="dense"
                    onChange={switchHandler}
                    id="furnished"
                  />
                  <Typography>Furnished</Typography>
                </Stack>
              </div>
              <div>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography>No</Typography>
                  <IOSSwitch
                    margin="dense"
                    onChange={switchHandler}
                    id="offer"
                    value={offer}
                  />
                  <Typography>offer</Typography>
                </Stack>
              </div>
              <div>
                <Stack
                  direction="row"
                  margin="dense"
                  spacing={2}
                  alignItems="center"
                >
                  <TextField
                    required
                    id="regularPrice"
                    size="small"
                    label="Regular Price"
                    type="number"
                    sx={{width: 100}}
                    value={regularPrice}
                    onChange={onMutate}
                  />
                  {offer && (
                    <TextField
                      required
                      id="discountedPrice"
                      size="small"
                      label="Discounted Price"
                      sx={{width: 100}}
                      type="number"
                      value={discountedPrice}
                      onChange={onMutate}
                    />
                  )}
                </Stack>
              </div>

              <div>
                <TextField
                  required
                  id="location"
                  label="Location"
                  multiline
                  maxRows={4}
                  size="large"
                  value={location}
                  onChange={onMutate}
                />
              </div>

              <div>
                <Button variant="outlined" component="label">
                  Add Images
                  <input
                    type="file"
                    id="images"
                    onChange={onMutate}
                    max="6"
                    accept=".jpg,.png,.jpeg"
                    multiple
                    required
                    hidden
                  />
                </Button>
              </div>

              <div className="full-width">
                <Button type="submit" variant="contained">
                  Add Listings
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateListings
