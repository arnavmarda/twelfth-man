import React from "react";
import CreatableSelect from 'react-select/creatable'; 
  
export const DropdownRadio = ({options, selectedOption, handleChange, placeholder}) => {
    return (
        <CreatableSelect 
        isMulti={false} 
        value={selectedOption}
        options={options} 
        noOptionsMessage={() => null} 
        isValidNewOption={() => false} 
        isSearchable={true} 
        onChange={handleChange}
        placeholder={placeholder} 
        className="p-5 pt-3 pb-3"/>
    );
}

