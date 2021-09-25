import React from 'react';
import Loader from 'react-loader-spinner';

import './PageLoader.css';

const PageLoader = ({ visible }) =>
    visible && (
        <div className="loader__wrapper">
            <Loader type="TailSpin" color="#FFFFFF" height={150} width={150} timeout={30000} />
        </div>
    );
export default PageLoader;
