import React, { useEffect, useState } from 'react';
import './Chat.css';
import ChatHeader from './ChatHeader/ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message/Message';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/counter/userSlice';
import {
  selectChannelId,
  selectChannelName,
} from '../../features/counter/appSlice';
import db from '../../firebase/config';
import firebase from 'firebase';
import ContentLoader from 'react-content-loader';

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (channelId) {
      db.collection('channels')
        .doc(channelId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      setLoading(false);
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('channels').doc(channelId).collection('messages').add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };

  console.log(messages);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {channelId && loading ? (
          <ContentLoader
            style={{ padding: '20px' }}
            speed={2}
            width={400}
            height={160}
            viewBox="0 0 400 160"
            backgroundColor="#26282c"
            foregroundColor="#ecebeb"
          >
            <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
            <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
            <circle cx="20" cy="20" r="20" />
            <rect x="51" y="62" rx="3" ry="3" width="88" height="6" />
            <rect x="51" y="80" rx="3" ry="3" width="52" height="6" />
            <circle cx="23" cy="74" r="20" />
            <rect x="53" y="116" rx="3" ry="3" width="88" height="6" />
            <rect x="53" y="134" rx="3" ry="3" width="52" height="6" />
            <circle cx="25" cy="128" r="20" />
            <rect x="56" y="170" rx="3" ry="3" width="88" height="6" />
            <rect x="56" y="188" rx="3" ry="3" width="52" height="6" />
            <circle cx="28" cy="182" r="20" />
          </ContentLoader>
        ) : (
          messages.map((message) => (
            <Message
              message={message.message}
              timestamp={message.timestamp}
              user={message.user}
            />
          ))
        )}
      </div>
      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form action="">
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button type="submit" onClick={sendMessage}>
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
