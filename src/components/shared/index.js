import React from 'react';
import moment from 'moment';
import {
  Input,
  DatePicker,
  TimePicker,
  Switch,
  InputNumber,
  Button,
  Card,
  Row,
  Col,
} from 'antd';

export const InputWithLabel = (props) => {
  const { placeholder, onChange, label, value } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={9}>
        <Input placeholder={placeholder} onChange={onChange} value={value} />
      </Col>
    </>
  )
}

export const InputNumberWithLabel = (props) => {
  const { placeholder, onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={9} align="left">
        <InputNumber min={1} onChange={onChange} placeholder={placeholder} />
      </Col>
    </>
  )
}

export const TextAreaWithLabel = (props) => {
  const { TextArea } = Input;
  const { placeholder, onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={9}>
        <TextArea placeholder={placeholder} onChange={onChange} rows={3} />
      </Col>
    </>
  )
}

export const DatePickerWithLabel = (props) => {
  const { placeholder, onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={9} align="left">
        <DatePicker placeholder={placeholder} onChange={onChange} />
      </Col>
    </>
  )
}

export const TimePickerWithLabel = (props) => {
  const { placeholder, onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={9} align="left">
        <TimePicker placeholder={placeholder} onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
      </Col>
    </>
  )
}

export const SwitchWithLabel = (props) => {
  const { onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={9} align="left">
        <Switch defaultChecked onChange={onChange} />
      </Col>
    </>
  )
}

export const CustomButton = (props) => {
  const { onClick, label, type } = props;
  return (
      <Button type={type} onClick={onClick}>{label}</Button>
  )
}

export const CustomCard = (props) => {
  const { title, children } = props;
  return (
      <Card title={title}>
        {children}
      </Card>
  )
}
