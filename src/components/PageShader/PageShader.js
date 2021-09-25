import React from 'react';

import './PageShader.css';

function Shader({ height, position }) {
    return (
        <div
            className="shader"
            style={{ height: `clamp(60px, ${height}, 150px)`, position: position }}
        />
    );
}

Shader.defaultProps = {
    height: '10%',
    position: 'fixed'
};

export default Shader;
