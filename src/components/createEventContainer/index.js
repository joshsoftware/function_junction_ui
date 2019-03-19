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
