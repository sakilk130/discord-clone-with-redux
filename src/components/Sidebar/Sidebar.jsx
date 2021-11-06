import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SidebarChannel from './SidebarChannel/SidebarChannel';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import CallIcon from '@material-ui/icons/Call';
import MicIcon from '@material-ui/icons/Mic';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import { Avatar } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/counter/userSlice';
import db, { auth } from '../../firebase/config';
import ContentLoader from 'react-content-loader';

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
    setLoading(false);
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Enter a channel Name');
    if (channelName) {
      db.collection('channels').add({
        channelName,
      });
    } else {
      alert('Please enter channel name');
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Channels</h3>
        <ExpandMoreIcon />
      </div>
      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h3>Create Channel</h3>
          </div>
          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsLIst">
          {loading ? (
            <ContentLoader
              style={{ padding: '20px' }}
              speed={2}
              width={400}
              height={160}
              viewBox="0 0 400 160"
              backgroundColor="#fffff"
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
            channels.map(({ id, channel }) => (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            ))
          )}
        </div>
      </div>
      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Steam</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user?.photo} />
        <div className="sidebar__profileInfo">
          <h3>@{user?.displayName}</h3>
          <p>#{user?.uid.substring(0, 8)}</p>
        </div>
        <div className="sidebar__profileIcon">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
