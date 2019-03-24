import React from 'react';
import { Input, DatePicker, Switch, Button, Icon } from 'antd';
import './index.scss';
const buttonStyle = {
    backgroundColor: '#ee4239',
    borderColor: '#ed4239',
}
const Container = ({ label, required, children }) => (
    <div className="jcontainer">
        <span>{label ? label : ''}</span>
        {required && <em>*</em>}
        {children}
    </div>
);

const DatePickerContainer = ({ label, required, children }) => (
    <div className="date-picker-container">
        <span className="label">{label ? label : ''}{required && <em>*</em>}</span>
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

export const JButton = ({ name, type, ...rest }) => (
    <Button type={type} {...rest} style={type === 'primary' ? buttonStyle : {}}>{name}</Button>
);