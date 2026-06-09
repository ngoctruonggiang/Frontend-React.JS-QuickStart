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
import { withRouter } from 'react-router-dom';//de nhan tham so dong id

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
    handleViewDetailSpecialty(item) {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
            //* 'id' la tham so dong de truyen tham so id vao trang detail-specialty duoc dinh nghia o app js va file Utils\constant.js
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
                                    let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className="section-customize" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>{/*TODO: move to router of specialty detail page with id*/}
                                            <div className="bg-image"
                                                style={{ backgroundImage: `url(${imageBase64})` }}></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
