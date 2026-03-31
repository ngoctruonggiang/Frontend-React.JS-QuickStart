import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";

import shogun from "../../../assets/specialty/Raiden.jpg";
import tuyet from "../../../assets/specialty/TuyettBangDe2.jpg";

class OutStandingDoctor extends Component {
  //trang nay import va render cac section

  render() {
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Bác sĩ nổi bật tuần qua</span>
              <button className="btn-section">Tìm kiếm</button>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor"></div>
                    </div>

                    <div className="position text-center">
                      <div>Giao su, tien si Hoi dan It</div>
                      <div>Chuyen khoa: Hoi dan It</div>
                    </div>
                  </div>
                </div>

                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor"></div>
                    </div>

                    <div className="position text-center">
                      <div>Giao su, tien si Hoi dan It</div>
                      <div>Chuyen khoa: Hoi dan It</div>
                    </div>
                  </div>
                </div>

                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor"></div>
                    </div>

                    <div className="position text-center">
                      <div>Giao su, tien si Hoi dan It</div>
                      <div>Chuyen khoa: Hoi dan It</div>
                    </div>
                  </div>
                </div>

                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor"></div>
                    </div>

                    <div className="position text-center">
                      <div>Giao su, tien si Hoi dan It</div>
                      <div>Chuyen khoa: Hoi dan It</div>
                    </div>
                  </div>
                </div>

                <div className="section-customize">
                  <div className="customize-border">
                    <div className="outer-bg">
                      <div className="bg-image section-outstanding-doctor"></div>
                    </div>

                    <div className="position text-center">
                      <div>Giao su, tien si Hoi dan It</div>
                      <div>Chuyen khoa: Hoi dan It</div>
                    </div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
