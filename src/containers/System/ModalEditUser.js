import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import emitter from "../../utils/emitter";
import _ from "lodash";

class ModalEditUser extends Component {
  constructor(props) {
    super(props); //truyen props tu component cha sang component con
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

  }
//emitter help communication by publisher-subscriber pattern

  componentDidMount() {
    let user = this.props.currentUser; //=== let {currentUser} = this.props
    if(user && !_.isEmpty(user)){
      this.setState({
        id: user.id,
        email: user.email,
        password: "hardcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      })
    }
  }

  toggle = () => {
    this.props.toggleFromParent(); //fire function toggleUserModal in UserManage vi no la component cha quan ly state isOpenModalUser this.state.isOpenModalUser
  };

  handleOnChangeInput = (event, id) => {
    //modify state gian tiep qua bien trung gian copyState la good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        //callback function => sau khi setState xong thi chay function nay de chan bat dong bo
      },
    );
  };
//check du truong input chua
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        //if khong ton tai state [i] thi isValid = false
        isValid = false;
        alert("Missing input: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api edit user
      this.props.editUser(this.state);//truyen du lieu tu con len cha bang cach goi function createNewUser trong component cha voi tham so la this.state cua component con
      
    }
  };
  render() {
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className="modal-user-container"
          size="lg"
          centered //truyen props cho component modal
        >
          <ModalHeader toggle={() => this.toggle()}>
            Edit a new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  type="email"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={this.state.email}
                  autoComplete="nope"
                  disabled //de khong cho phep sua email
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  value={this.state.password}
                  autoComplete="new-password"//de tranh trinh duyet tu dong fill password
                  disabled //de khong cho phep sua password
                />
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "firstName");
                  }}
                  value={this.state.firstName}
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "lastName");
                  }}
                  value={this.state.lastName}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  type="text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
            >
              Save changes
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
