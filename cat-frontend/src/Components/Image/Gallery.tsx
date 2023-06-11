import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get as _get } from 'lodash';
import { Typography, Pagination, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { fetchImageData } from "../../ActionCreators/ImageActionCreators";
import { makeGalleryData } from "../../Selectors";
import { DEFAULT_IMAGE_FETCH_COUNT as count } from "../../Utils/Constants";
import { handelImageError } from "../../Utils/Helpers";

const { Title } = Typography;
const itemsPerRow = 4;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

type imageItem = {
  _id: string,
  imageName: string,
};

const ImageGallery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const galleryData: object = useSelector(makeGalleryData);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isLoading = _get(galleryData, 'isLoading', false);
  const list = _get(galleryData, 'list', []);
  const totalCount = _get(galleryData, 'totalCount', 0);

  useEffect(() => {
    const skip = (currentPage - 1) * count;
    dispatch(fetchImageData(skip));
  }, [currentPage]);

  const onPaginationChanges = (page: number) => {
    setCurrentPage(page);
  };

  const viewImage = (id: string) => {
    navigate(`/image/${id}`);
  };

  const getRows = () => {
    const rows = []
    for (let i = 0; i < list.length; i += itemsPerRow) {
       rows.push(list.slice(i, i + itemsPerRow));
    }

    return rows.map((row, index) => {
      return (
        <div className="image-gallery-row" key={`gallery_row_${index}`}>
          {getImageCard(row)}
        </div>
      );
    });
  };
  const getImageCard = (row: imageItem[]) => {
    return row.map((item: imageItem) => {
      return (
        <div className="image-card" key={item._id} onClick={() => {viewImage(item._id)}}>
          <img
            src={`${backendUrl}/get-image/${item._id}`}
            alt={item.imageName}
            onError={handelImageError}
          />
        </div>
      );
    });
  };

  if (!(list && list.length)) {
    return (
      <div className="image-gallery-content">
        <div className="no-data">
          <ExclamationCircleOutlined className="no-data-icon"/>
          <Title level={1}> The gallery is empty</Title>
        </div>
      </div>
    );
  }

  return (
    <>
      <Title level={3}>Image Gallery</Title>
      <Spin spinning={isLoading}>
        <div className="image-gallery-content">
          {getRows()}
        </div>
      </Spin>
      <div className="image-gallery-paginator">
        <Pagination
          total={totalCount}
          current={currentPage}
          pageSize={count}
          onChange={onPaginationChanges}
        />
      </div>
    </>
  );
};

export default ImageGallery;
