import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2026 Đặng Ngọc Trường Giang. More information{" "}
            <a
              target="_blank"
              href="https://github.com/ngoctruonggiang"
            >
              {" "}
              &#8594; please click here: &#8592;{" "}
            </a>
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  //truy cap ham nay qua props.changeLanguageAppRedux
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
