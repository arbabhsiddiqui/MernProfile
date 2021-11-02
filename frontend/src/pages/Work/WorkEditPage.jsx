import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { listWorkDetails, updateWork } from "../../redux/work/workActions";
import { WORK_UPDATE_RESET } from "../../redux/work/workConstants";

const WorkEditPage = ({ match, history }) => {
  const workId = match.params.id;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const workDetails = useSelector((state) => state.workDetails);
  const { loading, error, work } = workDetails;

  const workUpdate = useSelector((state) => state.workUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = workUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: WORK_UPDATE_RESET });
      history.push("/admin/work");
    } else {
      if (!work.name || work._id !== workId) {
        dispatch(listWorkDetails(workId));
      } else {
        setName(work.name);
        setImage(work.image);
        setGitUrl(work.gitUrl);
        setSiteUrl(work.siteUrl);
      }
    }
  }, [dispatch, history, workId, work, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateWork({
        _id: workId,
        name,
        image,
        gitUrl,
        siteUrl,
      })
    );
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>GitUrl</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter gitUrl"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Site Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Site Url"
                value={siteUrl}
                onChange={(e) => setSiteUrl(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default WorkEditPage;
