import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss';
import DatePicker from '../../components/Input/DatePicker';


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date(),

        }
    }
    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({ selectedDate: date[0] });
    }
    render() {

        return (
            <>
                <div className="manage-patient-container">
                    <div className="m-p-title">
                        <FormattedMessage id="manage-patient.title" />
                    </div>
                    <div className="m-p-body row">
                        <div className="col-4">
                            <label>
                                <FormattedMessage id="manage-patient.choose-date" />
                            </label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.selectedDate}//value la gia tri hien tai cua date picker duoc truyen vao selectDate state
                                className="form-control"
                                placeholderText="Chọn ngày"
                            />
                        </div>
                        <div className="col-12">
                            <div className="m-p-content">
                                <table className="table-manage-patient">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời gian</th>
                                            <th>Thông tin bệnh nhân</th>
                                            <th>Hình thức</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <td>Alfreds Futterkiste</td>
                                        <td>Maria Anders</td>
                                        <td>Germany</td>
                                    </tr>
                                    <tr>
                                        <td>Centro comercial Moctezuma</td>
                                        <td>Francisco Chang</td>
                                        <td>Mexico</td>
                                    </tr>
                                    <tr>
                                        <td>Ernst Handel</td>
                                        <td>Roland Mendel</td>
                                        <td>Austria</td>
                                    </tr>
                                    <tr>
                                        <td>Island Trading</td>
                                        <td>Helen Bennett</td>
                                        <td>UK</td>
                                    </tr>
                                    <tr>
                                        <td>Laughing Bacchus Winecellars</td>
                                        <td>Yoshi Tannamuri</td>
                                        <td>Canada</td>
                                    </tr>
                                    <tr>
                                        <td>Magazzini Alimentari Riuniti</td>
                                        <td>Giovanni Rovelli</td>
                                        <td>Italy</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
