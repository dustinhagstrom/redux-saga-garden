import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantList() {
    const dispatch = useDispatch();

    // return entire store state
    const reduxState = useSelector(store => store);

    const getPlants = () => {
        // dispatch an action to the redux rootSaga
        dispatch({
            type: "FETCH_PLANTS"
        })
    }

    useEffect(() => {
        // dispatch an action to request the plantList from the API
        getPlants();
    }, []); 

    return (
        <div>
            <h3>This is the plant list</h3>
            <pre>{JSON.stringify(reduxState)}</pre>
        </div>
    );
}

export default PlantList;
