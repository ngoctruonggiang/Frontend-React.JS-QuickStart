import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllClinicService } from "../../../services/userService";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";
import "./MedicalFacility.scss"; // Sửa lại chữ M viết hoa cho đúng tên file

class MedicalFacility extends Component {
  //trang nay import va render cac section
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    }
  }
  async componentDidMount() {
    //khai bao action de goi data len
    let response = await getAllClinicService();
    if (response && response.errCode === 0) {
      this.setState({
        dataClinics: response.data ? response.data : [],
      })
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  }

  render() {
    let { dataClinics } = this.state;
    console.log("check state from Medical Facility file: ", dataClinics);
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {dataClinics && dataClinics.length > 0 &&
                  dataClinics.map((item, index) => {
                    let imageBase64 = '';
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                    }
                    return (
                      <div className="section-customize" key={index}
                        onClick={() => this.handleViewDetailClinic(item)}>
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${imageBase64})` }}
                        ></div>
                        <div>{item.name}</div>
                      </div>
                    )
                  })
                }
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
