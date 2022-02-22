/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as Add2Calendar from 'add2calendar';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import CloseIcon from '../components/svg/CloseIcon';
import {
  initClient,
  signInToGoogle,
  publishTheCalenderEvent,
  checkSignInStatus,
} from '../helpers/GoogleAPIService';

const AddToCalendarModal = ({
  addToCalendarModal,
  setAddToCalendarModal,
  all,
}) => {
  const getAuthToGoogle = async () => {
    const successfull = await signInToGoogle();
    if (successfull) {
      publishTheCalenderEvent(all);
    }
  };
  const addToGoogle = () => {
    initClient(async (success) => {
      if (success) {
        const status = await checkSignInStatus();
        if (status) {
          publishTheCalenderEvent(all);
        } else {
          getAuthToGoogle();
        }
      } else {
        getAuthToGoogle();
      }
    });
  };

  return (
    <Modal
      className="share-modal"
      isOpen={addToCalendarModal}
      toggle={() => setAddToCalendarModal(!addToCalendarModal)}
    >
      <div className="share-header">
        <button
          type="button"
          className="btn btn-empty p-0"
          onClick={() => setAddToCalendarModal(!addToCalendarModal)}
        >
          <span className="theme-svg">
            <CloseIcon />
          </span>
        </button>
      </div>
      <ModalBody>
        <div className="share-title text-center mb-3">Add To Calendar</div>
        <div>
          <button
            type="button"
            className="btn btn-add-to-google"
            onClick={addToGoogle}
          >
            Add to Google Calendar
          </button>
          <a
            href={new Add2Calendar(all).getOutlookUrl()}
            download="download-outlook"
            className="btn add-to-calendar-item"
          >
            Add to Outlook
          </a>
          <a
            href={new Add2Calendar(all).getICalUrl()}
            download="download-icalendar"
            className="btn add-to-calendar-item"
          >
            Add to iCalendar
          </a>
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = ({ events }) => {
  const { all } = events;
  return { all };
};

export default connect(mapStateToProps, {})(AddToCalendarModal);
