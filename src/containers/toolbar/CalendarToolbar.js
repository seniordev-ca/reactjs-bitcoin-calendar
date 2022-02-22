/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import TriangleDownIcon from 'components/svg/TriangleDownIcon';
import { connect } from 'react-redux';
import * as Add2Calendar from 'add2calendar';
import {
  initClient,
  signInToGoogle,
  publishTheCalenderEvent,
  checkSignInStatus,
} from '../../helpers/GoogleAPIService';
import DarkSwitch from './DarkSwitch';
import ShareIcon from '../../components/svg/ShareIcon';
import AddIcon from '../../components/svg/AddIcon';
import ListViewIcon from '../../components/svg/ListViewIcon';
import GridViewIcon from '../../components/svg/GridViewIcon';
import PrevIcon from '../../components/svg/PrevIcon';
import NextIcon from '../../components/svg/NextIcon';
import CalendarIcon from '../../components/svg/CalendarIcon';
import ShareModal from '../ShareModal';
import { months } from '../../constants/defaultValues';
import '../../assets/css/sass/fix.scss';

const CalendarToolbar = (toolbar) => {
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addToCalOpen, setAddToCalOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [multiEvents, setMultiEvents] = useState([]);
  useEffect(() => {
    setSelectedMonth(months[toolbar.date.getMonth()].value);
    setMultiEvents(toolbar.all);
  }, [toolbar]);

  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };
  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };
  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };
  const goToListView = () => {
    setSelectedRadio(1);
    toolbar.onView('agenda');
  };
  const goToMonthView = () => {
    setSelectedRadio(0);
    toolbar.onView('month');
  };
  const onUpdate = () => {
    toolbar.onNavigate(
      'DATE',
      new Date(new Date().getFullYear(), selectedMonth - 1, 1)
    );
  };
  const label = () => {
    const date = moment(toolbar.date);
    return <span>{date.format('MMMM')} </span>;
  };
  const getAuthToGoogle = async () => {
    const successfull = await signInToGoogle();
    if (successfull) {
      publishTheCalenderEvent(multiEvents);
    }
  };
  const addToGoogle = () => {
    initClient(async (success) => {
      if (success) {
        const status = await checkSignInStatus();
        if (status) {
          publishTheCalenderEvent(multiEvents);
        } else {
          getAuthToGoogle();
        }
      } else {
        getAuthToGoogle();
      }
    });
  };

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <div className={`big-calendar-header ${toolbar.view}`} id="big-calendar-header">
      <div className="d-flex justify-content-between align-items-center">
        <div className="bch-left-wrapper">
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <span className="goto-current-span" onClick={goToCurrent}>
            <img
              src="/assets/logos/black.png"
              alt="Bitcoin Logo"
              className="btc-logo d-none d-md-block"
            />
          </span>
          <div className="brc-header-title">
            <span className="brc-title-label">
              <b>Bitcoin</b> Holiday Calendar
            </span>
            <div className="brc-month-name-label">
              <button
                type="button"
                className="btn calendar-prev-btn d-block d-sm-none"
                onClick={goToBack}
              >
                <span className="theme-svg">
                  <PrevIcon />
                </span>
              </button>
              <span className="month-label-text">{label()}</span>
              <button
                type="button"
                className="btn calendar-next-btn d-block d-sm-none"
                onClick={goToNext}
              >
                <span className="theme-svg">
                  <NextIcon />
                </span>
              </button>
            </div>
          </div>

          <div>
            <div className="d-none d-sm-inline-block">
              <button
                type="button"
                className="btn calendar-prev-btn"
                onClick={goToBack}
              >
                <span className="theme-svg">
                  <PrevIcon />
                </span>
              </button>
              <button
                type="button"
                className="btn calendar-next-btn"
                onClick={goToNext}
              >
                <span className="theme-svg">
                  <NextIcon />
                </span>
              </button>
            </div>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => setDropdownOpen(!dropdownOpen)}
              className="calendar-dropdown calendar-dropdown-mobile d-none d-sm-inline-block"
            >
              <DropdownToggle className="calendar-btn">
                <span className="theme-svg d-none d-sm-block">
                  <CalendarIcon />
                </span>
                <span className="theme-svg d-none">
                  <TriangleDownIcon />
                </span>
              </DropdownToggle>
              <DropdownMenu>
                <div className="arrow" />
                <div>
                  <div>
                    <select
                      className="form-control month-select"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      onBlur={() => {}}
                    >
                      {months.map((el) => {
                        return (
                          <option value={el.value} key={el.value}>
                            {el.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <button
                    type="button"
                    className="btn btn-month-update"
                    onClick={onUpdate}
                  >
                    Update
                  </button>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="bch-right-wrapper d-md-flex">
          <DarkSwitch className="d-none d-md-flex darkswitch" />
          <ButtonGroup className="btn-group-toggle-view">
            <Button
              color="primary"
              className="btn-grid-view"
              onClick={goToMonthView}
              active={selectedRadio === 0}
            >
              <GridViewIcon />
            </Button>
            <Button
              color="primary"
              className="btn-list-view"
              onClick={goToListView}
              active={selectedRadio === 1}
            >
              <ListViewIcon />
            </Button>
          </ButtonGroup>
          {/* <span className="d-none d-lg-block"> */}
          <Dropdown
            isOpen={addToCalOpen}
            toggle={() => setAddToCalOpen(!addToCalOpen)}
            className="calendar-dropdown add-to-calendar-dropdown ml-0"
          >
            <DropdownToggle className="btn-add-to-calendar">
              <span className="d-none d-lg-block">
                <AddIcon />
                <span>Add to Calendar</span>
              </span>
              <span className="d-lg-none">
                <AddIcon />
              </span>
            </DropdownToggle>

            <DropdownMenu>
              <div className="arrow" />
              <div>
                <button
                  type="button"
                  className="btn btn-add-to-google"
                  onClick={addToGoogle}
                >
                  Add to Google Calendar
                </button>
                <a
                  href={new Add2Calendar(multiEvents).getOutlookUrl()}
                  download="download-outlook"
                  className="btn add-to-calendar-item"
                >
                  Add to Outlook
                </a>
                <a
                  href={new Add2Calendar(multiEvents).getICalUrl()}
                  download="download-icalendar"
                  className="btn add-to-calendar-item"
                >
                  Add to iCalendar
                </a>
              </div>
            </DropdownMenu>
          </Dropdown>
          {/* </span> */}
          <button
            type="button"
            className="btn btn-share d-none d-md-block"
            onClick={() => setShareModal(!shareModal)}
          >
            <ShareIcon />
          </button>
        </div>
      </div>
      <ShareModal shareModal={shareModal} setShareModal={setShareModal} />
    </div>
  );
};

const mapStateToProps = ({ events }) => {
  const { all } = events;
  return { all };
};

export default connect(mapStateToProps, {})(CalendarToolbar);
