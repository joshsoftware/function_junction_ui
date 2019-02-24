import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const eventCard = () => <Card
hoverable
style={{ width: 440 }}
>
    <Meta
      title="Elastic Search Workshop"
      description="This event is organized internally by Josh"
    />
</Card>;

export default eventCard;
