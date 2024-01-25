import React, { useState } from "react";
import { useDispatch } from "react-redux";

const PlantForm = () => {
    const dispatch = useDispatch();

    const initialState = {
        id: 4,
        name: "",
        kingdom: "",
        clade: "",
        order: "",
        family: "",
        subfamily: "",
        genus: "",
    };

    let [newPlant, setPlant] = useState(initialState);

    const handleInputOnChange = (event) => {
        // console.log("event.target.name", event.target.name);
        setPlant({ ...newPlant, [event.target.name]: event.target.value });
    };

    const addNewPlant = (event) => {
        event.preventDefault();
        dispatch({ type: "ADD_PLANT", payload: newPlant });
        
        //updates the next plant to have a new id
        setPlant({ ...initialState, id: newPlant.id + 1 });
    };
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={newPlant.name}
                        onChange={handleInputOnChange}
                    />
                </label>
                <label>
                    Kingdom
                    <input
                        type="text"
                        name="kingdom"
                        value={newPlant.kingdom}
                        onChange={handleInputOnChange}
                    />
                </label>
                <label>
                    Clade
                    <input
                        type="text"
                        name="clade"
                        value={newPlant.clade}
                        onChange={handleInputOnChange}
                    />
                </label>
                <label>
                    Order
                    <input
                        type="text"
                        name="order"
                        value={newPlant.order}
                        onChange={handleInputOnChange}
                    />
                </label>
                <label>
                    Family
                    <input
                        type="text"
                        name="family"
                        value={newPlant.family}
                        onChange={handleInputOnChange}
                    />
                </label>
                <label>
                    Subfamily
                    <input
                        type="text"
                        name="subfamily"
                        value={newPlant.subfamily}
                        onChange={handleInputOnChange}
                    />
                </label>
                <label>
                    Genus
                    <input
                        type="text"
                        name="genus"
                        value={newPlant.genus}
                        onChange={handleInputOnChange}
                    />
                </label>
                <input type="submit" value="Add New Plant" />
            </form>
        </div>
    );
};

export default PlantForm;
