/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import moment from 'moment';

import ArrowLeftIcon from '../components/svg/ArrowLeftIcon';
import ShareIcon from '../components/svg/ShareIcon';
import ShareModal from './ShareModal';

const EventViewModal = ({ eventModal, setEventModal, eventDetail }) => {
  const [shareModal, setShareModal] = useState(false);
  const events = eventDetail.isMultipleEvent
    ? eventDetail.events
    : [eventDetail];
  return (
    <Modal
      className="event-view-modal"
      isOpen={eventModal}
      toggle={() => setEventModal(!eventModal)}
      wrapClassName="modal-right"
    >
      <ModalBody>
        <div className="section-header">
          <button
            type="button"
            className="btn btn-empty p-0"
            onClick={() => setEventModal(!eventModal)}
          >
            <span className="theme-svg">
              <ArrowLeftIcon />
            </span>
          </button>
          <div className="header-title">
            What happened in {eventDetail !== undefined ? moment(eventDetail.date).format('MMMM') : ''}?
          </div>
          <button
            type="button"
            className="btn btn-empty p-0"
            onClick={() => setShareModal(!shareModal)}
          >
            <span className="theme-svg">
              <ShareIcon />
            </span>
          </button>
        </div>
        {events.map((el, idx) => {
          return (
            <div className="section-body" key={idx}>
              <div className="event-title">{el?.title ?? ''}</div>
              <div className="event-img-wrapper">
                {el?.img && (
                  <img
                    alt={el?.title ?? ''}
                    src={el?.img}
                    className="event-img"
                  />
                )}
              </div>
              <div className="event-org">
                {el !== undefined
                  ? moment(el.date).format('MMMM Do, YYYY')
                  : ''}
              </div>
              <div className="separator" />
              <div
                className="event-description"
                dangerouslySetInnerHTML={{ __html: el?.description ?? '' }}
              />
            </div>
          );
        })}
      </ModalBody>

      <ShareModal shareModal={shareModal} setShareModal={setShareModal} />
    </Modal>
  );
};

export default EventViewModal;
