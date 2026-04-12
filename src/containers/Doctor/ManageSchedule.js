//file nay de quan li lich lam viec cua bac si
import React, { Component } from 'react';
import { connect } from "react-redux";

class ManageSchedule extends Component {
    render() {
        const { isLoggedIn } = this.props;//extract object this.props roi luu vao bien isLoggedIn
        return (
            <>
                <div className="manage-schedule-container">
                    <div className="manage-schedule-title">
                        Quan li lich kham benh cua bac si
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
