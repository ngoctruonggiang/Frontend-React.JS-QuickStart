//file nay de quan li lich lam viec cua bac si
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../store/actions';
import { LANGUAGES, dateFormat } from '../../utils';
import DatePicker from '../../components/Input/DatePicker';
import moment from 'moment';//dung de format ngay thang
import { toast } from 'react-toastify';
import { bulkCreateScheduleService } from '../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: { key: '', value: '' },
            selectedDate: '',
            rangeTime: [],

        }
    }
    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors),
            });
        }
        if (prevProps.language !== this.props.language) {
            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors),
            });
        }
        if (prevProps.scheduleTime !== this.props.scheduleTime) {//khi scheduleTime thay doi
            let data = this.props.scheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item,//copy tat ca thuoc tinh cua item
                    isSelected: false,//them thuoc tinh isSelected de check xem da duoc chon chua
                }));
            }
            this.setState({
                rangeTime: data,
            });
        }
    }
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                if (language === LANGUAGES.VI) {
                    object.label = `${item.lastName} ${item.firstName}`;
                } else {
                    object.label = `${item.firstName} ${item.lastName}`;
                }
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    }
    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor });// react-select truyen thang selected option object vao callback
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({ selectedDate: date[0] });
    }
    handleClickBtnTime = (time) => {
        let rangeTimeOnClick = this.state.rangeTime;
        if (rangeTimeOnClick && rangeTimeOnClick.length > 0) {
            rangeTimeOnClick = rangeTimeOnClick.map(item => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;//moi lan loop qua tung item thi return 1 item
            });
            console.log('check rangeTime', rangeTimeOnClick);
        }
        this.setState({
            rangeTime: rangeTimeOnClick,
        });
    }
    handleSaveSchedule = async () => {//ham nay de luu lich lam viec cua bac si
        let { selectedDoctor, selectedDate, rangeTime } = this.state;
        let result = [];
        //kiem tra xem da chon bac si va ngay nao chua
        if (!selectedDoctor.value) {
            toast.error('Please select a doctor');
            return;
        }
        if (!selectedDate) {
            toast.error('Please select a date');
            return;
        }
        let formatedDate = new Date(selectedDate);//? convert date to unix timestamp
        if (rangeTime && rangeTime.length > 0 && selectedDoctor && selectedDoctor.value) {
            // 1. Filter: Keep only items where isSelected is true
            // 2. Map: Transform those kept items into the final object shape
            result = rangeTime
                .filter(item => item.isSelected === true)
                .map(item => ({ //map qua tung item da duoc filter va return ra 1 object moi co key la doctorId, date, timeType
                    doctorId: selectedDoctor.value,
                    date: formatedDate,
                    timeType: item.keyMap,
                }));
        } else {
            toast.error('Invalid selected time');
            return;
        }
        let response = await bulkCreateScheduleService({
            arrSchedule: result,//truyen mot object co ten arrSchedule va gia tri la result
        });
        console.log('check response bulkCreateScheduleService', response);

        if (response && response.errCode === 0) {
            toast.success('Save info doctor success');
        } else {
            toast.error('Save info doctor failed');
        }
    }
    render() {
        let { rangeTime } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="manage-schedule-title">
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className="container">{/*dung bootstrap  */}
                        <div className="row">
                            <div className="col-6">
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <Select
                                    options={this.state.listDoctors}
                                    onChange={this.handleChangeSelect}
                                    placeholder="Chọn bác sĩ"
                                    value={this.state.selectedDoctor}//current selected option
                                />
                            </div>
                            <div className="col-6">
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.selectedDate}//value la gia tri hien tai cua date picker duoc truyen vao selectDate state
                                    minDate={new Date()}
                                    className="form-control"
                                    placeholderText="Chọn ngày"
                                />
                            </div>
                            <div className="pick-hour-container col-12">
                                {rangeTime && rangeTime.length > 0 && rangeTime.map((item, index) => {
                                    return (
                                        <button className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"} key={index}
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary btn-save-schedule"
                                    onClick={() => this.handleSaveSchedule()}
                                ><FormattedMessage id="manage-schedule.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        scheduleTime: state.admin.scheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
