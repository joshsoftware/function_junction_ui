import './EventCard.css'
import React from 'react';
import { Card, Avatar, Icon, Tooltip } from 'antd';
const { Meta } = Card;

const eventCard = ({title, desc, history, ...rest}) => {
  console.log(rest);
  return (
  <Card
    hoverable
    cover={<img alt="example" src="https://image.shutterstock.com/image-vector/vector-hand-drawn-acrylic-stroke-450w-450333322.jpg" />}
    actions={[<Tooltip placement='top' title='Invite' ><Icon type="user" /></Tooltip>, <Tooltip placement='top' title='Edit'><Icon type="edit" /></Tooltip>]}
    onClick={() => history.push(`/event-details/${123}/${987}`)}
    {...rest}
  >
    <Meta
      avatar={<div><div>March 15</div><div>10:00 AM</div></div>}
      title={title}
      description={desc}
    />
  </Card>
);}

export default eventCard;
