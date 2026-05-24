import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils/constant';
import Select from 'react-select';
import { postBookAppointmentService } from '../../../../services/userService';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';


class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            doctorId: '',
            birthDay: '',
            selectedGender: '',
            gender: '',
            date: '',
            timeType: '',
            sendEmailDate: '',
            doctorFullName: ''
        }
    }
    async componentDidMount() {
        this.props.getGendersFromRedux();
        //* cap nhat doctorId khi nhan props tu component cha
        if (this.props.dataScheduleTimeModal) {
            this.setState({
                doctorId: this.props.dataScheduleTimeModal?.doctorId,
                date: this.props.dataScheduleTimeModal?.date,
                timeType: this.props.dataScheduleTimeModal?.timeType,
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genders !== this.props.genders || prevProps.language !== this.props.language) {
            this.setState({
                selectedGender: this.buildDataGender(this.props.genders)
            })
        }
        //* cap nhat doctorId khi chuyen qua lai giua cac bac si
        if (prevProps.dataScheduleTimeModal !== this.props.dataScheduleTimeModal) {
            let timeBooking = this.buildTimeBooking(this.props.dataScheduleTimeModal);
            console.log('timeBooking', timeBooking);
            this.setState({
                doctorId: this.props.dataScheduleTimeModal?.doctorId,
                date: this.props.dataScheduleTimeModal?.date,
                timeType: this.props.dataScheduleTimeModal?.timeType,
                sendEmailDate: timeBooking

            })
        }
    }
    //TODO: get value by language
    getValueByLanguage = (data) => {
        return this.props.language === LANGUAGES.VI ? data.valueVi : data.valueEn;
    }
    //TODO: capitalize first letter
    capitalizeFirstLetter(string) {//*viết hoa chữ cái đầu tiên
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    //* to data fit for select-option, label, value
    buildDataGender = (genders) => {
        let result = [];
        if (genders && genders.length > 0) {
            genders.forEach(item => {
                let obj = {};
                obj.label = this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result;
    }
    //handle on change input set state
    //*We create a copy of state and pass as argument of this.setState. Then react will compare the old state with the new state that we pass as argument and update the state if the new state is different from the old state.
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState(stateCopy);
    }

    handleOnChangeDatePicker = (date) => {
        console.log('date', date);
        this.setState({
            birthDay: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ gender: selectedOption });
    };
    //TODO: render time booking to put in modal
    buildTimeBooking = (dataScheduleTimeModal) => {
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = this.getValueByLanguage(dataScheduleTimeModal.timeTypeData);
            let date = +dataScheduleTimeModal.date;//convert timestamp from string to number
            let language = this.props.language;
            let result = language === LANGUAGES.VI ? ` ${time} - ${this.capitalizeFirstLetter(moment(date).format('dddd  - DD/MM/YYYY'))}` : ` ${time} - ${this.capitalizeFirstLetter(moment(date).locale('en').format('dddd - MM/DD/YYYY'))}`;//TODO: use moment library to format date
            return (
                result
            );
        }
        return '';
    }
    reciveDoctorFullNameFromProfileDoctorComponent = (fullName) => {
        this.setState({
            doctorFullName: fullName
        })
    }
    handleConfirmBooking = async () => {
        console.log('handleConfirmBooking');
        //validate input
        if (!this.state.fullName || !this.state.phoneNumber || !this.state.email || !this.state.address || !this.state.reason || !this.state.birthDay || !this.state.selectedGender) {
            toast.error(this.props.language === LANGUAGES.VI ? 'Vui lòng nhập đầy đủ thông tin' : 'Please enter full information');
            return;
        }
        let birthDay = moment(this.state.birthDay).format('YYYY-MM-DD');
        //call api
        let res = await postBookAppointmentService({
            fullName: this.state.fullName,
            doctorFullName: this.state.doctorFullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            birthDay: birthDay,
            gender: this.state.gender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.state.date,
            language: this.props.language,//TODO: send language to backend to handle language of email
            sendEmailDate: this.state.sendEmailDate//TODO: send human readable time booking to backend to send email
        })
        if (res && res.errCode === 0) {
            toast.success(this.props.language === LANGUAGES.VI ? 'Đặt lịch hẹn thành công' : 'Booking successful');
            this.props.closeModalBooking();
        } else {
            toast.error(this.props.language === LANGUAGES.VI ? 'Đặt lịch hẹn thất bại' : 'Booking failed');
        }
    }

    render() {
        let { isOpenModalBooking, closeModalBooking, dataScheduleTimeModal } = this.props;//*nhan props tu component cha
        let { language, genders } = this.props;
        // console.log('dataScheduleTimeModal', dataScheduleTimeModal);
        return (
            <>
                <Modal
                    isOpen={isOpenModalBooking}//*dong, mo modal bang cach nhan props tu component cha
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='booking-modal-title'><FormattedMessage id="patient.booking-modal.title" /></span>
                            <span className='float-right'
                                onClick={closeModalBooking}// when i click this, React does closeModalBooking() behind the scenes.
                            ><i className='fas fa-times'></i></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataScheduleTimeModal)} */}
                            <div className="doctor-info">
                                <ProfileDoctor
                                    doctorIdFromBookingModal={dataScheduleTimeModal?.doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataScheduleTimeModal={dataScheduleTimeModal}
                                    sendDoctorFullNameToBookingModal={this.reciveDoctorFullNameFromProfileDoctorComponent}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />

                            </div>

                            <div className="row">
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.full-name" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.phone-number" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.email" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.address" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.reason" /></label>
                                    <input type="text" className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.birth-day" /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.birthDay}//value la gia tri hien tai cua date picker duoc truyen vao selectDate state
                                        maxDate={new Date()}
                                        className="form-control"
                                        placeholderText="Chọn ngày"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label><FormattedMessage id="patient.booking-modal.gender" /></label>
                                    <Select
                                        value={this.state.gender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.selectedGender}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className='btn-booking-confirm'
                                onClick={this.handleConfirmBooking}
                            ><FormattedMessage id="patient.booking-modal.confirm" /></button>
                            <button className='btn-booking-cancel'
                                onClick={closeModalBooking}
                            ><FormattedMessage id="patient.booking-modal.cancel" /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGendersFromRedux: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
