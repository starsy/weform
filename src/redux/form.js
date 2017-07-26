import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import request from 'al-request';
import loglevel from 'loglevel';

let log = loglevel.getLogger('form-redux');

/**
 * Action Types
 */
export const CREATE = 'CREATE';
export const GET = 'GET';
export const FAIL = 'FAIL';

/**
 * Action Creators
 */
export const create = createAction(CREATE);
export const get = createAction(GET, async ({id, login}) => (await getTable(id, login.thirdSession)));
export const fail = createAction(FAIL, (error) => ({ error }));

/**
 * Initial State
 */
export const INITIAL_STATE = immutable({
  error: null,
  table: null,
});

/**
 * Reducers
 */
export default handleActions({
  GET: (state, {payload}) => {
    log.info("in handleAction [GET]", payload);
    return state.merge({table: payload})},
  CREATE: (state, { payload }) =>
    state.merge({ fetching: false, error: null, ...payload }),
  FAIL: (state, { payload }) =>
    state.merge({ fetching: false, error: payload.error })
}, INITIAL_STATE);


async function getTable(id, s) {
  let res = null;
  try {
    log.info("get table:" + id);
    res = await request.get('form/' + id, {}, {s: s});
  } catch (e) {
    log.error("Error when getting form: ", e);
    return null;
  }
  log.info("table response:", res);
  return res;
}
