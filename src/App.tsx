import React, { useEffect, useState } from 'react';

type LightColor = 'green' | 'yellow' | 'red';

const DURATION: Record<LightColor, number> = {
  green: 60,
  yellow: 5,
  red: 30,
};

const SEQUENCE: LightColor[] = ['green', 'yellow', 'red', 'yellow'];

const TrafficLightApp: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(DURATION[SEQUENCE[0]]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          const nextIndex = (currentIndex + 1) % SEQUENCE.length;
          setCurrentIndex(nextIndex);
          return DURATION[SEQUENCE[nextIndex]];
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentLight = SEQUENCE[currentIndex];
  const progress =
    ((DURATION[currentLight] - timeLeft) / DURATION[currentLight]) * 100;

  return (
    <div style={styles.container}>
      <div style={styles.trafficLightBox}>
        <div
          style={{
            ...styles.light,
            backgroundColor: currentLight === 'red' ? 'red' : '#330000',
          }}
        />
        <div
          style={{
            ...styles.light,
            backgroundColor: currentLight === 'yellow' ? 'yellow' : '#333300',
          }}
        />
        <div
          style={{
            ...styles.light,
            backgroundColor: currentLight === 'green' ? 'green' : '#003300',
          }}
        />
      </div>

      <p style={styles.timerText}>{timeLeft}s</p>

      <div style={styles.progressContainer}>
        <div
          style={{
            ...styles.progressBar,
            width: `${progress}%`,
            backgroundColor: currentLight,
          }}
        />
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#111',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '1rem',
    boxSizing: 'border-box',
    margin: 0,
  },
  trafficLightBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#222',
    borderRadius: '12px',
    gap: '10px',
    boxShadow: '0 0 20px rgba(255,255,255,0.1)',
  },
  light: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '2px solid #444',
  },
  timerText: {
    fontSize: '2rem',
    marginTop: '20px',
  },
  progressContainer: {
    width: '80%',
    height: '20px',
    backgroundColor: '#333',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '20px',
  },
  progressBar: {
    height: '100%',
    transition: 'width 1s linear',
  },
};

export default TrafficLightApp;
