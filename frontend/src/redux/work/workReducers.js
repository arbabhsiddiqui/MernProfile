import {
  WORK_LIST_REQUEST,
  WORK_LIST_SUCCESS,
  WORK_LIST_FAIL,
  WORK_DETAILS_REQUEST,
  WORK_DETAILS_SUCCESS,
  WORK_DETAILS_FAIL,
  WORK_DELETE_REQUEST,
  WORK_DELETE_SUCCESS,
  WORK_DELETE_FAIL,
  WORK_CREATE_RESET,
  WORK_CREATE_FAIL,
  WORK_CREATE_SUCCESS,
  WORK_CREATE_REQUEST,
  WORK_UPDATE_REQUEST,
  WORK_UPDATE_SUCCESS,
  WORK_UPDATE_FAIL,
  WORK_UPDATE_RESET,
} from "./workConstants";

export const workListReducer = (state = { works: [] }, action) => {
  switch (action.type) {
    case WORK_LIST_REQUEST:
      return { loading: true, works: [] };
    case WORK_LIST_SUCCESS:
      return {
        loading: false,
        works: action.payload.works,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case WORK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workDetailsReducer = (state = { work: {} }, action) => {
  switch (action.type) {
    case WORK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case WORK_DETAILS_SUCCESS:
      return { loading: false, work: action.payload };
    case WORK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case WORK_DELETE_REQUEST:
      return { loading: true };
    case WORK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case WORK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const workCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WORK_CREATE_REQUEST:
      return { loading: true };
    case WORK_CREATE_SUCCESS:
      return { loading: false, success: true, work: action.payload };
    case WORK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case WORK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const workUpdateReducer = (state = { work: {} }, action) => {
  switch (action.type) {
    case WORK_UPDATE_REQUEST:
      return { loading: true };
    case WORK_UPDATE_SUCCESS:
      return { loading: false, success: true, work: action.payload };
    case WORK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case WORK_UPDATE_RESET:
      return { work: {} };
    default:
      return state;
  }
};
