import React, { Component } from 'react';
import ErrorBoundary from '../shared/ErrorBoundary';
import './Attendees.scss';

class Attendees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    render = () => (
        <div className="attendees-container">
            <ErrorBoundary name="Attendees">
                <div className="title">Attendees </div>
                {}
            </ErrorBoundary>
        </div>
    );
    
}

export default Attendees;