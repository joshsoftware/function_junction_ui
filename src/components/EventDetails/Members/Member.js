import React from 'react';
import { Icon } from 'antd'
import { generateRandomColor } from '../../../utils/util';
import { MEMBER_INVITE_STATUS } from 'UTILS/constants';

const memberStatus = {
    [MEMBER_INVITE_STATUS.ACCEPTED]: <Icon theme='filled' style={{ fontWeight: 700, fontSize: '1.2rem', color: '#41A746' }} type="check-circle" />,
    [MEMBER_INVITE_STATUS.REJECTED]: <Icon theme='filled' style={{ fontWeight: 700, fontSize: '1.2rem', color: '#FEC23B' }} type="close-circle" />,
    [MEMBER_INVITE_STATUS.PENDING]: <Icon theme='filled' style={{ fontWeight: 700, fontSize: '1.2rem', color: '#FEC23B' }} type="question-circle" />,
};

const Member = ({member}) => {
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
            <div style={avatarStyle}>{member.invitee.email.charAt(0).toUpperCase()}</div>
            <div>{member.invitee.name}</div>
            <div className='member-status'>{memberStatus[member.status]}</div>
        </div>
    );
};
export default Member;