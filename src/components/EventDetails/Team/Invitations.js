import React from 'react';
import { Modal } from 'antd';
import Team from '../../Attendees/Team';

const invitations = ({
  visible,
  invites,
  handleAcceptReject,
  toggleModal,
  isInviteLoading
}) => {
  return (
    <>
      <Modal
        visible={visible || isInviteLoading}
        title='Invites'
        destroyOnClose
        footer={null}
        onCancel={toggleModal}
      >
        <div className='invite-team-wrapper'>
          {invites.map(invite => (
            <div key={invite.id} className='invitor-team'>
              <Team
                name={invite.name}
                description={invite.showcase_url}
                members={invite.members}
                isInvite
                handleAcceptReject={(value, memberId) =>
                  handleAcceptReject(value, invite.id, memberId)
                }
              />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};
export default invitations;
