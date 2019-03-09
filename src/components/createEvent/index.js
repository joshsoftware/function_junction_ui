import React, { PureComponent } from 'react';
import {
  InputWithLabel,
  InputNumberWithLabel,
  TextAreaWithLabel,
  DatePickerWithLabel,
  DateTimePickerWithLabel,
  SwitchWithLabel,
  CustomButton,
  CustomCard,
} from '../shared';
import { Row, Col, Icon } from 'antd';

class CreateEvent extends PureComponent {
    render() {
        const { isEdit, title, description, venue, startDateTime, endDateTime, RegisterBefore, isShowcasable,
           isIndividualParticipation, minSize, maxSize, changeHandler, redirectToBrowse, submitHandler } = this.props;
        return (
            <div className="container">
              <Row>
                <Col span={18} offset={3}>
                  <CustomCard title={isEdit? "Update Event" : "Create Event"} extra={<Icon type="close" onClick={() => redirectToBrowse()} />}>
                    <Row>
                      <InputWithLabel
                        label="Title of Event:"
                        placeholder="Title"
                        name="title"
                        onChange={changeHandler}
                        value={title}
                      />
                      <Col span={2} />
                      <TextAreaWithLabel
                        label="Description:"
                        placeholder="Description"
                        name="description"
                        onChange={changeHandler}
                        value={description}
                      />
                    </Row>
                    <Row className="margin20px">
                      <TextAreaWithLabel
                        label="Venue:"
                        placeholder="Venue"
                        name="venue"
                        onChange={changeHandler}
                        value={venue}
                      />
                      <Col span={2} />
                      <DatePickerWithLabel
                        label="Registration End Date:"
                        placeholder="Registartion End date"
                        name="RegisterBefore"
                        onChange={changeHandler}
                        value={RegisterBefore}
                      />
                    </Row>
                    <Row className="margin20px">
                      <DateTimePickerWithLabel
                        label="Start Date Time:"
                        placeholder="Start date and time"
                        name="startDateTime"
                        onChange={changeHandler}
                        value={startDateTime}
                      />
                      <Col span={2} />
                      <DateTimePickerWithLabel
                        label="End Date Time:"
                        placeholder="End date and time"
                        name="endDateTime"
                        onChange={changeHandler}
                        value={endDateTime}
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
                        name="isIndividualParticipation"
                        onChange={changeHandler}
                        value={isIndividualParticipation}
                      />
                    </Row>
                    { !isIndividualParticipation && (
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
                          onClick={() => submitHandler(false)}
                          label="Save as draft"
                        />
                      </Col>
                      <Col span={3}>
                        <CustomButton
                          type="primary"
                          onClick={() => submitHandler(true)}
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
