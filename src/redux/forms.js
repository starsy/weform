import { createAction, handleActions } from 'redux-actions';
import immutable from 'seamless-immutable';
import generateId from '../utils/generate-id';

export const REFRESH = 'REFRESH';
export const LOAD = 'LOAD';
export const REMOVE = 'REMOVE';
export const FINISH = 'FINISH';
export const UPDATE = 'UPDATE';
export const CREATE = 'CREATE';
export const RESTORE = 'RESTORE';

// 初始state
export const INITIAL_STATE = immutable([]);

export const refresh = createAction(REFRESH);
export const load = createAction(LOAD, (forms) => (forms));
export const finish = createAction(FINISH, (id) => ({ id }));
export const create = createAction(CREATE, (form) => (form));
export const update = createAction(UPDATE, (form) => (form));
export const remove = createAction(REMOVE, (id) => ({ id }));
export const restore = createAction(RESTORE, (id) => ({ id }));

// 默认导出reducer
export default handleActions({
  [LOAD]: (state, { payload }) =>
    immutable(payload),
  [REMOVE]: (state, { payload }) =>
    state.filter((form) => form.id !== payload.id),
  [CREATE]: (state, { payload }) =>
    INITIAL_STATE.concat(state, Object.assign({}, payload, { id: generateId() })),
  [FINISH]: (state, { payload }) =>
    state.map((form) => (form.id === payload.id ? form.merge({
      finished: true,
      finishedAt: (new Date()).toString()
    }) : form)),
  [RESTORE]: (state, { payload }) =>
    state.map((form) => (form.id === payload.id ? form.merge({
      finished: false
    }) : form)),
  [UPDATE]: (state, { payload }) =>
    state.map((form) => (form.id === payload.id ? form.merge(payload) : form)),
}, INITIAL_STATE);
