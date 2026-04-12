//file nay de hien thi header ung voi tung vai tro khi nguoi dung da login
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';

class Header extends Component {

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);//day language tu ham xu li click sang ham dispatch cua redux
    }

    buildMenu = (userInfo) => {//ham nay de xay dung menu ung voi tung vai tro
        let menu = [];
        if (userInfo && userInfo.roleId === USER_ROLE.ADMIN) {
            menu = adminMenu;
        } else if (userInfo && userInfo.roleId === USER_ROLE.DOCTOR) {
            menu = doctorMenu;
        }
        return menu;
    }
    render() {
        const { processLogout, language, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.buildMenu(userInfo)} />
                </div>
                <div className="languages">
                    <span className="welcome"><FormattedMessage id="homeheader.welcome" />, <span> </span>
                        {userInfo && userInfo.firstName ? userInfo.firstName : ''} ! {/*luon luon check dieu kien de tranh truong hop bien la undefined gay crash app*/}
                    </span>
                    <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                        VI
                    </span>
                    <span className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                        EN
                    </span>
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (languageData) => dispatch(actions.changeLanguageApp(languageData))//fire action

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
