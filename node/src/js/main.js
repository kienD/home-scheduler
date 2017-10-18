const schedule = require('node-schedule');
const wedeploy = require('wedeploy');

const HomeConstants = require('./home-constants');
const trelloTasks = require('./trelloTasks');

const {getMembers, addChore} = trelloTasks;

const {DATABASE_URL} = process.env;

console.log('Starting scheduler');

schedule.scheduleJob(
  {
    dayOfWeek: [0, 1, 2, 3, 4, 5, 6],
    hour: 5,
    minute: 0
  },
  () => {
    const now = new Date();

    console.log(`The Current Time is ${now}`);
  }
);

schedule.scheduleJob(
  {
    dayOfWeek: 4,
    hour: 6,
    minute: 0
  },
  () => {
    wedeploy.data(DATABASE_URL).get('people').then(
      people => {
        const now = new Date();

        console.log('Executed job at', now);

        people.map(({curChore, id}) => {
          addChore(id, HomeConstants.tasks[curChore]);

          console.log(curChore);

          if (curChore === choresArray.length - 1) {
            wedeploy.data(DATABASE_URL).update(
              `people/${id}`,
              {
                "curChore": 0
              }
            ).then (response => console.log(response))
          }
          else {
            wedeploy.data(DATABASE_URL).update(
              `people/${id}`,
              {"curChore": curChore + 1}
            );
          }
        });
      }
    );
  }
);

