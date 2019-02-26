// add server URL here
let URL = `http://${process.env.SERVER_BASE_URL}`;
if (window.location.hostname === 'localhost') {
    URL = 'http://localhost:1337';
    // URL = 'http://34.212.20.211';
}
export const API_ROOT = URL;
