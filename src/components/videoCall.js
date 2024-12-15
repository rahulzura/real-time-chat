import React, { useState } from 'react';

const VideoCall = ({ peerConnection, localVideoRef, remoteVideoRef, socket }) => {
  const [isCalling, setIsCalling] = useState(false);

  const startCall = async () => {
    setIsCalling(true);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    socket.emit('message', { type: 'offer', offer: peerConnection.localDescription });
  };

  return (
    <div>
      <h1>Video Call</h1>
      <button onClick={startCall} disabled={isCalling}>
        Start Call
      </button>
      <div>
        <video ref={localVideoRef} autoPlay muted></video>
        <video ref={remoteVideoRef} autoPlay></video>
      </div>
    </div>
  );
};

export default VideoCall;
