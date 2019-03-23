import React from 'react';
import { Button } from 'antd';
import { isOldEvent } from '../../utils/util';
const individualParticipation = ({ isGoing, toggleYesNo, register_before }) => <div>
    {
        !isOldEvent(register_before) ?
        <div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>Are you going?</div>
            <div className='yes-no-buttons-wrapper'>
                <Button
                    className='button yesButton'
                    type='ghost'
                    icon='check'
                    onClick={() => toggleYesNo(true)}
                >
                    Yes
                </Button>
                <Button
                    className='button noButton'
                    type='ghost'
                    icon='close'
                    onClick={() => toggleYesNo(false)}
                >
                    No
                </Button>
            </div>
        </div> :
        null
    }
</div>;

export default individualParticipation;