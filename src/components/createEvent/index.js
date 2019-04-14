import React, { PureComponent } from 'react';
import { Row, Col, Divider , Radio} from 'antd';
import styled from 'styled-components';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'medium-editor/dist/css/medium-editor.css';
// import 'medium-editor/dist/css/themes/default.css';
import './index.scss';
// import Editor from 'react-medium-editor';
 
import { JInput, JTextArea, JDatePicker, JSwitch, JButton } from '../shared';
import moment from 'moment';

const Summery = styled.span`
  color: #9c9790;
  padding-left: 1%;
  font-size: 11px;
`;

const timePickerConfig = { 
  use12Hours: true,
  format: 'hh:mm',
  minuteStep: 15,
  defaultValue: moment().hour(10).minute(0)
};

class CreateEvent extends PureComponent {
  disabledStartDate = (current) => {
    const { end_date_time } = this.props;
    if (end_date_time && current > moment(end_date_time)) {
        return true;
    }
    return current && current <= moment().subtract(1, 'day').endOf('m');
  }

  disableEndDate = (current) => {
    const { start_date_time } = this.props;
    if (start_date_time && current < moment(start_date_time)) {
      return true;
    }
    return current && current <= moment();
  }
    render() {
        const {onEditorStateChange, isLoading,  error, isEdit, title, summary, description, venue, start_date_time, end_date_time, register_before, is_showcasable,
           is_individual_participation, min_size, max_size, changeHandler, redirectToBrowse, submitHandler } = this.props;
        return (
          <>
            <div className="event-container">
              <Row className="header">{isEdit? 'Update Event' : 'Create Event'}</Row>
              <Divider/>
              <div className="form">
                <Row>
                  <Col lg={{span: 8}}>
                    <JInput
                      label="Title"
                      placeholder="Title"
                      value={title}
                      onChange={({ target }) => changeHandler('title', target.value)}
                      required
                    />
                  </Col>
                  <Col lg={{span: 15, offset:1}}>
                    <JInput
                      label="Summary"
                      placeholder="One line event summary "
                      name="summary"
                      onChange={({ target }) => changeHandler('summary', target.value)}
                      value={summary}
                      required
                    /><Summery>{150-summary.length} words left</Summery>
                  </Col>
                </Row>
                <Row>
                  <Col lg={{ span:8}}>
                    <JInput 
                      label="Venue"
                      placeholder="Location"
                      value={venue}
                      onChange={({ target }) => changeHandler('venue',target.value)}
                      required
                    />
                  </Col>
                  </Row>
                <Row>
                  <Col lg={{ span:24 }}>
                    <span className="desc">Description</span>
                    {/* Medium Editor */}
                    {/* <Editor
                      tag="pre"
                      text={description}
                      onChange={this.handleChange}
                      options={{toolbar: {buttons: ['bold', 'italic', 'underline', 'h1', 'h2', 'h3', 'quote']}}}
                    /> */}
                    <Editor
                      editorState={description}
                      wrapperClassName="demo-wrapper"
                      editorClassName="demo-editor"
                      onEditorStateChange={onEditorStateChange}
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        embedded:false 
                      }}
                    />
                    {/* <JTextArea
                      label="Description"
                      placeholder="Detailed event description..."
                      value={description}
                      onChange={({ target }) => changeHandler('description',target.value)}
                    /> */}
                  </Col>
                </Row>
                <Divider> Event Date Time </Divider>
                <Row>
                  <Col lg={{ span:5}} md={{ span: 12}}>
                    <JDatePicker
                      format="DD-MM-YYYY hh:mm a"
                      label="Star Date Time"
                      placeholder="Start Date Time"
                      onChange={(date) => changeHandler('start_date_time', date)}
                      value={start_date_time}
                      defaultPickerValue={end_date_time ? moment(end_date_time).subtract(3,'hours'): moment()}
                      disabledDate={this.disabledStartDate}
                      showTime={timePickerConfig}
                      required
                    />
                  </Col>
                  <Col lg={{ span:5, offset:2}} md={{span: 12}}>
                    <JDatePicker
                      format="DD-MM-YYYY hh:mm a"
                      label="End Date Time"
                      placeholder="End Date Time"
                      onChange={(date) => changeHandler('end_date_time', date)}
                      value={end_date_time}
                      defaultPickerValue={start_date_time ? moment(start_date_time).add(3,'hours'): moment()}
                      disabledDate={this.disableEndDate}
                      showTime={timePickerConfig}
                      required
                    />
                  </Col>
                  <Col lg={{span:5, offset:3}} md={{span:24}}>
                    <JDatePicker
                      format="DD-MM-YYYY hh:mm a"
                      label="Registration End Date"
                      placeholder="Register Before"
                      onChange={(date) => changeHandler('register_before', date)}
                      value={register_before}
                      disabledDate={this.disabledStartDate}
                      showTime={timePickerConfig}
                    />
                  </Col>
                </Row>
                <Divider>Event Type</Divider>
                <Row>
                  <Col lg={{span: 6}}>
                    <JSwitch
                      label="Is Show-casable"
                      onChange={(e) => changeHandler('is_showcasable', e)}
                      checked={is_showcasable}
                      disabled={isEdit}
                    />
                  </Col>
                  <Col lg={{span: 6, offset:1}}>
                    <Radio.Group 
                      options={[{ label: 'Individual Event', value: true}, {label: 'Team Event', value: false},]}
                      onChange={(e) => changeHandler('is_individual_participation', e.target.value)}
                      value={is_individual_participation}
                      disabled={isEdit}
                      />
                  </Col>
                </Row>
                {!is_individual_participation && (
                  <Row>
                    <Col lg={{span:5}}>
                      <JInput
                        disabled={isEdit}
                        label="Team Min Size"
                        type="number"
                        min={0}
                        onChange={({ target }) => changeHandler('min_size', target.value)}
                        value={min_size}
                      />
                    </Col>
                    <Col lg={{span:5, offset: 1}}>
                      <JInput
                        disabled={isEdit}
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
                {error && <Row>
                  <div className="error-message">{error}</div>
                </Row>
                }
                <Row style={{padding: 0}}>
                  <Col lg={{span:4, offset:8}}>
                    <JButton
                      name={isEdit ? "Update Event" : "Create Event"}
                      type="primary"
                      onClick={() => submitHandler(true)}
                      loading={isLoading}
                    />
                  </Col>
                  <Col lg={{span:4}}>
                    <JButton
                      name="Cancel"
                      onClick={() => redirectToBrowse()}
                    />
                  </Col>
                </Row>
              </div>
          </div>
          </>
        );
    }
}

export default CreateEvent;
