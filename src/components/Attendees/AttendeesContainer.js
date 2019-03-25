import React, { PureComponent } from 'react';
import { Row, Col, Empty } from 'antd';
import ErrorBoundary from '../shared/ErrorBoundary';
import User from './User';
import Team from './Team';
import './Attendees.scss';
import { isObjectEmpty } from '../../utils/util';

const Users = [
    {name: 'Suhas More', email: 'suhas@gmail.com'},
    {name: 'Ajit Fawade', email: 'ajit@gmail.com'},
    {name: 'Pragati Garud', email: 'pragati@gmail.com'},
    {name: 'Shweta Kale', email: 'shweta@gmail.com'},
    {name: 'Tanya Saroha', email: 'tanya@gmail.com'},
    {name: 'Priyanka Yadav', email: 'priyanka@gmail.com'},
    {name: 'Anusha Bhatt', email: 'suhas@gmail.com'},
]


class Attendees extends PureComponent {
    componentDidUpdate(prevProps) {
        if(isObjectEmpty(prevProps.event) && !isObjectEmpty(this.props.event)) {
            this.props.getAttendees(this.props.event.id);
        }
    }

    getTeams = () => {
        const { attendees } = this.props;
        if (!attendees || attendees.length <= 0) {
            return (
                <Empty description="No teams yet registered for event."/>
            );
        }

        return attendees.map(team => {
            return (
                <Col span={8} key={team.id}>
                    <Team
                        name={team.name}
                        description={team.showcase_url}
                        members={team.members}
                    />
                </Col>
            )
        })

    }

    getUserDetails = () => {
        console.log(this.props, "&&&&")
        if (this.props.type) {
            return Users.map(({name, email}) => {
                return (
                    <Col span={4} >
                        <div className="user-container">
                            <User
                                name={name}
                                email={email}
                            />
                        </div>
                    </Col>
                );
            })
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
                <div className="title">Attendees </div>
                <div className="Single">
                    <Row>
                        {this.getUserDetails()}
                    </Row>
                </div>
            </ErrorBoundary>
        </div>
    );
    
}

export default Attendees;