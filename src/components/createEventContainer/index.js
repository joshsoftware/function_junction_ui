import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { showFailureNotification } from '../shared/Notification';
import { createEventInitiated, updateEventInitiated, fetchEventInitiated } from 'ACTION/eventAction';
import CreateEvent from 'COMPONENTS/createEvent';

class CreateEventContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.id = null;

        this.state = {
          title: '',
          summary: '',
          description: '',
          venue: 'Josh Software',
          start_date_time: null,
          end_date_time: null,
          register_before: null,
          is_showcasable: false,
          is_individual_participation: true,
          min_size: 1,
          max_size: 1,
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
          summary: data.summary,
          description: data.description,
          venue: data.venue,
          start_date_time: moment(data.start_date_time),
          end_date_time: moment(data.end_date_time),
          register_before: moment(data.register_before),
          is_showcasable: data.is_showcasable,
          is_individual_participation: data.is_individual_participation,
          min_size: data.min_size,
          max_size: data.max_size,
        })
      }

      if(this.props.event.isUpdating && !nextProps.event.isUpdating) {
        this.redirectToBrowse();
      }
    }

    redirectToBrowse = () => {
      this.props.history.push('/functions/');
    }

    changeHandler = (key, value) => {
      this.setState({
        ...this.state,
        [key]: value,
      })
    }

    showError = (msg) => {
      showFailureNotification(msg);
    }

    dateDifference = (start, end) => {
      console.log(moment(start).diff(moment(end), 'minute'))
      if (moment(start).diff(moment(end), 'minute') >= 0) {
        return true;
      }
      return false;
    }

    validateForm = () => {
      const {
        title,
        summary,
        venue,
        description,
        start_date_time,
        end_date_time,
        register_before,
        is_showcasable,
        is_individual_participation,
        min_size,
        max_size,
      } = this.state;
      if (!title.trim()) {
        this.showError('Title is mandatory.');
        return false;
      }
      if (!summary.trim()) {
        this.showError('Summery is mandatory.');
        return false;
      }
      console.log(is_individual_participation, is_showcasable);
      if (!start_date_time) {
        this.showError('Start date is mandatory.');
        return false;
      }
      if (this.dateDifference(moment(), start_date_time)) {
        this.showError('Start date should not be in past.');
        return false;
      }
      if (!end_date_time) {
        this.showError('End date is mandatory.');
        return false;
      }
      if (!register_before) {
        this.showError('Registration end date is mandatory.');
        return false;
      }
      if (this.dateDifference(moment(), register_before)) {
        this.showError('Registration end date should not be in past.');
        return false;
      }
      if (this.dateDifference(start_date_time, register_before)) {
        this.showError('Registration should end before event start date.');
        return false;
      }
      if (this.dateDifference(start_date_time, end_date_time)) {
        this.showError('Event should end after start time.');
        return false;
      }


      if (is_showcasable && is_individual_participation) {
        this.showError('Show casing event should not be individual event. ');
        return false;
      }


    }

    submitHandler = (isPublished) => {
      if (!this.validateForm()) {
        return 0;
      }

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
