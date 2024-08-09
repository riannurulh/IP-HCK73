import axios from "axios";

const PostCreate = axios.create({
    baseURL: 'http://54.252.147.220',
  });

  export default PostCreate