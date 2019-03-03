import moment from 'moment';
const registrationDateFormat = {
    sameDay: '[Today] hh:mm a',
    nextDay: '[Tomorrow] hh:mm a',
    nextWeek: '[Upcoming] dddd hh:mm a',
    lastDay: '[Yesterday] hh:mm a',
    lastWeek: '[Last] dddd hh:mm a',
    sameElse: 'DD, MMM YYYY hh:mm a'
};

export function getFormatedDate(date) {
    return moment(date).calendar(null, registrationDateFormat)
}