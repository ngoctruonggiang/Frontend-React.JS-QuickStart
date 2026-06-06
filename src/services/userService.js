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
//tao lich kham cho bac si
const bulkCreateScheduleService = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
//lay lich kham cua bac si theo ngay
const getScheduleDoctorByDateService = (doctorId, date) => {
  return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
};
//lay thong tin chi tiet cua bac si
const getExtraInforDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
//lay thong tin profile cua bac si
const getProfileDoctorByIdService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
//tao lich kham cho bac si
const postBookAppointmentService = (data) => {
  return axios.post(`/api/patient-book-appointment`, data);
};
//xac nhan dat lich kham
const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};
//tao chuyen khoa
const createSpecialtyService = (data) => {
  return axios.post(`/api/create-new-specialty`, data);
};
//tao phong kham
const createClinicService = (data) => {
  return axios.post(`/api/create-new-clinic`, data);
};
//lay ra danh sach tat ca cac chuyen khoa
const getAllSpecialtyService = () => {
  return axios.get(`/api/get-all-specialty`);
};
//lay ra danh sach tat ca cac phong kham
const getAllClinicService = () => {
  return axios.get(`/api/get-all-clinic`);
};
//lay ra danh sach tat ca cac chuyen khoa theo location
const getDetailSpecialtyByIdService = (inputId, location) => {
  return axios.get(`/api/get-detail-specialty-by-id?id=${inputId}&location=${location}`);
};
//lay ra danh sach tat ca cac phong kham theo location
const getDetailClinicByIdService = (inputId) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${inputId}`);
};
//lay ra danh sach tat ca cac benh nhan
const getAllPatientForDoctorService = (doctorId, date) => {
  return axios.get(`/api/get-list-patient-for-doctor?doctorId=${doctorId}&date=${date}`);
};
//gui don thuoc cho benh nhan
const sendRemedyService = (data) => {
  return axios.post(`/api/send-remedy`, data);
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
  bulkCreateScheduleService,
  getScheduleDoctorByDateService,
  getExtraInforDoctorByIdService,
  getProfileDoctorByIdService,
  postBookAppointmentService,
  postVerifyBookAppointment,
  createSpecialtyService,
  getAllSpecialtyService,
  createClinicService,
  getAllClinicService,
  getDetailSpecialtyByIdService,
  getDetailClinicByIdService,
  getAllPatientForDoctorService,
  sendRemedyService,

};
