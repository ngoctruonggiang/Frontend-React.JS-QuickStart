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
            allScheduleTime: [],
        }
    }
    componentDidMount() {
        this.setArrDays();
    }

    setArrDays = () => {
        let { language } = this.props;
        moment.locale(language);
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');//*lấy ngày tháng năm 7 ngày tới duoi dang timestamp
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
                    allScheduleTime: res.data
                })
            }
        }
    }
    render() {
        let { allDays } = this.state;
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
