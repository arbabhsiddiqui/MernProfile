import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listWorks,
  deleteWork,
  createWork,
} from "../../redux/work/workActions";
import { WORK_CREATE_RESET } from "../../redux/work/workConstants";

const WorkListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const workList = useSelector((state) => state.workList);
  const { loading, error, works } = workList;

  const workDelete = useSelector((state) => state.workDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = workDelete;

  const workCreate = useSelector((state) => state.workCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    work: workRes,
  } = workCreate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      console.log(id);
      dispatch(deleteWork(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createWork());
  };

  useEffect(() => {
    dispatch({ type: WORK_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push("/babakha");
    }
    dispatch(listWorks("", pageNumber));

    if (successCreate) {
      history.push(`/admin/work/${workRes._id}/edit`);
    } else {
      dispatch(listWorks("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    workRes,
    pageNumber,
  ]);

  return (
    <div className=" container mt-100 text-light">
      <Row className="align-items-center">
        <Col>
          <h1 className="text-light">Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>IMAGE</th>
                <th>GIT_URL</th>
                <th>SITE_URL</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {works.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <img src={`${item.image}`} width="80" alt="" />
                  </td>
                  <td>{item.gitUrl}</td>
                  <td>{item.siteUrl}</td>
                  <td>
                    <LinkContainer to={`/admin/work/${item._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default WorkListPage;
