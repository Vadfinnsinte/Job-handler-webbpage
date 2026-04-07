const InputLabel = ({type, labelTxt, value, setValue}) => {

	return (
		<div className="input-label-container">
            <label htmlFor="email">{labelTxt}</label>
            <input
              id="email"
              type={type}
              
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
	)
}

export default InputLabel