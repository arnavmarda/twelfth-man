import React from "react";
import Select from 'react-select'; 

export const DropdownChecklist = ({handleChange, selectedOptions, options, placeholder}) => {
    return (
        <React.Fragment>
            <Select 
            isMulti={true} 
            value={selectedOptions}
            onChange={handleChange} 
            options={options} 
            noOptionsMessage={() => null} 
            isValidNewOption={() => false} 
            isSearchable={true} 
            placeholder={placeholder} 
            className="p-5 pt-3 pb-3"
            />
        </React.Fragment>
    );
}

