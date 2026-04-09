import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImageURL: '',
            isOpen: false,
            action: '',
            userEditId: '',
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
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''//lay key cua phan tu dau tien de gan vao state gender
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({//setState gay ra render lan 2
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''//lay key cua phan tu dau tien de gan vao state role
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({//setState gay ra render lan 2
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''//lay key cua phan tu dau tien de gan vao state position
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {//khi listUsers thay doi thi reset state de xoa du lieu cu
            let arrGenders = this.state.genderArr;
            let arrRoles = this.state.roleArr;
            let arrPositions = this.state.positionArr;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                avatar: '',
                previewImageURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    handleOnChangeImage = async (event) => {
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
            // let objectUrl = URL.createObjectURL(file);//URL.createObjectURL la ham co san trong window, dung de tao ra mot URL tam thoi cho file duoc chon
            let base64 = await CommonUtils.getBase64(file);
            console.log("My base64 string: ", base64); // Just to verify it works
            // 2. Create the temporary URL for UI preview
            let objectUrl = URL.createObjectURL(file);

            // 3. Save both to state
            this.setState({
                previewImageURL: objectUrl,
                avatar: base64,
            })
        }
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

        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user action
            this.props.createNewUser({
                email: this.state.email,//ten cot trong database: data.key
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
        }
        if (action === CRUD_ACTIONS.EDIT) {//do api create khac voi api edit nen can check action
            //fire redux edit user action
            let dataSent = {
                id: this.state.userEditId,
                email: this.state.email,//ten cot trong database: data.key
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            };
            console.log("PAYLOAD SẮP GỬI LÊN NODEJS (EDIT):", dataSent);
            this.props.editUserRedux(dataSent);
        }
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
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image && user.image.data) {
            // Backend sends image as a Buffer object. We convert it back to string
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HardCode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            role: user.roleId || user.role, // Safe fallback
            position: user.positionId || user.position, // Safe fallback
            action: 'EDIT',
            userEditId: user.id,
            avatar: '',
            previewImageURL: imageBase64,
        })
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
                                        value={email}
                                        onChange={(event) => this.onChangeInput(event, 'email')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        autoComplete="off" />{/* id = email*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.password" /></label>
                                    <input type="password" className="form-control"
                                        value={password}
                                        onChange={(event) => this.onChangeInput(event, 'password')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                        autoComplete="new-password" />{/* id = password*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.first-name" /></label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')} />{/* id = firstName*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.last-name" /></label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')} />{/* id = lastName*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.phone-number" /></label>
                                    <input type="text" className="form-control"
                                        value={phoneNumber}
                                        onChange={(event) => this.onChangeInput(event, 'phoneNumber')} />{/* id = phoneNumber*/}
                                </div>
                                <div className="col-9">
                                    <label><FormattedMessage id="manage-user.address" /></label>
                                    <input type="text" className="form-control"
                                        value={address}
                                        onChange={(event) => this.onChangeInput(event, 'address')} />{/* id = address*/}
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.gender" /></label>
                                    <select className="form-control"
                                        value={gender}
                                        onChange={(event) => this.onChangeInput(event, 'gender')}
                                    >
                                        {genderArr && genderArr.length > 0 &&
                                            genderArr.map((item, index) => {//map la for nhung lap  qua tung object chu khong phai la index
                                                return (
                                                    <option key={index} value={item.keyMap}>
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
                                        value={role}
                                        onChange={(event) => this.onChangeInput(event, 'role')}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className="col-3">
                                    <label><FormattedMessage id="manage-user.position" /></label>
                                    <select className="form-control"
                                        value={position}
                                        onChange={(event) => this.onChangeInput(event, 'position')}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
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
                                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} onClick={() => this.handleSaveUser()}>
                                        {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.save" />}
                                    </button>
                                </div>
                                <div className="col-12">
                                    <TableManageUser
                                        handleEditUserFromUserRedux={this.handleEditUserFromParent}
                                        action={this.state.action}
                                    />
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
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),//ten function : (dispatch)
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);