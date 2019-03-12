import React from 'react';
import { Avatar } from 'antd';
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

const Name = styled.div`
    padding: 12px 0px;
`;

const User = ({ img, name, email }) => (
    <UserContainer>
        <UserIcon>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}><Name>{name[0]}</Name></Avatar>
        </UserIcon>
        <UserName>
            <span>{name}</span>
            {/* <Email>
                {email || 'NA'}
            </Email> */}
        </UserName>
    </UserContainer>
);

export default User;
