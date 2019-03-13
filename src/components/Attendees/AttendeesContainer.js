import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import ErrorBoundary from '../shared/ErrorBoundary';
import { fetchAttendeesInitiated } from 'ACTION/attendeesAction';
import User from './User';
import './Attendees.scss';
import { isObjectEmpty } from '../../utils/util';

const Users = [
    {name: 'Suhas More', email: 'suhas@gmail.com'},
    {name: 'Ajit Fawade', email: 'ajit@gmail.com'},
    {name: 'Shweta Kale', email: 'shweta@gmail.com'},
    {name: 'Tania More', email: 'taniya@gmail.com'},
    {name: 'Priyanak More', email: 'priyanka@gmail.com'},
    {name: 'Suhas More', email: 'suhas@gmail.com'},
    {name: 'Ajit Fawade', email: 'ajit@gmail.com'},
    {name: 'Shweta Kale', email: 'shweta@gmail.com'},
    {name: 'Tania More', email: 'taniya@gmail.com'},
    {name: 'Priyanak More', email: 'priyanka@gmail.com'},
    {name: 'Suhas More', email: 'suhas@gmail.com'},
    {name: 'Ajit Fawade', email: 'ajit@gmail.com'},
    {name: 'Shweta Kale', email: 'shweta@gmail.com'},
    {name: 'Tania More', email: 'taniya@gmail.com'},
    {name: 'Priyanak More', email: 'priyanka@gmail.com'},
]

class Attendees extends PureComponent {

    /* componentDidMount() {
        console.log('Props:', this.props.event);
        if (this.props.event.id ) {
            const { event } = this.props;
            console.log(event, "EEEEEEEE")
            this.props.getAttendees(event.id);
        }
    } */

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

function mapStateToProps({ attendees, event }, ownProps) {
    // console.log(ownProps.event, attendees, "STATE")
    return {
        attendees: attendees.data,
        event: ownProps.event
    }
}

function mapDespatchToProps(dispatch) {
    return {
        getAttendees: (eventID) => dispatch(fetchAttendeesInitiated(eventID))
    }
}

export default connect(mapStateToProps, mapDespatchToProps)(Attendees);