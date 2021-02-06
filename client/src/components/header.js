import React from "react";

function Header ({setOpen}) {

    const handleClose = () => {
        setOpen(false);
    }

    return(
        <div>
            <div className="header">
                <div id="users" className="fas fa-user-friends"></div>
                <div className="Add-Team">Register Now!</div>
                <button onClick= {handleClose} id="Ellipse-2" className="far fa-times-circle"></button>
            </div>
            <div className="Line-2"></div>
        </div>
    )
}

export default Header;