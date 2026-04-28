import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";//import css cua thu vien slick
import shogun from "../../../assets/specialty/Raiden.jpg";
import tuyet from "../../../assets/specialty/TuyettBangDe2.jpg";
import { getAllSpecialtyService } from "../../../services/userService";
import * as actions from '../../../store/actions';

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrSpecialty: [],
        }
    }
    componentDidMount() {
        this.props.loadTopSpecialty();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topSpecialtyRedux !== this.props.topSpecialtyRedux) {
            this.setState({
                arrSpecialty: this.props.topSpecialtyRedux,
            })
        }
    }
    render() {
        let { arrSpecialty } = this.state;
        console.log('you access in specialty', this.props);

        return (
            <>
                <div className="section-share section-specialty">
                    <div className="section-container">
                        <div className="section-header">
                            <span className="title-section"><FormattedMessage id="homepage.specialty-popular" /></span>
                            <button className="btn-section">Xem thêm</button>
                        </div>
                        <div className="section-body">
                            <Slider {...this.props.settings}>
                                {arrSpecialty && arrSpecialty.length > 0 && arrSpecialty.map((item, index) => {
                                    return (
                                        <div className="section-customize" key={index}>
                                            <div className="bg-image"
                                                style={{ backgroundImage: `url(${item.image})` }}></div>
                                            <div>{item.name}</div>
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
        language: state.app.language,
        topSpecialtyRedux: state.specialty.topSpecialty,
    };
};

const mapDispatchToProps = (dispatch) => {//truy cap ham nay qua props.changeLanguageAppRedux
    return {
        loadTopSpecialty: () => dispatch(actions.fetchTopSpecialty()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
