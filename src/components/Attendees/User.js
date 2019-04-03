import React from 'react';
import { Avatar, Tooltip } from 'antd';
import styled from 'styled-components';

const UserContainer = styled.div`
    display: flex;
    padding: 1px 3px;
    justify-content: center;
    text-align: center;
    flex-direction: column;
`;

const UserIcon = styled.div`
    padding: 16px 5px;
`;

const UserName = styled.div`
    padding: 0px 8px 20px;
`;

const Initials = styled.div`
    padding: 12px 0px;
`;
const Name = styled.div`
    width: 125px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 11px;
    color: #7a827f;
`;

const User = ({ img, name, email }) => (
    <UserContainer>
        <UserIcon>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}><Initials>{name[0]}</Initials></Avatar>
        </UserIcon>
        <Tooltip title={`${name} ${email}`}>
            <UserName>
                <Name>{name}</Name>
                <Name>
                    {email || 'NA'}
                </Name>
            </UserName>
        </Tooltip>
    </UserContainer>
);

export default User;
