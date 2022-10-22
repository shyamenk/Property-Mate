const Input = ({id, changed, value, label}) => {
  return (
    <label>
      {label}
      <input
        id={id}
        onChange={changed}
        value={value}
        className="formInputSmall"
      />
    </label>
  )
}
export default Input
