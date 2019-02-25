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
          minSize: 0,
          maxSize: 0,
        }
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
          submitHandler={this.submitHandler}
          />
        );
    }
}

export default CreateEventContainer;
