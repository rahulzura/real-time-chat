import React, { useState, useRef } from 'react';
import { io } from 'socket.io-client';
import Chat from './components/chat.js';
import AuthForm from './components/authForm.js';

import './styles.css';
import VideoCall from './components/videoCall.js';

const { REACT_APP_WS_URL: wsUrl } = process.env;
const t = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MjhhZWZiZDMzZWYyNTU0ZThmOTQ3ZSIsImlhdCI6MTczNDI3NTQ1OSwiZXhwIjoxNzM0NjIxMDU5fQ.rDkB80wvVeqbbHhuKCJ33OUUDVx6Q09JDEZV-TmQJiY';
const u = '6728aefbd33ef2554e8f947e';

const App = () => {
  const [view, setView] = useState('video-call');
  const [token, setToken] = useState(t);
  const [user, setUser] = useState(u);
  const [socket] = useState(io(wsUrl, { autoConnect: false, auth: { token }}));
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [messages, setMessages] = useState({});
  const [peerConnection] = useState(new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  }));

  peerConnection.ontrack = (event) => {
    remoteVideoRef.current.srcObject = event.streams[0];
  };

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      socket.emit('message', { type: 'candidate', candidate: event.candidate });
    }
  };

  socket.on('message', async (msg) => {
    console.log({ msg });
    if (msg.type === 'offer') {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(msg.offer));
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localVideoRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('message', { type: 'answer', answer: peerConnection.localDescription });

      peerConnection.ontrack = (event) => {
        remoteVideoRef.current.srcObject = event.streams[0];
      };
    } else if (msg.type === 'answer') {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(msg.answer));
    } else if (msg.type === 'candidate') {
      await peerConnection.addIceCandidate(new RTCIceCandidate(msg.candidate));
    } else {
      setMessages((prev) => ({
        ...prev,
        [msg.from]: prev[msg.from] ? [...prev[msg.from], msg] : [msg],
      }));
    }
  });

  socket.connect();

  return (
    <>
      {['sign-up', 'sign-in'].includes(view) ? <AuthForm
        view={view}
        setView={setView}
        setToken={setToken}
        setUser={setUser}
        socket={socket}
      /> : null }
      {view === 'chat' ? <Chat
        token={token}
        user={user}
        socket={socket}
        messages={messages}
        setMessages={setMessages}
      /> : null }
      {view === 'video-call' ? <VideoCall
        socket={socket}
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        peerConnection={peerConnection}
      /> : null }
    </>
  );
};

export default App;
