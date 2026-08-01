import React, { useState } from 'react';
import RoomHub from '../components/RoomHub';
import DialogueBox from '../components/DialogueBox';
import storyData from '../data/storyData.json';
import { chiptune } from '../audio/chiptune';
import { gameStore } from '../state/gameStore';

export default function Chapter1_TheDare({ onComplete, soundEnabled }) {
  // Stage flow: 'room' -> 'intro' -> 'ig_main' -> 'ig_art' -> 'ig_dm' -> 'sent_wait' -> 'outro'
  const [stage, setStage] = useState('room');
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [sentMessage, setSentMessage] = useState(null);
  const chapterData = storyData.chapters["1"];

  const handleRoomInteract = (objectKey) => {
    if (objectKey === 'phone') {
      chiptune.playSelect(soundEnabled);
      setStage('intro');
    }
  };

  const ARTWORKS = [
    { 
      id: 1, 
      badge: (
        <div style={{ width: '54px', height: '54px', background: 'linear-gradient(135deg, #FF7E5F 0%, #FEB47B 100%)', border: '2px solid #F4D35E', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.4)' }}>
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#FFE46B', boxShadow: '0 0 10px #FFE46B' }} />
        </div>
      ),
      label: 'SUNSET WATERCOLOR',
      title: 'Sunset over Arabian Gulf', 
      likes: '42 LIKES', 
      caption: 'Took me 3 days to get the watercolor gradient right! #painting #bahrainsunset' 
    },
    { 
      id: 2, 
      badge: (
        <div style={{ width: '54px', height: '54px', background: 'linear-gradient(180deg, #0F2027 0%, #203A43 50%, #2C5364 100%)', border: '2px solid #84CEEB', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10px', left: '12px', width: '4px', height: '4px', background: '#FFF', borderRadius: '50%', boxShadow: '0 0 6px #FFF' }} />
          <div style={{ position: 'absolute', top: '25px', left: '34px', width: '5px', height: '5px', background: '#E0A8F2', borderRadius: '50%', boxShadow: '0 0 6px #E0A8F2' }} />
          <div style={{ position: 'absolute', top: '35px', left: '18px', width: '3px', height: '3px', background: '#FFF', borderRadius: '50%' }} />
        </div>
      ),
      label: 'NIGHT SKY SKETCH',
      title: 'Bahrain Midnight Starlite', 
      likes: '56 LIKES', 
      caption: 'Staring at Orion from my window and sketching the midnight sky #nightsky' 
    },
    { 
      id: 3, 
      badge: (
        <div style={{ width: '54px', height: '54px', background: '#3E2723', border: '2px solid #D7CCC8', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ width: '28px', height: '22px', background: '#FFAB91', borderRadius: '6px', border: '2px solid #5D4037' }}>
            <div style={{ position: 'absolute', top: '8px', left: '12px', width: '0', height: '0', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '8px solid #FFAB91' }} />
            <div style={{ position: 'absolute', top: '8px', right: '12px', width: '0', height: '0', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '8px solid #FFAB91' }} />
          </div>
        </div>
      ),
      label: 'PIXEL KITTEN',
      title: 'Chibi Café Kitten', 
      likes: '38 LIKES', 
      caption: 'Quick pixel art doodle between studying! #pixelart #cute' 
    }
  ];

  const DM_OPTIONS = [
    "Hey! Stumbled across @art._pngz and just wanted to say your paintings are seriously incredible! That sunset watercolor has such gorgeous colors!",
    "Hi there! Your artwork on here is so pretty! Do you paint these digitally or on canvas? Truly amazing talent!",
    "Hey! Hope you don't mind a message out of the blue, but your artwork on here looks genuinely stunning! Keep making amazing drawings!"
  ];

  return (
    <RoomHub
      chapterTitle="CHAPTER 1"
      chapterSubtitle="The Secret Dare & @art._pngz"
      timeOfDay="night"
      activeObject="phone"
      onInteract={handleRoomInteract}
      soundEnabled={soundEnabled}
      customObservation={
        stage === 'room'
          ? "Your mobile phone rests on your pillow in India. Your friends just dared you to send an opening DM to a girl in Bahrain!"
          : null
      }
    >
      {/* Intro Dialogue when clicking phone on bed */}
      {stage === 'intro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
          <DialogueBox
            lines={chapterData.intro}
            onComplete={() => setStage('ig_main')}
            palette="india"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* STEP 1: Pixgram Main Account (@sharon.bahrain_) where Message Requests are closed */}
      {stage === 'ig_main' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0, padding: '4px' }}>
          <div style={{
            width: '100%',
            maxWidth: '430px',
            maxHeight: '100%',
            margin: 'auto',
            backgroundColor: '#0F111A',
            border: '4px solid #3E295C',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.95), 0 0 15px rgba(224,168,242,0.3)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            color: '#FFF'
          }}>
            {/* Phone Header Bar - Fixed top */}
            <div style={{ flexShrink: 0, backgroundColor: '#1A1829', padding: '10px 14px', borderBottom: '2px solid #3E295C', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-display" style={{ fontSize: '12px', color: '#E0A8F2' }}>PIXGRAM</span>
              <span className="font-display" style={{ fontSize: '12px', color: '#F4D35E' }}>@sharon.bahrain_ [PRIVATE]</span>
              <span className="font-display" style={{ fontSize: '12px', color: '#A9A9C9' }}>APP</span>
            </div>

            {/* Scrollable Body inside Phone */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              <div style={{ padding: '16px', backgroundColor: '#141221' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(45deg, #FF5E7E, #F4D35E)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #FFF', flexShrink: 0 }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#20162E', border: '2px solid #FFF' }} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    <div><div className="font-display" style={{ fontSize: '13px' }}>34</div><div className="font-dialogue" style={{ fontSize: '12px', color: '#A9A9C9' }}>Posts</div></div>
                    <div><div className="font-display" style={{ fontSize: '13px' }}>842</div><div className="font-dialogue" style={{ fontSize: '12px', color: '#A9A9C9' }}>Followers</div></div>
                    <div><div className="font-display" style={{ fontSize: '13px' }}>310</div><div className="font-dialogue" style={{ fontSize: '12px', color: '#A9A9C9' }}>Following</div></div>
                  </div>
                </div>

                <div className="font-dialogue" style={{ fontSize: '16px', lineHeight: '1.4', marginBottom: '16px' }}>
                  <div style={{ fontWeight: 'bold', color: '#FFF' }}>Sharon [BAHRAIN]</div>
                  <div style={{ color: '#CBD5E1' }}>Manama, Bahrain | dreaming under city lights</div>
                  <div style={{ marginTop: '8px', padding: '8px 10px', background: 'rgba(244, 211, 94, 0.15)', borderRadius: '6px', border: '1px dashed #F4D35E' }}>
                    Art works & sketches: <b
                      onClick={() => {
                        chiptune.playSelect(soundEnabled);
                        setStage('ig_art');
                      }}
                      style={{ color: '#F4D35E', cursor: 'pointer', textDecoration: 'underline', padding: '2px 4px', display: 'inline-block', fontWeight: 'bold' }}
                      title="Click to visit her secret art profile!"
                    >@art._pngz (CLICK HERE)</b>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      chiptune.playSelect(soundEnabled);
                      setShowBlockedModal(true);
                    }}
                    className="pixel-btn"
                    style={{ flex: 1, padding: '12px', background: '#3A86FF', color: '#FFF', fontSize: '13px', fontWeight: 'bold' }}
                  >
                    MESSAGE
                  </button>
                  <button className="pixel-btn" style={{ flex: 1, padding: '12px', background: '#2B273E', color: '#CBD5E1', fontSize: '13px' }}>
                    FOLLOWING
                  </button>
                </div>
              </div>

              {/* Private Account Note */}
              <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#0D0B16', borderTop: '1px solid #2B273E' }}>
                <div className="font-display" style={{ fontSize: '12px', color: '#A9A9C9', marginBottom: '4px' }}>THIS ACCOUNT IS RESTRICTED</div>
                <div className="font-dialogue" style={{ fontSize: '15px', color: '#7E7A99' }}>
                  She has privacy restrictions enabled on her main profile. Direct message requests are turned off.
                </div>
              </div>
            </div>

            {/* Blocked Message Modal Pop-up */}
            {showBlockedModal && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.92)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                padding: '20px', zIndex: 50, animation: 'fadeIn 0.2s ease-out'
              }}>
                <div style={{ background: '#20162E', border: '3px solid #FF5E7E', padding: '20px', borderRadius: '12px', textAlign: 'center', width: '90%' }}>
                  <div className="font-display" style={{ fontSize: '14px', color: '#FF5E7E', marginBottom: '10px' }}>
                    MESSAGE REQUESTS CLOSED
                  </div>
                  <div className="font-dialogue" style={{ fontSize: '16px', color: '#FFF', marginBottom: '18px', lineHeight: '1.4' }}>
                    "This account does not accept Message Requests from everyone."
                    <br /><br />
                    <span style={{ color: '#F4D35E' }}>HINT: Look at her bio! She has a public art profile: <b>@art._pngz</b>! Click that link in her bio instead!</span>
                  </div>
                  <button
                    onClick={() => {
                      chiptune.playSelect(soundEnabled);
                      setShowBlockedModal(false);
                    }}
                    className="pixel-btn"
                    style={{ padding: '10px 24px', background: '#FF5E7E', color: '#FFF', fontSize: '13px' }}
                  >
                    BACK TO BIO
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* STEP 2: Pixgram Art Account (@art._pngz) where Saketh admires her art */}
      {stage === 'ig_art' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0, padding: '4px' }}>
          <div style={{
            width: '100%',
            maxWidth: '430px',
            maxHeight: '100%',
            margin: 'auto',
            backgroundColor: '#111322',
            border: '4px solid #F4D35E',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 35px rgba(0,0,0,0.95), 0 0 20px rgba(244,211,94,0.3)',
            display: 'flex',
            flexDirection: 'column',
            color: '#FFF'
          }}>
            {/* Phone Header Bar - Fixed Top */}
            <div style={{ flexShrink: 0, backgroundColor: '#211D36', padding: '10px 14px', borderBottom: '2px solid #F4D35E', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span 
                onClick={() => setStage('ig_main')} 
                style={{ cursor: 'pointer', color: '#A9A9C9', fontSize: '12px' }}
                className="font-display"
              >◀ BACK</span>
              <span className="font-display" style={{ fontSize: '12px', color: '#F4D35E' }}>@art._pngz (PUBLIC)</span>
              <span className="font-display" style={{ fontSize: '11px', color: '#2ecc71' }}>ONLINE</span>
            </div>

            {/* Scrollable Gallery & Profile Container */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
              {/* Profile Header */}
              <div style={{ padding: '14px 16px', backgroundColor: '#17152B', borderBottom: '2px solid #2F2B4E' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '10px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: '#3A204B', border: '2px solid #F4D35E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: '24px', height: '24px', background: 'radial-gradient(circle, #F4D35E 0%, #FF5E7E 100%)', borderRadius: '4px' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="font-display" style={{ fontSize: '15px', color: '#FFF' }}>art._pngz</div>
                    <div className="font-dialogue" style={{ fontSize: '14px', color: '#E0A8F2' }}>Sharon's Art Haven</div>
                  </div>
                </div>

                <div className="font-dialogue" style={{ fontSize: '15px', color: '#E2E8F0', marginBottom: '12px' }}>
                  "watercolor & 16-bit sketches from Bahrain | dm always open for art lovers!"
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => {
                      chiptune.playSelect(soundEnabled);
                      setStage('ig_dm');
                    }}
                    className="pixel-btn"
                    style={{ flex: 1, padding: '10px', background: '#2ecc71', color: '#000', fontSize: '13px', fontWeight: 'bold', boxShadow: '0 0 10px rgba(46,204,113,0.4)' }}
                  >
                    MESSAGE ON @ART._PNGZ
                  </button>
                </div>
              </div>

              {/* Art Gallery Grid or Active Artwork Inspect */}
              <div style={{ padding: '12px', backgroundColor: '#0D0C18' }}>
                {selectedArtwork ? (
                  <div style={{ padding: '14px', backgroundColor: '#1A182D', border: '2px solid #F4D35E', borderRadius: '8px', animation: 'fadeIn 0.2s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', borderBottom: '1px solid #3E3860', paddingBottom: '6px' }}>
                      <span className="font-display" style={{ fontSize: '11px', color: '#F4D35E' }}>{selectedArtwork.title}</span>
                      <span className="font-display" style={{ fontSize: '10px', color: '#E0A8F2' }}>{selectedArtwork.likes}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
                      {selectedArtwork.badge}
                    </div>
                    <div className="font-dialogue" style={{ fontSize: '15px', color: '#CBD5E1', fontStyle: 'italic', marginBottom: '12px', textAlign: 'center' }}>
                      "{selectedArtwork.caption}"
                    </div>
                    <div className="font-dialogue" style={{ fontSize: '15px', color: '#FFF6E0', padding: '10px', background: '#110E22', borderRadius: '6px', border: '1px solid #483E7A', marginBottom: '12px' }}>
                      <b>Saketh's Thought:</b> "Wow... her paintings are genuinely breathtaking! Forget the dare, I really want to compliment her artwork!"
                    </div>
                    
                    {/* DIRECT DM ACTION BUTTON INSIDE ARTWORK INSPECT */}
                    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                      <button
                        onClick={() => {
                          chiptune.playSelect(soundEnabled);
                          setStage('ig_dm');
                        }}
                        className="pixel-btn"
                        style={{ padding: '12px', background: '#2ecc71', color: '#000', fontSize: '13px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}
                      >
                        SEND HER A MESSAGE ABOUT THIS ARTWORK
                      </button>
                      <button
                        onClick={() => {
                          chiptune.playSelect(soundEnabled);
                          setSelectedArtwork(null);
                        }}
                        className="pixel-btn"
                        style={{ padding: '8px', background: '#2C2844', color: '#A9A9C9', fontSize: '11px', width: '100%', cursor: 'pointer' }}
                      >
                        CLOSE PREVIEW & BACK TO GALLERY
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="font-display" style={{ fontSize: '10px', color: '#F4D35E', textAlign: 'center', marginBottom: '10px' }}>
                      RECENT ART POSTS (CLICK TO ADMIRE):
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      {ARTWORKS.map(art => (
                        <div
                          key={art.id}
                          onClick={() => {
                            chiptune.playSelect(soundEnabled);
                            setSelectedArtwork(art);
                          }}
                          style={{
                            aspectRatio: '1/1',
                            backgroundColor: '#262240',
                            border: '2px solid #3E3860',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.1s',
                            padding: '6px',
                            textAlign: 'center'
                          }}
                        >
                          {art.badge}
                          <div className="font-display" style={{ fontSize: '8px', color: '#FFF', marginTop: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '95%' }}>
                            {art.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="font-dialogue" style={{ textAlign: 'center', padding: '14px', color: '#A9A9C9', fontSize: '15px', fontStyle: 'italic' }}>
                      Click any drawing above to inspect her paintings before messaging!
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Sending the Genuine Art Compliment DM */}
      {stage === 'ig_dm' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0, padding: '4px' }}>
          <div style={{
            width: '100%',
            maxWidth: '430px',
            maxHeight: '100%',
            margin: 'auto',
            backgroundColor: '#0F111E',
            border: '4px solid #2ecc71',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 35px rgba(0,0,0,0.95)',
            display: 'flex',
            flexDirection: 'column',
            color: '#FFF'
          }}>
            {/* DM Chat Header - Fixed Top */}
            <div style={{ flexShrink: 0, backgroundColor: '#1A1E33', padding: '10px 14px', borderBottom: '2px solid #2ecc71', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span 
                onClick={() => setStage('ig_art')} 
                style={{ cursor: 'pointer', color: '#A9A9C9', fontSize: '12px' }}
                className="font-display"
              >◀ BACK</span>
              <div>
                <span className="font-display" style={{ fontSize: '12px', color: '#FFF' }}>@art._pngz</span>
                <span className="font-display" style={{ fontSize: '10px', color: '#2ecc71', marginLeft: '8px' }}>● ONLINE IN BAHRAIN</span>
              </div>
            </div>

            {/* Scrollable Chat Box Area */}
            <div style={{ flex: 1, overflowY: 'auto', minHeight: 0, padding: '16px', backgroundColor: '#111424', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <div className="font-display" style={{ fontSize: '10px', color: '#7A81A8', textAlign: 'center', marginBottom: '14px' }}>
                  — TODAY 10:14 PM —
                </div>

                {sentMessage ? (
                  <div style={{ alignSelf: 'flex-end', maxWidth: '90%', background: '#2563EB', color: '#FFF', padding: '12px', borderRadius: '14px 14px 2px 14px', border: '2px solid #60A5FA', animation: 'slideInRight 0.2s', marginLeft: 'auto' }}>
                    <div className="font-dialogue" style={{ fontSize: '16px', lineHeight: '1.3' }}>
                      {sentMessage}
                    </div>
                    <div className="font-display" style={{ fontSize: '8px', color: '#DBEAFE', textAlign: 'right', marginTop: '6px' }}>
                      ✓✓ SENT JUST NOW
                    </div>
                  </div>
                ) : (
                  <div className="font-dialogue" style={{ fontSize: '15px', color: '#F4D35E', textAlign: 'center', padding: '12px', background: 'rgba(244,211,94,0.1)', border: '1px dashed #F4D35E', borderRadius: '8px' }}>
                    <b>Keep the friend dare a secret!</b> Choose a sincere compliment praising her artwork on @art._pngz:
                  </div>
                )}
              </div>

              {/* Message Options / Next Button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {!sentMessage ? (
                  DM_OPTIONS.map((msg, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        chiptune.playSelect(soundEnabled);
                        setSentMessage(msg);
                        setTimeout(() => setStage('sent_wait'), 1800);
                      }}
                      className="pixel-btn font-dialogue"
                      style={{ fontSize: '15px', padding: '12px', textAlign: 'left', background: '#252B48', color: '#FFF', border: '2px solid #434D80', lineHeight: '1.3' }}
                    >
                      "{msg}"
                    </button>
                  ))
                ) : (
                  <div className="font-dialogue" style={{ textAlign: 'center', padding: '10px', color: '#2ecc71', fontSize: '17px', fontWeight: 'bold' }}>
                    Message delivered! Tossing phone onto your bed...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Send internal monologue */}
      {stage === 'sent_wait' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '12px' }}>
          <DialogueBox
            lines={chapterData.postSend}
            onComplete={() => setStage('outro')}
            palette="night"
            soundEnabled={soundEnabled}
          />
        </div>
      )}

      {/* Stage Outro */}
      {stage === 'outro' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', minHeight: 0, padding: '12px' }}>
          <div style={{ background: '#171124', border: '4px solid #F4D35E', padding: '24px', borderRadius: '12px', textAlign: 'center', maxWidth: '480px', margin: 'auto', boxShadow: '0 10px 30px rgba(0,0,0,0.95)' }}>
            <div className="font-display" style={{ fontSize: '15px', color: '#F4D35E', marginBottom: '12px' }}>
              STAGE 1 COMPLETE: ART COMPLIMENT SENT!
            </div>
            <div className="font-dialogue" style={{ fontSize: '19px', color: '#FFF', marginBottom: '20px', fontStyle: 'italic', lineHeight: '1.4' }}>
              "I kept the friend dare completely secret and sent a heartfelt compliment to her art account @art._pngz. Now starts the agonizing silence..."
            </div>
            <button
              onClick={() => {
                gameStore.completeChapter(1);
                onComplete();
              }}
              className="pixel-btn"
              style={{ padding: '14px 28px', fontSize: '15px', background: '#F4D35E', color: '#000', fontWeight: 'bold' }}
            >
              PROCEED TO CH 2: THE 3-WEEK SILENCE
            </button>
          </div>
        </div>
      )}
    </RoomHub>
  );
}
