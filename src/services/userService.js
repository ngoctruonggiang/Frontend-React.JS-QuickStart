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
//service tao user trong database 
const createNewUserService = (data) => {
    console.log("check data from service: ", data);
    return axios.post("/api/create-new-user", data);
}
//service xoa user trong database 
const deleteUserService = (userId) => {
    return axios.delete("/api/delete-user", {   
        data: {
            id: userId
        }
    });
}
export { handleLoginAPI, getAllUsers, createNewUserService, deleteUserService };
