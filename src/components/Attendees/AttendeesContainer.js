import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import ErrorBoundary from '../shared/ErrorBoundary';
import User from './User';
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

    getUserDetails = () => {
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