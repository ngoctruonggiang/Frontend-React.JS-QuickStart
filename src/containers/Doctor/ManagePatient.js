import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../components/Input/DatePicker';
import { getAllPatientForDoctorService, sendRemedyService } from '../../services/userService';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';

class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(new Date().setHours(0, 0, 0, 0)),//để lấy đầu ngày thì mới so sánh được, chứ lấy cả giờ phút giây thì không thể bằng được
            dataPatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false,
        }
    }
    async componentDidMount() {
        await this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { selectedDate } = this.state;
        if (user && user.id) {
            let formatedDate = selectedDate.getTime();
            console.log('formatedDate:', formatedDate)
            let res = await getAllPatientForDoctorService(user.id, formatedDate)
            if (res && res.errCode === 0) {
                console.log('res from manage patient:', res)
                this.setState({
                    dataPatient: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.user !== this.props.user || prevState.selectedDate !== this.state.selectedDate) {
            await this.getDataPatient();
        }
    }
    //TODO: Khi thay doi ngay trong datePicker thì gọi lại getDataPatient() để lấy danh sách bệnh nhân của ngày đó
    //vì API chỉ lấy danh sách bệnh nhân của ngày hiện tại  //cần phải debug vì date được gửi sang API là dạng time stamp nên chỉ lấy được ngày hiện tại, cần phải chỉnh lại để lấy được ngày tương ứng với ngày đã chọn trong datePicker
    handleOnChangeDatePicker = (date) => {
        this.setState({ selectedDate: date[0] },
            () => {
                this.getDataPatient();
            }
        )
    }

    handleConfirm = (item) => {//item === dataPatient
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.User.email,
            timeType: item.timeType,
            patientName: item.User.lastName + ' ' + item.User.firstName
        }
        this.setState({ isOpenRemedyModal: true, dataModal: data })
    }
    closeModalRemedy = () => {
        this.setState({ isOpenRemedyModal: false })
    }

    sendRemedy = async (dataChild) => {
        console.log('ManagePatient check dataFromModal:', dataChild);
        let { dataModal } = this.state;
        let res = await sendRemedyService({
            email: dataChild.email,
            imageBase64: dataChild.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if (res && res.errCode === 0) {
            toast.success('Gửi đơn thuốc thành công');
            this.closeModalRemedy();
            await this.getDataPatient();//TODO: sau khi gửi đơn thuốc thì cần gọi lại API để load danh sách bệnh nhân
        } else {
            toast.error('Gửi đơn thuốc thất bại');
        }
        this.setState({ isOpenRemedyModal: false });
    }

    render() {
        let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        <FormattedMessage id="manage-patient.title" />
                    </div>
                    <div className="m-p-body row">
                        <div className="col-4">
                            <label>
                                <FormattedMessage id="manage-patient.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.selectedDate}//value la gia tri hien tai cua date picker duoc truyen vao selectDate state
                                className="form-control"
                                placeholderText={language === 'vi' ? "Chọn ngày" : "Choose date"}
                            />
                        </div>
                        <div className="col-12">
                            <div className="m-p-content">
                                <table className="table-manage-patient">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Họ tên</th>
                                            <th>Giới tính</th>
                                            <th>Số điện thoại</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    {
                                        dataPatient && dataPatient.length > 0 ? (
                                            dataPatient.map((item, index) => {
                                                let gender = language === 'vi' ? item.User.genderData.valueVi : item.User.genderData.valueEn;
                                                let time = language === 'vi' ? item.Allcode_Booking_TimeType.valueVi : item.Allcode_Booking_TimeType.valueEn;

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{time}</td>
                                                        <td>{item.User.lastName} {item.User.firstName}</td>
                                                        <td>{gender}</td>
                                                        <td>{item.User.phoneNumber}</td>
                                                        <td>
                                                            <button onClick={() => this.handleConfirm(item)} className="btn-confirm">Xác nhận</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="6" style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                            </tr>
                                        )
                                    }

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <RemedyModal
                    isOpen={isOpenRemedyModal}
                    dataModal={dataModal}
                    closeModal={this.closeModalRemedy}
                    sendRemedy={this.sendRemedy}//chi gui dinh nghia ham chu khong phai goi no luon
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
