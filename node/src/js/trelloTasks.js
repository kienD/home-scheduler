const Trello = require('node-trello');
const lodash = require('lodash');
const wedeploy = require('wedeploy');

const HomeConstants = require('./home-constants');

const {
  API_KEY,
  CHORE_LIST_ID,
  HOME_BOARD_ID,
  TOKEN
} = process.env;

const trello = new Trello(API_KEY, TOKEN);

const addChore = (idMembers, name, daysToComplete) => {
  return addCardToList(
    {
      // due:
      idList: CHORE_LIST_ID,
      idMembers,
      name
    }
  );
}

const addCardToList = options => {
  trello.post('1/cards', options);
}

const getLists = () => trello.get(
  `/1/boards/${HOME_BOARD_ID}/lists`,
  {closed: false},
  (error, data) => {
    if (error) {
      throw error;
    }

    console.log('response', data);
  }
);

const getListCards = () => trello.get(
  `/1/list/${CHORE_LIST_ID}/cards`,
  (error, data) => {
    if (error) {
      throw error;
    }

    console.log('response', data);
  }
);

const getMembers = () => {
  return trello.get(
    `/1/boards/${HOME_BOARD_ID}/members`,
    (error, data) => {
      if (error) {
        throw error;
      }

      console.log('members', lodash.sortBy(data, o => o.fullName));

      return data.map(
        person => {
          const {fullName, id, username} = person;

          wedeploy.data('db-home-scheduler.wedeploy.io').create(
            'people',
            {
              fullName,
              id,
              username
            }
          ).then(
            response => {
              console.log("saved:", response);
            }
          ).catch(
            error => console.log(error)
          );
        }
      );
    }
  );
}

exports.addChore = addChore;
exports.getLists = getLists;
exports.getListCards = getListCards;
exports.getMembers = getMembers;
