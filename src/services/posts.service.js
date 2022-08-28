import axios from 'axios';
const { API_BASE_URL } = process.env;

export default class PostsService {

  fetch;

  constructor() {
    this.fetch = axios.create({
        baseURL: process.env.API_BASE_URL,
        ...options
      })
  }

  getPosts = async () => {
    const {
      data: { data },
    } = await axios.get("http://localhost:9999/html");
    return data;
  };

  createPost = async (data) => {
    const resp = await axios.post("http://localhost:9999/html", { data });
    console.log("resp :>> ", resp);
    return resp;
  };

  get(route) {
    return this.fetch.get(route)
  }

  post(route, data) {
    return this.fetch.post(route, data)
  }

}
