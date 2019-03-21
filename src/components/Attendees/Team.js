import React from 'react';
import { Empty, Avatar, Collapse, Icon, Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { MEMBER_INVITE_STATUS } from 'UTILS/constants';
const Panel = Collapse.Panel;
// import member from '../EventDetails/Members/Member';

// const TeamName = styled.div`
//     text-align: center;
//     font-weight: 800;
// `;

// const TeamContainer = styled.div`
//     padding: 5px 10px;
// `;

const Desc = styled.div`
  text-align: center;
  color: #65acc1;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MemberContainer = styled.div`
  display: flex;
  padding: 2px 3px;
`;

const Avt = styled.div`
  padding: 3px 1px;
`;

const NameEmail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 4px;
`;
const Eml = styled.span`
  line-height: 13px;
  font-size: 11px;
  padding: 0px 6px;
  letter-spacing: 1px;
  color: #878d92;
`;
const Name = styled.span`
  padding: 0px 5px;
  line-height: 12px;
  color: #555a5a;
`;



function getMembers (members = []) {
    if (!members || members.length === 0) {
        return <Empty description="No team members found."/>
    }
    members = members.filter(member => member.status.toLowerCase() === 'accepted');
    return members.map(({ invitee, id }) => (
        <li key={id}>
            <MemberContainer>
                <Avt>
                    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                        {invitee.email[0].toUpperCase()}
                    </Avatar>
                </Avt>
                <NameEmail>
                    <Name>
                        {invitee.name}
                    </Name>
                    <Eml>
                        {invitee.email}
                    </Eml>
                </NameEmail>
            </MemberContainer>
        </li>
    ));
}
const customPanelStyle = {
  background: '#ffffff',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};

function handleInvite (event, value, handler, memberId) {
    event.stopPropagation();
    handler(value, memberId)
}

const getInviteButtons = (isInvite, handleAcceptReject, members) => {
    const member = members.find(member => member.invitee.user_id === localStorage.getItem('id'));
  if (!isInvite) return null;
  return (
    <div>
      <Tooltip title='Accept Invite'>
        <Button
          style={{ marginRight: '1.2rem' }}
          shape='circle-outline'
          icon='check'
          onClick={event => handleInvite(event, true, handleAcceptReject, member.id)}
        />
      </Tooltip>
      <Tooltip title='Reject Invite'>
        <Button
          shape='circle-outline'
          icon='close'
          onClick={event => handleInvite(event, false, handleAcceptReject, member.id)}
        />
      </Tooltip>
    </div>
  );
};
const Team = ({ members, name, description, isInvite, handleAcceptReject }) => {
  return (
    <>
      <Collapse
        // bordered={!isInvite}
        // defaultActiveKey={['1']}
        expandIcon={({ isActive }) => (
          <Icon type='caret-right' rotate={isActive ? 90 : 0} />
        )}
      >
        <Panel
          header={name}
          key='1'
          style={customPanelStyle}
          extra={getInviteButtons(isInvite, handleAcceptReject, members)}
        >
          {description && <Desc>{description}</Desc>}
          {getMembers(members)}
        </Panel>
      </Collapse>
    </>
  );
};

export default Team;
