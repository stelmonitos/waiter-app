import { getAllTables } from "../../redux/tablesRedux";
import { useSelector } from "react-redux";
import { Button, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const Tables = () => {
    const tables = useSelector(getAllTables);
    if(!tables){
        return 'Loading...';
    }
    return (
        <Container>
            <div className="row">
                <ListGroup variant="flush" className="px-0">
                    {tables.map(table => (
                        <ListGroup.Item key={table.id} className="d-flex justify-content-between align-items-center my-2 px-0">
                            <div className="d-flex align-items-center">
                                <div className="me-3">
                                    <h2>Table {table.id}</h2>
                                </div>
                                <div>
                                    <strong className="ms-3">Status: </strong> {table.status}
                                </div>
                            </div>
                        <Link to={`/table/${table.id}`} key={table.id}>
                            <Button>Show more</Button>
                        </Link>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </Container>
    );
};

export default Tables;