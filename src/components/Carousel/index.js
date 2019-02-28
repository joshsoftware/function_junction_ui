import React  from 'react';
import { Carousel } from 'antd';
import './Carousel.scss';

const getItems = (items) => {
    return items.map(item => <div key={item}>{item}</div>)
}
const Slider = ({items}) => <Carousel dots autoplay effect="fade">
    {getItems(items || [1,2,3,4,5])}
</Carousel>

export default Slider;
