import React from "react";
import { Button, Icon, Form, Input } from "antd";
import "./Team.scss";
import { validateURL } from "../../../utils/util";

class TeamCreateForm extends React.PureComponent {
  onSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.props.handleSubmit(values);
    });
  };
  
  validateURL = (rule, value, callback) => {
    if (validateURL(value)) {
      callback();
    } else {
      callback(true);
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>{this.props.action} Team</h3>
        <Form layout="vertical" onSubmit={this.onSubmit}>
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please enter your team name!"
                }
              ]
            })(<Input placeholder="Enter team name" />)}
          </Form.Item>
          {this.props.isShowcasable && (
            <Form.Item>
              {getFieldDecorator("showcase_url", {
                rules: [
                  {
                    required: true,
                    message: "Please enter showcaseable URL"
                  },
                  {
                    validator: this.validateURL,
                    message: "Please enter a valid URL"
                  }
                ]
              })(<Input placeholder="Enter showcaseable URL" />)}
            </Form.Item>
          )}
          <div className="create-team-button-wrapper">
            <Button className="create-team-button" htmlType="submit">
              <Icon type="usergroup-add" />
              Create
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

const WrappedCreateTeamForm = Form.create({ name: "team_create_form" })(
  TeamCreateForm
);
export default WrappedCreateTeamForm;
