import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { createSpecialtyService } from '../../../services/userService';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            descriptionMarkdown: '',
            descriptionHTML: '',
            imageBase64: '',
            name: '',
            previewImageURL: '',
            isOpen: false,
        }
    }
    async componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState) {


    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState(stateCopy);
    }
    //TODO: decode image from file to base64
    handleOnchangeImage = async (event) => {
        let data = event.target.files[0];
        let file = await CommonUtils.getBase64(data);
        this.setState({
            imageBase64: file,
            previewImageURL: file,
        })
    }
    //TODO: openPreviewImage
    openPreviewImage = () => {
        if (!this.state.previewImageURL) return;//neu khong co anh thi khong mo lightbox
        this.setState({
            isOpen: true
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }
    handleSaveSpecialty = async () => {
        let res = await createSpecialtyService(
            {
                name: this.state.name,
                image: this.state.imageBase64,
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
            }
        );
        if (res && res.errCode === 0) {
            toast.success('Thêm chuyên khoa thành công');
            this.setState({
                descriptionMarkdown: '',
                descriptionHTML: '',
                imageBase64: '',
                name: '',
                previewImageURL: '',
            })
        } else {
            toast.error('Thêm chuyên khoa thất bại');
            console.log('check error: ', res);
        }
    }
    render() {
        console.log('check state: ', this.state);

        return (
            <>
                <div className="manage-specialty-container">
                    <div className="manage-specialty-title">
                        Quản lý chuyên khoa
                    </div>
                    <div className="add-new-specialty row">
                        <div className="col-6">
                            <label>Tên chuyên khoa</label>
                            <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.handleOnChangeInput(e, 'name')} />
                        </div>
                        <div className="col-3">
                            <label><FormattedMessage id="manage-user.image" /></label>
                            <div>
                                <input id="preview-image" type="file" className="form-control" hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <div className="preview-image-container">
                                    <label className="label-upload" htmlFor="preview-image">Upload image<i className="fas fa-upload"></i></label>{/*dung htmlFor de lien ket input voi label*/}
                                    <div className="preview-image"
                                        style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="manage-specialty-editor mt-4">
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        ></MdEditor>
                    </div>
                    <button className="btn btn-primary btn-save-specialty mt-4" onClick={() => this.handleSaveSpecialty()}>Lưu</button>
                </div>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
