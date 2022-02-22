// eslint-disable-next-line import/named
import {
  API_KEY,
  CLIENT_ID,
  DISCOVERY_DOCS,
  SCOPES,
} from '../constants/defaultValues';

const { gapi } = window;

export function initClient(callback) {
  gapi.load('client:auth2', () => {
    try {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(
          // eslint-disable-next-line func-names
          function () {
            if (typeof callback === 'function') {
              callback(true);
            }
          },
          // eslint-disable-next-line func-names
          function (error) {
            console.log(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  });
}

// eslint-disable-next-line consistent-return
export const checkSignInStatus = async () => {
  try {
    return await gapi.auth2.getAuthInstance().isSignedIn.get();
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line consistent-return
export const signInToGoogle = async () => {
  try {
    const googleuser = await gapi.auth2
      .getAuthInstance()
      .signIn({ prompt: 'consent' });
    if (googleuser) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const publishTheCalenderEvent = (events) => {
  try {
    gapi.client.load('calendar', 'v3', () => {
      const batch = gapi.client.newBatch();
      events.forEach((el) => {
        batch.add(
          gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: {
              summary: el.title,
              location: '',
              description: el.description,
              start: {
                dateTime: el.date.toISOString(),
              },
              end: {
                dateTime: el.date.toISOString(),
              },
              attendees: [],
            },
          })
        );
      });

      batch.then(function () {
        alert('Events Added!');
      });
    });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line consistent-return
export const getSignedInUserEmail = async () => {
  try {
    const status = await checkSignInStatus();
    if (status) {
      const auth2 = gapi.auth2.getAuthInstance();
      const profile = auth2.currentUser.get().getBasicProfile();
      return profile.getEmail();
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};
