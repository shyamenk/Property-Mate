import {useReducer} from 'react'

//Our custom hook also needs a reducer so I've included a very simple one here
function formReducer(prevState, {id, updatedElement}) {
  return {...prevState, [id]: updatedElement}
}

export const useForm = (initialValues, onSubmit) => {
  const [state, dispatch] = useReducer(formReducer, initialValues)

  function changeHandler({target: {value, id}}) {
    const updatedElement = {...state[id]}
    updatedElement.value = value
    dispatch({id, updatedElement})
  }

  const submitHandler = event => {
    event.preventDefault()
    const results = Object.keys(state).reduce((final, key) => {
      final[key] = state[key].value
      return final
    }, {})
    console.log(results)
  }

  return {state, submitHandler, changeHandler}
}
