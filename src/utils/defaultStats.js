import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

export const defaultStats = [
    {
        title:'pending applications',
        count: 24,
        icon: <FaSuitcaseRolling />,
        color: '#e9b949',
        bcg: '#fcefc7'
    },
    {
        title: 'interviews scheduled',
        count: 6,
        icon: <FaCalendarCheck />,
        color: '#647acb',
        bcg: '#e0e8fg'
    },
    {
        title: 'jobs declined',
        count: 3,
        icon: <FaBug/>,
        color: '#d66a6a',
        bcg: '#ffeeee'
    }
]