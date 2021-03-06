/* eslint-disable no-undef */

import handleError from './handleHTTPError';
import { showFailureNotification, showWarningNotification } from '../components/shared/Notification';
const hostName = window.origin || 'https://'.concat(window.location.hostname) || 'https://intranet.joshsoftware.com';
const API_BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/' : `${hostName}/`
export default class RequestHandler {
  // returns header object
  static getHeader(type, data = {}, isFile = false) {
    const header = {
      method: type,
      mode: 'cors',
      // credentials: 'same-origin',
      headers: {
        Accept: 'application/vnd.server.v1',
        'Content-Type': 'application/json',
        Cookie: 'asdasd:asdasd',
        // 'Cache': 'no-cache',
      },
      credentials: 'same-origin',
    };
    if (!isFile) {
      header.headers['Content-Type'] = 'application/json';
    }
    if (type !== 'get') {
      if (isFile) {
        header.body = data;
      } else {
        header.body = JSON.stringify(data);
      }
    }
    return header;
  }

  static isSuccess(response) {
    if (response.status === 401) {
      showWarningNotification('Seem\'s like you are not logged in to intranet.');
      if (window.location) {
        window.location.href = hostName;
      }
      return
    }
    if (!(response.ok || response.status === 200 || response.status === 201)) {
      // showFailureNotification(handleError(response));
      throw Error(response.statusText);
    }
    return response;
  }

  // HTTP Method get
  static get(action, params = '') {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}${action}${params}`, RequestHandler.getHeader('get'))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // HTTP Method post
  static post(action, data, isFile = false) {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}${action}`, RequestHandler.getHeader('post', data, isFile))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // HTTP Method put
  static put(action, data, isFile = false) {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}${action}`, RequestHandler.getHeader('put', data, isFile))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  // HTTP Method delete
  static delete(action) {
    return new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}${action}`, RequestHandler.getHeader('delete', {}))
        .then(RequestHandler.isSuccess)
        .then(response => resolve(response.json()))
        .catch((error) => {
          reject(error);
        });
    });
  }

  static fileUploadPost(action, payload) {
    return RequestHandler.post(action, payload, true);
  }

  static fileUploadPut(action, payload) {
    return RequestHandler.put(action, payload, true);
  }
}
