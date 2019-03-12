import React, { PureComponent } from 'react';
import { SelectWithTags } from '../../shared';
import { Icon } from 'antd';
import Member from './Member';
import Invite from './Invite'; 

class ShowMembers extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isAddingMember: false,
            inviteList: []
        }
    }
    toggleAddingMembers = () => {
        this.setState(oldState => { return {isAddingMember: !oldState.isAddingMember} });
    }
    handleSendInvites = () => {
        console.log('Invitee mails:', this.state.inviteList.toString());
        this.toggleAddingMembers();
        this.props.sendInvites(this.state.inviteList);
    }
    handleAddInvitees = (values) => {
        console.log('In Handle Change:', values);
        this.setState({ inviteList: values });
    }
    renderMembers = (members) => members.map(member => <Member key={member.email} member={member}/>);
    render = () => {
        return (
            <>
                <div className='flex-center mt-2'>
                    <span>Members</span>
                    <Icon onClick={this.toggleAddingMembers} type="plus-circle" />
                </div>
                {
                    this.state.isAddingMember &&
                    <Invite
                        handleChangeMembers={this.handleAddInvitees}
                        inviteList={this.state.inviteList}
                        handleSendInvites={this.handleSendInvites}
                    />                        
                }
                <div>
                    {this.renderMembers(this.props.members)}
                </div>
            </>
        );
    }
}
 
export default ShowMembers;