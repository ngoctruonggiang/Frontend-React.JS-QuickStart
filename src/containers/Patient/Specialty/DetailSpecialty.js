//hien thi nhung gi ma patient nhin thay ve chuyên khoa
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [25, 22, 23],

        }
    }
    async componentDidMount() {


    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        console.log(this.state.arrDoctorId);


        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />

                    <div className='detail-specialty-header'>
                        Detail Specialty
                    </div>
                    <div className='detail-specialty-body'>
                        {this.state.arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorIdFromBookingModal={item}
                                                isShowDescriptionDoctor={true}
                                            />
                                        </div>

                                    </div>
                                    <div className='dt-content-right'>

                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
