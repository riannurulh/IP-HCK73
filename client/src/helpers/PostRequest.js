import axios from "axios";

const PostCreate = axios.create({
    baseURL: 'http://localhost:3000',
  });

  export default PostCreate