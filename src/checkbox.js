import React from 'react';
import PropTypes from 'prop-types';
import './style/checkbox.css';



function Checkbox(props) {

return(
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={props.label}
        checked={props.isSelected}
        onChange={props.onCheckboxChange}
        className="form-check-input"
      />
      {props.label}
    </label>
  </div>
);
}

/*
const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);
/* const Checkbox = ({type = 'checkbox', name, checked = false, onChange, className }) => (
  <input type={type} name={name} checked={checked} onChange={onChange} />
);
*/


Checkbox.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheckboxChange: PropTypes.func.isRequired,
  // className:PropTypes.string
}

export default Checkbox;
