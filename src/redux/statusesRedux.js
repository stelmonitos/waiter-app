//selectors
export const getAllStatus = state => state.statuses;

// actions
const createActionName = actionName => `app/statuses/${actionName}`;

// action creators

const statusesReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  };
};
export default statusesReducer;