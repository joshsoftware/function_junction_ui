import React from 'react';
import { Modal, Form, Input } from 'antd';
import { SelectWithTags } from '../../shared';
import './CreateTeam.scss'

const TeamCreateForm = Form.create({ name: 'team_create_form' })(
    class extends React.Component {
        render() {
            const { handleClickCancel, handleClickOk, handleEmailChange, form } = this.props;
            const { getFieldDecorator } = form;
            return(
                <Modal
                    visible
                    title='Create Team'
                    okText='Create'
                    onCancel={handleClickCancel}
                    onOk={handleClickOk}
                >
                    <Form layout='vertical'>
                        <Form.Item label='Name'>
                            {
                                getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Please input the name of your team!' }]
                                })(
                                    <Input
                                        placeholder='Enter name of your team'
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item label='Members'>
                        {
                            getFieldDecorator('members', {
                                rules: [
                                    {required: true, message: 'Please input email id of team members!'},
                                    {
                                        validator: handleEmailChange,
                                        message: 'Please enter correct email id!'
                                    }
                                ]
                            })(
                                <SelectWithTags
                                    mode='tags'
                                    placeholder='Enter email id and press enter'
                                />
                            )
                        }
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);

export default TeamCreateForm;