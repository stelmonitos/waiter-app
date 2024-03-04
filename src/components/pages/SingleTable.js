import { getTableById } from "../../redux/tablesRedux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";


const SingleTable = () => {
    const { id } = useParams();
    const table = useSelector(tables => getTableById(tables, id));
    if(!table){
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Table {table.id}</h1><br />
            <div className="d-flex align-items-center"><strong className="me-4">Status: </strong>
                <Form.Select className="w-25">
                <option value="1">Free</option>
                <option value="2">Reserved</option>
                <option value="3">Cleaning</option>
                <option value="4">Busy</option>
                </Form.Select>
            </div><br />
            <div className="col-12">
                <strong className="me-4">People:</strong>{table.peopleAmount} / {table.maxPeopleAmount}
            </div><br />
            <div>
                <strong className="me-5">Bill:</strong>${table.bill}
            </div>

        </div>
    );
};

export default SingleTable;