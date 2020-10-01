import React from "react";
import { Button, Popconfirm } from "antd";

const ConfirmPopup = ({
  handleConfirm,
  btnText,
  disabled,
  loading,
  icon,
  btnClass,
  type,
  parentClass
}) => {
  return (
    <div className={parentClass}>
      <Popconfirm
        title="Are you sure？"
        okText="Yes"
        cancelText="No"
        onConfirm={handleConfirm}
      >
        <Button
          className={disabled ? `${btnClass} disabled-b` : btnClass}
          type={type}
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
