import { SyntheticEvent } from "react";
import noDataImage from "./images/no-data.jpg";

export const handelImageError = (event: SyntheticEvent<HTMLImageElement> ) => {
  event.currentTarget.src = noDataImage;
};
