//file nay de quan li lich lam viec cua bac si
import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../store/actions';
import { LANGUAGES } from '../../utils';
import DatePicker from '../../components/Input/DatePicker';
import moment from 'moment';//dung de format ngay thang
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
        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            this.setState({
                rangeTime: this.props.scheduleTime,
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
                                        <button className="btn btn-schedule" key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary btn-save-schedule"><FormattedMessage id="manage-schedule.save" /></button>
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
