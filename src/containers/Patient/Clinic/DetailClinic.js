//hien thi nhung gi ma patient nhin thay ve chuyên khoa
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailClinic.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailClinicByIdService } from '../../../services/userService';
import _ from 'lodash';
import { fetchProvinceStart } from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils/constant';


class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {//kiem tra xem co id tren url khong
            let id = this.props.match.params.id;//*lay id tu url
            let res = await getDetailClinicByIdService(id);

            if (res && res.errCode === 0 && !_.isEmpty(res.data)) {
                let arrDoctorId = [];
                if (res.data.doctorClinic && res.data.doctorClinic.length > 0) {
                    arrDoctorId = res.data.doctorClinic.map((item) => {
                        return item.doctorId;
                    })
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailClinic: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let imageBase64 = '';
        if (this.state.dataDetailClinic.image) {
            imageBase64 = new Buffer(this.state.dataDetailClinic.image, 'base64').toString('binary');
        }
        let language = this.props.language;

        return (
            <>
                <div className='detail-clinic-container'>
                    <HomeHeader />

                    <div className='detail-clinic-header' style={{ backgroundImage: `url(${imageBase64})` }}>
                        <div className='detail-info-clinic'>
                            <div className='detail-clinic-name'>
                                {this.state.dataDetailClinic.name}
                            </div>
                            <div className='detail-clinic-address'>
                                {this.state.dataDetailClinic.address}
                            </div>
                            <div className='detail-clinic-description'>
                                {this.state.dataDetailClinic.descriptionHTML && <div dangerouslySetInnerHTML={{ __html: this.state.dataDetailClinic.descriptionHTML }}></div>} {/*render markdown sang html*/}
                            </div>
                        </div>
                    </div>
                    <div className='detail-clinic-body'>
                        {this.state.arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorIdFromBookingModal={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
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
        allProvinces: state.admin.allProvinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvince: () => dispatch(fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
