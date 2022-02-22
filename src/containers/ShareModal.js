/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Input, Modal, ModalBody } from 'reactstrap';
import {
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share';
import LinkedInIcon from '../components/svg/LinkedInIcon';
import FacebookIcon from '../components/svg/FacebookIcon';
import TwitterIcon from '../components/svg/TwitterIcon';
import CloseIcon from '../components/svg/CloseIcon';

const ShareModal = ({ shareModal, setShareModal }) => {
  const shareUrl = window.location.href;
  return (
    <Modal
      className="share-modal"
      isOpen={shareModal}
      toggle={() => setShareModal(!shareModal)}
    >
      <div className="share-header">
        <button
          type="button"
          className="btn btn-empty p-0"
          onClick={() => setShareModal(!shareModal)}
        >
          <span className="theme-svg">
            <CloseIcon />
          </span>
        </button>
      </div>
      <ModalBody>
        <div className="share-title">Share with friends</div>
        <div className="social-button-wrapper d-flex flex-sm-nowrap">
          <FacebookShareButton url={shareUrl}>
            <span className="theme-svg social-icon">
              <FacebookIcon />
            </span>
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <span className="theme-svg social-icon">
              <TwitterIcon />
            </span>
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <span className="theme-svg social-icon">
              <LinkedInIcon />
            </span>
          </LinkedinShareButton>
        </div>
        <div className="share-footer">
          <Input disabled value={shareUrl} className="input-share" />
          <button
            type="button"
            className="btn btn-copy-url"
            onClick={() => navigator.clipboard.writeText(shareUrl)}
          >
            Copy
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ShareModal;
