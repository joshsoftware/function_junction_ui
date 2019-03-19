import React from 'react';
import { Input, DatePicker, Switch, Button, Icon } from 'antd';
import './index.scss';

const Container = ({ label, required, children }) => (
    <div className="jcontainer">
        <span>{label ? label : ''}</span>
        {required && <em>*</em>}
        {children}
    </div>
);

const DatePickerContainer = ({ label, required, children }) => (
    <div className="date-picker-container">
        <span className="label">{label ? label : ''}</span>
        {required && <em>*</em>}
        {children}
    </div>
)

export const JInput = (props) => (
    <Container {...props}>
        <Input {...props}/>
    </Container>
);

export const JTextArea = (props) => (
    <Container {...props}>
        <Input.TextArea {...props}/>
    </Container>
);

export const JDatePicker = (props) => (
    <DatePickerContainer {...props}>
        <DatePicker {...props} />
    </DatePickerContainer>
);

export const JSwitch = (props) => (
    <Container {...props} >
        <Switch
            checkedChildren={<Icon type="check"/>}
            unCheckedChildren={<Icon type="close" />}
            {...props} />
    </Container>
);

export const JButton = ({ name, ...rest }) => (
    <Button {...rest} >{name}</Button>
);