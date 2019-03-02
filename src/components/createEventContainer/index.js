import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { createEventInitiated, updateEventInitiated, fetchEventInitiated } from '../../actions/event';
import CreateEvent from '../../components/createEvent';

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
        //TODO: set state from nextprops event data
        this.setState({
          title: 'Title',
          description: 'description',
          venue: 'Venue',
          startDate: null,
          endDate: null,
          registerBefore: null,
          isShowcasable: false,
          isIndividualParticipation: true,
          minSize: 1,
          maxSize: 1,
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
