import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorByIdService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let { doctorIdFromBookingModal } = this.props;
        this.getProfileDoctor(doctorIdFromBookingModal);
    }
    //TODO: tach ra 1 function rieng de handle logic
    async getProfileDoctor(doctorId) {
        if (doctorId) {
            let res = await getProfileDoctorByIdService(doctorId);
            if (res && res.errCode === 0) {
                this.setState({
                    dataProfile: res.data,
                });
            }
        }
    }
    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorIdFromBookingModal !== prevProps.doctorIdFromBookingModal) {
            let { doctorIdFromBookingModal } = this.props;
            this.getProfileDoctor(doctorIdFromBookingModal);
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
    //TODO: render time booking to put in modal
    renderTimeBooking = (dataScheduleTimeModal) => {
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = this.getValueByLanguage(dataScheduleTimeModal.timeTypeData);
            let date = +dataScheduleTimeModal.date;//convert timestamp from string to number
            let language = this.props.language;
            let result = language === LANGUAGES.VI ? ` ${time} - ${this.capitalizeFirstLetter(moment(date).format('dddd  - DD/MM/YYYY'))}` : ` ${time} - ${this.capitalizeFirstLetter(moment(date).locale('en').format('dddd - MM/DD/YYYY'))}`;//TODO: use moment library to format date
            return (
                <>
                    <div className="time-booking">
                        {result}
                    </div>
                    <div><FormattedMessage id="patient.extra-infor-doctor.book-free" /></div>
                </>
            );
        }
        return '';
    }
    render() {

        let { dataProfile } = this.state;
        let { language, dataScheduleTimeModal, isShowLinkDetail, isShowPrice, doctorIdFromBookingModal } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        //TODO: send doctor full name to booking modal (call back to parent component)
        if (this.props.sendDoctorFullNameToBookingModal) {
            this.props.sendDoctorFullNameToBookingModal(language === LANGUAGES.VI ? nameVi : nameEn);
        }

        return (
            <>
                <div className="profile-doctor-container">

                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${dataProfile.image ? dataProfile.image : ''})` }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                <h5>{language === LANGUAGES.VI ? nameVi : nameEn}</h5>
                            </div>

                            <div className="down">
                                {this.props.isShowDescriptionDoctor === true ?
                                    <>{dataProfile && dataProfile.doctorData && dataProfile.doctorData.description && <span>{dataProfile.doctorData.description}</span>}</>
                                    :
                                    <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
                                }
                            </div>
                        </div>
                    </div>
                    {isShowPrice &&
                        <div className="price">
                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                            {language === LANGUAGES.VI ?
                                <>
                                    <NumberFormat
                                        value={dataProfile?.doctorInforData?.priceData?.valueVi}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={' '}
                                        suffix={' VND'}
                                    />
                                </>
                                :
                                <>
                                    <NumberFormat
                                        value={dataProfile?.doctorInforData?.priceData?.valueEn}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={''}
                                        suffix={' $ '}
                                    />
                                </>
                            }

                        </div>
                    }
                    {isShowLinkDetail &&
                        <div className="more-info">
                            <Link to={`/detail-doctor/${doctorIdFromBookingModal}`}>xem theem</Link>
                        </div>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
