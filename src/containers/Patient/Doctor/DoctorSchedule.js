import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';//*để moment hiểu tiếng việt
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorByDateService } from '../../../services/userService';

class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }
    componentDidMount() {
        this.setArrDays();
    }
    capitalizeFirstLetter(string) {//*viết hoa chữ cái đầu tiên
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setArrDays = () => {
        let { language } = this.props;
        moment.locale(language);
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                let lableVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(lableVi);
            } else {
                object.label = moment(new Date()).add(i, 'days').format('ddd - DD/MM');//*lấy ngày tháng năm 7 ngày tới
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();//*lấy giá trị timestamp (bỏ qua giờ, phút, giây (startOf('day') = 00:00:00))
            arrDate.push(object);
        }
        this.setState({
            allDays: arrDate
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays();
        }
    }
    //lay thong tin khi thay doi ngay
    handleOnChangeSelect = async (e) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = e;
            let res = await getScheduleDoctorByDateService(doctorId, date);
            console.log('res, e', res, e);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data
                })
            }
        }
    }
    render() {
        let { allDays, allAvailableTime } = this.state;
        let { language } = this.props;
        console.log('allAvailableTime', allAvailableTime);
        return (
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
                    <div className="calendar"><span><i className="fas fa-calendar-alt"></i>lịch khám</span></div>
                    <div className="time-content">
                        {allAvailableTime && allAvailableTime.length > 0 ? allAvailableTime.map((item, index) => {
                            return (
                                <button key={index} value={item.timeType}>{language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}</button>
                            )
                        }) : <span>{language === LANGUAGES.VI ? 'Không có lịch' : 'No schedule'}</span>}
                    </div>
                </div>
            </div>
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
