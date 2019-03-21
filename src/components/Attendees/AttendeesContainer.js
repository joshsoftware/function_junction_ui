import React, { PureComponent } from 'react';
import { Row, Col, Empty } from 'antd';
import ErrorBoundary from '../shared/ErrorBoundary';
import User from './User';
import Team from './Team';
import './Attendees.scss';
import { isObjectEmpty } from '../../utils/util';

class Attendees extends PureComponent {
    componentDidUpdate(prevProps) {
        if(isObjectEmpty(prevProps.event) && !isObjectEmpty(this.props.event)) {
            this.props.getAttendees(this.props.event.id);
        }
    }

    shouldComponentUpdate() {
        //TODO return true only if members changed
        return true;
    }

    getTeams = () => {
        const { attendees } = this.props;
        if (!attendees || attendees.length <= 0) {
            return (
                <Empty description="No teams yet registered for this event."/>
            );
        }

        return attendees.map(team => {
            return (
                <ErrorBoundary name={`Team ${team.name}`}>
                    <Col span={8} key={team.id} offset={1} style={{ marginBottom: 15}}>
                        <Team
                            name={team.name}
                            description={team.showcase_url}
                            members={team.members}
                        />
                    </Col>
                </ErrorBoundary>
            )
        })

    }

    getUsers = () => {
        const { members } = this.props;
        if (!members || members.length <= 0) {
            return (
                <Empty description="No user yet registered for event."/>
            );
        }
        const usersGoing = members.filter(member => member.status.toLowerCase() === 'accepted');
        return usersGoing.map(({invitee}) => {
            return (
                <ErrorBoundary name={`User ${invitee.name}`} key={invitee.user_id}>
                    <Col span={4} >
                        <div className="user-container">
                            <User
                                name={invitee.name}
                                email={invitee.email}
                            />
                        </div>
                    </Col>
                </ErrorBoundary>
            );
        })
    }

    getAttendeesDetails = () => {
        if (this.props.type) {
            return <> {this.getUsers()} </>;
        } 
        return (
           <>
           {this.getTeams()}
           </>
        );
    }

    render = () => (
        <div className="attendees-container">
            <ErrorBoundary name="Attendees">
                <div className="title">{this.props.type ? 'Attendees' : 'Teams'} </div>
                <div className="Single">
                    <Row>
                        {this.getAttendeesDetails()}
                    </Row>
                </div>
            </ErrorBoundary>
        </div>
    );
    
}

export default Attendees;