//hien thi nhung gi ma patient nhin thay ve chuyên khoa
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecialtyByIdService } from '../../../services/userService';
import _ from 'lodash';
import { fetchProvinceStart } from '../../../store/actions/adminActions';
import { LANGUAGES } from '../../../utils/constant';


class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: [],

        }
    }
    async componentDidMount() {
        await this.props.fetchProvince();

        if (this.props.match && this.props.match.params && this.props.match.params.id) {//kiem tra xem co id tren url khong
            let id = this.props.match.params.id;//*lay id tu url
            let location = "ALL";
            let res = await getDetailSpecialtyByIdService(id, location);

            if (res && res.errCode === 0 && !_.isEmpty(res.data)) {
                let arrDoctorId = [];
                if (res.data.doctorSpecialty && res.data.doctorSpecialty.length > 0) {
                    arrDoctorId = res.data.doctorSpecialty.map((item) => {
                        return item.doctorId;
                    })
                }

                let listProvince = [];
                if (res.data && res.data.doctorSpecialty && res.data.doctorSpecialty.length > 0) {
                    res.data.doctorSpecialty.forEach(item => {
                        if (item.provinceId && !listProvince.includes(item.provinceId)) {
                            listProvince.push(item.provinceId);
                        }
                    });
                }

                this.setState({
                    arrDoctorId: arrDoctorId,
                    dataDetailSpecialty: res.data,
                    listProvince: listProvince
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }
    //TODO: build dynamic data select suitable with province location for this specialty
    buildDataInputSelect = () => {
        let { allProvinces } = this.props;
        let { listProvince } = this.state;
        let result = [];
        if (allProvinces && allProvinces.length > 0) {
            allProvinces.forEach(item => {//build data select chi co nhung province ma no co doctor
                if (listProvince && listProvince.includes(item.keyMap)) {//lặp qua allProvinces, nếu có province id trong listProvince thì thêm vào result
                    let obj = {};
                    if (this.props.language === LANGUAGES.VI) {
                        obj.label = item.valueVi;
                    } else if (this.props.language === LANGUAGES.EN) {
                        obj.label = item.valueEn;
                    }
                    obj.value = item.keyMap;
                    result.push(obj);
                }
            });
        }

        return result;
    }

    handleOnChangeSelect = async (e) => {
        console.log('check e', e.target.value);
        let id = this.props.match.params.id;
        let location = e.target.value;
        let res = await getDetailSpecialtyByIdService(id, location);
        if (res && res.errCode === 0 && !_.isEmpty(res.data)) {
            let arrDoctorId = [];
            if (res.data.doctorSpecialty && res.data.doctorSpecialty.length > 0) {
                arrDoctorId = res.data.doctorSpecialty.map((item) => {
                    return item.doctorId;
                })
            }

            this.setState({
                arrDoctorId: arrDoctorId,
                dataDetailSpecialty: res.data
            })
        }
    }
    render() {

        let language = this.props.language;

        return (
            <>
                <div className='detail-specialty-container'>
                    <HomeHeader />

                    <div className='detail-specialty-header'>
                        <div className="detail-info-specialty">
                            {this.state.dataDetailSpecialty && this.state.dataDetailSpecialty.descriptionHTML && <div dangerouslySetInnerHTML={{ __html: this.state.dataDetailSpecialty.descriptionHTML }}></div>} {/*render markdown sang html*/}
                        </div>
                    </div>
                    <div className='detail-specialty-body'>
                        <div className='search-specialty'>
                            <select onChange={(e) => this.handleOnChangeSelect(e)}>
                                <option value="ALL">Toàn quốc</option>
                                {this.buildDataInputSelect().map((item, index) => {
                                    return (
                                        <option key={index} value={item.value}>{item.label}</option>
                                    );
                                })}
                            </select>
                        </div>
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
        allProvinces: state.admin.allProvinces,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchProvince: () => dispatch(fetchProvinceStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
