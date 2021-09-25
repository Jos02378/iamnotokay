import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { User } from 'react-feather';

import './Navbar.css';
import * as ROUTE from '../../constants/routes';
import { Text } from '..';
import UserContext from '../../contexts/userContext';

function Navbar() {
    const [searchValue, setSearchValue] = useState('');
    const location = useLocation();
    const user = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (checkLocation()) {
            if (user) return;

            history.push(ROUTE.HOMEPAGE);
        }
    }, [user, history, location]);

    const checkLocation = () => {
        if (
            location.pathname !== ROUTE.HOMEPAGE &&
            location.pathname !== ROUTE.LOG_IN &&
            location.pathname !== ROUTE.REGISTER
        )
            return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        return null;
    };

    const goToProfile = () => {
        if (!user) {
            history.push({
                pathname: ROUTE.LOG_IN,
                state: { intendedPage: ROUTE.PROFILE },
            });
        } else {
            history.push(ROUTE.PROFILE);
        }
    };

    return (
        <div className="navbar__container">
            <Link to={ROUTE.HOMEPAGE}>
                <h1 className="navbar__logo">I am not okay</h1>
            </Link>
            {/* {location.pathname[1] === ROUTE.STORY[1] && (
                <form className="navbar__searchbar" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={({ target }) => setSearchValue(target.value)}
                        placeholder="Search by tag"
                    />
                </form>
            )} */}
            <User
                className="navbar__profile"
                onClick={goToProfile}
                strokeWidth={1}
                color="#FFF"
            />
        </div>
    );
}

export default Navbar;
