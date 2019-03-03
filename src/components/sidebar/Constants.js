import routes from '../../utils/routes';
const MENU = [
    { name: 'All Events', icon: 'smile', path: `${routes.allEvents}` },
    { name: 'Upcoming Events', icon: 'smile',  path: `${routes.upcomingEvents}` },
    { name: 'My Events', icon: 'smile',  path: `${routes.myEvents}` },
]

export default MENU;