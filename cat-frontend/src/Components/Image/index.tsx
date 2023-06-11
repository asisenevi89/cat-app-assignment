import React from "react";
import { useParams } from "react-router-dom";
import { Typography } from "antd";
import { handelImageError } from "../../Utils/Helpers";

const { Title } = Typography;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const ImagePage = () => {
  const params = useParams();
  const { imageId } = params;

  const imageUrl = `${backendUrl}/get-image/${imageId}`
  return (
    <>
      <Title level={3} className="image-title">Cat Image Application</Title>-
      <div className="image-viewer">
        <img src={imageUrl} alt={`cat_image_${imageId}`} onError={handelImageError} />
      </div>
    </>

  )
}
export default ImagePage;
