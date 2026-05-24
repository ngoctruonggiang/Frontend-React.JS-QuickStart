//TODO: file nay de render cac button chon ngay va cac button chon khung gio
import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';//*để moment hiểu tiếng việt
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import { FormattedMessage } from 'react-intl'
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],//*lấy danh sách ngày tháng
            allAvailableTime: [],
            isOpenModal: false,
            dataScheduleTimeModal: {},//*lấy dữ liệu để truyền vào modal
        }
    }
    async componentDidMount() {
        let allDays = this.getArrDays();
        this.setState({
            allDays: allDays
        });
        //gọi api để lấy lịch của bác sĩ mà không cần phải select
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            if (allDays && allDays.length > 0) {
                let res = await getScheduleDoctorByDateService(doctorId, allDays[0].value);
                if (res && res.errCode === 0) {
                    this.setState({
                        allAvailableTime: res.data
                    })
                }
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setState({
                allDays: this.getArrDays()
            })
        }
        if (prevProps.doctorIdFromParent !== this.props.doctorIdFromParent) {
            this.handleOnChangeSelect(this.state.allDays[0].value);
        }
    }
    capitalizeFirstLetter(string) {//*viết hoa chữ cái đầu tiên
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDays = () => {
        let { language } = this.props;
        moment.locale(language);
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = 'Hôm nay - ' + ddMM;//*lấy ngày chữ hôm nay
                    object.label = today;
                } else {
                    let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    object.label = this.capitalizeFirstLetter(lableVi);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').format('ddd - DD/MM');//*lấy ngày tháng năm 7 ngày tới
                }
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();//*lấy giá trị timestamp (bỏ qua giờ, phút, giây (startOf('day') = 00:00:00))
            allDays.push(object);
        }
        return allDays;

    }//*shold use setstate in constructor (one place)

    //lay thong tin khi thay doi ngay
    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e;
            let res = await getScheduleDoctorByDateService(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                })
            }
        }
    }
    handleClickScheduleTime = (item) => {
        this.setState({
            isOpenModal: true,
            dataScheduleTimeModal: item,
        })
    }
    closeModalBooking = () => {
        this.setState({
            isOpenModal: false,
        })
    }
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(e) => this.handleOnChangeSelect(e.target.value)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}>{item.label}</option>
                                )
                            })}
                        </select>

                    </div>
                    <div className="all-available-time">
                        <div className="calendar"><span><i className="fas fa-calendar-alt"></i><FormattedMessage id="patient.detail-doctor.schedule" /></span></div>
                        <div className="time-content">
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className="time-content-btns">
                                        {allAvailableTime.map((item, index) => {
                                            return (
                                                <button key={index} value={item.timeType}
                                                    className={language === LANGUAGES.VI ? 'btn-vie' : 'btn-en'}
                                                    onClick={() => this.handleClickScheduleTime(item)}
                                                >{language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                                            )
                                        })}
                                    </div>
                                    <div className="book-free">
                                        <span><FormattedMessage id="patient.detail-doctor.choose" /> <i className="fas fa-hand-point-up"></i> <FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                    </div>
                                </>
                                : <div className="no-schedule"><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>}
                        </div>
                    </div>
                </div>
                {/* Use modal in parallel with div doctor-schedule-container so it doesn't deconstruct layout */}
                <BookingModal
                    isOpenModalBooking={this.state.isOpenModal}
                    closeModalBooking={this.closeModalBooking}
                    dataScheduleTimeModal={this.state.dataScheduleTimeModal}
                />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
