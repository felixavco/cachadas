import React from 'react'
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value, 
  error,
  info, 
  type,
  onChange,
  disabled,
  label,
  pattern
}) => {
  return (
    <div className="form-group">
      {label ? (<label htmlFor={name}>{label}</label>) : null}
      <input
        type={ type }
        className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        pattern={pattern}
        noValidate
      />
      {info && <small className="form-text text-muted">{info}</small> }
      {error && (<div className="invalid-feedback">{ error }</div>)}
    </div>
  )
}


TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  label: PropTypes.string,
  patterni: PropTypes.string
}

TextFieldGroup.defaultProps = {
  type: 'text',
  disabled: ''
}

export default TextFieldGroup

