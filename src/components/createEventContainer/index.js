import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { createEventInitiated, updateEventInitiated, fetchEventInitiated } from 'ACTION/eventAction';
import CreateEvent from 'COMPONENTS/createEvent';

class CreateEventContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.id = null;

        this.state = {
          title: '',
          description: '',
          venue: '',
          startDateTime: null,
          endDateTime: null,
          RegisterBefore: null,
          isShowcasable: false,
          isIndividualParticipation: true,
          minSize: 1,
          maxSize: 1,
        }
    }

    componentWillMount () {
      this.id = this.props.match.params.id;
    }

    componentDidMount () {
      if(this.id) {
        this.props.fetchEventInitiated(this.id);
      }
    }

    componentWillReceiveProps (nextProps) {
      if(this.props.event.isLoading && !nextProps.event.isLoading) {
        const { data } = nextProps.event;
        this.setState({
          title: data.title,
          description: data.description,
          venue: data.venue,
          startDateTime: moment(data.startDateTime),
          endDateTime: moment(data.endDateTime),
          RegisterBefore: moment(data.RegisterBefore),
          isShowcasable: data.isShowcasable,
          isIndividualParticipation: data.isIndividualParticipation,
          minSize: data.minSize,
          maxSize: data.maxSize,
        })
      }

      if(this.props.event.isUpdating && !nextProps.event.isUpdating) {
        this.redirectToBrowse();
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
      if(this.id) {
        this.props.updateEventInitiated({
          ...this.state,
          isPublished,
          id: this.id,
        })
      } else {
        this.props.createEventInitiated({
          ...this.state,
          isPublished,
        })
      }
    }

    render() {
        return (
          <CreateEvent
            {...this.state}
            isEdit={this.id}
            changeHandler={this.changeHandler}
            redirectToBrowse={this.redirectToBrowse}
            submitHandler={this.submitHandler}
          />
        );
    }
}

const mapStateToProps = (state) => ({
  event: state.event,
})

const mapDispatchToProps = (dispatch) => ({
  fetchEventInitiated: (id) => dispatch(fetchEventInitiated(id)),
  createEventInitiated: (data) => dispatch(createEventInitiated(data)),
  updateEventInitiated: (data) => dispatch(updateEventInitiated(data)),
})

export default connect(mapStateToProps, mapDispatchToProps) (CreateEventContainer);
