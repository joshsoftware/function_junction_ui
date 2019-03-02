import './EventCard.css'
import React from 'react';
import { Card, Icon, Tooltip } from 'antd';
const { Meta } = Card;

const eventCard = ({title, desc, ...rest}) => (
  <Card
    hoverable
    cover={<img alt="example" src="https://image.shutterstock.com/image-vector/vector-hand-drawn-acrylic-stroke-450w-450333322.jpg" />}
    actions={[<Tooltip placement='top' title='Invite' ><Icon type="user" /></Tooltip>, <Tooltip placement='top' title='Edit'><Icon type="edit" /></Tooltip>]}
    {...rest}
  >
    <Meta
      avatar={<div><div>March 15</div><div>10:00 AM</div></div>}
      title={title}
      description={desc}
    />
  </Card>
);

export default eventCard;
