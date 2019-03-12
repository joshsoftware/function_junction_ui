import React from 'react';
import { generateRandomColor } from '../../../utils/util';

const member = ({member}) => {
    const avatarStyle={
        backgroundColor: generateRandomColor(),
        borderRadius: '50%',
        width: '2rem',
        height: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    };
    return (
        <div className='flex-center m-1'>
            <div style={avatarStyle}>{member.email.charAt(0).toUpperCase()}</div>
            <div>{member.email}</div>
        </div>
    );
};
export default member;