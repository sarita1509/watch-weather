import React from "react";
import PropTypes from "prop-types";

const SetUnits = ({value, onSet}) => {
  return <div className="set-units">
    <label>UNITS</label>
    <select value={value} onChange={onSet}>
      <option value = "C">Celcius</option>  
      <option value = "F">Fohrenheit</option>
      </select>
  </div>;
};

    SetUnits.propsTypes = {
          value: PropTypes.string.isRequired,
          onset: PropTypes.func.isRequired
}
export default SetUnits;