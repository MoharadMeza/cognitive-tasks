import React from "react";
import {useSubheader} from "../../_metronic/layout";

export const MyPage = () => {
  const subheader = useSubheader();
  subheader.setTitle("My Custom title");
  return (<>My Page</>);
};
