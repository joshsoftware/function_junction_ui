import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import './EventCard.scss';

const { Meta } = Card;

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

  const Happen = styled.div`
    font-size: 10px;
    font-weight: 100;
    letter-spacing: 2px;
    text-align: center;
  `;

  return (
    <div className="card-avatar">
        {diff <= 0 ?
          <Happen>Happening on</Happen>
        :
          <Happen>Happened on</Happen>
        }
      <DateContainer>
        {/* <span className="month">{moment(startDateTime).format('MMM')}</span>
        <span className="month">{moment(startDateTime).format('DD - YYYY')}</span> */}
        {moment(startDateTime).format('DD MMM YYYY')}
      </DateContainer>
      <div className="time">
        {moment(startDateTime).format('hh:mm a')}
      </div>
    </div>
  )
}

const eventCard = ({id, title, desc, start_date_time, history, ...rest}) => {
  return (
  <Card
    hoverable
    style={{ margin: 20 }}
    cover={<img alt="example" src="https://image.shutterstock.com/image-vector/vector-hand-drawn-acrylic-stroke-450w-450333322.jpg" height="265px"/>}
    // actions={[<Tooltip placement='top' title='Invite' ><Icon type="user" /></Tooltip>, <Tooltip placement='top' title='Edit'><Icon type="edit" /></Tooltip>]}
    onClick={() => history.push(`/event-details/${id}`)}
  >
    <Meta
      avatar={getAvatar(start_date_time)}
      title={title}
      description={desc}
    />
  </Card>
);}

export default eventCard;
