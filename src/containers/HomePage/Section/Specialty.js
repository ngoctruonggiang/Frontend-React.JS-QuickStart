import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";//import css cua thu vien slick

class Specialty extends Component {


  render() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return (
     <>
     <div className = "section-specialty">
        <div className = "specialty-content">
            <div className = "specialty-header">
                <span className = "title-specialty">Chuyên khoa</span>
                <button className = "btn-specialty">Xem thêm</button>
            </div>
            <div className="specialty-body">
                <Slider {...settings}>
                    <div className="specialty-customize">
                        <div className="bg-image">Hình 1</div>
                        <div>Cơ xương khớp 1</div>
                    </div>
                    <div className="specialty-customize">
                        <div className="bg-image">Hình 2</div>
                        <div>Cơ xương khớp 2</div>
                    </div>
                    <div className="specialty-customize">
                        <div className="bg-image">Hình 3</div>
                        <div>Cơ xương khớp 3</div>
                    </div>
                    <div className="specialty-customize">
                        <div className="bg-image">Hình 4</div>
                        <div>Cơ xương khớp 4</div>
                    </div>
                    <div className="specialty-customize">
                        <div className="bg-image">Hình 5</div>
                        <div>Cơ xương khớp 5</div>
                    </div>
                    <div className="specialty-customize">
                        <div className="bg-image">Hình 6</div>
                        <div>Cơ xương khớp 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
