import axios from "../axios";//de gui request len server va nhan response

const handleLoginAPI = (userEmail, userPassword) => {
  //goi server nodejs, dung package axios
  return axios.post("/api/login", { email: userEmail, password: userPassword });//email la key sever se check req.body.key => req.body.email
};

export { handleLoginAPI };
