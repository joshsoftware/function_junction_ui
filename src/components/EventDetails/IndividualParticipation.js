import React from "react";
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
            btnClass="btn-dangerous button ant-btn-round cancel-mt"
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
          btnClass="button yesButton ant-btn-round"
          type="ghost"
          parentClass="yes-no-buttons-wrapper "
        />
      </div>
    </div>
  );
};

export default individualParticipation;
