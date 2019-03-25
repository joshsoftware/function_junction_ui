import RequestHandler from '../HTTP/';

export function getUser() {
    return RequestHandler.get('api/v1/users/info')
}