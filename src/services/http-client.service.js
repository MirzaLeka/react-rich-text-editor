import axios from 'axios';
const { API_BASE_URL } = process.env;

export default class HTTPClient {

  fetch;

  constructor() {
    this.fetch = axios.create({
        baseURL: API_BASE_URL,
      })
  }

  get(route) {
    return this.fetch.get(route)
  }

  post(route, data) {
    return this.fetch.post(route, data)
  }

}
