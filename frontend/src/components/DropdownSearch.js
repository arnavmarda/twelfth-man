import React from "react";
import CreatableSelect from 'react-select/creatable'; 
  
export const DropdownSearch = ({options, selectedOption, handleChange, placeholder}) => {
    return (
        <CreatableSelect 
        isMulti={false} 
        value={selectedOption}
        options={options} 
        noOptionsMessage={() => null} 
        isValidNewOption={() => false} 
        isSearchable={true}
        autoSize={false} 
        onChange={handleChange}
        placeholder={placeholder} 
        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
        className="p-5 pt-3 pb-3 w-100 h-75"/>
    );
}

