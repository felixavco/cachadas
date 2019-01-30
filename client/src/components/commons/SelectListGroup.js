import React from 'react'
import PropTypes from 'prop-types';

const SelectListGroup = ({
  name,
  value, 
  error,
  info, 
  onChange,
  options,
  label
}) => {

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))

  return (
    <div className="form-group">
     {label ? (<label htmlFor={name}>{label}</label>) : null}
      <select
        className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
        name={name}
        value={value}
        id={name}
        onChange={onChange}
        noValidate
      >
      
        { selectOptions }

      </select>
      {info && <small className="form-text text-muted">{info}</small> }
      {error && (<div className="invalid-feedback">{ error }</div>)}
    </div>
  )
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}


export default SelectListGroup

