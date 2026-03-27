import axios from "../axios";//de gui request len server va nhan response

const handleLoginAPI = (userEmail, userPassword) => {
  //goi server nodejs, dung package axios
  return axios.post("/api/login", { email: userEmail, password: userPassword });//email la key sever se check req.body.key => req.body.email
};

//lay thong tin tat cả user neu truyen inputId = 'ALL', con neu truyen inputId cu the thi lay thong tin user do
const getAllUsers = (inputId) => {
    //template string ?id=${inputId} => ?id=ALL
    return axios.get(`/api/get-all-users?id=${inputId}`) //truyen tham so vao url o dang object {key: value}

}
export { handleLoginAPI, getAllUsers };
