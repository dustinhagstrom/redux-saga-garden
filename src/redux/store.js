import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeLatest, put } from "redux-saga/effects";


const plantList = (state = [], action) => {
    switch (action.type) {
        case "SET_PLANTS":
            return action.payload;
        default:
            return state;
    }
};

function* fetchPlants(action) {
    try {
        const allPlantsRes = yield axios.get("/api/plants");

        yield put({
            type: "SET_PLANTS",
            payload: allPlantsRes.data,
        });
    } catch (error) {
        console.log("we got ourselves an error up in here.");
        console.error(error);
    }
}

function* AddPlant(action) {
    try {
        yield axios.post("/api/plants", action.payload);

        // refresh the DOM
        yield put({
            type: "FETCH_PLANTS",
            fetchPlants,
        });
    } catch (error) {
        console.log("we got ourselves an error in here.");
        console.error(error);
    }
}

function* deletePlant(action) {
  try {
    yield axios.delete(action.url);
    
    // refresh the DOM
    yield put({
      type: "FETCH_PLANTS",
      fetchPlants,
  });
  } catch (error) {
    console.log("we got ourselves an error in here.");
    console.error(error);
  }
}

function* rootSaga() {
    // call generator functions to dispatch to reducers.

    yield takeLatest("FETCH_PLANTS", fetchPlants);

    yield takeLatest("ADD_PLANT", AddPlant);

    yield takeLatest("DELETE_PLANT", deletePlant);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({ plantList }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
