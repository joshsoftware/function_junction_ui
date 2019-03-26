import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
// import Quotes from './Quotes';

import './EventCard.scss';
import { /* generateRandomColor, */ getRandomInt } from '../../utils/util';

const { Meta } = Card;

// const Happen = styled.div`
//   font-size: 10px;
//   font-weight: 100;
//   letter-spacing: 2px;
//   text-align: center;
// `;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 47px;
  text-align: -webkit-center;
  vertical-align: middle;
  display: table-cell;
`;
// const Label = styled.span`
//   color: grey;
//   font-size: 12px;
//   letter-spacing: 1px;
// `;
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
    <div className="card-avatar">
        {/* {diff <= 0 ?
          <Label>Happening on</Label>
        :
          <Label>Happened on</Label>
        } */}
      <DateContainer>
        {moment(startDateTime).format('DD MMM YYYY')}
      </DateContainer>
      <div className="time">
        {moment(startDateTime).format('hh:mm a')}
      </div>
    </div>
  )
}

function getActionItems({ start_date_time, is_individual_participation, venue }) {
  let EventType = <Tooltip title ="Team Participation"><Icon style={{ fontSize: 16 }} type="team" /> </Tooltip>;
  if (is_individual_participation) {
    EventType = <Tooltip title ="Individual Participation"> <Icon style={{ fontSize: 16 }} type="user" title="Individual Event"/> </Tooltip>;
  }
  
  const Venue = (
    <Container>
      {/* <Label>Venue</Label> */}
      <Data>
        <Tooltip title="Venue">
        <Icon style={{ fontSize: 16 }} type="home" /> {venue}
        </Tooltip>
      </Data>
    </Container>
  );
  const Team = (
    <Container>
      {/* <Label>Event Participation</Label> */}
      <Data>{EventType}</Data>
    </Container>
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
  `;
  const Quote = styled.div`
    color: white;
    font-size: 20px;
    letter-spacing: 3px;
    font-weight: 600;
  `;
  // const By = styled.div`
  //   text-align: end;
  //   color: white;
  //   font-weight: 800;
  //   font-style: italic;
  //   letter-spacing: 1px;
  //   margin-top: 11px;
  // `;
  // const {saying, by} = Quotes[getRandomInt(0, Quotes.length -1)];

  return (
    <QuoteContainer>
      <Quote>
        {summary}
      </Quote>
      {/* <By>
        {`- ${by}`}
      </By> */}
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
      // avatar={getAvatar(start_date_time)}
      title={title}
      // description={desc || 'Description not available.'}
    />
  </Card>
);}

export default eventCard;
