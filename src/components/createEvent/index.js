import React, { PureComponent } from 'react';
import { Row, Col, Icon, Divider } from 'antd';
import './index.scss';
import { JInput, JTextArea, JDatePicker, JSwitch, JButton } from '../shared';

class CreateEvent extends PureComponent {
    render() {
        const { isEdit, title, summary, description, venue, start_date_time, end_date_time, register_before, is_showcasable,
           is_individual_participation, min_size, max_size, changeHandler, redirectToBrowse, submitHandler } = this.props;
        return (
            <div className="event-container">
              <Row className="header">{isEdit? 'Update Event' : 'Create Event'}</Row>
              <Divider/>
              <div className="form">
                <Row>
                  <Col span={8}>
                    <JInput
                      label="Title"
                      placeholder="Title"
                      value={title}
                      onChange={({ target }) => changeHandler('title', target.value)}
                      required
                    />
                  </Col>
                  <Col span={15} offset={1}>
                    <JInput
                      label="Summary"
                      placeholder="One line event summary "
                      name="summary"
                      onChange={({ target }) => changeHandler('summary', target.value)}
                      value={summary}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <JInput 
                      label="Venue"
                      placeholder="Location"
                      value={venue}
                      onChange={({ target }) => changeHandler('venue',target.value)}
                    />
                  </Col>
                  <Col span={15} offset={1}>
                    <JTextArea
                      label="Description"
                      placeholder="Detailed event description..."
                      value={description}
                      onChange={({ target }) => changeHandler('description',target.value)}
                    />
                  </Col>
                </Row>
                <Divider> Event Date Time </Divider>
                <Row>
                  <Col span={5}>
                    <JDatePicker
                      label="Star Date Time"
                      placeholder="Start Date Time"
                      onChange={(date) => changeHandler('start_date_time', date)}
                      value={start_date_time}
                      showTime
                    />
                  </Col>
                  <Col span={5} offset={2}>
                    <JDatePicker
                      label="End Date Time"
                      placeholder="End Date Time"
                      onChange={(date) => changeHandler('end_date_time', date)}
                      value={end_date_time}
                      showTime
                    />
                  </Col>
                  <Col span={5} offset={3}>
                    <JDatePicker
                      label="Registration End Date"
                      placeholder="Register Before"
                      onChange={(date) => changeHandler('register_before', date)}
                      value={register_before}
                      showTime
                    />
                  </Col>
                </Row>
                <Divider>Event Type</Divider>
                <Row>
                  <Col span={5}>
                    <JSwitch
                      label="Show Casing"
                      onChange={(e) => changeHandler('is_showcasable', e)}
                      checked={is_showcasable}
                    />
                  </Col>
                  <Col span={5} offset={1}>
                    <JSwitch
                      label="Individual Event"
                      onChange={(e) => changeHandler('is_individual_participation', e)}
                      checked={is_individual_participation}
                    />
                  </Col>
                </Row>
                {!is_individual_participation && (
                  <Row>
                    <Col span={5}>
                      <JInput
                        label="Team Min Size"
                        type="number"
                        min={0}
                        onChange={({ target }) => changeHandler('min_size', target.value)}
                        value={min_size}
                      />
                    </Col>
                    <Col span={5} offset={1}>
                      <JInput
                        label="Team Max Size"
                        type="number"
                        min={0}
                        onChange={({ target }) => changeHandler('max_size', target.value)}
                        value={max_size}
                      />
                    </Col>
                  </Row>
                )}
                <Divider/>
                <Row style={{padding: 0}}>
                  <Col span={4} offset={8}>
                    <JButton
                      name={isEdit ? "Update Event" : "Create Event"}
                      type="primary"
                      onClick={() => submitHandler(true)}
                    />
                  </Col>
                  <Col span={4}>
                    <JButton
                      name="Cancel"
                      onClick={() => redirectToBrowse()}
                    />
                  </Col>
                </Row>
              </div>
              {/* <Row>
                <Col span={24}>
                  <CustomCard title={isEdit? "Update Event" : "Create Event"} extra={<Icon type="close" onClick={() => redirectToBrowse()} />}>
                    <Row className="margin20px">
                      <InputWithLabel
                        label="Venue:"
                        placeholder="Venue"
                        name="venue"
                        onChange={changeHandler}
                        value={venue}
                        // disabled
                      />
                      <Col span={2} />
                      <DateTimePickerWithLabel
                        label="Registration Before"
                        placeholder="Registration End Time"
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
                      <Col span={3} offset={11}>
                        <CustomButton
                          type="primary"
                          onClick={() => submitHandler(true)}
                          label={isEdit? "Update Event" :"Save and publish"}
                        />
                      </Col>
                    </Row>
                  </CustomCard>
                </Col>
            </Row> */}
          </div>
        );
    }
}

export default CreateEvent;
