import './EventCard.css'
import React from 'react';
import { Card, Avatar, Icon, Tooltip } from 'antd';
const { Meta } = Card;
const eventCard = () => <Card
hoverable
cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
actions={[<Tooltip placement='top' title='Invite' ><Icon type="user" /></Tooltip>, <Tooltip placement='top' title='Edit'><Icon type="edit" /></Tooltip>]}
>
    <Meta
      // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      avatar={<div><div>March 15</div><div>10:00 AM</div></div>}
      title="Web Security"
      description="This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh"
    />
</Card>;

export default eventCard;
