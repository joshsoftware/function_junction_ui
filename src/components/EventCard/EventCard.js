import './EventCard.css'
import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
import moment from 'moment';
const { Meta } = Card;

const eventCard = ({id, title, desc, startDateTime, history, ...rest}) => {
  console.log('startDateTime:', startDateTime);
  return (
  <Card
    hoverable
    cover={<img alt="example" src="https://image.shutterstock.com/image-vector/vector-hand-drawn-acrylic-stroke-450w-450333322.jpg" />}
    // actions={[<Tooltip placement='top' title='Invite' ><Icon type="user" /></Tooltip>, <Tooltip placement='top' title='Edit'><Icon type="edit" /></Tooltip>]}
    onClick={() => history.push(`/event-details/${id}`)}
    {...rest}
  >
    <Meta
      avatar={<div><div>{moment(startDateTime).format('MMM DD YY')}</div><div>{moment(startDateTime).format('h:m:a')}</div></div>}
      title={title}
      description={desc}
    />
  </Card>
);}

export default eventCard;
