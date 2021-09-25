import React from 'react';
import PropTypes from 'prop-types';

import useScreenSize from '../../hooks/useScreenSize';

import './Text.scss';

const Text = ({
    textSize,
    textColor,
    textType,
    textAlign,
    otherStyles,
    children,
}) => {
    const screenSize = useScreenSize();

    let _fontSize;
    switch (textSize) {
        case 'sm':
            _fontSize = screenSize === 'mobile' ? 12 : 14;
            break;
        case 'md':
            _fontSize = screenSize === 'mobile' ? 16 : 22;
            break;
        case 'lg':
            _fontSize = screenSize === 'mobile' ? 22 : 30;
            break;
        case 'hero':
            _fontSize = screenSize === 'mobile' ? 55 : 75;
            break;
        default:
            break;
    }

    const _fontWeight = textSize === 'sm' ? 300 : textSize === 'md' ? 400 : 700;

    let _fontFamily;
    switch (textType) {
        case 'basic':
            _fontFamily = `'Inter', sans-serif`;
            break;
        case 'handwriting':
            _fontFamily = `'Reenie Beanie', cursive`;
            break;
        default:
            break;
    }

    return (
        <p
            style={{
                ...otherStyles,
                fontSize: `${_fontSize}px`,
                fontWeight: _fontWeight,
                fontFamily: _fontFamily,
                color: textColor,
                textAlign,
            }}
        >
            {children}
        </p>
    );
};

Text.defaultProps = {
    textSize: 'sm',
    textColor: '#FFFFFF',
    textType: 'basic',
    textAlign: 'left',
};

Text.propTypes = {
    textSize: PropTypes.string,
    textColor: PropTypes.string,
    textType: PropTypes.string,
    textAlign: PropTypes.string,
    otherStyles: PropTypes.object,
};

export default Text;
