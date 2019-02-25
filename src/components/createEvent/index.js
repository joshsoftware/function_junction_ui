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
import { Row, Col } from 'antd';

class CreateEvent extends PureComponent {
    render() {
        const { changeHandler, submitHandler } = this.props;
        return (
            <Row>
              <Col span={18} offset={3}>
                <CustomCard title="Create Event">
                  <Row>
                    <InputWithLabel
                      label="Title of Event:"
                      placeholder="title"
                      onChange={changeHandler}
                      value={this.props.title}
                    />
                    <TextAreaWithLabel
                      label="Description:"
                      placeholder="description"
                      onChange={changeHandler}
                      value={this.props.description}
                    />
                  </Row>
                  <Row className="margin20px">
                    <TextAreaWithLabel
                      label="Venue:"
                      placeholder="venue"
                      onChange={changeHandler}
                      value={this.props.venue}
                    />
                  </Row>
                  <Row className="margin20px">
                    <DatePickerWithLabel
                      label="Start Date:"
                      placeholder="start date"
                      onChange={changeHandler}
                      value={this.props.startDate}
                    />
                    <DatePickerWithLabel
                      label="End Date:"
                      placeholder="end date"
                      onChange={changeHandler}
                      value={this.props.endDate}
                    />
                  </Row>
                  <Row className="margin20px">
                    <SwitchWithLabel
                      label="Showcasable:"
                      onChange={changeHandler}
                      value={this.props.isShowcasable}
                    />
                    <SwitchWithLabel
                      label="Individual:"
                      onChange={changeHandler}
                      value={this.props.isIndividual}
                    />
                  </Row>
                  <Row className="margin20px">
                    <InputNumberWithLabel
                      label="Min size"
                      onChange={changeHandler}
                      value={this.props.minSize}
                    />
                    <InputNumberWithLabel
                      label="Max size"
                      onChange={changeHandler}
                      value={this.props.maxSize}
                    />
                  </Row>
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
        );
    }
}

export default CreateEvent;
