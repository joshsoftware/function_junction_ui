import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import Member from './Member';
import Invite from './Invite';
import '../Team/Team.scss';

class ShowMembers extends PureComponent {
  state = {
    isAddingMember: false
  };

  toggleAddingMembers = () => {
    this.setState(oldState => {
      return { isAddingMember: !oldState.isAddingMember };
    });
  };

  handleSendInvites = inviteList => {
    this.toggleAddingMembers();
    this.props.sendInvites(inviteList);
  };

  renderMembers = members =>
    members.map(member => (
      <Member key={member.invitee.email} member={member} />
    ));

  render = () => {
    const { isPastEvent } = this.props;
    return (
      <>
        <div className='flex-center mt-2'>
          <div className='flex-center'>
            <span>Members</span>
            {!this.state.isAddingMember && !isPastEvent && (
              <Icon
                theme='twoTone'
                onClick={this.toggleAddingMembers}
                type='plus-circle'
              />
            )}
          </div>
          {this.state.isAddingMember && (
            <Icon
              theme='twoTone'
              style={{ marginLeft: 'auto' }}
              onClick={this.toggleAddingMembers}
              type='close-circle'
            />
          )}
        </div>
        {this.state.isAddingMember && (
          <Invite handleSendInvites={this.handleSendInvites} />
        )}
        <div className='members-wrapper'>
          {this.renderMembers(this.props.members)}
        </div>
      </>
    );
  };
}

export default ShowMembers;
