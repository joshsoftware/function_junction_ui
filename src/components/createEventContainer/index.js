import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { createEventInitiated, updateEventInitiated, fetchEventInitiated } from 'ACTION/event';
import CreateEvent from 'COMPONENTS/createEvent';

class CreateEventContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.id = null;

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

    componentWillMount () {
      this.id = this.props.match.params.id;
    }

    componentDidMount () {
      this.props.fetchEventInitiated(this.id);
    }

    componentWillReceiveProps (nextProps) {
      if(this.props.event.isLoading && !nextProps.event.isLoading) {
        const { data } = nextProps.event;
        this.setState({
          title: data.title,
          description: data.description,
          venue: data.venue,
          startDate: data.startDate,
          endDate: data.endDate,
          registerBefore: data.registerBefore,
          isShowcasable: data.isShowcasable,
          isIndividualParticipation: data.isIndividualParticipation,
          minSize: data.minSize,
          maxSize: data.maxSize,
        })
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
