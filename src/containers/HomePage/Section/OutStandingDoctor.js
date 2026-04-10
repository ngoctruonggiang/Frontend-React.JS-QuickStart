import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import shogun from "../../../assets/specialty/Raiden.jpg";
import tuyet from "../../../assets/specialty/TuyettBangDe2.jpg";
import * as actions from '../../../store/actions';
import { LANGUAGES } from "../../../utils/constant";

class OutStandingDoctor extends Component {
  //trang nay import va render cac section
  constructor(props) {
    super(props);//de ke thua props duoc truyen xuong
    this.state = {
      arrDoctors: [],
    }
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  componentDidUpdate(prevProps, prevState) {//componentDidUpdate luon chay do do co the nhan biet duoc props thay doi
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      })
    }
  }
  render() {
    let arrayDoctors = this.state.arrDoctors;
    let { language } = this.props;
    // arrayDoctors = arrayDoctors.concat(arrayDoctors).concat(arrayDoctors)
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section"><FormattedMessage id="homepage.out-standing-doctor" /></span>
              <button className="btn-section"><FormattedMessage id="homepage.more-info" /></button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrayDoctors && arrayDoctors.length > 0 && arrayDoctors.map((item, index) => {
                  let imageBase64 = '';
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, 'base64').toString('binary');//decode base64 sang binary
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div className="section-customize" key={index}>
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div className="bg-image section-outstanding-doctor" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                        </div>

                        <div className="position text-center">
                          <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                          <div>Chuyen khoa: Hoi dan It</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
