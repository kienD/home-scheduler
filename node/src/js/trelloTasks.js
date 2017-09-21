const Trello = require('node-trello');
const lodash = require('lodash');
const wedeploy = require('wedeploy');

const HomeConstants = require('./home-constants');

const {
  API_KEY,
  CHORE_LIST_ID,
  DATABASE_URL,
  HOME_BOARD_ID,
  TOKEN
} = process.env;

const trello = new Trello(API_KEY, TOKEN);

const addChore = (idMembers, {name, desc}) => {
  console.log(idMembers)
  return addCardToList(
    {
      desc,
      idList: CHORE_LIST_ID,
      idMembers,
      name
    }
  );
}

const addCardToList = options => {
  trello.post(
    '1/cards',
    options,
    (error, data) => {
      if (error) {
        throw error;
      }
    }
  );
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
    }
  );
}

updateChore = (choreId, userId) => {
  return wedeploy.data(DATABASE_URL).update(
    `people/${userId}`,
    {"curChore": choreId}
  ).then(
    response => console.log(`Updated values to ${response}`)
  );
}

exports.addChore = addChore;
exports.getLists = getLists;
exports.getListCards = getListCards;
exports.getMembers = getMembers;
exports.updateChore = updateChore;
