import React, { useContext } from 'react';
import styles from './styles/index.less';
import { GlobalContext } from 'src/context/common-context';

const MenuLogo: React.FC<{
    src: string;
    name: string;
}> = ({ src, name }) => {
    const { config } = useContext(GlobalContext);
    return (<div className={styles.menuLogo}>
        <i className={styles.logoContainer}>
            <img src={src} alt=""/>
        </i>
        {
            !config.collapsed && name &&  <span>{name}</span>
        }
    </div>
)
}
export default MenuLogo;
