import React from 'react';




const navBadge = (props) => {

    let jum = 0 + parseInt( props.count );
   
    let navBadges = false;

    if (props.items.badge) {
        const badgeClass = ['label', 'pcoded-badge', props.items.badge.type];

        navBadges = (
            <span className={badgeClass.join(' ')}>
                {
                    props.items.badge.title === 'Baru' ? jum : props.items.badge.title 
                }
            </span>
        );
    }
    return navBadges;
};

export default navBadge;