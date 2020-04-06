import React from 'react';
import styles from './styles/index.less';

const MenuLogo: React.FC<{
    src: string;
}> = ({ src }) => (
    <div className={styles.menuLogo}>
        <i className={styles.logoContainer}>
            <img src={src} alt=""/>
        </i>
    </div>
)

export default MenuLogo;
