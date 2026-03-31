import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import shogun from "../../../assets/specialty/Raiden.jpg";
import tuyet from "../../../assets/specialty/TuyettBangDe2.jpg";

class HandBook extends Component {


  render() {

    return (
     <>
     <div className = "section-share section-HandBook">
        <div className = "section-container">
            <div className = "section-header">
                <span className = "title-section">Chuyên khoa</span>
                <button className = "btn-section">Xem thêm</button>
            </div>
            <div className="section-body">
                <Slider {...this.props.settings}>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${shogun})`}}></div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${tuyet})`}}></div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${tuyet})`}}></div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${shogun})`}}></div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${tuyet})`}}></div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${shogun})`}}></div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="section-customize">
                        <div className="bg-image section-handbook" 
                        style={{backgroundImage: `url(${tuyet})`}}></div>
                        <div>Cơ xương khớp 1</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {//truy cap ham nay qua props.changeLanguageAppRedux
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
