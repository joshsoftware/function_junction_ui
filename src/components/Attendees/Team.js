import React from 'react'
import { Empty, Avatar, Collapse, Icon } from 'antd';
import styled from 'styled-components';
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

const MemberContainer = styled.div `
    display: flex;
    padding: 2px 3px;
`;

const Avt = styled.div `
    padding: 3px 1px;
`;


const NameEmail = styled.div `
    display: flex;
    flex-direction: column;
    padding: 4px 4px;
`;
const Eml = styled.span `
    line-height: 13px;
    font-size: 11px;
    padding: 0px 6px;
    letter-spacing: 1px;
    color: #878d92;
`;
const Name = styled.span `
    padding: 0px 5px;
    line-height: 12px;
    color: #555a5a;
`;



function getMembers (members = []) {
    if (!members || members.length === 0) {
        return <Empty description="No team members found."/>
    }
    members = members.filter(member => member.status === 'Accepted');
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
    overflow: 'hidden',
  };

const Team = ({ members, name, description }) => {
    return (
        <>
            <Collapse
                // bordered={false}
                // defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
            >
             <Collapse.Panel header={name} key="1" style={customPanelStyle}>
                {description &&
                    <Desc>
                        {description}
                    </Desc>

                }
                {getMembers(members)}
            </Collapse.Panel>
        </Collapse> 
        </>
    );
}

export default Team;