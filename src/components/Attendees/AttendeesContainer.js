import React from 'react';
import { Row, Col, Empty } from 'antd';
import ErrorBoundary from '../shared/ErrorBoundary';
import User from './User';
import Team from './Team';
import './Attendees.scss';
import { isObjectEmpty } from '../../utils/util';

class Attendees extends React.Component {
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
                <ErrorBoundary name={`Team ${team.name}`} key={team.id}>
                    <Col lg={{ span:8, offset:1}} sm={{ span: 11, offset:1 }} key={team.id} style={{ marginBottom: 15}}>
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
                    <Col lg={{ span: 4}} sm={{ span: 11, offset: 1}} >
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
                {this.props.type && <div className="title">Attendees</div>}
                {!this.props.type && (
                    <div className="title">
                        Teams
                        <span>
                            {`(Min Size: ${this.props.event.min_size}, Max Size: ${this.props.event.max_size})`}
                        </span>
                    </div>
                )}
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