import React from 'react'
import { NavLink } from 'react-router-dom';


const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'yellow',
    color: 'black'
}
class Navbar extends React.Component {
    render() {
        return (
            <div className="header">
                <ul>
                    <li><NavLink to="/" exact style={link} activeStyle={{ background: 'green' }}>Home</NavLink></li>
                    <li><NavLink to="/users/login" exact style={link} activeStyle={{ background: 'green' }}>Login</NavLink></li>
                </ul>
            </div>
        )
    }
}
export default Navbar;