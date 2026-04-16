import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DoctorExtraInfor.scss';
import { getDoctorExtraInforService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from './DoctorSchedule';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
        }
    }
    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor } = this.state;
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address">Địa chỉ Khám
                        </div>
                        <div className="name-clinic">Phòng khám Vietlife Lê Thanh Nghị </div>
                        <div className="detail-address">Số 49 Lê Thanh Nghị, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội</div>
                    </div>
                    <div className="content-down">
                        {isShowDetailInfor === false &&
                            <>
                                <div className='short-infor'>
                                    GIÁ Khám: 300.000 VNĐ
                                    <span onClick={() => this.showHideDetailInfor(true)} style={{ cursor: 'pointer' }}>Xem chi tiết</span>
                                </div>

                            </>
                        }
                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'>Giá khám</div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'>
                                            GIÁ Khám:
                                        </span>
                                        <span className='right'>300.000 VNĐ</span>
                                    </div>
                                    <div className="note">Được ưu tiên khám trước</div>
                                </div>
                                <div className="payment">Tiền mặt</div>
                                <div className="hide-price">
                                    <span onClick={() => this.showHideDetailInfor(false)} style={{ cursor: 'pointer' }}>Ẩn bảng giá</span>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
