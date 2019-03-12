import React from 'react';
import { SelectWithTags } from '../../shared';
import { Select, Button, Icon } from 'antd'
const Option = Select.Option;

const inviteMember = ({inviteList, handleChangeMembers, handleSendInvites}) => {
    const options = inviteList.map((member, index) => {
        return <Option key={index}>{member.email}</Option>;
    });
    return (
        <div className='invite-members'>
            <SelectWithTags
                className='email-input'
                onChange={handleChangeMembers}
                placeholder='Type email id and press enter'
                style={{ width: '100%' }}
            >
                {options}
            </SelectWithTags>
            <Button onClick={handleSendInvites}>Invite<Icon type="mail" /></Button>
        </div>
    );
}
 
export default inviteMember;