import React from 'react';
import './Message.css';
import { Avatar } from '@material-ui/core';
import moment from 'moment';

function Message({ user, timestamp, message }) {
  return (
    <div className="message">
      <Avatar src={user?.photo} />
      <div className="message__info">
        <h4>
          {user?.displayName}
          <span className="message__timestamp">
            {moment(new Date(timestamp?.toDate()).toUTCString()).fromNow()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
