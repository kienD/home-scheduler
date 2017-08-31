import {scheduleJob} from 'node-schedule';

console.log('Starting scheduler');

scheduleJob(
  {minute: 60},
  () => {
    const now = new Date();

    console.log(`The Current Time is ${now}`);
  }
);


scheduleJob(
  {
    dayOfWeek: 5,
    hour: 20
  },
  () => {
    console.log('Executing Job');
  }
);

