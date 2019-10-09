import React from 'react';
import { Button, Popconfirm } from 'antd';
const individualParticipation = ({rsvp,  handleRSVPClick, attending, isPastEvent, loading }) => {
    if (attending || rsvp) {
        return  <div className={isPastEvent? "going-to-event disabled-b": "going-to-event"}>{isPastEvent? 'You have attended this event': 'You are going.'}</div>
    }

    return (
        <div>
            <div>
                <div className='yes-no-buttons-wrapper'>
                <Popconfirm title="Are you sure？" okText="Yes" cancelText="No" onConfirm={isPastEvent? ()=>{}: handleRSVPClick}>
                    <Button
                        className= {isPastEvent? "disabled-b button yesButton": 'button yesButton'}
                        type='ghost'
                        icon='check'
                        block
                        loading={loading}
                    >
                        RSVP
                    </Button>
                </Popconfirm>
                </div>
            </div>
        </div>
    );
};

export default individualParticipation;
