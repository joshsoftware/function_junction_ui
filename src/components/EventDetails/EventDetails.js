import React from 'react';
import { Divider, Tooltip } from 'antd';
import moment from 'moment';

const registrationDateFormat = {
    sameDay: '[Today] hh:mm a',
    nextDay: '[Tomorrow] hh:mm a',
    nextWeek: '[Upcoming] dddd hh:mm a',
    lastDay: '[Yesterday] hh:mm a',
    lastWeek: '[Last] dddd hh:mm a',
    sameElse: 'DD, MMM YYYY hh:mm a'
};

function getRegistrationLabel(date) {
    if (moment(date).diff(moment(), 'days') >= 0) {
        return 'Ends'
    }
    return 'Ended'

}


const EventDetails = ({
    ...rest
}) => (
    <div className="ev-container">
        <div className="ev-header">
            <EventHeader 
                {...rest}
            />
        </div>
        <div className="ev-details">
            <RegistrationDetails
                {...rest}
            />
        </div>
        <Divider/>
        <div className="ev-description">
            <EventDescription
                {...rest}
            />
        </div>
    </div>
);

const EventHeader = ({
    title,
    startDateTime
}) => (
    <>
        <div className="date">
            <span>{moment(startDateTime).format('D')}</span>
            <span>{moment(startDateTime).format('MMM')}</span>
        </div>
        <div className="title">
            <Tooltip title={title} placement="top">{title}</Tooltip>
        </div>
        
    </>
);

const RegistrationDetails = ({
    registerBefore,
    createdBy
}) => (
    <>
        <div className="register-before">
            <div>
                <span>Created By :</span> {createdBy.name}
            </div>
            <div>
                <span>{`Registration ${getRegistrationLabel(registerBefore)} on :`}</span> {moment(registerBefore).calendar(null, registrationDateFormat)}
            </div>
            
        </div>
    </>
);

const EventDescription = ({
    description
}) => (
    <div>
        {/* <iframe src={description}></iframe> */}
        {description}
    </div>
)

export default EventDetails;
