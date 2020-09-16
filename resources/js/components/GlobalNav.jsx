import React from 'react';
import {Link} from 'react-router-dom';

const GlobalNav = () => {
    return(
        <nav>
            <ul>
                <Link to="/">
                    <li>top</li>
                </Link>
                <Link to="/about">
                    <li>about</li>
                </Link>
            </ul>
        </nav>
    )
}

export default GlobalNav;
