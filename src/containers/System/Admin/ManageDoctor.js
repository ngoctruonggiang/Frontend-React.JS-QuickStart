import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import { getDetailDoctorService } from '../../../services/userService';

const mdParser = new MarkdownIt(/* Markdown-it options */);//dich tu markdown sang html


class ManageDoctor extends Component {
    //ham nay de khoi tao state cua class ManageDoctor, this la class ManageDoctor
    constructor(props) {
        super(props);
        //this.state la state cua class ManageDoctor
        this.state = {
            //TODO:save to doctor table
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: null,
            description: '',
            listDoctors: [],
            //TODO:save to doctor_info table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            hasOldData: false,

        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchRequiredDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors, 'USERS'),
            });
        }
        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfor;
            let dataPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            this.setState({
                listPrice: dataPrice,
                listPayment: dataPayment,
                listProvince: dataProvince,
            });
        }
        //khi thay doi ngon ngu thi phai cap nhat lai du lieu cho select
        if (prevProps.language !== this.props.language) {
            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors, 'USERS'),
                listPrice: this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resPrice, 'PRICE'),
                listPayment: this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resPayment, 'PAYMENT'),
                listProvince: this.buildDataInputSelect(this.props.allRequiredDoctorInfor.resProvince, 'PROVINCE'),
            });
        }
    }
    //tao du lieu cho select
    buildDataInputSelect = (inputData, type) => {//type de phan biet, neu khong truyen thi type === undefined
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                if (language === LANGUAGES.VI) {
                    //TODO:neu la USERS thi lay ten, neu la PRICE thi lay valueVi VND, con khong thi lay valueVi
                    object.label = type === "USERS" ? `${item.lastName} ${item.firstName}` : type === "PRICE" ? `${item.valueVi} VND` : `${item.valueVi}`;
                } else {
                    object.label = type === "USERS" ? `${item.firstName} ${item.lastName}` : type === "PRICE" ? `${item.valueEn} USD` : `${item.valueEn}`;
                }
                if (type === "USERS") {
                    object.value = item.id;
                } else {
                    object.value = item.keyMap;
                }
                result.push(object);
            });
        }
        return result;
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    //TODO:This function responsible for save doctor information
    handleSaveContentMarkdown() {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,//*de service nodejs biet la update hay create

            //TODO:save to doctor_info table
            priceId: this.state.selectedPrice.value,
            paymentId: this.state.selectedPayment.value,
            provinceId: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
        });
    }
    //TODO: This function responsible for display all of doctor infor on input cell when select specific doctor
    handleChangeSelectDoctor = async (selectedOption) => {
        const EMPTY_STATE = {
            description: '', contentMarkdown: '', contentHTML: '', hasOldData: false,
            addressClinic: '', nameClinic: '', note: '',
            selectedPrice: '', selectedPayment: '', selectedProvince: '',
        };

        this.setState({ selectedDoctor: selectedOption });

        if (!selectedOption?.value) return this.setState(EMPTY_STATE);//*dung return de thoat khoi ham nay

        const res = await getDetailDoctorService(selectedOption.value);//*lay thong tin chi tiet cua doctor
        if (!res || res.errCode !== 0 || !res.data) return this.setState(EMPTY_STATE);

        const { doctorData: md, doctorInforData: info } = res.data;
        const { listPrice, listPayment, listProvince } = this.state;

        // Only display fields that actually have data; clear the rest
        this.setState({
            contentHTML: md?.contentHTML || '',
            contentMarkdown: md?.contentMarkdown || '',
            description: md?.description || '',
            hasOldData: md?.contentMarkdown ? true : false,//TODO:neu contentMarkdown ton tai thi true, con khong thi false

            addressClinic: info?.addressClinic || '',//TODO:neu info ton tai thi lay gia tri, con khong thi lay ''
            nameClinic: info?.nameClinic || '',
            note: info?.note || '',
            selectedPrice: listPrice.find(item => item.value === info?.priceId) || '',//TODO:tim trong listPrice xem co gia tri nao trung voi priceId cua info khong
            selectedPayment: listPayment.find(item => item.value === info?.paymentId) || '',
            selectedProvince: listProvince.find(item => item.value === info?.provinceId) || '',
        });
    }

    //TODO:This function responsible for set state when we type in doctor infor select cell
    handleChangeSelectDoctorInfor = async (selectedOption, name) => {//*name la ten cua state ma minh muon set
        let stateName = name.name;//*never mutate state directly
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;//TODO: attach {label: 'Thẻ ATM', value: "keyMap"} to state.selectedPrice, state.selectedPayment, state.selectedProvince
        this.setState(stateCopy);
    }
    //TODO: This function responsible for set state when we type in doctor infor text cell
    handleOnChangeText = (event, name) => {
        //*[name] la ten cua state ma minh muon set
        this.setState({
            [name]: event.target.value
        });
    }

    render() {
        let { hasOldData } = this.state;
        let { selectedDoctor } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        <FormattedMessage id="manage-doctor.title" />
                    </div>
                    <div className="more-infor">
                        <div className="content-left form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.select-doctor" />
                            </label>
                            <Select
                                value={selectedDoctor}//item duoc chon hien tai cua select gan cho state selectedDoctor
                                onChange={this.handleChangeSelectDoctor}
                                options={this.state.listDoctors}//danh sach cac item cua select
                                placeholder={<FormattedMessage id="manage-doctor.select-doctor" />}
                                name="selectedDoctor"
                            />

                        </div>
                        <div className="content-right">
                            <label>
                                <FormattedMessage id="manage-doctor.intro" />
                            </label>
                            <textarea className="form-control" cols="60"
                                value={this.state.description}
                                onChange={(event) => this.handleOnChangeText(event, 'description')}
                            >
                            </textarea>
                        </div>

                    </div>
                    <div className="more-info-extra row">
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.price" />
                            </label>
                            <Select
                                value={this.state.selectedPrice}//*item duoc chon hien tai cua select gan cho state selectedDoctor do do can setstate khi onChange thi value moi cap nhat duoc
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPrice}//danh sach cac item cua select
                                placeholder={<FormattedMessage id="manage-doctor.price" />}
                                name="selectedPrice"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.payment" />
                            </label>
                            <Select
                                value={this.state.selectedPayment}//item duoc chon hien tai cua select gan cho state selectedDoctor
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listPayment}//danh sach cac item cua select
                                placeholder={<FormattedMessage id="manage-doctor.payment" />}
                                name="selectedPayment"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.province" />
                            </label>
                            <Select
                                value={this.state.selectedProvince}//item duoc chon hien tai cua select gan cho state selectedDoctor
                                onChange={this.handleChangeSelectDoctorInfor}
                                options={this.state.listProvince}//danh sach cac item cua select
                                placeholder={<FormattedMessage id="manage-doctor.province" />}
                                name="selectedProvince"
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.name-clinic" />
                            </label>
                            <input className="form-control" type="text"
                                value={this.state.nameClinic}
                                onChange={(event) => this.handleOnChangeText(event, 'nameClinic')}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.address-clinic" />
                            </label>
                            <input className="form-control" type="text"
                                value={this.state.addressClinic}
                                onChange={(event) => this.handleOnChangeText(event, 'addressClinic')}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>
                                <FormattedMessage id="manage-doctor.note" />
                            </label>
                            <input className="form-control" type="text"
                                value={this.state.note}
                                onChange={(event) => this.handleOnChangeText(event, 'note')}
                            />
                        </div>
                    </div>
                    <div className="manage-doctor-editor">
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown} />{/*truyen props */}
                    </div>
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className={hasOldData ? "save-content-doctor" : "create-content-doctor"}>
                        {hasOldData ? (
                            <span><FormattedMessage id="manage-doctor.edit" /></span>
                        ) : (
                            <span><FormattedMessage id="manage-doctor.save" /></span>
                        )}
                    </button>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => {//map state cua redux vao props cua component
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
        fetchRequiredDoctorInfor: () => dispatch(actions.fetchRequiredDoctorInfor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
