const InputLabel = ({type, labelTxt, value, setValue, placeholder}) => {

	return (
		<div className="input-label-container">
            <label htmlFor={labelTxt}>{labelTxt}</label>
            <input
              id={labelTxt}
              type={type}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
            />
          </div>
	)
}

export default InputLabel