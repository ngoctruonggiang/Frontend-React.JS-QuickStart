import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-about-header">
            Truyền thông nói về chúng tôi
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/BVKVeqVIeHQ"
                title="Ghibli Relaxing || 吉卜力钢琴 💓 轻松的音乐 🎶🎶 千与千寻, 天空之城, 哈尔的移动城堡,..."
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo
                trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn
                dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về
                backend và react để tạo dữ liệu thật cho trang home design này.
              </p>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
