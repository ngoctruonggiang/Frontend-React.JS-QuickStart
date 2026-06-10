import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {
    //ham nay de khoi tao state cua class TableManageUser, this la class TableManageUser
    constructor(props) {
        super(props);
        //this.state la state cua class TableManageUser
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {//
        this.props.fetchUserRedux();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromUserRedux(user);
        console.log('handleEditUserFrom child', user);
    }
    render() {
        let usersRedux = this.state.usersRedux;
        return (
            <>
                <div className="users-table mt-4 mx-1">
                    <table>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {usersRedux &&
                            usersRedux.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className="btn-edit"
                                                onClick={() => this.handleEditUser(item)}>
                                                <i className="fas fa-pencil-alt"></i>{" "}
                                            </button>
                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteUser(item)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </table>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
