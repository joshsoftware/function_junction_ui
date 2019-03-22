import React, { PureComponent } from 'react';
import { Row, Col, Icon, Divider, Form } from 'antd';
import './index.scss';
import { JInput, JTextArea, JDatePicker, JSwitch, JButton } from '../shared';

class CreateEvent extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitHandler();
      }
    });
  }
    componentWillReceiveProps(nextProps) {
      console.log(nextProps.title, this.props.title);
      if (nextProps.title === this.props.title) {
        this.props.form.setFieldsValue({
          title: this.props.title
        })
      }
    }

    render() {
        const {isEdit, form : { getFieldDecorator }, is_showcasable, is_individual_participation, changeHandler, redirectToBrowse,
        title, summary, venue, description, start_date_time, end_date_time, register_before, min_size, max_size,
      } = this.props;
     
      console.log(title, "%%%");
        return (
            <div className="event-container">
              <Row className="header">{isEdit? 'Update Event' : 'Create Event'}</Row>
              <Divider/>
              <div className="form">
                <Form onSubmit={this.handleSubmit}>
                  <Row>
                    <Col span={8}>
                      <Form.Item>
                        {getFieldDecorator('title', {
                          rules: [{ required: true, message: 'Event name is mandatory.' }],
                        })(
                          <JInput
                            label="Title"
                            placeholder="Title"
                            // value={title}
                            // onChange={({ target }) => changeHandler('title', target.value)}
                          />)}
                      </Form.Item>
                    </Col>
                    <Col span={15} offset={1}>
                      <Form.Item>
                        {getFieldDecorator('summary', {
                          rules: [{ required: true, message: 'Event summary is mandatory.' }],
                        })(
                          <JInput
                            label="Summary"
                            placeholder="One line event summary "
                            name="summary"
                            value={summary}
                            onChange={({ target }) => changeHandler('summary', target.value)}
                          />
                        )}
                        </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={8}>
                      <Form.Item>
                        {getFieldDecorator('venue', {
                          rules: [{ required: true, message: 'Event venue is mandatory.' }],
                        })(
                        <JInput 
                          label="Venue"
                          placeholder="Location"
                          value={venue}
                          onChange={({ target }) => changeHandler('venue',target.value)}
                        />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={15} offset={1}>
                      <Form.Item>
                        {getFieldDecorator('description', {
                          rules: [{ required: false, message: 'Event venue is mandatory.' }],
                        })(
                          <JTextArea
                            label="Description"
                            placeholder="Detailed event description..."
                            value={description}
                            onChange={({ target }) => changeHandler('description',target.value)}
                          />
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider> Event Date Time </Divider>
                  <Row>
                    <Col span={5}>
                      <Form.Item>
                        {getFieldDecorator('start_date_time', {
                          rules: [{ required: true, message: 'Event start date is mandatory.' }],
                        })(
                          <JDatePicker
                            label="Star Date Time"
                            placeholder="Start Date Time"
                            value={start_date_time}
                            onChange={(date) => changeHandler('start_date_time', date)}
                            showTime
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={2}>
                      <Form.Item>
                        {getFieldDecorator('end_date_time', {
                          rules: [{ required: true, message: 'Event end date is mandatory.' }],
                        })(
                          <JDatePicker
                            label="End Date Time"
                            placeholder="End Date Time"
                            value={end_date_time}
                            onChange={(date) => changeHandler('end_date_time', date)}
                            showTime
                          />
                        )}
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={3}>
                      <Form.Item>
                        {getFieldDecorator('register_before', {
                          rules: [{ required: true, message: 'Event registration end date is mandatory.' }],
                        })(
                          <JDatePicker
                            label="Registration End Date"
                            placeholder="Register Before"
                            value={register_before}
                            onChange={(date) => changeHandler('register_before', date)}
                            showTime
                          />
                        )}
                      </Form.Item>
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
                        <Form.Item>
                          {getFieldDecorator('min_size', {
                            rules: [{ required: true, message: 'Minimum team size is mandatory.' }],
                          })(
                            <JInput
                              label="Team Min Size"
                              type="number"
                              min={0}
                              value={min_size}
                              onChange={({ target }) => changeHandler('min_size', target.value)}
                            />
                          )}
                        </Form.Item>
                      </Col>
                      <Col span={5} offset={1}>
                      <Form.Item>
                          {getFieldDecorator('max_size', {
                            rules: [{ required: true, message: 'Maximum team size is mandatory.' }],
                          })(
                            <JInput
                              label="Team Max Size"
                              type="number"
                              min={0}
                              value={max_size}
                              onChange={({ target }) => changeHandler('max_size', target.value)}
                            />
                          )}
                        </Form.Item>
                      </Col>
                    </Row>
                  )}
                  <Divider/>
                  <Row style={{padding: 0}}>
                    <Col span={4} offset={8}>
                      <JButton
                        name={isEdit ? "Update Event" : "Create Event"}
                        type="primary"
                        htmlType="submit"
                        // onClick={() => submitHandler(true)}
                      />
                    </Col>
                    <Col span={4}>
                      <JButton
                        name="Cancel"
                        onClick={() => redirectToBrowse()}
                      />
                    </Col>
                  </Row>
                </Form>
              </div>
          </div>
        );
    }
}

export default Form.create({name: 'event_create_form'})(CreateEvent);
