import React from "react";

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <h className="fw-bold fs-2">Oops! You seem to be lost.</h>
                <br />
                <h className="fs-3">Such a page does not exist.</h>
            </div>
        )
    }
}

export default NotFound;