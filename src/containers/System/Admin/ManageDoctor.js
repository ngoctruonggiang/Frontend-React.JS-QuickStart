import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

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
        };
    }

    componentDidMount() {//
    }
    componentDidUpdate(prevProps, prevState) {

    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleSaveContentMarkdown() {
        console.log('handleSaveContentMarkdown', this.state);
    }
    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    };
    render() {
        let { selectedDoctor } = this.state;
        return (
            <>
                <div className="manage-doctor-container">
                    <div className="manage-doctor-title">
                        <FormattedMessage id="admin.manage-doctor.title" />
                    </div>
                    <div className="more-infor">
                        <div className="content-left form-group">
                            <label>
                                Chon bac si
                            </label>
                            <Select
                                value={selectedDoctor}
                                onChange={this.handleChange}
                                options={options}
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
                            onChange={this.handleEditorChange} />{/*truyen props */}
                    </div>
                    <button
                        onClick={() => this.handleSaveContentMarkdown()}
                        className="save-content-doctor">
                        <FormattedMessage id="admin.manage-doctor.save" />
                    </button>
                </div >
            </>
        );
    }
}

const mapStateToProps = (state) => {//map state cua redux vao props cua component
    return {
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (userId) => dispatch(actions.deleteUser(userId)),
        editUserRedux: (user) => dispatch(actions.editUser(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
