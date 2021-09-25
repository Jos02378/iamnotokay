import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import './Homepage.css';
import FirebaseContext from '../../contexts/firebaseContext';
import { Text } from '../../components';
import UserContext from '../../contexts/userContext';
import * as ROUTE from '../../constants/routes';

const Homepage = () => {
    const user = useContext(UserContext);
    const history = useHistory();

    const goToWrite = () => {
        if (!user) {
            history.push({
                pathname: ROUTE.LOG_IN,
                state: { intendedPage: '/w/new' },
            });
        } else {
            history.push('/w/new');
        }
    };

    const goToCollection = () => {
        if (!user) {
            history.push({
                pathname: ROUTE.LOG_IN,
                state: { intendedPage: ROUTE.COLLECTION },
            });
        } else {
            history.push(ROUTE.COLLECTION);
        }
    };

    return (
        <div className="homepage__wrapper">
            <div className="homepage__hero">
                <h1 className="homepage__hero--title">
                    Your pain is temporary
                </h1>
            </div>
            <div className="homepage__buttons">
                <button
                    type="button"
                    className="homepage__button"
                    onClick={goToWrite}
                >
                    I want to tell my stories
                </button>
                <button
                    type="button"
                    className="homepage__button"
                    onClick={goToCollection}
                >
                    I want read people's stories
                </button>
            </div>
        </div>
    );
};

export default Homepage;
