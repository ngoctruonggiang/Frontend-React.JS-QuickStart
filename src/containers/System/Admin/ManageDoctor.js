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
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedDoctor: null,
            description: '',
            listDoctors: [],
            hasOldData: false,

        };
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors),
            });
        }
        if (prevProps.language !== this.props.language) {
            this.setState({
                listDoctors: this.buildDataInputSelect(this.props.allDoctors),
            });
        }
    }
    //tao du lieu cho select
    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                if (language === LANGUAGES.VI) {
                    object.label = `${item.lastName} ${item.firstName}`;
                } else {
                    object.label = `${item.firstName} ${item.lastName}`;
                }
                object.value = item.id;
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
    handleSaveContentMarkdown() {
        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,
            action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        });
    }
    handleChangeSelectDoctor = async (selectedDoctor) => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctorService(selectedDoctor.value);//selectedDoctor.value la id cua bac si

        if (res && res.errCode === 0 && res.data && res.data.doctorData
            && res.data.doctorData.description !== '' && res.data.doctorData.contentMarkdown !== ''
            && res.data.doctorData.contentHTML !== '') {
            let doctorData = res.data.doctorData;
            this.setState({
                description: doctorData.description,
                contentMarkdown: doctorData.contentMarkdown,
                contentHTML: doctorData.contentHTML,
                hasOldData: true,
            });
        } else {
            this.setState({
                description: '',
                contentMarkdown: '',
                contentHTML: '',
                hasOldData: false,
            });
        }

    };
    render() {
        let { hasOldData } = this.state;
        let { selectedDoctor } = this.state;
        return (
            <>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        <FormattedMessage id="manage-doctor.title" />
                    </div>
                    <div className="more-infor">
                        <div className="content-left form-group">
                            <label>
                                Chon bac si
                            </label>
                            <Select
                                value={selectedDoctor}//item duoc chon hien tai cua select gan cho state selectedDoctor
                                onChange={this.handleChangeSelectDoctor}
                                options={this.state.listDoctors}//danh sach cac item cua select
                            />

                        </div>
                        <div className="content-right">
                            <label>
                                Thong tin gioi thieu
                            </label>
                            <textarea className="form-control" rows="4" cols="60"
                                value={this.state.description}
                                onChange={(e) => this.setState({ description: e.target.value })}
                            >
                            </textarea>
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
                            <span>Luu thong tin</span>
                        ) : (
                            <span>Tao thong tin</span>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
