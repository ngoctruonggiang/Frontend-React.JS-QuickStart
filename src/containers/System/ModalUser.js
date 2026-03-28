import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import emitter from "../../utils/emitter";

class ModalUser extends Component {
  constructor(props) {
    super(props); //truyen props tu component cha sang component con
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();//mount function listenToEmitter
  }
//emitter help communication by publisher-subscriber pattern
  listenToEmitter = () => {
    emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {}

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
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api
      this.props.createNewUser(this.state);//truyen du lieu tu con len cha bang cach goi function createNewUser trong component cha voi tham so la this.state cua component con
      
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
            Create a new user
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
              onClick={() => this.handleAddNewUser()}
            >
              Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
