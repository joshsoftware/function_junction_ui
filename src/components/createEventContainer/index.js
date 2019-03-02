import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { createEventInitiated } from '../../actions/event';
import CreateEvent from '../../components/createEvent';

class CreateEventContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          description: '',
          venue: '',
          startDate: null,
          endDate: null,
          registerBefore: null,
          isShowcasable: false,
          isIndividualParticipation: true,
          minSize: 1,
          maxSize: 1,
        }
    }

    redirectToBrowse = () => {
      this.props.history.push('/');
    }

    changeHandler = (key, value) => {
      this.setState({
        ...this.state,
        [key]: value,
      })
    }

    submitHandler = (isPublished) => {
      this.props.createEventInitiated({
        ...this.state,
        isPublished, 
      })
    }

    render() {
        return (
          <CreateEvent
            {...this.state}
            changeHandler={this.changeHandler}
            redirectToBrowse={this.redirectToBrowse}
            submitHandler={this.submitHandler}
          />
        );
    }
}

const mapStateToProps = (state) => ({
  events: state.events,
})

const mapDispatchToProps = (dispatch) => ({
  createEventInitiated: (data) => dispatch(createEventInitiated(data)),
})

export default connect(mapStateToProps, mapDispatchToProps) (CreateEventContainer);
