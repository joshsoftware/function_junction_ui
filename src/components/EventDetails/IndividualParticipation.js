import React from 'react';
import { Button } from 'antd';
const individualParticipation = ({ handleRSVPClick, attending, isPastEvent, loading }) => {
    if (attending) {
        return  <div className={isPastEvent? "going-to-event disabled-b": "going-to-event"}>{isPastEvent? 'You have attended this event': 'You are going.'}</div>
    }

    return (
        <div>
            <div>
                <div className='yes-no-buttons-wrapper'>
                    <Button
                        className= {isPastEvent? "disabled-b button yesButton": 'button yesButton'}
                        type='ghost'
                        icon='check'
                        block
                        loading={loading}
                        onClick={isPastEvent? ()=>{}: handleRSVPClick}
                    >
                        RSVP
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default individualParticipation;
