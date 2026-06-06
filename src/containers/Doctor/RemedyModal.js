import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './RemedyModal.scss';
import { Modal } from 'reactstrap';
import moment from 'moment';
import { toast } from 'react-toastify';
import _ from 'lodash';
import CommonUtils from '../../utils/CommonUtils';


class RemedyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            imgBase64: ""
        }
    }
    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: base64,
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }
    render() {
        let { isOpen, dataModal, closeModal } = this.props;//*nhan props tu component cha
        return (
            <>
                <Modal
                    isOpen={isOpen}//*dong, mo modal bang cach nhan props tu component cha
                    size="md"
                    centered
                >
                    <div className="remedy-modal-container">
                        <div className="remedy-modal-header">
                            <span className='remedy-modal-title'><FormattedMessage id="menu.doctor.remedy-modal-title" /></span>
                            <button className='btn btn-remedy-cancel'
                                onClick={closeModal}
                            ><i className='fas fa-times'></i></button>
                        </div>
                        <div className="remedy-modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>Email bệnh nhân:</label>
                                    <input type="email" className='form-control' value={this.state.email}
                                        onChange={(event) => this.handleOnChangeEmail(event)} />
                                </div>
                                <div className="col-6 file-group">
                                    <label>File đính kèm:</label>
                                    <input type="file" className='form-control'
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="remedy-modal-footer">
                            <button className='btn-remedy-confirm'
                                onClick={() => this.handleSendRemedy()}
                            ><FormattedMessage id="doctor.remedy-modal.confirm" /></button>
                            <button className='btn-remedy-cancel'
                                onClick={closeModal}
                            ><FormattedMessage id="doctor.remedy-modal.cancel" /></button>
                        </div>
                    </div>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
