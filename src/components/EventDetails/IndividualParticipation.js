import React from "react";
import { Button, Popconfirm } from "antd";
import ConfirmPopup from "./ConfirmPopup";
const individualParticipation = ({
  rsvp,
  handleRSVPClick,
  attending,
  isPastEvent,
  loading,
  handleRSVPCancel
}) => {
  if (attending || rsvp) {
    if (isPastEvent)
      return (
        <div className="going-to-event disabled-b">
          You have attended this event{" "}
        </div>
      );
    else
      return (
        <div>
          <div className="going-to-event">You are going!</div>
          <ConfirmPopup
            handleConfirm={handleRSVPCancel}
            disabled={isPastEvent}
            loading={loading}
            btnText="Cancel RSVP"
            icon="close"
          />
        </div>
      );
  }

  return (
    <div>
      <div>
        <ConfirmPopup
          handleConfirm={handleRSVPClick}
          disabled={isPastEvent}
          loading={loading}
          btnText="RSVP"
          icon="check"
        />
      </div>
    </div>
  );
};

export default individualParticipation;
