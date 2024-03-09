import { editTableRequest, getTableById } from "../../redux/tablesRedux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import style from "./SingleTable.module.scss";
import { useState } from "react";
import { getAllStatus } from "../../redux/statusesRedux";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

const SingleTable = ({action , ...props }) => {
    const { id } = useParams();
    const table = useSelector(tables => getTableById(tables, id));
    const dispatch = useDispatch(); 
    const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
    const [maxPeople, setMaxPeople] = useState(table.maxPeopleAmount);
    const [bill, setBill] = useState(table.bill);
    const [status, setStatus] = useState(table.status);
    const statuses = useSelector(getAllStatus);

    const { register, handleSubmit: validate, formState: {errors} } = useForm();

    const handleSubmit = () => {
        dispatch(editTableRequest({ ...table, id, peopleAmount, maxPeople, bill, status}))
    };
    
    return (
        <form onSubmit={validate(handleSubmit)}>
            <h1>Table {table.id}</h1><br />
            <div className="d-flex align-items-center"><strong className="me-4">Status: </strong>
                <Form.Select onChange = 
                {e => {
                    setStatus(e.target.value);
                    if(e.target.value === 'Busy'){
                        setBill('0');
                    } else if(e.target.value === 'Free' || e.target.value === 'Cleaning'){
                        setPeopleAmount('0');
                    }
                }} 
                className={style.selectWidth}>
                    <option>{table.status}</option>
                    {statuses.map(status => (
                        <option key={status.id} value={status.name} onClick={() => setStatus(status.name)}>{status.name}</option>
                    ))}
                </Form.Select>
            </div><br />

            <div className="d-flex col-sm-12 align-items-center">
                <strong className="me-4">People:</strong>
                <div className={`d-flex align-items-center ${style.numberWidth}`}>
                <Form.Control
                {...register('peopleAmount', {required: true, min: 0, max: maxPeople})}
                    type="string" 
                    className={style.numberCenter} 
                    value={peopleAmount} 
                    onChange={e => setPeopleAmount(e.target.value)}
                    />
                <div className="mx-3">/</div>
                <Form.Control 
                    {...register('maxPeople', {required: true, min: 0, max: 10})}
                    type="string" className={style.numberCenter} 
                    value={maxPeople} 
                    onChange={e => setMaxPeople(e.target.value)}
                    />
                </div><br />
                {errors.peopleAmount && <span className="ms-2 form-text text-danger">min 0 and max people is {maxPeople}</span>}
                {errors.peopleAmount && errors.maxPeople && <span className="ms-2 form-text text-danger">wrong values</span>}
                {errors.maxPeople && <span className="ms-2 form-text text-danger">max value is 10</span>}
            </div><br />
            {status === 'Busy' && (
                <div className="d-flex align-items-center">
                    <strong className="me-5">Bill:</strong>
                   <div className="me-2">$</div> <Form.Control className={style.billWidth} type="string" value={bill} onChange={e => setBill(e.target.value)} />
                </div>
            )}
            <Button type="submit" variant="primary" className="mt-3">Update</Button>
        </form>
    );
};

export default SingleTable;
