import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
// import Quotes from './Quotes';

import './EventCard.scss';
import { /* generateRandomColor, */ getRandomInt } from '../../utils/util';
import ErrorBoundary from '../shared/ErrorBoundary';

const { Meta } = Card;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 47px;
  text-align: -webkit-center;
  vertical-align: middle;
  display: table-cell;
`;

const Data = styled.div`
  color: #848181;
  width: 133px;
  height: 20px;
  font-weight: 600;
  overflow: hidden;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;


function getAvatar(startDateTime) {
  let eventDate = moment(startDateTime);
  let todaysDate = moment();
  let diff = todaysDate.diff(eventDate, "days");

  const DateContainer = styled.div`
    color: ${diff <= 0 ? '#299c3c' : '#ff3b00'};
    text-align: center;
    font-weight: 800;
    letter-spacing: 2px;
  `;

  return (
    <ErrorBoundary name="Event Date">
      <div className="card-avatar">
        <DateContainer>
          {moment(startDateTime).format('DD MMM YYYY')}
        </DateContainer>
        <div className="time">
          {moment(startDateTime).format('hh:mm a')}
        </div>
      </div>
    </ErrorBoundary>
  )
}

function getActionItems({ start_date_time, is_individual_participation, is_attending, venue }) {
  let EventType = <Icon style={{ fontSize: 16 }} type= {is_attending?"check":"team"}  title="Team Event"/>;
  if (is_individual_participation) {
    EventType =  <Icon style={{ fontSize: 16 }} type= {is_attending?"check":"user"} title="Individual Event"/>;
  }
  const color = is_attending ? '#0fa544' : '#848181';
  const VenueData = styled.div`
    color: ${color};
    width: 133px;
    height: 20px;
    font-weight: 600;
    overflow: hidden;
    overflow-x: hidden;
    text-overflow: ellipsis;
  `;

  
  const Venue = (
    <ErrorBoundary name="Venue Details">
      <Container>
        <Data>
          <Tooltip title={`Venue | ${venue} `}>
          <Icon style={{ fontSize: 16 }} type="home" /> {venue}
          </Tooltip>
        </Data>
      </Container>
    </ErrorBoundary>
  );
  const Team = (
    <ErrorBoundary name="Team Type">
      <Tooltip title={is_attending? "You are attending this event." : ''}>
        <Container>
          <VenueData>{EventType}</VenueData>
        </Container>
      </Tooltip>
    </ErrorBoundary>
  );
  return [getAvatar(start_date_time), Venue, Team]
}

function getCover(summary = 'No event summery defined') {
  const colors = ['#07ADD7', '#884B98','#98C857', '#ED6738'];
  const QuoteContainer = styled.div`
    background: ${colors[getRandomInt(0, colors.length-1)]};
    display: flex !important;
    align-items: center;
    justify-content: center;
    height: 200px;
    padding: 4%;
  `;
  const Quote = styled.div`
    color: white;
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
  `;
  
  return (
    <QuoteContainer>
      <Quote>
        {summary}
      </Quote>
    </QuoteContainer>
  )
}

const eventCard = ({id, title, desc, summary, history, ...rest}) => {
  return (
  <Card
    hoverable
    style={{ margin: 20 }}
    cover={getCover(summary)}
    actions={getActionItems(rest)}
    onClick={() => history.push(`/functions/event-details/${id}`)}
  >
    <Meta
      title={title}
    />
  </Card>
);}

export default eventCard;
