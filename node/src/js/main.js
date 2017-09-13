const schedule = require('node-schedule');

const HomeConstants = require('./home-constants');
const trelloTasks = require('./trelloTasks');

const {BATHROOM, FLOORS, SURFACES} = HomeConstants.tasks;
const {getMembers, addChore} = trelloTasks;

const choresArray = [BATHROOM, FLOORS, SURFACES];

console.log('Starting scheduler');

// trelloTasks.getLists();
// trelloTasks.addChores();

getMembers()//.then(
  // members => {
  //   members.forEach(
  //     (member, i) => addChore(member, choresArray[i])
  //   );
  // }
// );

// choresArray.forEach(
//   (chore, i) => {
//     addChore(membersArray[i], chore);
//   }
// );


// schedule.scheduleJob(
//   {minute: 60},
//   () => {
//     const now = new Date();

//     console.log(`The Current Time is ${now}`);
//   }
// );

// schedule.scheduleJob(
//   {
//     dayOfWeek: 5,
//     hour: 20
//   },
//   () => {
//     console.log('Executing Job');
//   }
// );

