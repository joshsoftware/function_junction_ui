import React from "react";
import { Button, Icon, Form, Input } from "antd";
import styled from 'styled-components';
import "./Team.scss";
import { validateURL } from "../../../utils/util";

const TeamSizeContainer = styled.div`
  text-align: center;
  font-size: 11px;
  display: flex;
`;

const Team = styled.div`
  padding: 0px 7px
`;
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

  renderCreateTeam = getFieldDecorator =>
    !this.props.isOldEvent ? (
      <div>
        <h3 style={{ textAlign: "center" }}>{this.props.action} Team</h3>
        <Form layout="vertical" onSubmit={this.onSubmit} autoComplete="off">
          <Form.Item>
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please enter your team name!"
                }
              ]
            })(<Input placeholder="Enter team name" maxLength={25} />)}
          </Form.Item>
          {this.props.isShowcasable && (
            <Form.Item>
              {getFieldDecorator("showcase_url", {
              })(<Input placeholder="Enter showcaseable URL" maxLength={150} />)}
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
    ) : null;

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.renderCreateTeam(getFieldDecorator);
  }
}

const WrappedCreateTeamForm = Form.create({ name: "team_create_form" })(
  TeamCreateForm
);
export default WrappedCreateTeamForm;
