// line 79
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import { cnb } from 'cnbuilder';
import EventDot from 'components/svg/EventDot';
import EventDotBtc from 'components/svg/EventDotBtc';
import EventViewModal from './EventViewModal';
import '../assets/css/sass/fix.scss';

const EventComponent = ({ event }) => {
  const [eventModal, setEventModal] = useState(false);

  const showEventViewModalHandler = () => {
    setEventModal(true);
  };
  return (
    <div className="rbc-cus-event-content">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className="mobile-rbc-cus-event-cell"
        onClick={() => showEventViewModalHandler(event)}
      >
        {!event.isMultipleEvent ? (
          <div className="d-flex justify-content-center">
            <div className="p-2">
              <span className="event-dot">
                {!event.isBitcoinEvent ? <EventDot /> : <EventDotBtc />}
              </span>
            </div>
          </div>
        ) : (
          <div className="rbc-multiple-event-wrapper">
            <div className="justify-content-center">
              <div className="p-2">
                {event.events.map((el, idx) => {
                  return (
                    idx > 2 ? <></> :
                    <span
                      key={idx}
                      className={cnb(
                        `event-dot-layer-${3 + idx}`,
                        // eslint-disable-next-line prettier/prettier
                        {'event-dot-translate': idx > 0},
                        'event-dot'
                      )}
                    >
                      {!el.isBitcoinEvent ? <EventDot /> : <EventDotBtc />}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="rbc-cus-event-cell rbc-event-today">
        <div className="event-content-wrapper">
          <div className="rbc-date-cell">
            <span>{dayjs(event.date).format('DD')}</span>
          </div>
          {!event.isMultipleEvent ? (
            <>
              <div className="d-lg-none d-flex justify-content-center">
                <div className="p-2">
                  <span className="event-dot">
                    {!event.isBitcoinEvent ? <EventDot /> : <EventDotBtc />}
                  </span>
                </div>
              </div>
              <div className="rbc-title-cell">
                <div className="d-none d-lg-block rbc-ellipsis">
                  <span>{event.title}</span>
                </div>
              </div>
              <div className="rbc-org-cell d-none d-lg-block">
                <span>{moment(event.date).format('MMMM Do, YYYY')}</span>
              </div>
              <div className="d-none d-lg-block">
                <div className="rbc-description-cell" dangerouslySetInnerHTML={{__html: event.description}} />
              </div>
              {event.isBitcoinEvent && (
                <div className="rbc-btc-letter-cell">
                  <img
                    className="d-none d-sm-block"
                    src="/assets/img/bitcoin-letter.png"
                    alt="Bitcoin Holiday"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="rbc-multiple-event-wrapper">
              {event.events.map((el, idx) => {
                return (
                  idx > 2 ? <></> :
                  <div
                    key={idx}
                    className="d-none d-lg-flex rbc-multiple-event-content"
                  >
                    <span>{el.title}</span>
                    {el.isBitcoinEvent && (
                      <span>
                        <img
                          src="/assets/img/bitcoin-letter.png"
                          alt="Bitcoin Holiday"
                        />
                      </span>
                    )}
                  </div>
                );
              })}
              <div className="d-lg-none d-flex justify-content-center">
                <div className="p-2">
                  {event.events.map((el, idx) => {
                    return (
                      <span
                        key={idx}
                        className={cnb(
                          `event-dot-layer-${3 + idx}`,
                          // eslint-disable-next-line prettier/prettier
                          {'event-dot-translate': idx > 0},
                          'event-dot'
                        )}
                      >
                        {!el.isBitcoinEvent ? <EventDot /> : <EventDotBtc />}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="event-btn-wrapper">
          <button
            type="button"
            className="btn btn-event-view"
            onClick={() => showEventViewModalHandler(event)}
          >
            <span>View Event</span>
          </button>
        </div>
      </div>
      <EventViewModal
        eventModal={eventModal}
        setEventModal={setEventModal}
        eventDetail={event}
      />
    </div>
  );
};

export default EventComponent;
