import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import request from 'al-request';
import loglevel from 'loglevel';

let log = loglevel.getLogger('form-redux');

/**
 * Action Types
 */
export const CREATE = 'CREATE';
export const LOAD = 'LOAD';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const LOAD_FAIL = 'LOAD_FAIL';

/**
 * Action Creators
 */
export const create = createAction(CREATE);
export const load = createAction(LOAD, ({id, session}) => ({id, session}));
export const loadSuccess = createAction(LOAD_SUCCESS, (table) => ({table}));
export const loadFail = createAction(LOAD_FAIL, (error) => ({ error }));

/**
 * Initial State
 */
export const INITIAL_STATE = immutable({
  error: null,
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
    state.merge({fetching: false, error: null, ...payload}),
  FAIL: (state, {payload}) =>
    state.merge({fetching: false, error: payload.error})
}, INITIAL_STATE);

