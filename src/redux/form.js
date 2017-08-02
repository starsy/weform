import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import loglevel from 'loglevel';

let log = loglevel.getLogger('form-redux');

export const CREATE = 'CREATE';
export const create = createAction(CREATE);

export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';

export const load = createAction(LOAD, ({id, session}) => ({id, session}));
export const loadSuccess = createAction(LOAD_SUCCESS, (table) => ({table}));
export const loadFail = createAction(LOAD_FAIL, (err) => ({ err }));

export const CREATE_ROW = 'CREATE_ROW';
export const CREATE_ROW_SUCCESS = 'CREATE_ROW_SUCCESS';
export const CREATE_ROW_FAIL = 'CREATE_ROW_FAIL';

export const createRow = createAction(CREATE_ROW, ({form_id, row, session}) => ({form_id, row, session}));
export const createRowSuccess = createAction(CREATE_ROW_SUCCESS, (row) => ({row}));
export const createRowFail = createAction(CREATE_ROW_FAIL, (err) => ({err}));

/**
 * Initial State
 */
export const INITIAL_STATE = immutable({
  err: null,
  table: null,
  loading: false,
});

/**
 * Reducers
 */
export default handleActions({
  LOAD: (state, {payload}) => {
    log.info("in handleAction [LOAD]", payload);
    return state.merge({loading: true})
  },
  
  LOAD_SUCCESS: (state, {payload}) => {
    log.info("in handleAction [LOAD_SUCCESS]", payload);
    return state.merge({table: payload.table, loading: false})
  },
  
  CREATE: (state, {payload}) =>
    state.merge({fetching: false, err: null, ...payload}),
  
  FAIL: (state, {payload}) =>
    state.merge({fetching: false, err: payload.err}),
  
  CREATE_ROW: (state, {payload}) =>
    state.merge({fetching: false, err: null}),
  
  CREATE_ROW_SUCCESS: (state, {payload}) => {
    let newState = state.setIn(['table', 'data', 'rows'], state.table.data.rows.concat([payload.row]));
    log.info("in handleAction [CREATE_ROW_SUCCESS]", newState);

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1000
    });
    return newState;
  },
  
  CREATE_ROW_FAIL: (state, {payload}) =>
    state.merge({fetching: false, err: null}),
}, INITIAL_STATE);

