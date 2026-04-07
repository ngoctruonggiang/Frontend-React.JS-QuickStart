import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: []
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({ //cham ngoi cho lan render tiep theo
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    }
    componentDidUpdate(prevProps, prevState) {//vi ham nay luon chay nen can check dieu kien de tranh lap vo han
        //didupdate chay sau khi render
        //prevProps la props truoc khi render (mang rong), this.props la props sau khi render (duoc nap 3 phan tu tu redux)
        //[] khac [3]
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({//setState gay ra render lan 2
                genderArr: this.props.genderRedux
            })
        }
    }

    render() {
        let { genderArr } = this.state; //lay ra state genderArr va luu vao bien genderArr, chi dung khi ten bien trung voi ten state
        let language = this.props.language;
        let genderRedux = this.props.genderRedux;
        console.log('check genderRedux from props', genderRedux);
        return (
            <>
                <div className="user-redux-container">
                    <div className="title">Learn react-redux with Dang Ngoc Truong Giang</div>
                    <div className="user-redux-body">
                        <div className="container"> {/*dung bootstrap de can chinh giao dien*/}
                            <div className="row">
                                <div className="col-12 my-3"><FormattedMessage id="manage-user.title" /></div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-9">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-control">
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {//map la for nhung lap  qua tung object chu khong phai la index
                                                return (
                                                    <option key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>//dung key de react nhan dien tung the option, khong dung index de lam key
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.role" /></label>
                                    <select className="form-control">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-control">
                                        <option>Admin</option>
                                        <option>User</option>
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <input type="text" className="form-control" />
                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary mt-3"><FormattedMessage id="manage-user.save" /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }
}

const mapStateToProps = state => {//gan state cua redux vao props cua component
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),//ten function : (dispatch)
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (languageData) => dispatch(actions.changeLanguageApp(languageData))//fire action
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);