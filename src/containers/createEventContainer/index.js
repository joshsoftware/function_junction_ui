import React, { PureComponent } from 'react';
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
          registerEndDate: null,
          isShowcasable: false,
          isIndividual: true,
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

    submitHandler = () => {
      alert('create event!!')
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

export default CreateEventContainer;
