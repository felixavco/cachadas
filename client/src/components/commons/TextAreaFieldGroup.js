import React from 'react'
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value, 
  error,
  info, 
  onChange,
  label
}) => {
  return (
    <div className="form-group">
      {label ? (<label htmlFor={name}>{label}</label>) : null}
      <textarea
        className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        noValidate
      />
      {info && <small className="form-text text-muted">{info}</small> }
      {error && (<div className="invalid-feedback">{ error }</div>)}
    </div>
  )
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}


export default TextAreaFieldGroup

