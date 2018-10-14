$(function() {});

function sharePage() {
    var c = window.rtcConnection || (window.rtcConnection = new RTCPeerConnection());
    var sendChannel = window.sendChannel = c.createData('sendChannel');
}
