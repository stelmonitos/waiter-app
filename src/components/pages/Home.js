import { useEffect } from "react";
import { fetchTables } from "../../redux/tablesRedux";
import Tables from "../features/TablesList";
import { useDispatch } from "react-redux";


const Home = () => {
    const dispatch = useDispatch();
    useEffect(() => {dispatch(fetchTables());}, [dispatch]);
    return (
      <div>
        <h1>All Tables</h1>
        <Tables />
      </div>
    );
}
export default Home;