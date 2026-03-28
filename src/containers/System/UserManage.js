import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService"; //import 1 function '{}' getAllUsers from userService
import ModalUser from "./ModalUser";

class UserManage extends Component {
  //ham nay de khoi tao state cua class UserManage, this la class UserManage
  constructor(props) {
    super(props);
    //this.state la state cua class UserManage
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }

  state = {};

  async componentDidMount() {
    //moi lan trigger function setState => render lai component
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        //setState la ham bat dong bo, nen can async await de doi no xong roi moi lam viec khac
        arrUsers: response.users,
      });
    }
    console.log("get all users from nodejs:", response);
  }
  /***Life cycle cua class component
   * 1.run constructor -> init state
   * 2.Did mount -> gan gia tri (set state) => React chi lam frontend nen khong biet lay du lieu o dau => can backend de lay du lieu => did mount la noi de goi API de lay du lieu roi set state
   * 3.Render state
   *
   *
   */
  //bat su kien click vao button Add new user
  handleAddNewUser = () => {
    //dung arrow function de handle event
    this.setState({
        isOpenModalUser: true,
    })
  };
//bat su kien tat modal
  toggleUserModal = () => {
    this.setState({
        isOpenModalUser: !this.state.isOpenModalUser,
    })
  }
  render() {
    console.log("check state:", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser //UserManage goi ModalUser la component con
        isOpen={this.state.isOpenModalUser}
        toggleFromParent={this.toggleUserModal}
        //isOpen la bien
        />
        <div className="title text-center">Manage users with eric</div>
        <div className="mx-1">
          <button
            className="btn btn-primary"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new user
          </button>
        </div>
        <div className="users-table mt-4 mx-1">
          <table>
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.map((item, index) => {
                console.log("check map", item, index);
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button className="btn-edit">
                        <i className="fas fa-pencil-alt"></i>{" "}
                      </button>
                      <button className="btn-delete">
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
