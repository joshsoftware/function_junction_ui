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
        const { isEdit, title, description, venue, start_date_time, end_date_time, register_before, is_showcasable,
           is_individual_participation, min_size, max_size, changeHandler, redirectToBrowse, submitHandler } = this.props;
        return (
            <div className="container">
              <Row>
                <Col span={18} offset={3}>
                  <CustomCard title={isEdit? "Update Event" : "Create Event"} extra={<Icon type="close" onClick={() => redirectToBrowse()} />}>
                    <Row>
                      <InputWithLabel
                        label="Title"
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
                      <DateTimePickerWithLabel
                        label="Registration Before"
                        placeholder="Registartion End Time"
                        name="register_before"
                        onChange={changeHandler}
                        value={register_before}
                      />
                    </Row>
                    <Row className="margin20px">
                      <DateTimePickerWithLabel
                        label="Start Date Time:"
                        placeholder="Start Time"
                        name="start_date_time"
                        onChange={changeHandler}
                        value={start_date_time}
                      />
                      <Col span={2} />
                      <DateTimePickerWithLabel
                        label="End Date Time:"
                        placeholder="End Time"
                        name="end_date_time"
                        onChange={changeHandler}
                        value={end_date_time}
                      />
                    </Row>
                    <Row className="margin20px">
                      <SwitchWithLabel
                        label="Showcasable:"
                        name="is_showcasable"
                        onChange={changeHandler}
                        value={is_showcasable}
                      />
                      <Col span={2} />
                      <SwitchWithLabel
                        label="Individual:"
                        name="is_individual_participation"
                        onChange={changeHandler}
                        value={is_individual_participation}
                      />
                    </Row>
                    { !is_individual_participation && (
                      <Row className="margin20px">
                        <InputNumberWithLabel
                          label="Min size"
                          name="min_size"
                          onChange={changeHandler}
                          value={min_size}
                        />
                        <Col span={2} />
                        <InputNumberWithLabel
                          label="Max size"
                          name="max_size"
                          onChange={changeHandler}
                          value={max_size}
                        />
                      </Row>
                    )}
                    <Row className="margin20px">
                      {/* <Col span={5} offset={9}>
                        <CustomButton
                          type="default"
                          onClick={() => submitHandler(false)}
                          label="Save as draft"
                        />
                      </Col> */}
                      <Col span={3} offset={11}>
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
