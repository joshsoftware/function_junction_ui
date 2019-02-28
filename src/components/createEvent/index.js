import React, { PureComponent } from 'react';
import {
  InputWithLabel,
  InputNumberWithLabel,
  TextAreaWithLabel,
  DatePickerWithLabel,
  TimePickerWithLabel,
  SwitchWithLabel,
  CustomButton,
  CustomCard,
} from '../shared';
import { Row, Col, Icon } from 'antd';

class CreateEvent extends PureComponent {
    render() {
        const { title, description, venue, startDate, endDate, startTime, endTime, registerEndDate,
                isShowcasable, isIndividual, minSize, maxSize, changeHandler, redirectToBrowse, submitHandler } = this.props;
        return (
            <div className="container">
              <Row>
                <Col span={18} offset={3}>
                  <CustomCard title="Create Event" extra={<Icon type="close" onClick={() => redirectToBrowse()} />}>
                    <Row>
                      <InputWithLabel
                        label="Title of Event:"
                        placeholder="title"
                        name="title"
                        onChange={changeHandler}
                        value={title}
                      />
                      <Col span={2} />
                      <TextAreaWithLabel
                        label="Description:"
                        placeholder="description"
                        name="description"
                        onChange={changeHandler}
                        value={description}
                      />
                    </Row>
                    <Row className="margin20px">
                      <TextAreaWithLabel
                        label="Venue:"
                        placeholder="venue"
                        name="venue"
                        onChange={changeHandler}
                        value={venue}
                      />
                      <Col span={2} />
                      <DatePickerWithLabel
                        label="Register End Date:"
                        placeholder="Registartion End date"
                        name="registerEndDate"
                        onChange={changeHandler}
                        value={registerEndDate}
                      />
                    </Row>
                    <Row className="margin20px">
                      <DatePickerWithLabel
                        label="Start Date:"
                        placeholder="start date"
                        name="startDate"
                        onChange={changeHandler}
                        value={startDate}
                      />
                      <Col span={2} />
                      <TimePickerWithLabel
                        label="Start Time"
                        name="startTime"
                        onChange={changeHandler}
                        value={startTime}
                      />
                    </Row>
                    <Row className="margin20px">
                      <DatePickerWithLabel
                        label="End Date:"
                        placeholder="end date"
                        name="endDate"
                        onChange={changeHandler}
                        value={endDate}
                      />
                      <Col span={2} />
                      <TimePickerWithLabel
                        label="End Time"
                        name="endTime"
                        onChange={changeHandler}
                        value={endTime}
                      />
                    </Row>
                    <Row className="margin20px">
                      <SwitchWithLabel
                        label="Showcasable:"
                        name="isShowcasable"
                        onChange={changeHandler}
                        value={isShowcasable}
                      />
                      <Col span={2} />
                      <SwitchWithLabel
                        label="Individual:"
                        name="isIndividual"
                        onChange={changeHandler}
                        value={isIndividual}
                      />
                    </Row>
                    { !isIndividual && (
                      <Row className="margin20px">
                        <InputNumberWithLabel
                          label="Min size"
                          name="minSize"
                          onChange={changeHandler}
                          value={minSize}
                        />
                        <Col span={2} />
                        <InputNumberWithLabel
                          label="Max size"
                          name="maxSize"
                          onChange={changeHandler}
                          value={maxSize}
                        />
                      </Row>
                    )}
                    <Row className="margin20px">
                      <Col span={5} offset={9}>
                        <CustomButton
                          type="default"
                          onClick={submitHandler}
                          label="Save as draft"
                        />
                      </Col>
                      <Col span={3}>
                        <CustomButton
                          type="primary"
                          onClick={submitHandler}
                          label="Save and publish"
                        />
                      </Col>
                    </Row>
                  </CustomCard>
                </Col>
            </Row>
          </div>
        );
    }
}

export default CreateEvent;
