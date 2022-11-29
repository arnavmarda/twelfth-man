import React from "react";
import CreatableSelect from 'react-select/creatable'; 
  
export const DropdownRadio = ({roster, captain, handleChange}) => {
    return (
        <CreatableSelect 
        isMulti={false} 
        value={captain}
        options={roster} 
        noOptionsMessage={() => null} 
        isValidNewOption={() => false} 
        isSearchable={true} 
        onChange={handleChange}
        placeholder={"Choose the team captain..."} 
        className="p-5 pt-3 pb-3"/>
    );
}

