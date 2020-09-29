import React from "react";
import { Button, Popconfirm } from "antd";

const ConfirmPopup = ({ handleConfirm, btnText, disabled, loading, icon }) => {
  return (
    <div className="yes-no-buttons-wrapper">
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={handleConfirm}
      >
        <Button
          className={
            disabled ? "disabled-b button yesButton" : "button yesButton"
          }
          type="ghost"
          icon={icon}
          block
          loading={loading}
        >
          {btnText}
        </Button>
      </Popconfirm>
    </div>
  );
};

export default ConfirmPopup;
