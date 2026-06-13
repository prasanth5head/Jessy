import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  LinearProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CakeIcon from "@mui/icons-material/Cake";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MicIcon from "@mui/icons-material/Mic";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import HomeIcon from "@mui/icons-material/Home";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LockIcon from "@mui/icons-material/Lock";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import VideocamIcon from "@mui/icons-material/Videocam";

const CONFETTI_COLORS = ["#ff4081", "#ff80ab", "#ffd54f", "#4fc3f7", "#81c784", "#ba68c8"];
const CONFETTI_PIECES = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 3 + Math.random() * 3,
  size: 8 + Math.random() * 10,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  tilt: Math.random() * 360,
  isCircle: Math.random() > 0.5,
}));

const DECORATORS = Array.from({ length: 25 }).map((_, i) => ({
  id: i,
  type: i % 2 === 0 ? "heart" : "sparkle",
  left: Math.random() * 100,
  top: Math.random() * 100,
  size: 15 + Math.random() * 25,
  duration: 8 + Math.random() * 10,
  delay: Math.random() * 5,
}));

// Relationship start date: Feb 19, 2025
const RELATIONSHIP_START = new Date("2025-02-19T00:00:00");

const MEMORIES = [
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.19.15 AM.jpeg",
    date: "Feb 19, 2025",
    story: "The day everything changed. One message turned into a whole new world.",
    joke: "You still pretend you weren't nervous 😏",
  },
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.19.15 AM (2).jpeg",
    date: "March 2025",
    story: "Late nights, endless calls, and realizing this was something truly special.",
    joke: "Who fell asleep first? Not saying. 😴",
  },
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.19.19 AM.jpeg",
    date: "April 2025",
    story: "Even distance couldn't dim the warmth. Every message felt like a hug.",
    joke: "Your read receipts gave me mini heart attacks 😂",
  },
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.19.20 AM.jpeg",
    date: "May 2025",
    story: "The moment I knew — you are my favorite part of every single day.",
    joke: "You denied it. Twice. Then smiled. 🥺",
  },
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.29.00 AM.jpeg",
    date: "June 2025",
    story: "Sunshine, laughter, and you. My definition of a perfect day.",
    joke: "The selfie war was totally your fault 📸",
  },
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.29.00 AM (1).jpeg",
    date: "Aug 2025",
    story: "We've been through storms together, and I'd choose them all again with you.",
    joke: "You win every argument. I'll admit it now. 🏳️",
  },
  {
    img: "/image/WhatsApp Image 2026-06-13 at 12.29.01 AM.jpeg",
    date: "Today ❤️",
    story: "Happy Birthday, my love. Every memory leads right back to you.",
    joke: "You're stuck with me. No refunds. 😘",
  },
];

const WHY_CARDS = [
  { emoji: "🥰", title: "Your Kind Heart", text: "You care deeply for everyone around you, even when they don't deserve it. That gentle soul of yours is one of the most beautiful things I've ever known." },
  { emoji: "😊", title: "Your Infectious Smile", text: "No matter how dark my day gets, one smile from you lights everything up instantly. I could stare at it forever and never get tired." },
  { emoji: "🤝", title: "Your Absolute Trust", text: "The way you feel safe being yourself around me — no masks, no filters — is the greatest gift you've ever given me. I'll always protect that trust." },
  { emoji: "⚡", title: "Your Tiny Storms", text: "Even when you're short-tempered, it's honestly the cutest thing ever. Behind every tiny storm is the most tender heart I've ever seen." },
  { emoji: "💫", title: "Your Quiet Strength", text: "You handle so much silently, never asking for credit. That quiet, steady strength inspires me every single day." },
  { emoji: "🌹", title: "Just Being You", text: "The way you laugh, talk, think, dream — every unique little thing about you is exactly why I choose you, today and every day." },
];

const VOICE_NOTES = [
  { label: "Open when you're sad 🥺", color: "#5c6bc0", gradient: "linear-gradient(135deg,#5c6bc0,#9575cd)", src: null, message: "Hey... I know things feel heavy right now. But I need you to know — you are not alone. Not even for a second. I'm right here, always. You're stronger than you think, and this feeling will pass. I love you so much. 💙" },
  { label: "Open when you miss me 💖", color: "#e91e63", gradient: "linear-gradient(135deg,#e91e63,#f48fb1)", src: null, message: "Missing me? Good. That means something real is there. 😄 Close your eyes — I'm closer than you think. Every memory we made is just proof that the best ones are still ahead. I miss you too, always. ❤️" },
  { label: "Open when you need a smile 😊", color: "#f57c00", gradient: "linear-gradient(135deg,#f57c00,#ffb74d)", src: null, message: "Okay, stop whatever you're doing and just smile. Right now. Yes, really. 😄 Because you have the most beautiful smile in the world and it deserves to be seen. Everything's going to be okay. I promise. 🌟" },
];

const FUTURE_DREAMS = [
  { icon: <FlightTakeoffIcon sx={{ fontSize: 30, color: "#ff4081" }} />, title: "First Trip Together ✈️", desc: "Exploring new horizons, hand in hand. Wherever we go, it becomes our favorite place." },
  { icon: <LocalCafeIcon sx={{ fontSize: 30, color: "#ff4081" }} />, title: "Favorite Café Date ☕", desc: "Sipping coffee, sharing stories, and laughing until our cheeks hurt." },
  { icon: <WbTwilightIcon sx={{ fontSize: 30, color: "#ff4081" }} />, title: "Watching Sunsets Together 🌅", desc: "Quiet, peaceful moments — just us, watching the sky turn golden." },
  { icon: <HomeIcon sx={{ fontSize: 30, color: "#ff4081" }} />, title: "Our Future Goals 🏡", desc: "Building a cozy home filled with warmth, laughter, and endless love." },
];

const DIGITAL_LOVE_NOTES = [
  "Your smile is my favorite notification.",
  "I still remember the first time you laughed at my terrible joke.",
  "You make every place feel like home.",
  "I love how your eyes light up when you talk about things you love.",
  "You are the best plot twist of my life.",
  "Waking up knowing you're mine is the best feeling.",
  "I love the way you pronounce certain words, it's so cute.",
  "You're my safe place in a chaotic world.",
  "Even your 'annoying' habits are endearing to me.",
  "I'm so incredibly proud of the person you are.",
  "You're the first person I want to tell good news to.",
  "I love how we can talk for hours about absolutely nothing.",
  "Your happiness means everything to me.",
  "I never knew what true peace felt like until I met you.",
  "You make me want to be a better person every single day.",
  "Every love song suddenly makes sense because of you.",
  "I love how fiercely you protect the people you care about.",
  "You have the most beautiful soul I have ever encountered.",
  "I fall for you a little more every day.",
  "Thank you for just being you. It's more than enough.",
];

const OPEN_WHEN_LETTERS = [
  { id: "sad", label: "Open when you're sad 🥺", emoji: "🥺", color: "#5c6bc0", bg: "linear-gradient(135deg, #5c6bc0, #9575cd)", content: "I hate knowing you're sad. Just remember that storms don't last forever. Take a deep breath, cry if you need to, but know that I am holding your hand through it all. You are so strong, and this feeling will pass. I love you." },
  { id: "stressed", label: "Open when you're stressed 😫", emoji: "😫", color: "#f57c00", bg: "linear-gradient(135deg, #f57c00, #ffb74d)", content: "Hey. Stop. Breathe. You're taking on the world right now, and I know it's heavy. But look at everything you've overcome so far! You've got this. Take a break, drink some water, and remember I'm cheering you on. Always." },
  { id: "missme", label: "Open when you miss me 💖", emoji: "💖", color: "#e91e63", bg: "linear-gradient(135deg, #e91e63, #f48fb1)", content: "Missing you too. A lot. Just close your eyes and imagine me hugging you really tight right now. Every second apart just means our next memory together will be even more special. See you soon, love." },
  { id: "angry", label: "Open when you're angry at me 😤", emoji: "😤", color: "#d32f2f", bg: "linear-gradient(135deg, #d32f2f, #e57373)", content: "Okay, I know you're mad. And I probably did something stupid. I am so sorry. You have every right to feel how you feel. Please know I never want to hurt you. Let's take a breath, and when you're ready, I'm here to listen and fix it. You mean too much to me." },
  { id: "motivation", label: "Open when you need motivation 🚀", emoji: "🚀", color: "#388e3c", bg: "linear-gradient(135deg, #388e3c, #81c784)", content: "You are capable of incredible things. Don't let a temporary setback make you doubt your immense potential. I believe in you so completely. Go out there and show the world what you're made of. I'm your biggest fan!" },
];

const COUPLE_QUIZ = [
  { q: "What's my absolute favorite thing about you?", options: ["Your looks", "Your kindness", "Your cooking", "Your jokes"], a: "Your kindness", feedback: "Correct ❤️ Your gentle soul is my favorite." },
  { q: "Who fell in love first?", options: ["Me", "You", "We fell at the exact same time", "Still deciding"], a: "Me", feedback: "Guilty. I fell first, and I fell hard. ❤️" },
  { q: "What's my dream date with you?", options: ["Fancy dinner", "Movie night", "Late night drive", "Cozy at home with food"], a: "Cozy at home with food", feedback: "Yes! Nothing beats being lazy together with good food. 🍕❤️" },
];

const MUSIC_MEMORIES = [
  { title: "Our first long call 📞", song: "The song we talked over", desc: "We lost track of time entirely.", src: "" },
  { title: "The song that reminds me of you 🎶", song: "Every time it plays", desc: "It feels like you're right next to me.", src: "" },
  { title: "When I missed you the most 🌧️", song: "Late night playlist", desc: "This got me through the long nights.", src: "" },
];

const FUNNY_AWARDS = [
  { icon: <EmojiObjectsIcon sx={{ fontSize: 50, color: "#ffd54f" }} />, title: "Best Smile Award", reason: "For consistently melting my heart with zero effort." },
  { icon: <EmojiEventsIcon sx={{ fontSize: 50, color: "#ff8a65" }} />, title: "Cutest Anger Award", reason: "For looking absolutely adorable even when fuming." },
  { icon: <MenuBookIcon sx={{ fontSize: 50, color: "#9575cd" }} />, title: "Pro Overthinker Award", reason: "For successfully finding problems that don't exist yet! 😂" },
  { icon: <FavoriteIcon sx={{ fontSize: 50, color: "#f06292" }} />, title: "Queen of My Heart", reason: "A lifetime achievement award. Non-transferable." },
];

