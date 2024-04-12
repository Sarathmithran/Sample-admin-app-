import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

const BackBtn = ({BtnName}:any) => {

  const Router = useRouter();

  return (
    <>
      <div style={{ display: "flex", paddingBottom: 15 }}>
        <ArrowBackIcon
          style={{ cursor: "pointer"}}
          onClick={() => {
            Router.back();
          }}
        />
        <span style={{ paddingLeft: 5}}>{BtnName}</span>
      </div>
    </>
  );
};

export default BackBtn;
