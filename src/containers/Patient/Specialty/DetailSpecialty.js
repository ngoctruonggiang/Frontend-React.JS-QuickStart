//hien thi nhung gi ma patient nhin thay ve chuyên khoa
import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailSpecialty.scss';


class DetailSpecialty extends Component {
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

        return (
            <>
                <HomeHeader />
                <div className='detail-specialty-container'>
                    <div className='detail-specialty-header'>
                        Detail Specialty
                    </div>
                    <div className='detail-specialty-body'></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
