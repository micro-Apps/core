import React from "react";
import UserAvatar from './UserAvatar';

import styles from './styles/index.less';

type GlobalHeader = React.FC;

const GlobalHeader: GlobalHeader = function GlobalHeader() {
    const name = 'Genluo';
    return (
        <div className={styles.globalHeaderContainer}>
            <UserAvatar name={name}/>
        </div>
    )
}

export default GlobalHeader;
