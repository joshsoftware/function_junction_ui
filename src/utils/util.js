import moment from 'moment';
import { MEMBER_INVITE_STATUS } from 'UTILS/constants';

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateURL(url) {
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
  if (!re.test(url)) {
    return false;
  }
  return true;
}

export function generateRandomColor() {
  const letters = '0123456789'.split('');
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.round(Math.random() * 9)];
  }
  return color;
}

export function isObjectEmpty(obj) {
  if (!Object.keys) {
    Object.keys = (function() {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
          dontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
          ],
          dontEnumsLength = dontEnums.length;

      return function(obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }
  if (!Object.entries) {
    Object.entries = function( obj ){
      var ownProps = Object.keys( obj ),
          i = ownProps.length,
          resArray = new Array(i); 
      while (i--)
        resArray[i] = [ownProps[i], obj[ownProps[i]]];
      
      return resArray;
    };
  }
  return obj && obj.constructor === Object && Object.entries(obj).length === 0;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isOldEvent(register_before) {
  return moment().diff(register_before, 'minute') > 0;
}

export function getNameFromEmail(email) {
  return email.split("@")[0].split(".").join(" ")
}

export function getTeamMembers(payload, failedEmails) {
  const { emailIds, eventId } = payload;
  return emailIds.reduce((members, email) => {
    if (!failedEmails.includes(email)) {
      members.push({
        event_id: eventId,
        invitee: {
          email,
          name: getNameFromEmail(email),
        },
        inviter: {
          email: localStorage.getItem('email'),
          name: localStorage.getItem('name'),
          user_id: localStorage.getItem('id')
        },
        status: MEMBER_INVITE_STATUS.PENDING
      })
    }
    return members;
  }, []);
}

export function getSortedEvents (events) {
  return events.sort((event1, event2) => {
    return new Date(event2.start_date_time).getTime() - new Date(event1.start_date_time).getTime()
  });
}

export const getAscendingEvents = (eventList) => eventList.sort((firstEvent, secondEvent) => new Date(firstEvent.start_date_time).getTime() - new Date(secondEvent.start_date_time).getTime());
export const getDescendingEvents = (eventList) => eventList.sort((firstEvent, secondEvent) => new Date(secondEvent.start_date_time).getTime() - new Date(firstEvent.start_date_time).getTime());

export const getUpcomingEvents = (eventList) => eventList.filter((item) => new Date(item.start_date_time).getTime() >= new Date().getTime())

export const getPastEvents = (eventList) => eventList.filter((item) => new Date(item.start_date_time).getTime() < new Date().getTime())
