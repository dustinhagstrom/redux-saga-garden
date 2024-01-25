import { useDispatch } from "react-redux";

const PlantComponent = ({ plant }) => {
    const dispatch = useDispatch();

    const removeFromGarden = () => {
        dispatch({
            type: "DELETE_PLANT",
            url: `/api/plants/${plant.id}`,
        });
    };

    return (
        <>
            <li headers="nameHeader">{plant.name}</li>
            <button onClick={removeFromGarden}>Remove {plant.name} from Garden?</button>
        </>
    );
};

export default PlantComponent;
