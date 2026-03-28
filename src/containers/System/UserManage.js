import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers, createNewUserService, deleteUserService} from "../../services/userService"; //import 1 function '{}' getAllUsers from userService
import ModalUser from "./ModalUser";
import emitter from "../../utils/emitter";

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
    await this.getAllUsersFromReact();
  }
getAllUsersFromReact = async () => {
  let response = await getAllUsers("ALL");
  if (response && response.errCode === 0) {
    this.setState({
      //setState la ham bat dong bo, nen can async await de doi no xong roi moi lam viec khac
      arrUsers: response.users,
    });
  }
}

//bat su kien xoa user
handleDeleteUser = async (user) => {
    console.log("You are clicking delete user", user);
    try{
        let response = await deleteUserService(user.id);
        if(response && response.errCode === 0){
            await this.getAllUsersFromReact();//re-render lai table sau khi delete user
        }
    }catch(error){
        console.log(error);
    }
  
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

  //de render lai table (component cha) khi nhap thong tin vao modal(component con) xong thi phai fire tu con len cha
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode === 0) {
        this.setState({
          isOpenModalUser: false,
        });
        await this.getAllUsersFromReact(); //re-render lai table sau khi add user
        emitter.emit('EVENT_CLEAR_MODAL_DATA');
      }else{
        alert(response.errMessage); //hien thong bao loi tu server
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <ModalUser //UserManage goi ModalUser la component con
        isOpen={this.state.isOpenModalUser}//dang truyen cac props tu cha sang con
        toggleFromParent={this.toggleUserModal}
        createNewUser={this.createNewUser}//truyen function khong co "()" vi neu co "()" nghia la co tham so thi no se run luon
        //isOpen la bien
        />
        <div className="title text-center">Manage users with eric</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
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
