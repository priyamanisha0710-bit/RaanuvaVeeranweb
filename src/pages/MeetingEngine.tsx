import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { Video, Users, Loader2, ArrowLeft, ShieldCheck, Play, Copy, Share2 } from 'lucide-react';

const API_BASE_URL = 'https://api.codingboss.in';

export default function MeetingEngine() {
  const locationParams = new URLSearchParams(window.location.search);
  const [roomID, setRoomID] = useState(locationParams.get('roomID') || '');
  const [title, setTitle] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInMeeting, setIsInMeeting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [createdMeetingId, setCreatedMeetingId] = useState('');
  const [copied, setCopied] = useState(false);

  const [activeMeetings, setActiveMeetings] = useState<any[]>([]);
  const [isLoadingMeetings, setIsLoadingMeetings] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem('admin') === 'true';
  const userEmail = localStorage.getItem('userEmail') || 'anonymous@student.com';
  const userName = userEmail.split('@')[0];

  const fetchActiveMeetings = async () => {
    if (!isAdmin) return;
    setIsLoadingMeetings(true);
    try {
      const res = await fetch(`${API_BASE_URL}/military/meeting/live/`, {
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.meetings)) {
        const todayStr = new Date().toDateString();
        const todaysMeetings = data.meetings.filter((meeting: any) => {
          if (!meeting.created_at) return false;
          return new Date(meeting.created_at).toDateString() === todayStr;
        });
        setActiveMeetings(todaysMeetings);
      }
    } catch (err) {
      console.error("Failed to fetch meetings", err);
    } finally {
      setIsLoadingMeetings(false);
    }
  };

  useEffect(() => {
    if (isAdmin && !isInMeeting) {
      fetchActiveMeetings();
    }
  }, [isAdmin, isInMeeting]);

  const meetingLink = window.location.origin + '/meeting?roomID=' + createdMeetingId;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const text = `Join my live session! 🎥\nMeeting ID: ${createdMeetingId}\nLink: ${meetingLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/military/meeting/create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          title: title || "Live Session",
          host: userName,
          host_id: userEmail
        })
      });
      const data = await res.json();

      if (!res.ok || !data.meeting_id) {
        throw new Error(data.message || "Failed to create meeting.");
      }

      setCreatedMeetingId(data.meeting_id);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong.');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomID) return;
    setIsInitializing(true);
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/military/meeting/join/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          meeting_id: roomID,
          user_id: userEmail,
          user_name: userName
        })
      });

      if (!res.ok) {
        throw new Error("Meeting not found or failed to join.");
      }

      await initializeZego(roomID);
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong.');
    } finally {
      setIsInitializing(false);
    }
  };

  const initializeZego = async (meetingID: string) => {
    const tokenRes = await fetch(`${API_BASE_URL}/military/meeting/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      },
      body: JSON.stringify({
        roomID: meetingID,
        userID: userEmail,
        userName: userName
      })
    });

    if (!tokenRes.ok) {
      throw new Error("Failed to contact token server.");
    }

    const tokenData = await tokenRes.json();

    if (!tokenData.success || !tokenData.token) {
      throw new Error("Failed to authenticate with Meeting Engine server.");
    }

    setIsInMeeting(true);

    // Give React time to render the full-screen div
    setTimeout(() => {
      if (!containerRef.current) return;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        tokenData.appID,
        tokenData.token,
        tokenData.roomID,
        tokenData.userID,
        tokenData.userName
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        // Enable Zoom-like features
        showPreJoinView: true,
        showScreenSharingButton: true,
        showTextChat: true,
        showUserList: true,
        showLayoutButton: true,
        showRoomDetailsButton: true,
        showMyMicrophoneToggleButton: true,
        showMyCameraToggleButton: true,
        showAudioVideoSettingsButton: true,
        showPinButton: true,
        turnOnMicrophoneWhenJoining: false,
        turnOnCameraWhenJoining: false,

        sharedLinks: [
          {
            name: 'Meeting Link',
            url: window.location.origin + '/meeting?roomID=' + meetingID,
          },
          {
            name: 'Meeting ID',
            url: meetingID,
          }
        ],

        onLeaveRoom: () => {
          fetch(`${API_BASE_URL}/military/meeting/${meetingID}/leave/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({ user_id: userEmail })
          }).catch(() => { });
        },
        showLeavingView: true,
        onReturnToHomeScreenClicked: () => {
          navigate('/');
        }
      });
    }, 100);
  };

  if (isInMeeting) {
    return (
      <div className="w-screen h-screen bg-slate-900">
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none" />

      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 flex items-center gap-2 text-indigo-200 hover:text-white transition-colors group z-10"
      >
        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </div>
        <span className="font-medium">Go Back</span>
      </button>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 mb-6 shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] overflow-hidden">
            <img src="/indian-flag.jpg" alt="Raanuva Veeran Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Raanuva Veeran</h1>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          {isAdmin ? (
            createdMeetingId ? (
              <div className="space-y-6 text-center">
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Meeting Created!</h3>
                  <p className="text-emerald-200/70 text-sm mb-4">Your live session is ready.</p>
                  <p className="bg-white/10 p-2 rounded-lg text-emerald-100 font-mono text-lg tracking-widest select-all">{createdMeetingId}</p>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied to Clipboard!' : 'Copy Meeting Link'}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/30 text-[#25D366] font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share via WhatsApp
                  </button>
                </div>

                <div className="pt-4 mt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsInitializing(true);
                      initializeZego(createdMeetingId).catch(err => {
                        setErrorMsg(err.message || 'Something went wrong.');
                        setIsInitializing(false);
                      });
                    }}
                    disabled={isInitializing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    {isInitializing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Enter Meeting Room
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateMeeting} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-indigo-300/70 uppercase tracking-widest mb-3 ml-1">
                    Meeting Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Weekly Grammar Sync"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-indigo-200/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isInitializing}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {isInitializing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Create Meeting
                    </>
                  )}
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleJoinMeeting} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-indigo-300/70 uppercase tracking-widest mb-3 ml-1">
                  Meeting ID
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-indigo-400/40 group-focus-within:text-indigo-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter meeting room ID"
                    value={roomID}
                    onChange={(e) => setRoomID(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-indigo-200/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium uppercase"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isInitializing || !roomID}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {isInitializing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Join Meeting
                  </>
                )}
              </button>
            </form>
          )}
          {isAdmin && !createdMeetingId && (
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-lg">Active Meetings</h3>
                <button onClick={fetchActiveMeetings} className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1">
                  Refresh
                </button>
              </div>
              {isLoadingMeetings ? (
                <div className="flex justify-center py-4"><Loader2 className="w-5 h-5 animate-spin text-indigo-400" /></div>
              ) : activeMeetings.length === 0 ? (
                <p className="text-white/50 text-center py-4 text-sm">No active meetings found.</p>
              ) : (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  {activeMeetings.map(meeting => (
                    <div key={meeting.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-3 transition-colors hover:bg-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-white font-semibold">{meeting.title || 'Live Session'}</p>
                          <p className="text-indigo-300 text-xs mt-1 font-mono">{meeting.meeting_id}</p>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Live</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.origin + '/meeting?roomID=' + meeting.meeting_id);
                            alert("Link Copied!");
                          }}
                          className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-white/10"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                        <button
                          onClick={() => {
                            setIsInitializing(true);
                            initializeZego(meeting.meeting_id).catch(err => {
                              setErrorMsg(err.message || 'Something went wrong.');
                              setIsInitializing(false);
                            });
                          }}
                          className="flex-1 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-xs font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1 border border-indigo-500/30"
                        >
                          <Play className="w-3 h-3" /> Join
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
