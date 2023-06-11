import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  InputNumber,
  Input,
  Form,
  Button,
  Spin,
  Typography,
} from "antd";
import { makeHomeLoadingState } from "../../Selectors";
import { createImage } from "../../ActionCreators/ImageActionCreators";
import HomeCard from "./Partial/HomeCard";

const { TextArea } = Input;
const { Item } = Form;
const { Title } = Typography;
const Home = () => {
  const [createModalStatus, setCreateModalStatus] = useState(false);
  const [createForm] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(makeHomeLoadingState);
  const onAddButtonClicked = () => {
    setCreateModalStatus(true);
  };

  const gotoGallery = () => {
    navigate('/image-gallery')
  };

  const initCreateImage = (values: object) => {
    dispatch(createImage(values, navigate));
    onCloseModal();
  };

  const onCloseModal = () => {
    createForm.resetFields([
      'width',
      'height',
      'size',
      'greeting1',
      'greeting2'
    ]);
    setCreateModalStatus(false);
  };

  const imageAddModal = () => (
    <Modal
      title={
        <div className="add-image-modal-header">
          <span>Create New Image</span>
        </div>
      }
      open={createModalStatus}
      onOk={initCreateImage}
      onCancel={onCloseModal}
      footer={null}
      className="add-image-modal"
    >
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        autoComplete="off"
        onFinish={initCreateImage}
        layout="vertical"
        className="add-image-modal-form"
        form={createForm}
      >
        <Item
          label="Width"
          name="width"
          rules={[{ required: true, message: 'Please enter a valid number for width' }]}
        >
          <InputNumber min={1} />
        </Item>
        <Item
          label="Height"
          name="height"
          rules={[{ required: true, message: 'Please enter a valid number for height' }]}
        >
          <InputNumber min={1} />
        </Item>
        <Item
          label="Size"
          name="size"
          rules={[{ required: true, message: 'Please enter a valid number for size' }]}
        >
          <InputNumber min={1} />
        </Item>
        <Form.Item
          label="Greeting 1"
          name="greeting1"
          rules={[{ required: true, message: 'Please enter a greeting message' }]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          label="Greeting 2"
          name="greeting2"
          rules={[{ required: true, message: 'Please enter a greeting message' }]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Item className="button-row">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button onClick={onCloseModal}>
            Close
          </Button>
        </Item>
      </Form>
    </Modal>
  );

  return (
    <Spin spinning={isLoading} >
      <Title level={3} className="home-title">Cat Image Application</Title>
      <div className="home-card-row">
        <HomeCard
          description="You can create a new cat image and add it to the gallery by clicking on the below button."
          action={onAddButtonClicked}
          buttonText="Create New Image"
        />
        <HomeCard
          description="You can go to the image gallery and view previously created images."
          action={gotoGallery}
          buttonText="Go to Gallery"
        />
        {imageAddModal()}
      </div>
    </Spin>
  )
};
export default Home;