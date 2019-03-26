import React from 'react';
import { Button } from 'antd';
import { isOldEvent } from '../../utils/util';
const individualParticipation = ({ isGoing, handleRSVPClick, attending }) => {

    if (attending) {
        return  <div className="going-to-event"> You are going.</div>
    }

    return (
        <div>
            <div>
                <div style={{ textAlign: 'center', marginBottom: '10px' }}>Want to attend?</div>
                <div className='yes-no-buttons-wrapper'>
                    <Button
                        className='button yesButton'
                        type='ghost'
                        icon='check'
                        block
                        onClick={handleRSVPClick}
                    >
                        RSVP
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default individualParticipation;