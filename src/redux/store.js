import axios from "axios";
import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { takeLatest, put } from "redux-saga/effects";

// this startingPlantArray should eventually be removed
const startingPlantArray = [
    { id: 1, name: "Rose" },
    { id: 2, name: "Tulip" },
    { id: 3, name: "Oak" },
];

const plantList = (state = startingPlantArray, action) => {
    switch (action.type) {
        case "ADD_PLANT":
            return [...state, action.payload];
        default:
            return state;
    }
};

function* fetchPlants() {
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

function* rootSaga() {
    // call generator functions to dispatch to reducers.

    yield takeLatest("FETCH_PLANTS", fetchPlants);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({ plantList }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

export default store;
