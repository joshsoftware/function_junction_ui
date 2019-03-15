import React from 'react';
import { Icon } from 'antd'
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
    const memberStatus = member.hasOwnProperty('accepted') ?
    member.accepted ?
        <Icon style={{ color: 'green' }} type="check-circle" /> :
        <Icon style={{ color: 'red' }} type="close-circle" /> :
    <Icon style={{ color: 'yellow' }} type="question-circle" />;
    return (
        <div className='flex-center m-1'>
            <div style={avatarStyle}>{member.email.charAt(0).toUpperCase()}</div>
            <div>{member.email}</div>
            <div className='member-status'>{memberStatus}</div>
        </div>
    );
};
export default member;