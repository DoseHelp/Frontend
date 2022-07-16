const Navigation = ({loggedInUser,activateUser}) => {
    const logout = (e) =>{
        e.preventDefault()
        activateUser("")
    }
    return (
        <nav>
            <a href = "/">Home</a>
            <a href = "/">Patients</a>
            <a href = "/">Manage</a>
            <a href = "/">Help</a>
            <div>{loggedInUser}</div> 
            <a href = "/" onClick={logout} >Log Out</a>
        </nav>
    )
} 
export default Navigation