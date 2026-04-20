import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import { LANGUAGES } from '../../utils/constant';
import './VerifyEmail.scss';
import HomeHeader from '../HomePage/HomeHeader';
class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0,
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            })

            if (res && res.errCode !== undefined) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: -1,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.location.search !== prevProps.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId,
            })

            if (res && res.errCode !== undefined) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode,
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: -1,
                })
            }
        }
    }

    getMessageForVerifyResponseByLanguage = () => {
        let language = this.props.language;
        let errCode = this.state.errCode;

        if (language === LANGUAGES.VI) {
            switch (errCode) {
                case 0:
                    return 'Xác nhận lịch hẹn thành công!';
                case 2:
                    return 'Lịch hẹn đã được xác nhận hoặc không tồn tại!';
                default:
                    return 'Xác nhận lịch hẹn thất bại!';
            }
        } else {
            switch (errCode) {
                case 0:
                    return 'Verify email successfully!';
                case 2:
                    return 'The appointment has been confirmed or does not exist!';
                default:
                    return 'Verify email failed!';
            }
        }
    }

    render() {
        let { statusVerify } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    <div className="verify-email-content">
                        <div className="verify-email-header">
                            <h2>Verify Email</h2>
                        </div>
                        <div className="verify-email-body">
                            {statusVerify === false ?
                                <h4>Loading data...</h4>
                                :
                                <h4>{this.getMessageForVerifyResponseByLanguage()}</h4>
                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
