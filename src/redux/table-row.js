import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';

/**
 * Action Types
 */
export const TO_EDIT = 'TO_EDIT';
export const FINISH_EDIT = 'FINISH_EDIT';
export const CANCEL_EDIT = 'CANCEL_EDIT';

/**
 * Action Creators
 */
// 请求 action
export const to_edit = createAction(TO_EDIT);

// 操作成功
export const finish_edit = createAction(FINISH_EDIT, ({ id }) => ({ id }));

// 操作失败
export const cancel_edit = createAction(CANCEL_EDIT, (error) => ({ error }));

/**
 * Initial State
 */
export const INITIAL_STATE = immutable({
  editing: false,
});

/**
 * Reducers
 */
export default handleActions({
  TO_EDIT: (state) =>
    state.merge({ editing: true }),
  FINISH_EDIT: (state, { payload }) =>
    state.merge({ editing: false, error: null, ...payload }),
  CANCEL_EDIT: (state, { payload }) =>
    state.merge({ editing: false, error: payload.error })
}, INITIAL_STATE);
