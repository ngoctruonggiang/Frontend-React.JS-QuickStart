import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss"; // Sửa lại chữ M viết hoa cho đúng tên file
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import shogun from "../../../assets/specialty/Raiden.jpg";
import tuyet from "../../../assets/specialty/TuyettBangDe2.jpg";

class MedicalFacility extends Component {
  //trang nay import va render cac section

  render() {
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
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${shogun})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${tuyet})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${tuyet})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${shogun})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${tuyet})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${shogun})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
                <div className="section-customize">
                  <div
                    className="bg-image"
                    style={{ backgroundImage: `url(${tuyet})` }}
                  ></div>
                  <div>He thong y te Thu Cuc</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
