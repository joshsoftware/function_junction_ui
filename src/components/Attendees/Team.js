import React from 'react'
import { Empty, Avatar } from 'antd';
import styled from 'styled-components';


const TeamName = styled.div`
    text-align: center;
    font-weight: 800;
`;

const TeamContainer = styled.div`
    padding: 5px 10px;
    width: 180px;
`;

const Desc = styled.div`
    text-align: center;
    color: #65acc1;
    width: 160px;
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

const Eml = styled.div `
    padding: 5px 7px;
`;


function getMembers (members = []) {
    if (!members || members.length === 0) {
        return <Empty description="No team members found."/>
    }
    return members.map(({ email }) => (
        <MemberContainer>
            <Avt>
                <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    {email[0].toUpperCase()}
                </Avatar>
            </Avt>
            <Eml>
                <span>{email}</span>
            </Eml>
        </MemberContainer>
    ));
}

const Team = ({ members, name, description }) => {
    console.log(members);
    return (
        <TeamContainer>
            <TeamName>{name}</TeamName>
            {description &&
                <Desc>
                    {description}
                </Desc>

            }
            {getMembers(members)}
        </TeamContainer>
    );
}

export default Team;