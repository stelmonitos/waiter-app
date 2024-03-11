import { API_URL } from "../config";

//selectors
export const getAllTables = state => state.tables;
export const getTableById = ({tables}, id) => tables.find(table => table.id === id);


// actions
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
export const EDIT_TABLE = createActionName('EDIT_TABLE');

// action creators
export const updateTables = payload => ({ payload, type: UPDATE_TABLES});
export const editTable = payload => ({ payload, type: EDIT_TABLE,});

export const editTableRequest = (editTable) => {
  debugger;
  console.log(editTable);
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editTable),
    };

    fetch(API_URL + editTable.id , options)
      .then(() => dispatch(updateTables(editTable)));
  }
}

export const fetchTables = () => {
  return (dispatch) => {
   fetch(API_URL + '/tables')
    .then(res => res.json())
    .then(tables => dispatch(updateTables(tables)));
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    case EDIT_TABLE:
      return statePart.map(table => (table.id === action.payload.id ? {...table, ...action.payload} : table))
    default:
      return statePart;
  };
};
export default tablesReducer;