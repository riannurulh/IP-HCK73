import axios from "axios";

const PostCreate = axios.create({
    baseURL: 'https://ip.patriapras.com',
  });

  export default PostCreate
