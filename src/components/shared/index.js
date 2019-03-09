import React from 'react';
import moment from 'moment';

import { Input, DatePicker, Switch, InputNumber, Button, Card, Col, Spin } from 'antd';
import './index.css';

export const InputWithLabel = (props) => {
  const { placeholder, onChange, label, value, name } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={8}>
        <Input name={name} placeholder={placeholder} value={value}
          onChange={(event) => onChange(name, event.target.value)}  />
      </Col>
    </>
  )
}

export const InputNumberWithLabel = (props) => {
  const { name, value, placeholder, onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={8}>
        <InputNumber className="fullWidth" min={1} onChange={(number) => onChange(name, number)}
          placeholder={placeholder} name={name} value={value} />
      </Col>
    </>
  )
}

export const TextAreaWithLabel = (props) => {
  const { TextArea } = Input;
  const { name, value, placeholder, onChange, label } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={8}>
        <TextArea name={name} value={value} placeholder={placeholder} rows={3}
        onChange={(event) => onChange(name, event.target.value)} />
      </Col>
    </>
  )
}

export const DatePickerWithLabel = (props) => {
  const { placeholder, onChange, label, name, value } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={8}>
        <DatePicker name={name} value={value} className="fullWidth" placeholder={placeholder}
        onChange={(date) => onChange(name, date)} disabledTime={true} format="DD-MM-YYYY" />
      </Col>
    </>
  )
}

export const DateTimePickerWithLabel = (props) => {
  const { placeholder, onChange, label, name, value } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={8}>
        <DatePicker name={name} value={value} className="fullWidth" placeholder={placeholder}
        onChange={(date) => onChange(name, date)} disabledTime={false} format="DD-MM-YYYY HH:mm:ss"
        showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
      </Col>
    </>
  )
}

export const SwitchWithLabel = (props) => {
  const { onChange, label, name, value } = props;
  return (
    <>
      <Col span={3}>
        {label}
      </Col>
      <Col span={8}>
        <Switch checked={value} name={name} onChange={(checked) => onChange(name, checked)} />
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
  const { title, extra, children } = props;
  return (
      <Card className='card' title={title} extra={extra}>
        {children}
      </Card>
  )
}

export const Spinner = (props) => {
  return (
      <Spin />
  )
}
