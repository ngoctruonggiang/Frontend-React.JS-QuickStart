import axios from "../axios"; //de gui request len server va nhan response

const handleLoginAPI = (userEmail, userPassword) => {
  //goi server nodejs, dung package axios
  return axios.post("/api/login", { email: userEmail, password: userPassword }); //email la key sever se check req.body.key => req.body.email
};

//lay thong tin tat cả user neu truyen inputId = 'ALL', con neu truyen inputId cu the thi lay thong tin user do
const getAllUsers = (inputId) => {
  //template string ?id=${inputId} => ?id=ALL
  return axios.get(`/api/get-all-users?id=${inputId}`); //truyen tham so vao url o dang object {key: value}
};
//service tao user trong database
const createNewUserService = (data) => {
  console.log("check data from service: ", data);
  return axios.post("/api/create-new-user", data);
};
//service xoa user trong database
const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
//service edit user trong database
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

//lay ra du lieu de fill vao cac the select trong phan them user
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
//lay ra danh sach cac bac si
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
//lay ra danh sach tat ca cac bac si
const getAllDoctorsService = () => {
  return axios.get(`/api/get-all-doctors`);
};
//luu thong tin chi tiet cua bac si
const saveDetailDoctorService = (data) => {
  return axios.post(`/api/post-info-doctor`, data);
};
//lay thong tin chi tiet cua bac si
const getDetailDoctorService = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctorService,
  getDetailDoctorService,
};
