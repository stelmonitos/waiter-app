import { getTableById } from "../../redux/tablesRedux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SingleTable from "./SingleTable";
import { useEffect } from "react";
import { fetchTables } from "../../redux/tablesRedux";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const SingleTableWrapper = props => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const table = useSelector(tables => getTableById(tables, id));
    useEffect(() => {dispatch(fetchTables());}, [dispatch]);
    if(table){
    return (
        <SingleTable
            {...props}
        />
    );
    } else {
        if(table === undefined){
            return <Navigate to="/" />;
        };
    }
}

export default SingleTableWrapper;