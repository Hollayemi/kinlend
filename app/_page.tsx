'use client'; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MobilePhoneDialer = () => {
  const [dialedDigits, setDialedDigits] = useState('');
  const [isDialing, setIsDialing] = useState(false);
  const [showCallScreen, setShowCallScreen] = useState(false);
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [hasRevealed, setHasRevealed] = useState(false);

  const targetNumber = '*737#';
  const digits = targetNumber.split('');

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
  ];

  // Reveal phone first, then start sequence
  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setHasRevealed(true);
    }, 1200);

    return () => clearTimeout(revealTimer);
  }, []);

  // Start dialing after reveal
  useEffect(() => {
    if (!hasRevealed) return;

    const startTimer = setTimeout(() => {
      setIsDialing(true);
      setCurrentDigitIndex(0);
    }, 1000);

    return () => clearTimeout(startTimer);
  }, [hasRevealed]);

  // Handle dialing sequence
  useEffect(() => {
    if (!isDialing) return;

    if (currentDigitIndex < digits.length) {
      const timer = setTimeout(() => {
        setDialedDigits(prev => prev + digits[currentDigitIndex]);
        setCurrentDigitIndex(prev => prev + 1);
      }, 700);

      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowCallScreen(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isDialing, currentDigitIndex, digits]);

  // Reset and loop
  useEffect(() => {
    if (!showCallScreen) return;

    const resetTimer = setTimeout(() => {
      setShowCallScreen(false);
      setDialedDigits('');
      setIsDialing(false);
      setCurrentDigitIndex(0);

      setTimeout(() => {
        setIsDialing(true);
      }, 1200);
    }, 3500);

    return () => clearTimeout(resetTimer);
  }, [showCallScreen]);

  const getHighlightedKey = () => {
    if (!isDialing || currentDigitIndex >= digits.length) return null;
    return digits[currentDigitIndex];
  };

  const highlightedKey = getHighlightedKey();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 overflow-hidden"
      style={{ perspective: '1600px' }}
    >
      {/* The 3D tilted container — slides up then locks in place */}
      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ y: 400, opacity: 0, rotateX: 45, rotateY: -25, rotateZ: 8 }}
        animate={
          hasRevealed
            ? { y: 0, opacity: 1, rotateX: 18, rotateY: -22, rotateZ: 6 }
            : { y: 400, opacity: 0, rotateX: 45, rotateY: -25, rotateZ: 8 }
        }
        transition={{
          type: 'spring',
          stiffness: 60,
          damping: 15,
          mass: 1.2,
          duration: 1.2
        }}
      >
        {/* Floor shadow for 3D grounding */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black/60 blur-3xl"
          style={{
            width: '340px',
            height: '60px',
            bottom: '-80px',
            transform: 'rotateX(75deg)'
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={hasRevealed ? { opacity: 0.8, scale: 1 } : { opacity: 0, scale: 0.4 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        />

        {/* Ambient glow behind phone */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-[50px] bg-blue-500/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={hasRevealed ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        />

        {/* Phone Body */}
        <div
          className="relative w-[320px] h-[650px] bg-black rounded-[50px] border-[8px] border-gray-800 shadow-2xl overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Side edge highlight for depth */}
          <div className="absolute inset-0 rounded-[42px] pointer-events-none z-30"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.05) 100%)'
            }}
          />

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[20px] z-20" />

          {/* Screen */}
          <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-6 pt-10 pb-2 text-white text-xs">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-white rounded-sm relative">
                  <div className="absolute inset-0.5 bg-white rounded-sm" style={{ width: '70%' }} />
                </div>
                <span>5G</span>
              </div>
            </div>

            <div className="relative h-[calc(100%-120px)]">
              <AnimatePresence mode="wait">
                {!showCallScreen ? (
                  <motion.div
                    key="dial-screen"
                    className="absolute inset-0 flex flex-col items-center px-6 pt-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-full h-[80px] flex items-center justify-center mb-4">
                      <motion.div
                        className="text-white text-3xl tracking-[8px] font-light"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        key={dialedDigits}
                      >
                        {dialedDigits || ' '}
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 w-full max-w-[260px]">
                      {keypad.flat().map((key) => (
                        <motion.div
                          key={key}
                          className={`
                            relative flex items-center justify-center 
                            w-[70px] h-[70px] rounded-full 
                            text-white text-2xl font-light
                            ${highlightedKey === key
                              ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                              : 'bg-gray-800/80'
                            }
                          `}
                          animate={{
                            scale: highlightedKey === key ? [1, 1.15, 1] : 1,
                            backgroundColor: highlightedKey === key ? '#3b82f6' : '#1f2937',
                            boxShadow: highlightedKey === key
                              ? '0 0 25px rgba(59, 130, 246, 0.8)'
                              : '0 0 0px rgba(59, 130, 246, 0)'
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {key}
                          {key === '0' && (
                            <span className="absolute text-[10px] bottom-2 text-gray-400">+</span>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="mt-6 w-[70px] h-[70px] rounded-full bg-green-500 flex items-center justify-center"
                      animate={{
                        scale: isDialing && dialedDigits.length === digits.length
                          ? [1, 1.1, 1]
                          : 1,
                        opacity: dialedDigits.length > 0 ? 1 : 0.5
                      }}
                      transition={{ duration: 0.5, repeat: isDialing ? Infinity : 0 }}
                    >
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="call-screen"
                    className="absolute inset-0 flex flex-col items-center justify-center px-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative mb-8">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute rounded-full border-2 border-green-500"
                          style={{ width: '120px', height: '120px', margin: '-60px 0 0 -60px', left: '50%', top: '50%' }}
                          animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
                        />
                      ))}
                      <div className="relative w-[120px] h-[120px] rounded-full bg-gray-800 flex items-center justify-center">
                        <svg className="w-16 h-16 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                    </div>

                    <motion.p
                      className="text-white text-2xl mb-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Dialing...
                    </motion.p>
                    <p className="text-gray-400 text-lg tracking-[4px]">{targetNumber}</p>

                    <motion.div
                      className="mt-12 w-[70px] h-[70px] rounded-full bg-red-500 flex items-center justify-center"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    >
                      <svg className="w-8 h-8 text-white rotate-[135deg]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Side Buttons */}
        <div className="absolute -right-2 top-32 w-[3px] h-[50px] bg-gray-800 rounded-r" />
        <div className="absolute -right-2 top-44 w-[3px] h-[80px] bg-gray-800 rounded-r" />
        <div className="absolute -left-2 top-36 w-[3px] h-[40px] bg-gray-800 rounded-l" />
      </motion.div>
    </div>
  );
};

export default MobilePhoneDialer;