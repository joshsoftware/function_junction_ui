import React from "react";
import { Button } from "antd";

const individualParticipation = ({ isGoing, toggleYesNo, isOldEvent }) => (
  <div>
    {!isOldEvent ? (
      <div>
        {!isGoing ? (
          <div>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              Are you going?
            </div>
            <div className="yes-no-buttons-wrapper">
              <Button
                className="button yesButton"
                type="ghost"
                icon="check"
                onClick={() => toggleYesNo(true)}
              >
                Yes
              </Button>
              <Button
                className="button noButton"
                type="ghost"
                icon="close"
                onClick={() => toggleYesNo(false)}
              >
                No
              </Button>
            </div>
          </div>
        ) : (
          <div>You are going to this event.</div>
        )}
      </div>
    ) : (
      <div>{isGoing && <div>You are going to this event.</div>}</div>
    )}
  </div>
);

export default individualParticipation;
