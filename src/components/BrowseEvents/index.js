import React, { PureComponent } from 'react';
import { Row, Col, Empty, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { fetchEventListInitiated } from 'ACTION/eventsAction';
import EventCard from '../../components/EventCard/EventCard';
import Slider from '../../components/Carousel';
import { getUser } from '../../actions/userDetailsAction';
import './BrowseEvents.scss';

const items=[
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//8d8a56/django/images/homepage/bg-desktop-snowglobe.jpg" alt="1" width="100%"/>,
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//8b6c63/django/images/homepage/bg-desktop-generationdiy.jpg" alt="2" width="100%"/>,
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//054546/django/images/homepage/bg-desktop-wanderlust.jpg" alt="3" width="100%"/>,
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//b41172/django/images/homepage/bg-desktop-rapoport.jpg" alt="4" width="100%"/>,
 ]

class BrowseEvents extends PureComponent {
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            name: cookies.get('_intranet_session')
        }
    }

    componentDidMount () {
        getUser()
        .then(data => {
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
        })
        .catch(error => {
            console.log(error)
        })
      this.props.fetchEventListInitiated();
    }

    getEventsCards = () => {
        const { events: { data, isLoading } } = this.props;
        if (isLoading) {
            return (
                <Row>
                    <Col lg={{ span: 7}} md={{span: 12}} className="loader">
                        <Skeleton active paragraph avatar />
                    </Col>
                    <Col lg={{ span: 7}} md={{span: 12}} className="loader">
                        <Skeleton active paragraph avatar />
                    </Col>
                    <Col lg={{ span: 7}} md={{span: 12}} className="loader">
                        <Skeleton active paragraph avatar />
                    </Col>
                </Row>
            )
        }
        if (!data || data.length === 0) {
            return <Empty description="No events found."/>;
        }
        return data.map(({id, title, description, ...rest}, index) => (
            <Col md={8} key={id}>
                <EventCard
                    title={title}
                    desc={description}
                    className="card-container"
                    id={id}
                    {...rest}
                    {...this.props}
                />
            </Col>
        ));
    };

    render() {
        return (
            <div className="container">
                <div className="slider">
                    <Slider items={items}/>
                </div>
                <div className="events">
                    <Row>
                      {this.getEventsCards()}
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  events: state.events,
})

const mapDispatchToProps = (dispatch) => ({
  fetchEventListInitiated: () => dispatch(fetchEventListInitiated()),
})

export default connect(mapStateToProps, mapDispatchToProps) (withCookies(BrowseEvents));
