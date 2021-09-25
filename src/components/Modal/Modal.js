import React from 'react';

import './Modal.scss';

function Modal({ title, description, buttons, visible, figure }) {
    return (
        visible && (
            <div className="modal__wrapper">
                <div className="modal__background" />
                <div className="modal__container">
                    <h1 textSize="md" textColor="#000000">
                        {title}
                    </h1>
                    {description !== '' && (
                        <p textSize="sm" textColor="#000000">
                            {description}
                        </p>
                    )}
                    <div className="modal__buttons">
                        {buttons.map((button, index) => (
                            <button type="button" key={index} onClick={button.onClick}>
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
}

export default Modal;