// Confetti Component for rain effect
function Confetti() {
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {CONFETTI_PIECES.map((p) => (
        <Box
          key={p.id}
          sx={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            left: `${p.left}%`,
            top: `-20px`,
            borderRadius: p.isCircle ? "50%" : "0%",
            transform: `rotate(${p.tilt}deg)`,
            animation: `fall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  );
}

// Polaroid Card helper component for photo memories
function PolaroidCard({ img, caption, rotation }) {
  return (
    <Card
      sx={{
        background: "#ffffff",
        p: 2,
        pb: 4,
        borderRadius: 0,
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
        transform: `rotate(${rotation}deg)`,
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        "&:hover": {
          transform: "scale(1.08) rotate(0deg) translateY(-15px)",
          boxShadow: "0 25px 45px rgba(255, 64, 129, 0.25)",
          zIndex: 10,
        },
      }}
    >
      <CardMedia
        component="img"
        image={img}
        alt={caption}
        sx={{
          height: { xs: 260, md: 320 },
          objectFit: "cover",
          borderRadius: 0,
          border: "1px solid #f0f0f0",
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontFamily: "'Caveat', cursive",
          fontWeight: 700,
          textAlign: "center",
          mt: 3,
          color: "#d81b60",
          fontSize: "2rem",
          textShadow: "1px 1px 1px rgba(0,0,0,0.05)",
        }}
      >
        {caption}
      </Typography>
    </Card>
  );
}

// Web Audio API Heartbeat synthesizer to play realistic low frequency lub-dub thump
function playWebHeartbeat() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const playThump = (time, pitch = 60, duration = 0.15, volume = 0.5) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, time);
      osc.frequency.exponentialRampToValueAtTime(15, time + duration);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(volume, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

      osc.start(time);
      osc.stop(time + duration);
    };

    const now = ctx.currentTime;
    // Play Lub-Dub repeating every 1.0 second for 4 cycles
    for (let i = 0; i < 4; i++) {
      const cycleStart = now + i * 1.0;
      playThump(cycleStart, 65, 0.15, 0.6); // Lub
      playThump(cycleStart + 0.25, 55, 0.18, 0.4); // Dub
    }
  } catch (e) {
    console.error("Web Audio heartbeat error:", e);
  }
}

export default function App() {
  const [openSurprise, setOpenSurprise] = useState(false);
  const [openVideoSurprise, setOpenVideoSurprise] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasMusicPlaying, setWasMusicPlaying] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const [wasMusicPlayingForLetter, setWasMusicPlayingForLetter] = useState(false);
  const [wasMusicPlayingForSurprise, setWasMusicPlayingForSurprise] = useState(false);
  const [playingMemoryIdx, setPlayingMemoryIdx] = useState(null);
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const letterAudioRef = useRef(null);
  const surpriseAudioRef = useRef(null);

  // --- NEW FEATURE STATES ---
  // Secret Hunt
  const [foundHearts, setFoundHearts] = useState([]);
  const [huntDialogOpen, setHuntDialogOpen] = useState(false);
  const totalHearts = 5;

  const handleFindHeart = (id) => {
    if (!foundHearts.includes(id)) {
      const newHearts = [...foundHearts, id];
      setFoundHearts(newHearts);
      if (newHearts.length === totalHearts) {
        setTimeout(() => setHuntDialogOpen(true), 500);
      }
    }
  };

  // Digital Love Notes Jar
  const [jarDialogOpen, setJarDialogOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

  const openJarNote = () => {
    const randomNote = DIGITAL_LOVE_NOTES[Math.floor(Math.random() * DIGITAL_LOVE_NOTES.length)];
    setCurrentNote(randomNote);
    setJarDialogOpen(true);
  };

  // Open When Letters
  const [openWhenLetter, setOpenWhenLetter] = useState(null);

  // Mini Couple Quiz
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  const handleQuizAnswer = (answer) => {
    const isCorrect = answer === COUPLE_QUIZ[quizStep].a;
    if (isCorrect) setQuizScore((prev) => prev + 1);
    setQuizFeedback(isCorrect ? COUPLE_QUIZ[quizStep].feedback : "Oops, not quite! But I still love you. 💕");
    
    setTimeout(() => {
      setQuizFeedback("");
      if (quizStep < COUPLE_QUIZ.length - 1) {
        setQuizStep((prev) => prev + 1);
      } else {
        setQuizFinished(true);
      }
    }, 2500);
  };

  // Time Capsule
  const [capsuleMessage, setCapsuleMessage] = useState("");
  const [capsuleSaved, setCapsuleSaved] = useState(false);

  const saveCapsule = () => {
    if (capsuleMessage.trim()) {
      localStorage.setItem("jessy_capsule", capsuleMessage);
      setCapsuleSaved(true);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("jessy_capsule");
    if (saved) setCapsuleSaved(true);
  }, []);

  // Heartbeat Moment
  const [heartbeatActive, setHeartbeatActive] = useState(false);
  const [heartbeatStage, setHeartbeatStage] = useState(0); // 0: heart, 1: text, 2: credits
  const heartbeatAudioRef = useRef(null);

  const triggerHeartbeat = () => {
    // Stop and close everything else
    setLetterOpen(false);
    setOpenSurprise(false);
    setOpenVideoSurprise(false);
    setHuntDialogOpen(false);
    setJarDialogOpen(false);
    setOpenWhenLetter(null);
    setOpenVoiceNote(null);
    setPlayingMemoryIdx(null);

    // Pause all playing audio elements
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (letterAudioRef.current) {
      letterAudioRef.current.pause();
      letterAudioRef.current.currentTime = 0;
    }
    if (surpriseAudioRef.current) {
      surpriseAudioRef.current.pause();
      surpriseAudioRef.current.currentTime = 0;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (voiceNoteAudioRef.current) {
      voiceNoteAudioRef.current.pause();
    }
    setIsPlaying(false);

    setHeartbeatActive(true);
    setHeartbeatStage(0);

    // Play the Web Audio heartbeat thumping
    playWebHeartbeat();

    setTimeout(() => setHeartbeatStage(1), 4000);
    setTimeout(() => setHeartbeatStage(2), 9000);
  };

  const getMemoryAudioRef = (idx) => {
    if (idx === 0) return letterAudioRef;
    if (idx === 1) return audioRef;
    if (idx === 2) return surpriseAudioRef;
    return null;
  };

  const playMusicMemory = (idx) => {
    // Pause all other possible triggers
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    if (letterOpen) {
      closeLetter();
    }
    if (openSurprise) {
      closeStorySurprise();
    }
    if (openVideoSurprise) {
      closeVideoSurprise();
    }

    // Stop current active playing memory if any
    if (playingMemoryIdx !== null) {
      const prevRef = getMemoryAudioRef(playingMemoryIdx);
      if (prevRef && prevRef.current) {
        prevRef.current.pause();
        prevRef.current.currentTime = 0;
      }
    }

    if (playingMemoryIdx === idx) {
      // Toggled off: resume background track
      setPlayingMemoryIdx(null);
      if (audioRef.current) {
        audioRef.current.play().catch(console.log);
        setIsPlaying(true);
      }
    } else {
      // Toggle on new memory
      setPlayingMemoryIdx(idx);
      const currentRef = getMemoryAudioRef(idx);
      if (currentRef && currentRef.current) {
        currentRef.current.currentTime = 0;
        currentRef.current.play().catch(console.log);
      }
    }
  };

  // Relationship Counter
  const [timeElapsed, setTimeElapsed] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.floor((now - RELATIONSHIP_START) / 1000);
      setTimeElapsed({
        days: Math.floor(diff / 86400),
        hours: Math.floor((diff % 86400) / 3600),
        minutes: Math.floor((diff % 3600) / 60),
        seconds: diff % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Random Memory
  const [currentMemory, setCurrentMemory] = useState(null);
  const pickRandomMemory = () => {
    const idx = Math.floor(Math.random() * MEMORIES.length);
    setCurrentMemory(MEMORIES[idx]);
  };
  const closeMemory = () => setCurrentMemory(null);

  // Voice Notes
  const [openVoiceNote, setOpenVoiceNote] = useState(null); // index 0/1/2
  const voiceNoteAudioRef = useRef(null);
  const [voiceNoteWasMusicPlaying, setVoiceNoteWasMusicPlaying] = useState(false);
  const [voiceNotePlaying, setVoiceNotePlaying] = useState(false);
  const [voiceNoteProgress, setVoiceNoteProgress] = useState(0);

  const openVoiceNoteDialog = (idx) => {
    if (isPlaying) {
      setVoiceNoteWasMusicPlaying(true);
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setVoiceNoteWasMusicPlaying(false);
    }
    setVoiceNotePlaying(false);
    setVoiceNoteProgress(0);
    setOpenVoiceNote(idx);
  };

  const closeVoiceNoteDialog = () => {
    if (voiceNoteAudioRef.current) {
      voiceNoteAudioRef.current.pause();
    }
    if (voiceNoteWasMusicPlaying) {
      audioRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
    setVoiceNoteWasMusicPlaying(false);
    setVoiceNotePlaying(false);
    setVoiceNoteProgress(0);
    setOpenVoiceNote(null);
  };

  const toggleVoiceNote = () => {
    const audio = voiceNoteAudioRef.current;
    if (!audio) return;
    if (voiceNotePlaying) {
      audio.pause();
      setVoiceNotePlaying(false);
    } else {
      audio.play().catch(console.log);
      setVoiceNotePlaying(true);
    }
  };

  const handleVoiceNoteTimeUpdate = () => {
    const audio = voiceNoteAudioRef.current;
    if (audio && audio.duration) {
      setVoiceNoteProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  const handleVoiceNoteEnded = () => {
    setVoiceNotePlaying(false);
    setVoiceNoteProgress(0);
  };

  // Secret Final Surprise
  const [openFinalSurprise, setOpenFinalSurprise] = useState(false);

  const handleVideoPlay = () => {
    if (isPlaying) {
      setWasMusicPlaying(true);
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoPause = () => {
    if (wasMusicPlaying) {
      audioRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
  };

  const closeVideoSurprise = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    handleVideoPause();
    setOpenVideoSurprise(false);
  };

  // Autoplay and load state synchronization when switching videos
  useEffect(() => {
    if (openVideoSurprise && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch((err) => {
        console.log("Video playback blocked or interrupted:", err);
      });
    }
  }, [activeVideo, openVideoSurprise]);

  // Letter audio handlers
  const openLetter = () => {
    if (!letterOpen) {
      // Stop playing memory if any
      if (playingMemoryIdx !== null) {
        const currentRef = getMemoryAudioRef(playingMemoryIdx);
        if (currentRef && currentRef.current) {
          currentRef.current.pause();
          currentRef.current.currentTime = 0;
        }
        setPlayingMemoryIdx(null);
      }

      // Opening the letter
      if (isPlaying) {
        setWasMusicPlayingForLetter(true);
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setWasMusicPlayingForLetter(false);
      }
      if (letterAudioRef.current) {
        letterAudioRef.current.currentTime = 0;
        letterAudioRef.current.play().catch(console.log);
      }
    } else {
      // Closing the letter
      closeLetter();
      return;
    }
    setLetterOpen(true);
  };

  const closeLetter = () => {
    if (letterAudioRef.current) {
      letterAudioRef.current.pause();
      letterAudioRef.current.currentTime = 0;
    }
    if (wasMusicPlayingForLetter) {
      audioRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
    setWasMusicPlayingForLetter(false);
    setLetterOpen(false);
  };

  // Story surprise audio handlers
  const openStorySurprise = () => {
    // Stop playing memory if any
    if (playingMemoryIdx !== null) {
      const currentRef = getMemoryAudioRef(playingMemoryIdx);
      if (currentRef && currentRef.current) {
        currentRef.current.pause();
        currentRef.current.currentTime = 0;
      }
      setPlayingMemoryIdx(null);
    }

    let hadMusicPlaying = isPlaying;
    if (letterOpen) {
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        letterAudioRef.current.currentTime = 0;
      }
      setLetterOpen(false);
      if (wasMusicPlayingForLetter) {
        hadMusicPlaying = true;
        setWasMusicPlayingForLetter(false);
      }
    }
    if (hadMusicPlaying) {
      setWasMusicPlayingForSurprise(true);
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setWasMusicPlayingForSurprise(false);
    }
    if (surpriseAudioRef.current) {
      surpriseAudioRef.current.currentTime = 0;
      surpriseAudioRef.current.play().catch(console.log);
    }
    setOpenSurprise(true);
    setSlideIndex(0);
  };

  const closeStorySurprise = () => {
    if (surpriseAudioRef.current) {
      surpriseAudioRef.current.pause();
      surpriseAudioRef.current.currentTime = 0;
    }
    if (wasMusicPlayingForSurprise) {
      audioRef.current.play().catch(console.log);
      setIsPlaying(true);
    }
    setWasMusicPlayingForSurprise(false);
    setOpenSurprise(false);
  };

  // Video surprise audio handlers
  const openVideoSurpriseDialog = () => {
    // Stop playing memory if any
    if (playingMemoryIdx !== null) {
      const currentRef = getMemoryAudioRef(playingMemoryIdx);
      if (currentRef && currentRef.current) {
        currentRef.current.pause();
        currentRef.current.currentTime = 0;
      }
      setPlayingMemoryIdx(null);
    }

    let hadMusicPlaying = isPlaying;
    if (letterOpen) {
      if (letterAudioRef.current) {
        letterAudioRef.current.pause();
        letterAudioRef.current.currentTime = 0;
      }
      setLetterOpen(false);
      if (wasMusicPlayingForLetter) {
        hadMusicPlaying = true;
        setWasMusicPlayingForLetter(false);
      }
    }
    if (hadMusicPlaying) {
      setWasMusicPlaying(true);
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setWasMusicPlaying(false);
    }
    setOpenVideoSurprise(true);
  };

  // Auto-play hint overlay state
  const [showMusicHint, setShowMusicHint] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio playback blocked by browser autofile policies:", err);
      });
      setShowMusicHint(false);
    }
    setIsPlaying(!isPlaying);
  };

  const nextSlide = () => {
    if (slideIndex < surpriseSlides.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (slideIndex > 0) {
      setSlideIndex(slideIndex - 1);
    }
  };

  const surpriseSlides = [
    {
      title: "Happy Birthday, Jessy! 🎉",
      content: "Today is a beautiful day, because it marks another year of you spreading light, warmth, and laughter into this world. Click the arrows to read your special story... ❤️",
      icon: <CakeIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "The Day Everything Changed 💖",
      content: "I never knew one person could change my whole world until you came into my life. What started as simple conversations slowly became the most beautiful part of my every day. Meeting you wasn't just a moment — it was the beginning of my favorite story.",
      icon: <FavoriteIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "Through Every Distance 🌍❤️",
      content: "There were times when life kept us apart and moments when we couldn't be together as much as we wanted. Yet somehow, every reunion felt special, every message felt precious, and every call reminded me that our bond was stronger than any distance or absence.",
      icon: <FavoriteIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "The Real You 🌹",
      content: "You may be a little short-tempered sometimes, but that's one of the many things that makes you uniquely you. Behind that tiny storm is the sweetest, most innocent soul I've ever known. Your heart is pure, your intentions are genuine, and your smile has a way of making everything better.",
      icon: <FavoriteIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "Our Safe Place 🤗",
      content: "One of the things I treasure most is the trust we share. You've let me see the real you — the happy you, the emotional you, the stubborn you, and the innocent you. Knowing that you're comfortable being yourself with me is one of the greatest gifts you've ever given me.",
      icon: <FavoriteIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "My Happiness, My Home ❤️",
      content: "What I love most is seeing you happy. Some of my favorite memories are the moments when we forgot about everything else and simply enjoyed being together. Your happiness has become my happiness, and your smile will always be one of my favorite sights in the world.",
      icon: <FavoriteIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "Today & Forever 🎂✨",
      content: "On your birthday, I just want you to know how grateful I am for every moment, every memory, every challenge we've overcome, and every smile we've shared. Thank you for trusting me, for staying by my side, and for being the beautiful person you are.",
      icon: <CakeIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
    {
      title: "Happy Birthday, My Love. ❤️🎂✨",
      content: "You are my favorite chapter, my safest place, and the most beautiful blessing life has given me. No matter what comes next, our story will always be one of the most precious parts of my life.",
      icon: <FavoriteIcon sx={{ fontSize: 60, color: "#ff4081" }} />,
    },
  ];


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 35%, #ffd1ff 70%, #ffc3a0 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientFlow 15s ease infinite",
        overflow: "hidden",
        position: "relative",
        pb: 8,
      }}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        loop
        src="/Kadhaippoma-MassTamilan.io.mp3"
      />

      {/* Letter Audio */}
      <audio
        ref={letterAudioRef}
        loop
        src="/Thalli-Pogathey.mp3"
      />

      {/* Surprise Audio */}
      <audio
        ref={surpriseAudioRef}
        loop
        src="/Maru-Varthai-Pesathey-MassTamilan.com.mp3"
      />

      {/* Floating Music Player Card */}
      <Box
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Card
          onClick={togglePlay}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            borderRadius: 50,
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 10px 30px rgba(255, 64, 129, 0.15)",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              background: "rgba(255, 255, 255, 0.7)",
              transform: "scale(1.05)",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #ff4081, #ff80ab)",
              color: "#fff",
              animation: isPlaying ? "spin 4s linear infinite" : "none",
            }}
          >
            <MusicNoteIcon />
          </Box>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              color: "#d81b60",
              pr: 1.5,
              display: { xs: "none", sm: "block" },
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {isPlaying ? "Music Playing" : "Play Music"}
          </Typography>
          <IconButton size="small" sx={{ color: "#d81b60", p: 0.5 }}>
            {isPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </Card>

        {showMusicHint && !isPlaying && (
          <Box
            sx={{
              mt: 1.5,
              bgcolor: "rgba(216, 27, 96, 0.85)",
              color: "#fff",
              px: 2,
              py: 0.8,
              borderRadius: 3,
              fontSize: "0.85rem",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
              animation: "bounce 2s infinite",
              pointerEvents: "none",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                top: -6,
                right: 25,
                borderWidth: "0 6px 6px 6px",
                borderStyle: "solid",
                borderColor: "transparent transparent rgba(216, 27, 96, 0.85) transparent",
              },
            }}
          >
            Tap to play background song! 🎵
          </Box>
        )}
      </Box>

      {/* Confetti when surprise is open */}
      {openSurprise && <Confetti />}

      {/* Floating Sparkles & Hearts Background */}
      {DECORATORS.map((d) =>
        d.type === "heart" ? (
          <FavoriteIcon
            key={d.id}
            sx={{
              position: "absolute",
              color: "rgba(255, 105, 180, 0.25)",
              left: `${d.left}%`,
              top: `${d.top}%`,
              fontSize: `${d.size}px`,
              animation: `float ${d.duration}s infinite ease-in-out`,
              animationDelay: `${d.delay}s`,
              pointerEvents: "none",
            }}
          />
        ) : (
          <Box
            key={d.id}
            sx={{
              position: "absolute",
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size / 2,
              height: d.size / 2,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,215,0,0) 70%)",
              animation: `sparkle ${d.duration / 2}s infinite ease-in-out`,
              animationDelay: `${d.delay}s`,
              pointerEvents: "none",
            }}
          />
        )
      )}

      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", py: { xs: 8, md: 10 }, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "inline-block", position: "relative", mb: 3 }}>
            <Box
              sx={{
                position: "absolute",
                top: -15,
                left: -15,
                right: -15,
                bottom: -15,
                borderRadius: "50%",
                border: "2px dashed #ff4081",
                animation: "spin 25s linear infinite",
              }}
            />
            <Typography
              variant="h1"
              fontWeight="bold"
              sx={{
                fontFamily: "'Pacifico', cursive",
                background: "linear-gradient(45deg, #e91e63, #ff4081, #ba68c8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "3rem", md: "5rem" },
                mb: 1,
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.15))",
                animation: "pulseText 3s ease-in-out infinite",
              }}
            >
              Happy Birthday, Jessy! ❤️
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: "#6a1b9a",
              mb: 6,
              fontWeight: 500,
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "1.1rem", md: "1.6rem" },
              letterSpacing: "0.5px",
            }}
          >
            Every single moment with you is like a beautiful dream come true ✨
          </Typography>

          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 15,
                left: 15,
                right: -15,
                bottom: -15,
                border: "4px solid rgba(255, 64, 129, 0.3)",
                borderRadius: "50%",
                zIndex: 0,
              },
            }}
          >
            <Box
              component="img"
              src="/image/WhatsApp Image 2026-06-13 at 12.19.20 AM.jpeg"
              alt="Jessy"
              sx={{
                width: { xs: 260, md: 320 },
                height: { xs: 260, md: 320 },
                borderRadius: "50%",
                objectFit: "cover",
                border: "10px solid #ffffff",
                boxShadow: "0 25px 55px rgba(0,0,0,0.25)",
                position: "relative",
                zIndex: 1,
                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  transform: "scale(1.04) rotate(4deg)",
                  borderColor: "#fecfef",
                },
              }}
            />
            {/* Glowing heart overlay icon */}
            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                right: 25,
                bgcolor: "#ffffff",
                borderRadius: "50%",
                p: 1.5,
                boxShadow: "0 10px 20px rgba(255,64,129,0.3)",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "heartbeat 1.5s infinite",
              }}
            >
              <FavoriteIcon sx={{ color: "#ff4081", fontSize: 28 }} />
            </Box>

            {/* Scavenger Heart 1 */}
            {!foundHearts.includes(1) && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleFindHeart(1);
                }}
                sx={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  color: "rgba(255, 64, 129, 0.35)",
                  zIndex: 3,
                  p: 0.5,
                  "&:hover": { color: "#ff4081", transform: "scale(1.3)" },
                  transition: "all 0.2s",
                }}
              >
                <FavoriteIcon sx={{ fontSize: 18 }} />
              </IconButton>
            )}
          </Box>
        </Box>

        {/* Interactive Sealed Envelope (The Love Letter) */}
        <Box sx={{ py: 4, position: "relative", zIndex: 2 }}>
          <Card
            onClick={openLetter}
            sx={{
              cursor: "pointer",
              p: letterOpen ? { xs: 4, md: 6 } : { xs: 4, md: 5 },
              borderRadius: 6,
              backdropFilter: "blur(20px)",
              background: letterOpen
                ? "rgba(255,255,255,0.95)"
                : "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)",
              border: letterOpen
                ? "2px solid rgba(255, 64, 129, 0.2)"
                : "2px dashed rgba(255, 255, 255, 0.8)",
              boxShadow: letterOpen
                ? "0 30px 60px rgba(255, 64, 129, 0.2)"
                : "0 20px 45px rgba(0,0,0,0.08)",
              mb: 8,
              transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: letterOpen ? "none" : "translateY(-8px) scale(1.02)",
                boxShadow: "0 25px 50px rgba(255, 64, 129, 0.25)",
                borderColor: "#ff4081",
              },
            }}
          >
            {!letterOpen ? (
              <Box sx={{ py: 6 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    p: 2.5,
                    borderRadius: "50%",
                    bgcolor: "rgba(255, 64, 129, 0.15)",
                    mb: 3,
                    animation: "heartbeat 2s infinite",
                  }}
                >
                  <FavoriteIcon sx={{ color: "#ff4081", fontSize: 50 }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    color: "#d81b60",
                    mb: 1.5,
                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                  }}
                >
                  To Jessy, My Love 💌
                </Typography>
                <Typography variant="body1" sx={{ color: "#5c5c5c", fontSize: "1.1rem", mb: 3 }}>
                  Click to open your special handwritten letter
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#ff4081",
                    color: "#fff",
                    borderRadius: 20,
                    px: 4,
                    py: 1.2,
                    fontWeight: "bold",
                    fontFamily: "'Outfit', sans-serif",
                    boxShadow: "0 8px 20px rgba(255, 64, 129, 0.3)",
                    "&:hover": {
                      bgcolor: "#d81b60",
                    },
                  }}
                >
                  Open Letter 💖
                </Button>
              </Box>
            ) : (
              <Box sx={{ animation: "fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1)" }}>
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation(); // Avoid refiring click on parent Card
                    closeLetter();
                  }}
                  sx={{
                    position: "absolute",
                    right: 20,
                    top: 20,
                    color: "grey.600",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h3"
                  align="center"
                  gutterBottom
                  sx={{
                    fontFamily: "'Pacifico', cursive",
                    color: "#d81b60",
                    fontSize: { xs: "2.2rem", md: "3.2rem" },
                    mb: 4,
                  }}
                >
                  Dearest Jessy, 💌
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "1.1rem", md: "1.35rem" },
                    lineHeight: 2.3,
                    textAlign: "center",
                    color: "#374151",
                    maxWidth: "800px",
                    margin: "0 auto",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.2px",
                  }}
                >
                  Happy Birthday, my love! 🎂✨
                  <br />
                  Today is a celebration of the day you came into this world and made it infinitely more beautiful.
                  Thank you for bringing so much warmth, laughter, and endless light into my life.
                  <br />
                  You are my favorite person, my safe place, and the most precious chapter of my story.
                  I cherish every little moment we share, from the sweet laughs to the quiet glances.
                  <br />
                  I hope today shines as brightly as your smile and brings you all the happiness you deserve.
                  I am so lucky to walk this beautiful journey of life with you by my side.
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "'Caveat', cursive",
                    fontSize: "2.8rem",
                    color: "#ff4081",
                    fontWeight: 700,
                    mt: 5,
                    textAlign: "right",
                    pr: { xs: 2, md: 10 },
                  }}
                >
                  Yours Forever & Always,
                  <br />
                  Prasad ❤️
                </Typography>
              </Box>
            )}
          </Card>
        </Box>

        {/* Timeline of Milestones / Our Story */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            align="center"
            color="white"
            fontWeight="bold"
            mb={6}
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textShadow: "0 4px 10px rgba(106, 27, 154, 0.2)",
            }}
          >
            Our Beautiful Journey ✨
          </Typography>

          {/* 7-Chapter Story Cards */}
          <Box sx={{ maxWidth: "900px", margin: "0 auto", px: { xs: 2, md: 0 }, display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              {
                title: "The Day Everything Changed 💖",
                text: "I never knew one person could change my whole world until you came into my life. What started as simple conversations slowly became the most beautiful part of my every day. Meeting you wasn't just a moment — it was the beginning of my favorite story.",
                align: "left",
              },
              {
                title: "Through Every Distance 🌍❤️",
                text: "There were times when life kept us apart and moments when we couldn't be together as much as we wanted. Yet somehow, every reunion felt special, every message felt precious, and every call reminded me that our bond was stronger than any distance or absence.",
                align: "right",
              },
              {
                title: "The Real You 🌹",
                text: "You may be a little short-tempered sometimes, but that's one of the many things that makes you uniquely you. Behind that tiny storm is the sweetest, most innocent soul I've ever known. Your heart is pure, your intentions are genuine, and your smile has a way of making everything better.",
                align: "left",
              },
              {
                title: "Our Safe Place 🤗",
                text: "One of the things I treasure most is the trust we share. You've let me see the real you — the happy you, the emotional you, the stubborn you, and the innocent you. Knowing that you're comfortable being yourself with me is one of the greatest gifts you've ever given me.",
                align: "right",
              },
              {
                title: "The Memories We Created 📸",
                text: "From random conversations to unforgettable moments, from laughter that made our cheeks hurt to the smallest memories that only we understand, every moment with you has become a piece of a beautiful collection I'll cherish forever.",
                align: "left",
              },
              {
                title: "My Happiness, My Home ❤️",
                text: "What I love most is seeing you happy. Some of my favorite memories are the moments when we forgot about everything else and simply enjoyed being together. Your happiness has become my happiness, and your smile will always be one of my favorite sights in the world.",
                align: "right",
              },
              {
                title: "Today & Forever 🎂✨",
                text: "On your birthday, I just want you to know how grateful I am for every moment, every memory, every challenge we've overcome, and every smile we've shared. Thank you for trusting me, for staying by my side, and for being the beautiful person you are. No matter what comes next, our story will always be one of the most precious parts of my life.",
                align: "left",
                highlight: true,
              },
            ].map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: item.align === "right" ? "flex-end" : "flex-start",
                }}
              >
                <Card
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 5,
                    maxWidth: { xs: "100%", md: "72%" },
                    background: item.highlight
                      ? "linear-gradient(135deg, rgba(255,64,129,0.10) 0%, rgba(255,255,255,0.97) 100%)"
                      : "rgba(255,255,255,0.82)",
                    border: item.highlight
                      ? "2px solid rgba(255,64,129,0.35)"
                      : "1px solid rgba(255,255,255,0.6)",
                    boxShadow: item.highlight
                      ? "0 18px 45px rgba(255,64,129,0.2)"
                      : "0 10px 25px rgba(0,0,0,0.07)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                    position: "relative",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 22px 45px rgba(255,64,129,0.22)",
                    },
                  }}
                >
                  {/* Chapter badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: -14,
                      left: item.align === "right" ? "auto" : 20,
                      right: item.align === "right" ? 20 : "auto",
                      bgcolor: "#ff4081",
                      color: "#fff",
                      borderRadius: 20,
                      px: 1.8,
                      py: 0.3,
                      fontSize: "0.72rem",
                      fontWeight: "bold",
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "0.5px",
                      boxShadow: "0 4px 10px rgba(255,64,129,0.35)",
                    }}
                  >
                    Chapter {idx + 1}
                  </Box>

                  {/* Scavenger Heart 2 - only on Chapter 3 */}
                  {idx === 2 && !foundHearts.includes(2) && (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFindHeart(2);
                      }}
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        color: "rgba(255, 64, 129, 0.18)",
                        p: 0.5,
                        "&:hover": { color: "#ff4081", transform: "scale(1.3)" },
                        transition: "all 0.2s",
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      color: "#c2185b",
                      mb: 1.5,
                      fontSize: { xs: "1.05rem", md: "1.2rem" },
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "'Outfit', sans-serif",
                      color: "#374151",
                      lineHeight: 1.9,
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                    }}
                  >
                    "{item.text}"
                  </Typography>

                  {item.highlight && (
                    <Typography
                      sx={{
                        fontFamily: "'Caveat', cursive",
                        fontSize: { xs: "1.6rem", md: "2rem" },
                        color: "#ff4081",
                        fontWeight: 700,
                        mt: 3,
                        textAlign: "right",
                      }}
                    >
                      Happy Birthday, My Love. ❤️🎂✨
                    </Typography>
                  )}
                </Card>
              </Box>
            ))}

            {/* Closing Quote */}
            <Box sx={{ textAlign: "center", mt: 3, mb: 2, px: 2 }}>
              <Typography
                sx={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: { xs: "1.6rem", md: "2.2rem" },
                  color: "white",
                  fontWeight: 700,
                  textShadow: "0 2px 10px rgba(106,27,154,0.3)",
                  lineHeight: 1.5,
                }}
              >
                "You are my favorite chapter, my safest place, and the most beautiful blessing life has given me." ❤️
              </Typography>
            </Box>
          </Box>
        </Box>


        {/* Gallery / Polaroid Section */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h4"
            align="center"
            color="white"
            fontWeight="bold"
            mb={6}
            sx={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              textShadow: "1px 2px 5px rgba(0,0,0,0.15)",
            }}
          >
            Our Sweet Memories 📸
          </Typography>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            <Grid item xs={12} sm={6} md={4}>
              <PolaroidCard
                img="/image/WhatsApp Image 2026-06-13 at 12.19.15 AM.jpeg"
                caption="Warm moments ✨"
                rotation={-3}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PolaroidCard
                img="/image/WhatsApp Image 2026-06-13 at 12.19.15 AM (2).jpeg"
                caption="Perfect together 💖"
                rotation={2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PolaroidCard
                img="/image/WhatsApp Image 2026-06-13 at 12.19.19 AM.jpeg"
                caption="Sweet sunsets 🌅"
                rotation={-1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PolaroidCard
                img="/image/WhatsApp Image 2026-06-13 at 12.29.00 AM.jpeg"
                caption="Forever yours 💕"
                rotation={3}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PolaroidCard
                img="/image/WhatsApp Image 2026-06-13 at 12.29.00 AM (1).jpeg"
                caption="Our happy days 🌸"
                rotation={-2}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <PolaroidCard
                img="/image/WhatsApp Image 2026-06-13 at 12.29.01 AM.jpeg"
                caption="My beautiful Jessy 🌹"
                rotation={1}
              />
            </Grid>
          </Grid>
        </Box>

        {/* ── Music Memories ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
            <LibraryMusicIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              The Soundtrack of Us 🎵
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ maxWidth: 960, mx: "auto", px: { xs: 2, md: 0 }, alignItems: "stretch" }}>
            {MUSIC_MEMORIES.map((music, i) => (
              <Grid item xs={12} sm={4} key={i}>
                <Card sx={{
                  p: 3, borderRadius: 4, textAlign: "center", height: "100%",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)", transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 35px rgba(233,30,99,0.2)" }
                }}>
                  <LibraryMusicIcon sx={{ fontSize: 40, color: "#e91e63", mb: 2 }} />
                  <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "'Outfit', sans-serif", color: "#c2185b", mb: 1 }}>
                    {music.title}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#616161", mb: 2 }}>
                      {music.desc}
                    </Typography>
                  </Box>
                  <Button
                    variant={playingMemoryIdx === i ? "contained" : "outlined"}
                    onClick={() => playMusicMemory(i)}
                    startIcon={playingMemoryIdx === i ? <PauseIcon /> : <PlayArrowIcon />}
                    sx={{
                      borderRadius: 20,
                      color: playingMemoryIdx === i ? "#fff" : "#e91e63",
                      bgcolor: playingMemoryIdx === i ? "#e91e63" : "transparent",
                      borderColor: "#e91e63",
                      "&:hover": {
                        bgcolor: playingMemoryIdx === i ? "#c2185b" : "rgba(233,30,99,0.1)",
                        borderColor: "#c2185b"
                      }
                    }}
                  >
                    {playingMemoryIdx === i ? "Pause" : "Play"}
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── Relationship Counter ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
            <AccessTimeIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              We've Been Together For...
            </Typography>
            {/* Scavenger Heart 4 */}
            {!foundHearts.includes(4) && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleFindHeart(4);
                }}
                sx={{
                  color: "rgba(255, 255, 255, 0.35)",
                  p: 0.5,
                  ml: 1,
                  "&:hover": { color: "#ff4081", transform: "scale(1.3)" },
                  transition: "all 0.2s",
                }}
              >
                <FavoriteIcon sx={{ fontSize: 20 }} />
              </IconButton>
            )}
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center" }}>
            {[
              { label: "Days", value: timeElapsed.days },
              { label: "Hours", value: timeElapsed.hours },
              { label: "Minutes", value: timeElapsed.minutes },
              { label: "Seconds", value: timeElapsed.seconds },
            ].map((item) => (
              <Box key={item.label} sx={{ textAlign: "center" }}>
                <Card sx={{
                  minWidth: { xs: 130, md: 160 }, py: 3, px: 3, borderRadius: 5,
                  background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  boxShadow: "0 12px 35px rgba(255,64,129,0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-6px) scale(1.04)" },
                }}>
                  <Typography sx={{ fontFamily: "'Pacifico', cursive", fontSize: { xs: "2.8rem", md: "3.5rem" }, color: "#fff", lineHeight: 1, fontWeight: 700, textShadow: "0 2px 10px rgba(255,64,129,0.4)" }}>
                    {String(item.value).padStart(2, "0")}
                  </Typography>
                  <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "rgba(255,255,255,0.85)", fontSize: "0.9rem", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", mt: 1 }}>
                    {item.label}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
          <Typography align="center" sx={{ color: "rgba(255,255,255,0.7)", mt: 3, fontFamily: "'Outfit', sans-serif", fontSize: "1rem" }}>
            Since February 19, 2025 ❤️
          </Typography>
        </Box>

        {/* ── Random Memory Generator ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Typography variant="h4" align="center" color="white" fontWeight="bold" mb={4} sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
            🎲 Random Memory Generator
          </Typography>
          <Box textAlign="center" mb={5}>
            <Button
              variant="contained"
              size="large"
              onClick={pickRandomMemory}
              startIcon={<AutoAwesomeIcon />}
              sx={{
                borderRadius: 50, px: 5, py: 1.8, fontSize: "1.15rem", fontWeight: "bold",
                background: "linear-gradient(45deg,#ffd54f,#ffb300,#ff8f00)",
                color: "#3e2723", boxShadow: "0 10px 30px rgba(255,213,79,0.45)",
                fontFamily: "'Outfit', sans-serif",
                "&:hover": { transform: "scale(1.06) translateY(-3px)", boxShadow: "0 15px 40px rgba(255,213,79,0.6)" },
                transition: "all 0.3s cubic-bezier(0.175,0.885,0.32,1.275)",
              }}
            >
              ✨ Give Me A Random Memory
            </Button>
          </Box>

          {currentMemory && (
            <Box sx={{ maxWidth: 600, mx: "auto", px: { xs: 2, md: 0 }, animation: "fadeInUp 0.6s cubic-bezier(0.19,1,0.22,1)" }}>
              <Card sx={{
                borderRadius: 6, overflow: "hidden", boxShadow: "0 25px 60px rgba(255,64,129,0.25)",
                background: "rgba(255,255,255,0.96)", border: "2px solid rgba(255,64,129,0.15)",
                position: "relative",
              }}>
                <IconButton onClick={closeMemory} sx={{ position: "absolute", top: 12, right: 12, zIndex: 2, bgcolor: "rgba(255,255,255,0.8)", "&:hover": { bgcolor: "white" } }}>
                  <CloseIcon />
                </IconButton>
                <Box component="img" src={currentMemory.img} alt="memory" sx={{ width: "100%", height: 280, objectFit: "cover" }} />
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: "inline-block", bgcolor: "#ff4081", color: "#fff", borderRadius: 20, px: 2, py: 0.4, fontSize: "0.8rem", fontWeight: "bold", fontFamily: "'Outfit',sans-serif", mb: 2 }}>
                    {currentMemory.date}
                  </Box>
                  <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", color: "#374151", lineHeight: 1.8, mb: 2 }}>
                    {currentMemory.story}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "rgba(255,64,129,0.07)", borderRadius: 3, px: 2, py: 1.2 }}>
                    <Typography sx={{ fontSize: "1.4rem" }}>😄</Typography>
                    <Typography sx={{ fontFamily: "'Caveat',cursive", fontSize: "1.3rem", color: "#d81b60", fontWeight: 700 }}>
                      Inside joke: {currentMemory.joke}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          )}
        </Box>

        {/* ── Digital Love Notes Jar ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 3 }}>
            <EmailIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              Digital Love Notes Jar 💌
            </Typography>
          </Box>
          <Typography sx={{ color: "rgba(255,255,255,0.8)", mb: 4, fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", maxWidth: 600, mx: "auto", px: 2 }}>
            A jar filled with tiny reasons why I adore you. Click to draw a random note.
          </Typography>
          <Button
            onClick={openJarNote}
            sx={{
              width: 140, height: 180, borderRadius: "20px 20px 40px 40px",
              background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
              border: "3px solid rgba(255,255,255,0.5)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.5)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              mx: "auto", transition: "all 0.4s ease",
              "&:hover": { transform: "scale(1.05) rotate(2deg)", border: "3px solid #ff4081", boxShadow: "0 20px 50px rgba(255,64,129,0.3)" }
            }}
          >
            <Box sx={{ width: 80, height: 20, bgcolor: "rgba(255,255,255,0.6)", borderRadius: 1, mb: 2, position: "absolute", top: -10 }} />
            <Typography sx={{ fontSize: "3rem", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))" }}>💌</Typography>
            <Typography sx={{ color: "white", mt: 1, fontFamily: "'Outfit',sans-serif", fontWeight: "bold", textTransform: "none" }}>Draw Note</Typography>
          </Button>
        </Box>

        {/* ── Why I Choose You ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 5 }}>
            <FavoriteIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              Why I Choose You ❤️
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ maxWidth: 960, mx: "auto", px: { xs: 2, md: 0 }, alignItems: "stretch" }}>
            {WHY_CARDS.map((card, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Card sx={{
                  height: "100%", p: 3.5, borderRadius: 5, textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
                  background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  transition: "all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
                  "&:hover": { transform: "translateY(-10px) scale(1.03)", boxShadow: "0 25px 50px rgba(255,64,129,0.2)", border: "1.5px solid rgba(255,64,129,0.25)" },
                  position: "relative",
                }}>
                  {/* Scavenger Heart 3 - only on 5th card */}
                  {i === 4 && !foundHearts.includes(3) && (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFindHeart(3);
                      }}
                      sx={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        color: "rgba(255, 64, 129, 0.15)",
                        p: 0.5,
                        "&:hover": { color: "#ff4081", transform: "scale(1.3)" },
                        transition: "all 0.2s",
                      }}
                    >
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                  <Typography sx={{ fontSize: "3rem", mb: 1.5 }}>{card.emoji}</Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "'Outfit',sans-serif", color: "#c2185b", mb: 1.5, fontSize: "1.15rem" }}>
                    {card.title}
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#4a4a4a", lineHeight: 1.8, fontSize: "0.95rem" }}>
                      {card.text}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── Mini Couple Quiz ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
            <EmojiObjectsIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              Mini Couple Quiz 🎮
            </Typography>
          </Box>
          <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>
            <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "rgba(255,255,255,0.95)", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}>
              {!quizFinished ? (
                <Box textAlign="center" sx={{ animation: "fadeInUp 0.5s ease" }}>
                  <Typography sx={{ color: "#d81b60", fontWeight: "bold", mb: 2, fontFamily: "'Outfit',sans-serif" }}>
                    Question {quizStep + 1} of {COUPLE_QUIZ.length}
                  </Typography>
                  <Typography variant="h5" sx={{ fontFamily: "'Outfit',sans-serif", color: "#374151", mb: 4, fontWeight: "bold" }}>
                    {COUPLE_QUIZ[quizStep].q}
                  </Typography>
                  <Grid container spacing={2}>
                    {COUPLE_QUIZ[quizStep].options.map((opt, i) => (
                      <Grid item xs={12} sm={6} key={i}>
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => handleQuizAnswer(opt)}
                          disabled={!!quizFeedback}
                          sx={{
                            p: 2, borderRadius: 3, borderColor: "rgba(233,30,99,0.3)", color: "#c2185b",
                            fontFamily: "'Outfit',sans-serif", textTransform: "none", fontSize: "1.05rem",
                            "&:hover": { bgcolor: "rgba(233,30,99,0.05)", borderColor: "#e91e63" }
                          }}
                        >
                          {opt}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                  {quizFeedback && (
                    <Typography sx={{ mt: 3, fontFamily: "'Caveat',cursive", fontSize: "1.5rem", color: "#d81b60", animation: "pulseText 0.5s ease" }}>
                      {quizFeedback}
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box textAlign="center" sx={{ animation: "fadeInUp 0.5s ease" }}>
                  <EmojiEventsIcon sx={{ fontSize: 60, color: "#ffd54f", mb: 2 }} />
                  <Typography variant="h4" sx={{ fontFamily: "'Pacifico',cursive", color: "#d81b60", mb: 2 }}>
                    Quiz Complete!
                  </Typography>
                  <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.2rem", color: "#4a4a4a" }}>
                    You scored {quizScore} out of {COUPLE_QUIZ.length}.<br/>
                    Regardless of the score, you win my heart every day. ❤️
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        </Box>

        {/* ── Personalized Awards ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 5 }}>
            <EmojiEventsIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              Personalized Awards 🏆
            </Typography>
          </Box>
          <Grid container spacing={3} sx={{ maxWidth: 960, mx: "auto", px: { xs: 2, md: 0 }, alignItems: "stretch" }}>
            {FUNNY_AWARDS.map((award, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Card sx={{
                  height: "100%", p: 3, borderRadius: 5, textAlign: "center",
                  display: "flex", flexDirection: "column", alignItems: "center",
                  background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-8px)", boxShadow: "0 15px 40px rgba(255,213,79,0.3)" }
                }}>
                  <Box sx={{ mb: 2, p: 2, borderRadius: "50%", bgcolor: "rgba(0,0,0,0.03)" }}>
                    {award.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "'Outfit',sans-serif", color: "#374151", mb: 1, fontSize: "1.1rem" }}>
                    {award.title}
                  </Typography>
                  <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#616161", fontSize: "0.9rem", flexGrow: 1 }}>
                    {award.reason}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ── Hidden Voice Notes ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
            <MicIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              Hidden Voice Notes 🎤
            </Typography>
          </Box>
          <Typography align="center" sx={{ color: "rgba(255,255,255,0.8)", mb: 5, fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem" }}>
            Special messages, just for you 💌
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", px: { xs: 2, md: 0 } }}>
            {VOICE_NOTES.map((note, idx) => (
              <Button
                key={idx}
                onClick={() => openVoiceNoteDialog(idx)}
                sx={{
                  borderRadius: 4, px: 4, py: 3, minWidth: { xs: "100%", sm: 280 }, maxWidth: 320,
                  background: note.gradient, color: "#fff", fontWeight: "bold",
                  fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem",
                  boxShadow: `0 12px 35px ${note.color}55`,
                  flexDirection: "column", gap: 1,
                  transition: "all 0.35s cubic-bezier(0.175,0.885,0.32,1.275)",
                  "&:hover": { transform: "translateY(-6px) scale(1.04)", boxShadow: `0 20px 45px ${note.color}88` },
                }}
              >
                <MicIcon sx={{ fontSize: 32 }} />
                {note.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ── "Open When..." Letters ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
            <EmailIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              "Open When..." Letters 💌
            </Typography>
          </Box>
          <Typography align="center" sx={{ color: "rgba(255,255,255,0.8)", mb: 5, fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem" }}>
            Virtual envelopes for whatever you're feeling.
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", px: { xs: 2, md: 0 }, maxWidth: 1000, mx: "auto" }}>
            {OPEN_WHEN_LETTERS.map((letter, idx) => (
              <Button
                key={idx}
                onClick={() => setOpenWhenLetter(idx)}
                sx={{
                  borderRadius: 4, px: 3, py: 2, minWidth: { xs: "100%", sm: 220 },
                  background: letter.bg, color: "#fff", fontWeight: "bold",
                  fontFamily: "'Outfit',sans-serif", fontSize: "1rem", textTransform: "none",
                  boxShadow: `0 10px 25px ${letter.color}55`,
                  flexDirection: "column", gap: 1,
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-6px)", boxShadow: `0 15px 35px ${letter.color}88` },
                }}
              >
                <Typography sx={{ fontSize: "2rem" }}>{letter.emoji}</Typography>
                {letter.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ── Constellation Night Sky ── */}
        <Box sx={{ py: 8, position: "relative", zIndex: 1, bgcolor: "#050014", borderRadius: 8, mx: { xs: 2, md: 4 }, my: 6, boxShadow: "0 20px 60px rgba(0,0,0,0.5)", overflow: "hidden" }}>
          {/* Starry background effect */}
          {[...Array(30)].map((_, i) => (
            <Box key={i} sx={{
              position: "absolute", width: Math.random() * 3 + 1, height: Math.random() * 3 + 1,
              bgcolor: "white", borderRadius: "50%",
              top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2, animation: `sparkle ${Math.random() * 3 + 2}s infinite alternate`
            }} />
          ))}
          <Box textAlign="center" sx={{ position: "relative", zIndex: 2, px: 2 }}>
            <NightsStayIcon sx={{ fontSize: 60, color: "#fff", mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" sx={{ fontFamily: "'Pacifico',cursive", color: "#fff", mb: 2 }}>
              Under This Sky
            </Typography>
            <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.8)", fontSize: "1.2rem", maxWidth: 500, mx: "auto", lineHeight: 1.8 }}>
              The sky looked exactly like this on the night my life changed forever. The universe aligned, and I found you. ✨
            </Typography>
          </Box>

          {/* Scavenger Heart 5 */}
          {!foundHearts.includes(5) && (
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleFindHeart(5);
              }}
              sx={{
                position: "absolute",
                bottom: 20,
                right: 30,
                color: "rgba(255, 255, 255, 0.25)",
                zIndex: 3,
                p: 0.5,
                "&:hover": { color: "#ff4081", transform: "scale(1.3)" },
                transition: "all 0.2s",
              }}
            >
              <FavoriteIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>

        {/* ── Future Dreams Timeline ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Typography variant="h4" align="center" fontWeight="bold" color="white" mb={2} sx={{ fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
            Coming Soon ❤️
          </Typography>
          <Typography align="center" sx={{ color: "rgba(255,255,255,0.8)", mb: 6, fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem" }}>
            Our future dreams, waiting to be lived ✨
          </Typography>
          <Box sx={{ maxWidth: 700, mx: "auto", px: { xs: 2, md: 0 }, position: "relative" }}>
            {/* vertical line */}
            <Box sx={{ position: "absolute", left: { xs: 28, md: 36 }, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, #ff4081, #ba68c8, #5c6bc0)", borderRadius: 10, opacity: 0.5 }} />
            {FUTURE_DREAMS.map((dream, i) => (
              <Box key={i} sx={{ display: "flex", gap: 3, mb: 4, alignItems: "flex-start", position: "relative" }}>
                <Box sx={{
                  minWidth: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(255,255,255,0.9)", boxShadow: "0 8px 24px rgba(255,64,129,0.25)",
                  border: "2.5px solid rgba(255,64,129,0.3)", zIndex: 1, flexShrink: 0,
                }}>
                  {dream.icon}
                </Box>
                <Card sx={{
                  flex: 1, p: 3, borderRadius: 4,
                  background: "rgba(255,255,255,0.88)", backdropFilter: "blur(12px)",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
                  transition: "all 0.35s ease",
                  "&:hover": { transform: "translateX(6px)", boxShadow: "0 14px 36px rgba(255,64,129,0.18)" },
                }}>
                  <Typography fontWeight="bold" sx={{ fontFamily: "'Outfit',sans-serif", color: "#c2185b", mb: 0.8, fontSize: "1.1rem" }}>
                    {dream.title}
                  </Typography>
                  <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#4a4a4a", lineHeight: 1.8, fontSize: "0.95rem" }}>
                    {dream.desc}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* ── Before & After Section ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
            <AutoAwesomeIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              The Impact of You ✨
            </Typography>
          </Box>
          <Grid container spacing={4} sx={{ maxWidth: 800, mx: "auto", px: 2 }}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: "100%", p: 4, borderRadius: 6, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", textAlign: "center", border: "2px solid rgba(255,255,255,0.5)" }}>
                <Typography sx={{ fontFamily: "'Pacifico',cursive", fontSize: "1.8rem", color: "#757575", mb: 2 }}>Before You</Typography>
                <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#616161", lineHeight: 1.8 }}>
                  Life was okay, but it felt like a black and white movie. I was just going through the motions, waiting for something I couldn't even name.
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ height: "100%", p: 4, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,64,129,0.9), rgba(186,104,200,0.9))", color: "white", textAlign: "center", boxShadow: "0 15px 35px rgba(233,30,99,0.3)" }}>
                <Typography sx={{ fontFamily: "'Pacifico',cursive", fontSize: "1.8rem", color: "#fff", mb: 2 }}>After You</Typography>
                <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.9)", lineHeight: 1.8 }}>
                  Everything is in full color. You brought laughter, purpose, and a warmth I didn't know existed. You didn't just change my days; you changed my heart.
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* ── Alternate Universe Section ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Box sx={{ maxWidth: 600, mx: "auto", px: 2 }}>
            <Typography variant="h5" sx={{ fontFamily: "'Pacifico',cursive", color: "rgba(255,255,255,0.6)", mb: 2 }}>What if we never met?</Typography>
            <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.5)", lineHeight: 2, fontStyle: "italic", mb: 3 }}>
              Maybe we'd pass each other at a station.<br/>
              Maybe we'd sit in the same café without noticing.<br/>
              Maybe we'd never know what we were missing...
            </Typography>
            <Typography variant="h4" sx={{ fontFamily: "'Caveat',cursive", color: "#ff4081", fontWeight: "bold", mt: 4, textShadow: "0 0 10px rgba(255,64,129,0.5)" }}>
              Thankfully, we did. ❤️
            </Typography>
          </Box>
        </Box>

        {/* ── Birthday Time Capsule ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ maxWidth: 500, mx: "auto", px: 2 }}>
            <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", textAlign: "center" }}>
              <LockIcon sx={{ fontSize: 40, color: "#9575cd", mb: 1 }} />
              <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "'Outfit',sans-serif", color: "#5e35b1", mb: 2 }}>
                Birthday Time Capsule
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#616161", mb: 3, fontSize: "0.95rem" }}>
                Write a message to your future self. I'll keep it locked away safely until your next birthday.
              </Typography>
              {capsuleSaved ? (
                <Box sx={{ p: 2, bgcolor: "rgba(149,117,205,0.1)", borderRadius: 3, border: "1px dashed #9575cd" }}>
                  <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#5e35b1", fontWeight: "bold" }}>
                    🔒 Sealed until next year!
                  </Typography>
                </Box>
              ) : (
                <>
                  <TextField
                    multiline rows={3} fullWidth
                    placeholder="Dear future Jessy..."
                    value={capsuleMessage}
                    onChange={(e) => setCapsuleMessage(e.target.value)}
                    sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.5)", borderRadius: 2 }}
                  />
                  <Button variant="contained" onClick={saveCapsule} sx={{ bgcolor: "#5e35b1", "&:hover": { bgcolor: "#4527a0" }, borderRadius: 20, px: 4 }}>
                    Seal Capsule
                  </Button>
                </>
              )}
            </Card>
          </Box>
        </Box>

        {/* ── Genuine Video Placeholder ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontFamily: "'Pacifico',cursive", color: "white", mb: 3, textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            A Message From Me to You 🎬
          </Typography>
          <Box sx={{ maxWidth: 640, mx: "auto", px: 2 }}>
            <Card sx={{ bgcolor: "black", borderRadius: 4, overflow: "hidden", position: "relative", paddingTop: "56.25%", border: "2px solid rgba(255,255,255,0.2)" }}>
              {/* This is a placeholder for the genuine video. Replace src below. */}
              <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                <VideocamIcon sx={{ color: "rgba(255,255,255,0.3)", fontSize: 60, mb: 2 }} />
                <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit',sans-serif" }}>Your Genuine Video Goes Here</Typography>
              </Box>
              {/* <video src="/genuine-video.mp4" controls style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }} /> */}
            </Card>
          </Box>
        </Box>

        {/* Final Surprise Button Section */}
        <Box textAlign="center" sx={{ py: 8, position: "relative", zIndex: 1 }}>
          <Typography
            variant="h3"
            color="white"
            fontWeight="bold"
            gutterBottom
            sx={{
              fontFamily: "'Pacifico', cursive",
              fontSize: { xs: "2.2rem", md: "3.5rem" },
              textShadow: "0 4px 10px rgba(106, 27, 154, 0.2)",
              mb: 4,
            }}
          >
            I Love You Forever ❤️
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
            <Button
              size="large"
              variant="contained"
              onClick={openStorySurprise}
              sx={{
                borderRadius: 50,
                px: { xs: 4, md: 6 },
                py: { xs: 1.8, md: 2.2 },
                fontSize: "1.2rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ff4081, #ff80ab, #d81b60)",
                backgroundSize: "200% 200%",
                animation: "gradientFlow 4s ease infinite",
                boxShadow: "0 10px 30px rgba(255, 64, 129, 0.45)",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  transform: "scale(1.06) translateY(-4px)",
                  boxShadow: "0 15px 35px rgba(255, 64, 129, 0.6)",
                },
              }}
            >
              Story Surprise 🎁
            </Button>

            <Button
              size="large"
              variant="contained"
              onClick={openVideoSurpriseDialog}
              sx={{
                borderRadius: 50,
                px: { xs: 4, md: 6 },
                py: { xs: 1.8, md: 2.2 },
                fontSize: "1.2rem",
                fontWeight: "bold",
                background: "linear-gradient(45deg, #ba68c8, #ab47bc, #8e24aa)",
                backgroundSize: "200% 200%",
                animation: "gradientFlow 4s ease infinite",
                boxShadow: "0 10px 30px rgba(186, 104, 200, 0.45)",
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                "&:hover": {
                  transform: "scale(1.06) translateY(-4px)",
                  boxShadow: "0 15px 35px rgba(186, 104, 200, 0.6)",
                },
              }}
            >
              Video Surprise 🎥
            </Button>
          </Box>
        </Box>

        {/* ── Secret Final Surprise ── */}
        <Box textAlign="center" sx={{ py: 6, pb: 10, position: "relative", zIndex: 1 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit',sans-serif", fontSize: "0.9rem", mb: 3, letterSpacing: "2px", textTransform: "uppercase" }}>
            Scroll down... one last thing awaits
          </Typography>
          <Button
            onClick={triggerHeartbeat}
            variant="outlined"
            startIcon={<LockIcon />}
            sx={{
              borderRadius: 50, px: 5, py: 1.8, fontSize: "1.1rem", fontWeight: "bold",
              borderColor: "rgba(255,255,255,0.4)", color: "rgba(255,255,255,0.85)",
              fontFamily: "'Outfit',sans-serif",
              backdropFilter: "blur(10px)",
              background: "rgba(255,255,255,0.08)",
              animation: "heartbeat 3s infinite",
              "&:hover": { borderColor: "#ff4081", color: "#fff", background: "rgba(255,64,129,0.15)", transform: "scale(1.05)" },
              transition: "all 0.3s ease",
            }}
          >
            One Last Surprise... 🔒
          </Button>
        </Box>
      </Container>


      {/* Surprise Popup Slideshow Dialog */}
      <Dialog
        open={openSurprise}
        onClose={closeStorySurprise}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 8,
              p: { xs: 2.5, md: 4.5 },
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(8px)",
              textAlign: "center",
              maxWidth: "520px",
              width: "90%",
              boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.8)",
              position: "relative",
              overflow: "hidden",
            },
          },
        }}
      >
        <IconButton
          onClick={closeStorySurprise}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "grey.600",
            border: "1px solid rgba(0,0,0,0.06)",
            zIndex: 10,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ pt: 3, pb: 2, px: 0 }}>
          {/* Header Icon animates */}
          <Box
            sx={{
              display: "inline-flex",
              p: 2,
              borderRadius: "50%",
              bgcolor: "rgba(255, 64, 129, 0.1)",
              mb: 3,
              animation: "pulseHeart 1.5s infinite",
            }}
          >
            {surpriseSlides[slideIndex].icon}
          </Box>

          {/* Slide Text Content */}
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              color: "#d81b60",
              mb: 2,
              fontSize: { xs: "1.6rem", md: "2.1rem" },
            }}
          >
            {surpriseSlides[slideIndex].title}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              color: "#4a4a4a",
              lineHeight: 1.7,
              minHeight: "100px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: { xs: 2, md: 4 },
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            "{surpriseSlides[slideIndex].content}"
          </Typography>

          {/* Interactive Navigation Panel */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 5, px: 2 }}>
            <Button
              onClick={prevSlide}
              disabled={slideIndex === 0}
              startIcon={<KeyboardArrowLeftIcon />}
              sx={{
                borderRadius: 20,
                color: "#d81b60",
                textTransform: "none",
                fontWeight: "bold",
                "&:disabled": { color: "grey.300" },
              }}
            >
              Back
            </Button>

            {/* Indicator dots */}
            <Box sx={{ display: "flex", gap: 1 }}>
              {surpriseSlides.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: index === slideIndex ? 18 : 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: index === slideIndex ? "#ff4081" : "rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </Box>

            {slideIndex === surpriseSlides.length - 1 ? (
              <Button
                variant="contained"
                onClick={closeStorySurprise}
                sx={{
                  bgcolor: "#ff4081",
                  borderRadius: 20,
                  px: 3.5,
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": { bgcolor: "#d81b60" },
                }}
              >
                Finish ❤️
              </Button>
            ) : (
              <Button
                onClick={nextSlide}
                endIcon={<KeyboardArrowRightIcon />}
                sx={{
                  borderRadius: 20,
                  color: "#d81b60",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Next
              </Button>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      {/* Video Surprise Popup Dialog */}
      <Dialog
        open={openVideoSurprise}
        onClose={closeVideoSurprise}
        maxWidth="md"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: 8,
              p: { xs: 1, md: 2 },
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              textAlign: "center",
              boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.8)",
              position: "relative",
            },
          },
        }}
      >
        {openVideoSurprise && <Confetti />} {/* Throw confetti for video too! */}

        <IconButton
          onClick={closeVideoSurprise}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "grey.600",
            border: "1px solid rgba(0,0,0,0.06)",
            zIndex: 10,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "white" }
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ pt: { xs: 5, md: 4 }, pb: 1, px: { xs: 1, md: 3 } }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontFamily: "'Outfit', sans-serif",
              color: "#ab47bc",
              mb: 2,
            }}
          >
            A Special Memory Just For You ✨
          </Typography>

          {/* Video Switcher Tabs */}
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            <Button
              variant={activeVideo === 0 ? "contained" : "outlined"}
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                setActiveVideo(0);
              }}
              sx={{
                borderRadius: 20,
                borderColor: "#ab47bc",
                color: activeVideo === 0 ? "#fff" : "#ab47bc",
                bgcolor: activeVideo === 0 ? "#ab47bc" : "transparent",
                fontWeight: "bold",
                px: 3.5,
                py: 0.8,
                textTransform: "none",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: activeVideo === 0 ? "#8e24aa" : "rgba(171, 71, 188, 0.08)",
                  borderColor: "#8e24aa",
                  transform: "scale(1.04)",
                }
              }}
            >
              Moment 1 🌸
            </Button>
            <Button
              variant={activeVideo === 1 ? "contained" : "outlined"}
              onClick={() => {
                if (videoRef.current) videoRef.current.pause();
                setActiveVideo(1);
              }}
              sx={{
                borderRadius: 20,
                borderColor: "#ab47bc",
                color: activeVideo === 1 ? "#fff" : "#ab47bc",
                bgcolor: activeVideo === 1 ? "#ab47bc" : "transparent",
                fontWeight: "bold",
                px: 3.5,
                py: 0.8,
                textTransform: "none",
                fontFamily: "'Outfit', sans-serif",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: activeVideo === 1 ? "#8e24aa" : "rgba(171, 71, 188, 0.08)",
                  borderColor: "#8e24aa",
                  transform: "scale(1.04)",
                }
              }}
            >
              Moment 2 💫
            </Button>
          </Box>

          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              border: "4px solid #ffffff",
              lineHeight: 0,
              bgcolor: "#08060d",
            }}
          >
            <Box
              component="video"
              ref={videoRef}
              controls
              autoPlay
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              onEnded={handleVideoPause}
              sx={{
                width: "100%",
                maxHeight: "70vh",
                borderRadius: 1,
                objectFit: "contain",
              }}
            >
              <source
                src={activeVideo === 0 ? "/20260509105908560.mp4" : "/20251203232759917.mp4"}
                type="video/mp4"
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Voice Note Dialog */}
      <Dialog
        open={openVoiceNote !== null}
        onClose={closeVoiceNoteDialog}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 6, p: 0, maxWidth: 420, width: "90%",
              overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
            },
          },
        }}
      >
        {openVoiceNote !== null && (
          <>
            {/* Header gradient */}
            <Box sx={{
              background: VOICE_NOTES[openVoiceNote].gradient,
              py: 4, px: 3, textAlign: "center", position: "relative",
            }}>
              <IconButton onClick={closeVoiceNoteDialog} sx={{ position: "absolute", top: 10, right: 10, color: "rgba(255,255,255,0.8)", "&:hover": { color: "#fff" } }}>
                <CloseIcon />
              </IconButton>
              <MicIcon sx={{ fontSize: 48, color: "#fff", mb: 1 }} />
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, color: "#fff", fontSize: "1.1rem" }}>
                {VOICE_NOTES[openVoiceNote].label}
              </Typography>
              {/* Equalizer animation */}
              <Box sx={{ display: "flex", gap: 0.8, justifyContent: "center", mt: 2, alignItems: "flex-end", height: 36 }}>
                {[1, 0.6, 0.9, 0.5, 0.8, 0.4, 0.7, 1, 0.6, 0.85].map((h, i) => (
                  <Box key={i} sx={{
                    width: 5, borderRadius: 3,
                    bgcolor: "rgba(255,255,255,0.85)",
                    height: voiceNotePlaying ? `${h * 100}%` : "20%",
                    animation: voiceNotePlaying ? `eqBar ${0.5 + i * 0.1}s ease-in-out infinite alternate` : "none",
                    transition: "height 0.3s ease",
                  }} />
                ))}
              </Box>
            </Box>

            <DialogContent sx={{ px: 3, pb: 3, pt: 2.5 }}>
              {/* Message */}
              <Box sx={{ bgcolor: "rgba(0,0,0,0.03)", borderRadius: 3, p: 2.5, mb: 3 }}>
                <Typography sx={{ fontFamily: "'Caveat',cursive", fontSize: "1.3rem", color: "#374151", lineHeight: 1.7, textAlign: "center" }}>
                  💬 {VOICE_NOTES[openVoiceNote].message}
                </Typography>
              </Box>

              {/* Progress bar */}
              <LinearProgress
                variant="determinate"
                value={voiceNoteProgress}
                sx={{
                  height: 6, borderRadius: 3, mb: 2.5,
                  bgcolor: "rgba(0,0,0,0.08)",
                  "& .MuiLinearProgress-bar": { background: VOICE_NOTES[openVoiceNote].gradient, borderRadius: 3 },
                }}
              />

              {/* Audio element (hidden — no src yet, message-only mode) */}
              {VOICE_NOTES[openVoiceNote].src && (
                <audio
                  ref={voiceNoteAudioRef}
                  src={VOICE_NOTES[openVoiceNote].src}
                  onTimeUpdate={handleVoiceNoteTimeUpdate}
                  onEnded={handleVoiceNoteEnded}
                />
              )}

              {/* Play button */}
              {VOICE_NOTES[openVoiceNote].src ? (
                <Box textAlign="center">
                  <IconButton
                    onClick={toggleVoiceNote}
                    sx={{
                      width: 60, height: 60,
                      background: VOICE_NOTES[openVoiceNote].gradient,
                      color: "#fff",
                      boxShadow: `0 8px 24px ${VOICE_NOTES[openVoiceNote].color}55`,
                      "&:hover": { transform: "scale(1.1)" },
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {voiceNotePlaying ? <PauseIcon sx={{ fontSize: 30 }} /> : <PlayArrowIcon sx={{ fontSize: 30 }} />}
                  </IconButton>
                </Box>
              ) : (
                <Typography align="center" sx={{ color: "#9e9e9e", fontFamily: "'Outfit',sans-serif", fontSize: "0.85rem" }}>
                  🎙️ Voice note from Prasad — read the message above with your heart 💙
                </Typography>
              )}
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Heartbeat & End Credits Dialog */}
      <Dialog
        open={heartbeatActive}
        fullScreen
        slotProps={{
          paper: {
            sx: {
              background: "#000",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", position: "relative",
            },
          },
        }}
      >
        <IconButton onClick={() => setHeartbeatActive(false)} sx={{ position: "absolute", top: 20, right: 20, color: "rgba(255,255,255,0.3)", "&:hover": { color: "#fff" }, zIndex: 10 }}>
          <CloseIcon sx={{ fontSize: 32 }} />
        </IconButton>

        {heartbeatStage === 0 && (
          <FavoriteIcon sx={{ fontSize: 100, color: "#ff4081", animation: "pulseHeart 1.5s infinite" }} />
        )}

        {heartbeatStage === 1 && (
          <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#fff", fontSize: { xs: "1.5rem", md: "2.5rem" }, textAlign: "center", animation: "fadeInUp 2s ease", px: 4 }}>
            Of all the people in this world... I found you. ❤️
          </Typography>
        )}

        {heartbeatStage === 2 && (
          <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", animation: "fadeInUp 3s ease" }}>
            <Box textAlign="center">
              <Typography sx={{ fontFamily: "'Pacifico',cursive", color: "#ff4081", fontSize: "3rem", mb: 6 }}>
                Jessy's Birthday Project
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 2, letterSpacing: "2px" }}>
                PRODUCED & DIRECTED BY
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#fff", fontSize: "1.8rem", mb: 5 }}>
                Prasad
              </Typography>

              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 2, letterSpacing: "2px" }}>
                STARRING
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#fff", fontSize: "1.8rem", mb: 5 }}>
                Jessy ❤️
              </Typography>

              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 2, letterSpacing: "2px" }}>
                SOUNDTRACK
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#fff", fontSize: "1.8rem", mb: 6 }}>
                Our Love
              </Typography>

              <Typography sx={{ fontFamily: "'Caveat',cursive", color: "#ff80ab", fontSize: "2rem", mt: 6 }}>
                Thanks for watching... see you in reality. ✨
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>

      {/* ── Hunt Achievement Dialog ── */}
      <Dialog open={huntDialogOpen} onClose={() => setHuntDialogOpen(false)} PaperProps={{ sx: { borderRadius: 6, p: 4, textAlign: "center", maxWidth: 400 } }}>
        <EmojiEventsIcon sx={{ fontSize: 60, color: "#ffd54f", mx: "auto", mb: 2 }} />
        <Typography variant="h5" sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: "bold", color: "#c2185b", mb: 1 }}>
          Achievement Unlocked! ❤️
        </Typography>
        <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#616161", mb: 3 }}>
          You found every hidden piece of my heart. But the truth is, you've had it all along.
        </Typography>
        <Button variant="contained" onClick={() => setHuntDialogOpen(false)} sx={{ bgcolor: "#e91e63", borderRadius: 20 }}>
          I Love You Too
        </Button>
      </Dialog>

      {/* ── Jar Note Dialog ── */}
      <Dialog open={jarDialogOpen} onClose={() => setJarDialogOpen(false)} PaperProps={{ sx: { borderRadius: 6, p: 5, textAlign: "center", maxWidth: 400, background: "linear-gradient(135deg, #fff, #ffebee)" } }}>
        <Typography sx={{ fontSize: 50, mb: 2, animation: "float 3s ease-in-out infinite" }}>💌</Typography>
        <Typography sx={{ fontFamily: "'Caveat',cursive", fontSize: "2rem", color: "#d81b60", fontWeight: "bold", lineHeight: 1.5 }}>
          "{currentNote}"
        </Typography>
        <Button variant="outlined" onClick={() => setJarDialogOpen(false)} sx={{ mt: 4, borderRadius: 20, color: "#d81b60", borderColor: "#d81b60" }}>
          Fold Note Back
        </Button>
      </Dialog>

      {/* ── Open When Letter Dialog ── */}
      <Dialog open={openWhenLetter !== null} onClose={() => setOpenWhenLetter(null)} PaperProps={{ sx: { borderRadius: 6, p: 4, maxWidth: 450, background: openWhenLetter !== null ? OPEN_WHEN_LETTERS[openWhenLetter].bg : "#fff", color: "#fff" } }}>
        {openWhenLetter !== null && (
          <Box textAlign="center">
            <Typography sx={{ fontSize: 60, mb: 2 }}>{OPEN_WHEN_LETTERS[openWhenLetter].emoji}</Typography>
            <Typography variant="h5" sx={{ fontFamily: "'Outfit',sans-serif", fontWeight: "bold", mb: 3 }}>
              {OPEN_WHEN_LETTERS[openWhenLetter].label}
            </Typography>
            <Box sx={{ bgcolor: "rgba(255,255,255,0.15)", p: 3, borderRadius: 4, backdropFilter: "blur(5px)" }}>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.15rem", lineHeight: 1.8 }}>
                {OPEN_WHEN_LETTERS[openWhenLetter].content}
              </Typography>
            </Box>
            <Button variant="contained" onClick={() => setOpenWhenLetter(null)} sx={{ mt: 4, bgcolor: "rgba(255,255,255,0.3)", color: "#fff", borderRadius: 20, "&:hover": { bgcolor: "rgba(255,255,255,0.5)" } }}>
              Close Envelope
            </Button>
          </Box>
        )}
      </Dialog>

      {/* Scavenger Hunt Floating Progress */}
      {foundHearts.length > 0 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            left: 20,
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255, 255, 255, 0.6)",
            borderRadius: 50,
            px: 2.5,
            py: 1.2,
            boxShadow: "0 10px 30px rgba(233, 30, 99, 0.15)",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            animation: "fadeInUp 0.5s ease",
          }}
        >
          <FavoriteIcon
            sx={{
              color: foundHearts.length === totalHearts ? "#e91e63" : "#ff80ab",
              animation: foundHearts.length === totalHearts ? "heartbeat 1s infinite" : "none"
            }}
          />
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              color: "#c2185b",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {foundHearts.length === totalHearts
              ? "All Hearts Found! ❤️"
              : `Hearts Found: ${foundHearts.length} / ${totalHearts}`}
          </Typography>
        </Box>
      )}

      {/* Embedded Custom CSS Styles */}
      <style>
        {`
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes float {
            0% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-25px) rotate(15deg);
            }
            100% {
              transform: translateY(0px) rotate(0deg);
            }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes heartbeat {
            0% { transform: scale(1); }
            14% { transform: scale(1.1); }
            28% { transform: scale(1); }
            42% { transform: scale(1.1); }
            70% { transform: scale(1); }
          }
          @keyframes pulseHeart {
            0% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(255,64,129,0.3)); }
            50% { transform: scale(1.1); filter: drop-shadow(0 0 10px rgba(255,64,129,0.6)); }
            100% { transform: scale(1); filter: drop-shadow(0 0 2px rgba(255,64,129,0.3)); }
          }
          @keyframes pulseText {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            60% { transform: translateY(-4px); }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes eqBar {
            0% { transform: scaleY(0.3); }
            100% { transform: scaleY(1); }
          }
        `}
      </style>
    </Box>
  );
}
