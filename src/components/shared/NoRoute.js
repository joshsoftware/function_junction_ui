import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 111px;
    text-align: center;
    padding: 5%;
    background: white;
    border: 1px solid #c3c2c2;
    border-radius: 20px;
    box-shadow: 4px 1px 15px 11px #e0e0e0;
`;
const Header = styled.div`
    font-weight: 700;
    letter-spacing: 1px;
    padding-bottom: 10px;
    color: #d63d44;
`;
const Redirect = styled.div`
    color: #7b7874;
    letter-spacing: 1px;
    margin: 1% 15% 1% 15%;
`;

const NoRoute = () => (
    <Row>
        <Col lg={{span:8, offset:8}} md={{ span: 20, offset: 2}} sm={{ span: 24}}>
            <Container>
                <Header>
                    The page you were looking for doesn't exist.
                </Header>
                <Redirect>
                    You may have mistyped the address or the page may have moved.
                </Redirect>
            </Container>
        </Col>
    </Row>
);

export default NoRoute;
