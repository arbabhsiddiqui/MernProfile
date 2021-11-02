import axios from "axios";
import {
  WORK_LIST_REQUEST,
  WORK_LIST_SUCCESS,
  WORK_LIST_FAIL,
  WORK_DETAILS_REQUEST,
  WORK_DETAILS_SUCCESS,
  WORK_DETAILS_FAIL,
  WORK_DELETE_SUCCESS,
  WORK_DELETE_REQUEST,
  WORK_DELETE_FAIL,
  WORK_CREATE_REQUEST,
  WORK_CREATE_SUCCESS,
  WORK_CREATE_FAIL,
  WORK_UPDATE_REQUEST,
  WORK_UPDATE_SUCCESS,
  WORK_UPDATE_FAIL,
} from "./workConstants";

import { logout } from "../user/userActions";

export const listWorks =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: WORK_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/works?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: WORK_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: WORK_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listWorkDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: WORK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/works/${id}`);

    dispatch({
      type: WORK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WORK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteWork = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORK_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/works/${id}`, config);

    dispatch({
      type: WORK_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WORK_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createWork = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORK_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/works`, {}, config);

    dispatch({
      type: WORK_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WORK_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateWork = (work) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WORK_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/works/${work._id}`, work, config);

    dispatch({
      type: WORK_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: WORK_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: WORK_UPDATE_FAIL,
      payload: message,
    });
  }
};
