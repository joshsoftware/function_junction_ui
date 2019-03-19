import React, { PureComponent } from "react";
import { Button, Icon, Form, Select } from "antd";
import { validateEmail } from "../../../utils/util";

class InviteMemberForm extends PureComponent {
  handleEmailChange = (rule, values, callback) => {
    if (values) {
      const isValidEmail = values.reduce((isEmail, email) => {
        isEmail = validateEmail(email);
        return isEmail;
      }, true);
      if (!isValidEmail) {
        callback(true);
        return;
      }
    }
    callback();
  };
  handleOnSubmit = e => {
    e.preventDefault();
    const form = this.props.form;
    form.validateFields((err, { members }) => {
      if (err) {
        return;
      }
      form.resetFields();
      console.log("EMAIL IDS:", members);
      this.props.handleSendInvites(members);
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form
        className="invite-members"
        layout="vertical"
        onSubmit={this.handleOnSubmit}
      >
        <Form.Item>
          {getFieldDecorator("members", {
            rules: [
              {
                required: true,
                message: "Please input email ids of team members!"
              },
              {
                validator: this.handleEmailChange,
                message: "Please enter correct email id!"
              }
            ]
          })(
            <Select
              className="email-input"
              mode="tags"
              placeholder="Enter email id and press enter"
            />
          )}
        </Form.Item>
        <Button htmlType="submit">
          Invite
          <Icon type="mail" />
        </Button>
      </Form>
    );
  }
}

const WrappedInviteMemberForm = Form.create({ name: "invite_member_form" })(
  InviteMemberForm
);
export default WrappedInviteMemberForm;
