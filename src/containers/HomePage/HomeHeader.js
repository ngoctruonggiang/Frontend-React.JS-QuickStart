import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import logo from "../../assets/images/logo.svg"; // Import logo [00:33:23]
import "./HomeHeader.scss";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
    //fire redux event: actions
  }

  render() {
    let language = this.props.language;
    return (
      <React.Fragment>

        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <img className="header-logo" src={logo} />{/* neu chi de url thi sau khi render react chi hieu la chuoi string khong biet do la url cua anh */}
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.specialty" />{/* id = ten Object. */}
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>
              {/* Phần chuyển đổi ngôn ngữ [00:41:35] */}
              <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-en'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>{/* dung function trong react phai boc trong {}*/}
              </div>
              <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-vi'}>
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>{/* eslint-disable-line */}
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true &&//neu isShowBanner true thi render banner
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1"><FormattedMessage id="banner.title1" /></div>
              <div className="title2"><FormattedMessage id="banner.title2" /></div>
              <div className="search">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm bác sĩ" />
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id="banner.child1" /></div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id="banner.child2" /></div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id="banner.child3" /></div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id="banner.child4" /></div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id="banner.child5" /></div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child"><FormattedMessage id="banner.child6" /></div>
                </div>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
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
    changeLanguageAppRedux: (languageData) => dispatch(changeLanguageApp(languageData))//fire action
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
