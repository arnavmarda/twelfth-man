import React, {useState } from "react";
import '../components/css-files/UserRegistration.css'


const Register = (props) => {
    const [focused, setFocused] = useState(false);
    const {onChange, errorMessage, id, ...inputProps} = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return(
       <div className="Registration">
            <input {...inputProps} className="fieldBoxes"
                onChange={onChange} 
                onBlur={handleFocus} 
                onFocus={()=>inputProps.name==="passwordVerification" && setFocused(true)}
                focused={focused.toString()}/>
            <span>{errorMessage}</span>
       </div>
    )
}

export default Register