import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import { getExtraInforDoctorByIdService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfor: {}
        }
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {
        //TODO: get extra infor of doctor
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorByIdService(this.props.doctorIdFromParent);
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    //TODO: get extra infor value by language
    getValueByLanguage = (data) => {
        if (!data) return '';
        let { language } = this.props;
        return language === LANGUAGES.VI ? data.valueVi : data.valueEn;
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="doctor-extra-infor-container">
                    <div className="content-up">
                        <div className="text-address"><FormattedMessage id="patient.extra-infor-doctor.text-address" />
                        </div>
                        <div className="name-clinic">{extraInfor?.nameClinic} </div>
                        <div className="detail-address">{extraInfor?.addressClinic}</div>
                    </div>
                    <div className="content-down">

                        {isShowDetailInfor === false &&
                            <>
                                <div className='short-infor'>
                                    <FormattedMessage id="patient.extra-infor-doctor.price" />
                                    <NumberFormat
                                        className='currency'
                                        value={this.getValueByLanguage(extraInfor?.priceData)}
                                        displayType={'text'}
                                        suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                        thousandSeparator={true}
                                        renderText={value => <span>{value}</span>}
                                    />
                                    <span className='detail' onClick={() => this.showHideDetailInfor(true)} style={{ cursor: 'pointer' }}><FormattedMessage id="patient.extra-infor-doctor.detail" /></span>
                                </div>

                            </>
                        }
                        {isShowDetailInfor === true &&
                            <>
                                <div className='title-price'><FormattedMessage id="patient.extra-infor-doctor.title-price" /></div>
                                <div className='detail-infor'>
                                    <div className='price'>
                                        <span className='left'>
                                            <FormattedMessage id="patient.extra-infor-doctor.price" />
                                        </span>
                                        <span className='right'>
                                            <NumberFormat
                                                className='currency'
                                                value={this.getValueByLanguage(extraInfor?.priceData)}
                                                displayType={'text'}
                                                suffix={language === LANGUAGES.VI ? 'VND' : '$'}
                                                thousandSeparator={true}
                                                renderText={value => <span>{value}</span>}
                                            /></span>
                                    </div>
                                    <div className="note"> {extraInfor?.note}</div>
                                </div>
                                <div className="payment"><FormattedMessage id="patient.extra-infor-doctor.payment" /><span className='payment-data'>{this.getValueByLanguage(extraInfor?.paymentData)}</span></div>
                                <div className="hide-price">
                                    <span onClick={() => this.showHideDetailInfor(false)} style={{ cursor: 'pointer' }}><FormattedMessage id="patient.extra-infor-doctor.hide-price" /></span>
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
