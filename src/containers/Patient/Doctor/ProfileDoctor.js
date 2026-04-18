import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorByIdService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import NumberFormat from 'react-number-format';

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
    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let nameVi = '';
        let nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log('dataProfile', dataProfile);

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
                                {dataProfile && dataProfile.doctorData && dataProfile.doctorData.description && <span>{dataProfile.doctorData.description}</span>}
                            </div>
                        </div>
                    </div>
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
