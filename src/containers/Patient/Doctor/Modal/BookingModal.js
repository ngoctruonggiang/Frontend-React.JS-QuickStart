import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        let { isOpenModalBooking, closeModalBooking, dataScheduleTimeModal } = this.props;//*nhan props tu component cha

        return (
            <>
                <Modal
                    isOpen={isOpenModalBooking}//*dong, mo modal bang cach nhan props tu component cha
                    className={'booking-modal-container'}
                    size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className='booking-modal-title'>Booking Modal</span>
                            <span className='float-right'
                                onClick={closeModalBooking}// when i click this, React does closeModalBooking() behind the scenes.
                            ><i className='fas fa-times'></i></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataScheduleTimeModal)} */}
                            <div className="doctor-info">

                            </div>
                            <div className="price">

                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ tên</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Email</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Địa chỉ</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input type="text" className='form-control' />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input type="text" className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button className='btn-booking-confirm'
                                onClick={closeModalBooking}
                            >Booking</button>
                            <button className='btn-booking-cancel'
                                onClick={closeModalBooking}
                            >Cancel</button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
