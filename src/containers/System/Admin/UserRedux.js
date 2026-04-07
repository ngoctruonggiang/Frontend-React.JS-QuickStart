import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils/constant';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImageURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
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
            let arrGenders = this.props.genderRedux;
            this.setState({//setState gay ra render lan 2
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''//lay key cua phan tu dau tien de gan vao state gender
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({//setState gay ra render lan 2
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''//lay key cua phan tu dau tien de gan vao state role
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({//setState gay ra render lan 2
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''//lay key cua phan tu dau tien de gan vao state position
            })
        }
    }

    handleOnChangeImage = (event) => {
        //event.target.files la mot mang cac file duoc chon
        //event.target.files[0] la file duoc chon
        //event.target.files[0].name la ten file duoc chon
        //event.target.files[0].size la kich thuoc file duoc chon
        //event.target.files[0].type la loai file duoc chon
        //event.target.files[0].lastModified la ngay file duoc chon
        //event.target.files[0].webkitRelativePath la duong dan file duoc chon
        //event.target.files[0].webkitRelativePath la duong dan file duoc chon
        let file = event.target.files[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);//URL.createObjectURL la ham co san trong window, dung de tao ra mot URL tam thoi cho file duoc chon
            this.setState({
                previewImageURL: objectUrl,
                avatar: file,
            })
        }
        console.log('hoi dan it check state component', this.state.previewImageURL);
    }
    openPreviewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        //fire redux action
        this.props.createNewUser({
            email: this.state.email,//ten cot trong database: data.key
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            role: this.state.role,
            position: this.state.position,
        });
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert(this.props.language === LANGUAGES.VI ? 'Vui lòng nhập ' + arrCheck[i] : 'Please enter ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        //id la ten cua state muon thay doi
        //event.target.value la gia tri moi
        let copyState = { ...this.state }; //tao ra mot ban sao cua state
        copyState[id] = event.target.value; //thay doi gia tri cua state
        this.setState({ ...copyState }); //cap nhat state
    }
    render() {
        let { genderArr } = this.state; //lay ra state genderArr va luu vao bien genderArr, chi dung khi ten bien trung voi ten state
        let language = this.props.language;
        let genderRedux = this.props.genderRedux;
        let isLoadingGender = this.props.isLoadingGender;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let { email, password, firstName, lastName, phoneNumber, address, gender, role, position } = this.state;
        return (
            <>
                <div className="user-redux-container">
                    <div className="title">Learn react-redux with Dang Ngoc Truong Giang</div>
                    <div className="user-redux-body">
                        <div className="container"> {/*dung bootstrap de can chinh giao dien*/}
                            <div className="row">
                                <div className="col-12 my-3"><FormattedMessage id="manage-user.title" /></div>
                                <div className="col-12 my-3">{isLoadingGender === true ? <span>Loading gender...</span> : 'Loaded'}</div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.email" /></label>
                                    <input type="email" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'email')} />{/* id = email*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'password')} />{/* id = password*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'firstName')} />{/* id = firstName*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'lastName')} />{/* id = lastName*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />{/* id = phoneNumber*/}
                                </div>
                                <div className="col-9">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'address')} />{/* id = address*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'gender')}
                                    >
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {//map la for nhung lap  qua tung object chu khong phai la index
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>//dung key de react nhan dien tung the option, khong dung index de lam key
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.role" /></label>
                                    <select className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'role')}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-control"
                                        onChange={(event) => this.onChangeInput(event, 'position')}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.key}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.image" /></label>
                                    <div>
                                        <input id="preview-image" type="file" className="form-control" hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <div className="preview-image-container">
                                            <label className="label-upload" htmlFor="preview-image">Upload image<i className="fas fa-upload"></i></label>{/*dung htmlFor de lien ket input voi label*/}
                                            <div className="preview-image"
                                                style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                                onClick={() => this.openPreviewImage()}
                                            >

                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-12">
                                    <button className="btn btn-primary mt-3" onClick={() => this.handleSaveUser()}>
                                        <FormattedMessage id="manage-user.save" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {this.state.isOpen && (
                        <Lightbox
                            mainSrc={this.state.previewImageURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {//gan state cua redux vao props cua component
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingRole: state.admin.isLoadingRole,
        isLoadingPosition: state.admin.isLoadingPosition,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),//ten function : (dispatch)
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);