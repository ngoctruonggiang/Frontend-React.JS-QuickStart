import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss';
import { getDetailDoctorService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            currentDoctorId: -1,
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {//kiem tra xem co id tren url khong
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id,
            })
            let res = await getDetailDoctorService(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            getDetailDoctorService(this.props.match.params.id);
        }
    }
    render() {
        let { language } = this.props;
        let { detailDoctor } = this.state;
        let nameVi = '';
        let nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        let imageBase64 = '';
        if (detailDoctor && detailDoctor.image) {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                        >
                        </div>
                        <div className="content-right">
                            <div className="up">
                                <h2>{language === LANGUAGES.VI ? nameVi : nameEn}</h2>
                            </div>
                            <div className="down">
                                {detailDoctor.doctorData && detailDoctor.doctorData.description && <span>{detailDoctor.doctorData.description}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor
                                doctorIdFromParent={this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className="detail-info-doctor">
                        {detailDoctor && detailDoctor.doctorData && detailDoctor.doctorData.contentHTML && <div dangerouslySetInnerHTML={{ __html: detailDoctor.doctorData.contentHTML }}></div>} {/*render markdown sang html*/}
                    </div>
                    <div className="comment-doctor">

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
