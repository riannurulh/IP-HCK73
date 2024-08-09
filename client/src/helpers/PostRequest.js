import axios from "axios";

const PostCreate = axios.create({
    baseURL: 'https://ip.vexus.my.id',
  });

  export default PostCreate