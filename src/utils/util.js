import moment from 'moment';

export function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        color += letters[Math.round(Math.random() * 10)];
    }
    return color;
}

export function isObjectEmpty(obj) {
  return obj && obj.constructor === Object && Object.entries(obj).length === 0;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isOldEvent(register_before) {
  return moment().diff(register_before, 'days') > 0;
}