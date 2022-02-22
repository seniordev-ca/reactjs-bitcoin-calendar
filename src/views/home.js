/* eslint-disable react/no-array-index-key, react/no-danger */
import React from 'react';
import { Row } from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import fm from 'front-matter';
import { Colxx } from '../components/common/CustomBootstrap';
import AppLayout from '../layout/AppLayout';
import CalendarToolbar from '../containers/toolbar/CalendarToolbar';
import { AgendaView } from '../containers/AgendaView';
import EventComponent from '../containers/EventComponent';
import { addAllEvents, addEvents } from '../redux/actions';
import { defaultImgLink } from '../constants/defaultValues';

const Localizer = momentLocalizer(moment);

const importAll = (r) => r.keys();
const markdownFiles = importAll(
  require.context('../../public/events', false, /\.md$/)
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: new Date(),
    };
  }

  async componentDidMount() {
    await this.initData();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  initData = async () => {
    const { selectedDay } = this.state;
    const events = await Promise.all(
      markdownFiles.map((file) =>
        fetch(`/events/${file}`)
          .then((res) => res.text())
          .then((res) => fm(res))
          .then((res) => {
            const eventDate =
              typeof res.attributes.date === 'string'
                ? moment(res.attributes.date, 'YYYY-MM-DD').toDate()
                : res.attributes.date;
            const date = new Date(
              selectedDay.getFullYear(),
              eventDate.getMonth(),
              eventDate.getDate()
            );
            // eslint-disable-next-line no-nested-ternary
            const img = res.attributes.img
              ? (res.attributes.img.startsWith('http://') ||
                res.attributes.img.startsWith('https://')
                ? res.attributes.img
                : `/events/${res.attributes.img}`) : defaultImgLink;
            return {
              start: date,
              end: date,
              date: eventDate,
              title: res.attributes.title,
              img,
              isBitcoinEvent: res.attributes.isBitcoinEvent,
              description: res.body,
            };
          })
          .catch((error) => console.log(error))
      )
    );

    const grouped = [];
    events.forEach((el) => {
      const id = grouped.findIndex(
        (val) => val.start.getTime() === el.start.getTime()
      );
      if (id >= 0) {
        grouped[id].isMultipleEvent = true;
        if (!grouped[id].events) {
          grouped[id].events = [
            {
              date: grouped[id].date,
              title: grouped[id].title,
              img: grouped[id].img,
              isBitcoinEvent: grouped[id].isBitcoinEvent,
              description: grouped[id].description,
            },
          ];
        }
        grouped[id].events.push(el);
      } else {
        grouped.push(el);
      }
    });
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      events: grouped,
    });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addEvents(grouped);
    // eslint-disable-next-line react/destructuring-assignment
    this.props.addAllEvents(events);
  };

  handleScroll = () => {
    if (
      document.body.scrollTop > 35 ||
      document.documentElement.scrollTop > 35
    ) {
      document.getElementById('big-calendar-header').classList.add('sticky');
    } else {
      document.getElementById('big-calendar-header').classList.remove('sticky');
    }
  };

  onNavigate = (day) => {
    const { selectedDay } = this.state;
    this.setState(
      {
        selectedDay: day,
      },
      async () => {
        if (selectedDay.getFullYear() !== day.getFullYear()) {
          await this.initData();
        }
      }
    );
  };

  render() {
    const { selectedDay } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const events = this.props.grouped;
    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Row className="m-0">
            <Colxx xxs="12" className="p-0">
              <div className="calendar-wrapper">
                <Calendar
                  className=""
                  selectable={false}
                  localizer={Localizer}
                  resizable
                  startAccessor="start"
                  endAccessor="end"
                  events={events}
                  defaultView="month"
                  date={selectedDay}
                  step={15}
                  components={{
                    toolbar: CalendarToolbar,
                    event: EventComponent,
                  }}
                  showMultiDayTimes
                  views={{
                    month: true,
                    agenda: AgendaView,
                  }}
                  onNavigate={(day) => this.onNavigate(day)}
                />
              </div>
            </Colxx>
          </Row>
        </div>
      </AppLayout>
    );
  }
}

const mapStateToProps = ({ settings, events }) => {
  const { locale } = settings;
  const { grouped } = events;
  return { locale, grouped };
};
const mapActionsToProps = (dispatch) => {
  return {
    addEvents: (events) => dispatch(addEvents(events)),
    addAllEvents: (events) => dispatch(addAllEvents(events)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
