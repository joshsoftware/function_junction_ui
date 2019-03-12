import React from 'react';
import { Avatar } from 'antd';
import styled from 'styled-components';

const UserContainer = styled.div`
    display: flex;
    padding: 1px 3px;
`;

const UserIcon = styled.div`
    padding: 0px 5px;
`;

const UserName = styled.div`

`;

const Email = styled.div`
    font-size: 12px;
    font-style: italic;
`;

const User = ({ img, name, email }) => (
    <UserContainer>
        <UserIcon>
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{img || name[0]}</Avatar>
        </UserIcon>
        <UserName>
            <span>{name}</span>
            <Email>
                {email || 'NA'}
            </Email>
        </UserName>
    </UserContainer>
);

export default User;
