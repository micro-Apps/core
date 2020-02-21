import React from 'react';

const MenuLogo: React.FC<{
    src: string;
}> = ({ src }) => (
    <div className="menu-logo">
        <i className="logo-container">
            <img src={src} alt=""/>
        </i>
    </div>
)

export default MenuLogo;
