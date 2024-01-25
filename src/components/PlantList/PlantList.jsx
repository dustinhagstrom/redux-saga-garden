import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PlantComponent from "../PlantComponent/PlantComponent";

function PlantList() {
    const dispatch = useDispatch();

    // return entire store state
    const plants = useSelector((store) => store.plantList);
    console.log("plants from state:", plants);

    const getPlants = () => {
        // dispatch an action to the redux rootSaga
        dispatch({
            type: "FETCH_PLANTS",
        });
    };

    useEffect(() => {
        // dispatch an action to request the plantList from the API
        getPlants();
    }, []);

    return (
            <ul>
                {plants.map((plant) => {
                    return <PlantComponent key={plant.id} plant={plant} />;
                })}
            </ul>
    );
}

export default PlantList;
