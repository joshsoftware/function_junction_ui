import React from 'react';
import { Divider, Tooltip, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { getFormatedDate } from './Constant';

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
    start_date_time,
    id,
    history,
    created_by
}) => (
    <>
        <div className="date">
            <span>{moment(start_date_time).format('D')}</span>
            <span>{moment(start_date_time).format('MMM')}</span>
        </div>
        <div className="title">
            <Tooltip title={title} placement="top">{title}</Tooltip>
        </div>
        { created_by &&  localStorage.getItem('id') === created_by.user_id
            && 
            (
                <div>
                    <Icon type="edit" theme="twoTone" onClick={() => history.push(`/functions/update/${id}`)}/>
                </div>
            )
        }
        
    </>
);

const RegistrationDetails = ({
    register_before,
    created_by
}) => (
    <>
        <div className="register-before">
            <div>
                { created_by && created_by.name.trim().length>0 && (
                    <>
                        <span>Created By :</span> {created_by.name}
                    </>
                    )
                }
            </div>
            <div>
                <span>{`Registration ${getRegistrationLabel(register_before)} on : `}</span>
                {getFormatedDate(register_before)}
            </div>
            
        </div>
    </>
);

const EventDescription = ({
    description
}) => (
    <div>
        {description || 'Description Not Available.'}
    </div>
)

export default withRouter(EventDetails);
