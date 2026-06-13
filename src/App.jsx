import { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Button,
  Dialog,
  IconButton,
  LinearProgress,
  TextField,
  Tabs,
  Tab,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import LockIcon from "@mui/icons-material/Lock";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import StarIcon from "@mui/icons-material/Star";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LockOpenIcon from "@mui/icons-material/LockOpen";

/* ═══════════════════════════════════════════
   AUDIO SYNTHESIZER (Web Audio API)
   ═══════════════════════════════════════════ */
const playSynth = (type) => {
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;
    const beep = (freq, t, dur, vol, wave = "sine") => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = wave;
      o.frequency.setValueAtTime(freq, t);
      o.frequency.exponentialRampToValueAtTime(Math.max(freq * 0.1, 20), t + dur);
      g.gain.setValueAtTime(0.01, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.start(t); o.stop(t + dur);
    };
    if (type === "heartbeat") {
      beep(65, now, 0.15, 0.5);
      beep(55, now + 0.25, 0.18, 0.35);
    } else if (type === "unlock") {
      [261, 329, 392, 523, 659, 784, 1047].forEach((f, i) => beep(f, now + i * 0.07, 0.3, 0.1, "triangle"));
    } else if (type === "stamp") {
      beep(150, now, 0.2, 0.25);
    } else if (type === "click") {
      beep(600, now, 0.06, 0.06);
    } else if (type === "success") {
      [523, 659, 784, 1047, 1319].forEach((f, i) => beep(f, now + i * 0.06, 0.35, 0.07));
    }
  } catch (e) { /* silent */ }
};

/* ═══════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════ */
const RELATIONSHIP_START = new Date("2025-02-19T00:00:00");

const MEMORIES = [
  { img: "/image/WhatsApp Image 2026-06-13 at 12.19.15 AM.jpeg", date: "Feb 19, 2025", story: "The day everything changed. One message turned into a whole new world.", joke: "You still pretend you weren't nervous 😏" },
  { img: "/image/WhatsApp Image 2026-06-13 at 12.19.15 AM (2).jpeg", date: "March 2025", story: "Late nights, endless calls, and realizing this was something truly special.", joke: "Who fell asleep first? Not saying. 😴" },
  { img: "/image/WhatsApp Image 2026-06-13 at 12.19.19 AM.jpeg", date: "April 2025", story: "Even distance couldn't dim the warmth. Every message felt like a hug.", joke: "Your read receipts gave me mini heart attacks 😂" },
  { img: "/image/WhatsApp Image 2026-06-13 at 12.19.20 AM.jpeg", date: "May 2025", story: "The moment I knew — you are my favorite part of every single day.", joke: "You denied it. Twice. Then smiled. 🥺" },
  { img: "/image/WhatsApp Image 2026-06-13 at 12.29.00 AM.jpeg", date: "June 2025", story: "Sunshine, laughter, and you. My definition of a perfect day.", joke: "The selfie war was totally your fault 📸" },
  { img: "/image/WhatsApp Image 2026-06-13 at 12.29.00 AM (1).jpeg", date: "Aug 2025", story: "We've been through storms together, and I'd choose them all again with you.", joke: "You win every argument. I'll admit it now. 🏳️" },
  { img: "/image/WhatsApp Image 2026-06-13 at 12.29.01 AM.jpeg", date: "Today ❤️", story: "Happy Birthday, my love. Every memory leads right back to you.", joke: "You're stuck with me. No refunds. 😘" },
];

const REASONS = [
  "Because you say 'hmm' before answering questions.",
  "Because your laugh starts small and becomes uncontrollable.",
  "Because you remember tiny details about my days.",
  "Because you overthink because you care so deeply.",
  "Because you send a message and my bad mood disappears.",
  "Because you say you're angry but you still make sure I have eaten.",
  "Because you make ordinary days feel like beautiful movie scenes.",
  "Because your eyes light up when you speak about things you love.",
  "Because you are my favorite notification, always.",
  "Because you look adorable when you're sleepy.",
  "Because you protect the people you care about fiercely.",
  "Because you forgive my silly mistakes with a smile.",
  "Because your hand fits perfectly in mine.",
  "Because you listen to my boring stories with so much excitement.",
  "Because you remind me that everything will be okay.",
  "Because you are the safest place for my secrets.",
  "Because you hold on to hope even during tiny storms.",
  "Because you have the prettiest, most innocent soul.",
  "Because you are the reason I smile at my phone at 2 AM.",
  "Because you are you, and nobody else could ever match your warmth.",
  "Because you get jealous and it's honestly the cutest thing.",
  "Because your voice messages are my favorite sound in the world.",
  "Because you care about people who don't even deserve it.",
  "Because you make even silence feel comfortable.",
  "Because being around you feels like coming home.",
];

const OPEN_WHEN = [
  { emoji: "🥺", label: "Open when you're sad", color: "#5c6bc0", bg: "linear-gradient(135deg,#5c6bc0,#9575cd)", text: "I hate knowing you're sad. Just remember storms don't last forever. Take a deep breath, cry if you need to, but know I am holding your hand through it all. You are so strong. I love you." },
  { emoji: "😫", label: "Open when you're stressed", color: "#f57c00", bg: "linear-gradient(135deg,#f57c00,#ffb74d)", text: "Hey. Stop. Breathe. You're taking on the world right now, and I know it's heavy. But look at everything you've overcome! Take a break, drink some water, and remember I'm cheering you on. Always." },
  { emoji: "💖", label: "Open when you miss me", color: "#e91e63", bg: "linear-gradient(135deg,#e91e63,#f48fb1)", text: "Missing you too. A lot. Just close your eyes and imagine me hugging you really tight right now. Every second apart just means our next memory together will be even more special." },
  { emoji: "😤", label: "Open when you're angry at me", color: "#d32f2f", bg: "linear-gradient(135deg,#d32f2f,#e57373)", text: "Okay, I know you're mad. And I probably did something stupid. I am so sorry. You have every right to feel how you feel. Please know I never want to hurt you. When you're ready, I'm here to fix it." },
  { emoji: "🚀", label: "Open when you need motivation", color: "#388e3c", bg: "linear-gradient(135deg,#388e3c,#81c784)", text: "You are capable of incredible things. Don't let a temporary setback make you doubt your immense potential. I believe in you completely. Go show the world what you're made of. I'm your biggest fan!" },
  { emoji: "🌙", label: "Open when you can't sleep", color: "#6a1b9a", bg: "linear-gradient(135deg,#6a1b9a,#ba68c8)", text: "Can't sleep? Rest your mind, put away the phone, and remember that my heart is beating right beside yours even across the miles. Let my love be your blanket tonight. Sleep tight, Kuttymaa." },
  { emoji: "😊", label: "Open when you're happy", color: "#00897b", bg: "linear-gradient(135deg,#00897b,#80cbc4)", text: "You're happy! That makes ME happy! I hope this feeling lasts forever. You deserve every single beautiful moment. Keep shining, my love. ✨" },
  { emoji: "😢", label: "Open when you're crying", color: "#455a64", bg: "linear-gradient(135deg,#455a64,#90a4ae)", text: "It's okay to cry. Let it all out. I wish I could wipe your tears right now. But even through tears, you're still the most beautiful person I know. This too shall pass. I'm here." },
];

const SOUNDTRACK = [
  { title: "Kadhaippoma", reason: "This is our anthem. The one we'll be humming at 80 years old.", src: "/Kadhaippoma-MassTamilan.io.mp3" },
  { title: "Maru Varthai Pesathey", reason: "Every lyric sounds like a love letter I wanted to write you.", src: "/Maru-Varthai-Pesathey-MassTamilan.com.mp3" },
  { title: "Thalli Pogathey", reason: "The song that got me through late nights when I missed you most.", src: "/Thalli-Pogathey.mp3" },
];

const CALENDAR_MEMORIES = {
  "Feb 19": "The day our universe aligned. We talked for hours and my life changed forever. ❤️",
  "Apr 12": "We laughed for 2 hours straight over something that wasn't even funny. 😄",
  "Jun 05": "You looked absolutely beautiful and didn't even realize it. 🌸",
  "Aug 14": "You sent me a random message when I was struggling. You saved my day. 🌧️",
  "Oct 10": "Our first late-night call about future dreams and café dates. ☕",
  "Dec 25": "A winter confession. Looking back, you were already my favorite person. ❄️",
};

const FREEZE_MOMENTS = [
  "That night when we couldn't stop laughing and forgot the world existed.",
  "The first time you called me by my name and my heart actually skipped.",
  "The moment you sent me a good morning message and I smiled for an hour.",
  "When we talked until 4 AM and neither of us wanted to hang up.",
  "The day you said 'I miss you' and I realized this was real.",
];

const DAYS_SAVED = [
  { date: "A random Tuesday", text: "You probably don't remember this day. But I was struggling. Then you sent a random meme. And somehow the entire day became lighter." },
  { date: "That Thursday night", text: "I was overthinking everything. You called, talked about your day, and without knowing it, you pulled me out of a dark place." },
  { date: "A Sunday morning", text: "I woke up feeling low. Your good morning message was the first thing I saw. It changed everything." },
];

const PUZZLE_PIECES = [
  { key: "kindness", label: "Your Kindness", detail: "The way you care for people, even when they fail you." },
  { key: "laugh", label: "Your Laugh", detail: "That sweet, uncontrolled sound that heals my worst days." },
  { key: "stubbornness", label: "Your Stubbornness", detail: "Admit it — you're stubborn. But it's the cutest thing." },
  { key: "loyalty", label: "Your Loyalty", detail: "Your unwavering trust, standing by my side through everything." },
  { key: "smile", label: "Your Smile", detail: "The sight that clears all my cloudy days instantly." },
  { key: "dreams", label: "Your Dreams", detail: "Your passion to grow, conquer, and make everything perfect." },
];

const MEMORY_ICONS = ["💖", "🌹", "🍫", "🧸", "☕", "🍿", "📸", "👑"];

/* ═══════════════════════════════════════════
   CONFETTI COMPONENT
   ═══════════════════════════════════════════ */
function Confetti() {
  const pieces = useRef(Array.from({ length: 60 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 3,
    dur: 2.5 + Math.random() * 2.5, size: 5 + Math.random() * 7,
    color: ["#ff4081", "#ff80ab", "#ffd54f", "#4fc3f7", "#81c784", "#ba68c8"][i % 6],
    circle: Math.random() > 0.5,
  }))).current;
  return (
    <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999, overflow: "hidden" }}>
      {pieces.map((p) => (
        <Box key={p.id} sx={{
          position: "absolute", width: p.size, height: p.size,
          bgcolor: p.color, left: `${p.left}%`, top: -20,
          borderRadius: p.circle ? "50%" : 0,
          animation: `confettiFall ${p.dur}s linear ${p.delay}s infinite`,
        }} />
      ))}
    </Box>
  );
}

/* ═══════════════════════════════════════════
   RAINING HEARTS COMPONENT
   ═══════════════════════════════════════════ */
function RainingHearts() {
  const pieces = useRef(Array.from({ length: 30 }, (_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 10,
    dur: 6 + Math.random() * 6, size: 10 + Math.random() * 15,
    color: ["rgba(233, 30, 99, 0.4)", "rgba(255, 64, 129, 0.4)", "rgba(244, 143, 177, 0.4)", "rgba(186, 104, 200, 0.4)"][i % 4],
  }))).current;
  return (
    <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {pieces.map((p) => (
        <FavoriteIcon key={p.id} sx={{
          position: "absolute", color: p.color, left: `${p.left}%`, top: "-10%",
          fontSize: p.size,
          animation: `rainFall ${p.dur}s linear ${p.delay}s infinite`,
        }} />
      ))}
    </Box>
  );
}

/* ═══════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════ */
const Section = ({ title, icon, children, dark, sx: sxOverride }) => (
  <Box sx={{
    py: 5, width: "100%",
    ...(dark ? { bgcolor: "rgba(10,0,30,0.95)", borderRadius: "24px", my: 3, px: { xs: 2, md: 4 }, boxShadow: "0 15px 50px rgba(0,0,0,0.4)" } : {}),
    ...sxOverride,
  }}>
    {title && (
      <Typography variant="h5" align="center" fontWeight="bold" sx={{
        mb: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 1,
        color: dark ? "#fff" : "#880e4f", fontFamily: "'Outfit',sans-serif",
        fontSize: { xs: "1.4rem", md: "1.8rem" },
      }}>
        {icon} {title}
      </Typography>
    )}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
      {children}
    </Box>
  </Box>
);

/* ═══════════════════════════════════════════
   GLASS CARD
   ═══════════════════════════════════════════ */
const Glass = ({ children, sx: sxOverride, ...props }) => (
  <Card sx={{
    p: { xs: 3, md: 4 }, borderRadius: "20px",
    background: "rgba(255,255,255,0.55)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.45)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
    width: "100%", maxWidth: "600px",
    transition: "all 0.35s cubic-bezier(.4,0,.2,1)",
    "&:hover": { transform: "translateY(-4px)", boxShadow: "0 16px 48px rgba(233,30,99,0.12)" },
    ...sxOverride,
  }} {...props}>
    {children}
  </Card>
);

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  // Audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIdx, setTrackIdx] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = SOUNDTRACK[trackIdx].src;
      if (isPlaying) audioRef.current.play().catch(() => {});
    }
  }, [trackIdx]);

  const toggleMusic = () => {
    if (isPlaying) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setIsPlaying(!isPlaying);
  };

  // Timer
  const [elapsed, setElapsed] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.floor((Date.now() - RELATIONSHIP_START) / 1000);
      setElapsed({ d: Math.floor(diff / 86400), h: Math.floor((diff % 86400) / 3600), m: Math.floor((diff % 3600) / 60), s: diff % 60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Scavenger Hunt
  const [hearts, setHearts] = useState([]);
  const [huntDone, setHuntDone] = useState(false);
  const findHeart = (id) => {
    if (!hearts.includes(id)) {
      const next = [...hearts, id];
      setHearts(next);
      playSynth("success");
      if (next.length >= 5) setHuntDone(true);
    }
  };

  // Reasons
  const [reasonCount, setReasonCount] = useState(1247);
  const [currentReason, setCurrentReason] = useState("");
  const drawReason = () => {
    playSynth("click");
    setReasonCount((c) => c + 1);
    setCurrentReason(REASONS[Math.floor(Math.random() * REASONS.length)]);
  };

  // Heartbeat
  const [hbClicks, setHbClicks] = useState(0);
  const hbMsgs = [
    "The first time you called me by that nickname. My heart skipped a beat.",
    "The first time I missed you so much that minutes felt like hours.",
    "The first time I wanted to tell you I love you, but was too nervous.",
  ];

  // Calendar
  const [calMsg, setCalMsg] = useState("");

  // Stars
  const [starData] = useState([
    { id: 1, x: 15, y: 25, text: "The day you made me laugh until my stomach hurt." },
    { id: 2, x: 45, y: 15, text: "The day I realized I wanted to tell you everything." },
    { id: 3, x: 75, y: 40, text: "The day I missed you the absolute most." },
    { id: 4, x: 30, y: 60, text: "The first time I saw your beautiful smile." },
    { id: 5, x: 60, y: 70, text: "Our first long call when time stood completely still." },
  ]);
  const [starMsg, setStarMsg] = useState("");

  // Random thoughts
  const thoughtsPool = [
    "She's probably being cute right now.",
    "I should tell her I love her again.",
    "I wonder if she's smiling reading this.",
    "She's my favorite notification.",
    "I hope she knows she's loved.",
  ];
  const [thought, setThought] = useState("");

  // Puzzle
  const [solved, setSolved] = useState([]);

  // Arcade
  const [arcadeMode, setArcadeMode] = useState("none");
  const [catchScore, setCatchScore] = useState(0);
  const [basketX, setBasketX] = useState(50);
  const [fallingHearts, setFallingHearts] = useState([]);
  const catchTimer = useRef(null);

  useEffect(() => {
    if (arcadeMode === "catch") {
      catchTimer.current = setInterval(() => {
        setFallingHearts((prev) => {
          let moved = prev.map((h) => ({ ...h, y: h.y + 5 })).filter((h) => {
            if (h.y >= 88) {
              const diff = Math.abs(h.x - basketX);
              if (diff < 14) {
                setCatchScore((s) => {
                  const ns = s + 1;
                  playSynth("click");
                  if (ns >= 10) { playSynth("success"); clearInterval(catchTimer.current); }
                  return ns;
                });
                return false;
              }
            }
            return h.y < 100;
          });
          if (Math.random() < 0.3 && moved.length < 5)
            moved.push({ id: Math.random(), x: 8 + Math.random() * 84, y: 0 });
          return moved;
        });
      }, 130);
    } else {
      clearInterval(catchTimer.current);
    }
    return () => clearInterval(catchTimer.current);
  }, [arcadeMode, basketX]);

  // Memory match
  const [memCards, setMemCards] = useState([]);
  const [selCards, setSelCards] = useState([]);
  const [matched, setMatched] = useState([]);

  const startMemory = () => {
    setArcadeMode("memory");
    const doubled = [...MEMORY_ICONS, ...MEMORY_ICONS];
    setMemCards(doubled.map((v, i) => ({ id: i, val: v })).sort(() => Math.random() - 0.5));
    setSelCards([]); setMatched([]);
  };

  const clickCard = (id) => {
    if (selCards.length >= 2 || matched.includes(id) || selCards.includes(id)) return;
    playSynth("click");
    const next = [...selCards, id];
    setSelCards(next);
    if (next.length === 2) {
      const a = memCards.find((c) => c.id === next[0]);
      const b = memCards.find((c) => c.id === next[1]);
      if (a.val === b.val) {
        const nm = [...matched, a.id, b.id];
        setMatched(nm);
        setSelCards([]);
        if (nm.length === memCards.length) playSynth("success");
      } else {
        setTimeout(() => setSelCards([]), 900);
      }
    }
  };

  // Quiz
  const [qStep, setQStep] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qFb, setQFb] = useState("");
  const [qDone, setQDone] = useState(false);
  const quizData = [
    { q: "What's my favorite thing about you?", opts: ["Your looks", "Your kindness", "Your cooking", "Your cute anger"], ans: 1, fb: "Correct! Your gentle soul is my favorite. ❤️" },
    { q: "Who fell in love first?", opts: ["Me", "You", "Both at the same time"], ans: 0, fb: "Guilty. I fell first, and I fell hard. ❤️" },
    { q: "What's our relationship superpower?", opts: ["Distance survival", "Laughing at nothing", "Telepathic texts"], ans: 1, fb: "Exactly! Our laughter is unmatched. ❤️" },
  ];

  const answerQuiz = (idx) => {
    const correct = idx === quizData[qStep].ans;
    if (correct) setQScore((s) => s + 1);
    setQFb(correct ? quizData[qStep].fb : "Not quite, but I still love you! 💕");
    playSynth("click");
    setTimeout(() => {
      setQFb("");
      if (qStep < quizData.length - 1) setQStep((s) => s + 1);
      else { setQDone(true); playSynth("success"); }
    }, 2500);
  };

  // Coupons
  const [redeemed, setRedeemed] = useState([]);
  const coupons = [
    { id: 0, title: "One Free Forehead Kiss 😘", color: "#e91e63" },
    { id: 1, title: "Cozy Movie Night 🎬", color: "#9c27b0" },
    { id: 2, title: "You Win This Argument 😂", color: "#4caf50" },
    { id: 3, title: "Unlimited Virtual Hugs 🤗", color: "#ff9800" },
    { id: 4, title: "Emergency Comfort Call 📞", color: "#00bcd4" },
  ];

  // Terms
  const [signed, setSigned] = useState(false);

  // Vault
  const [vaultOpen, setVaultOpen] = useState(false);
  const [vaultPw, setVaultPw] = useState("");
  const [vaultErr, setVaultErr] = useState(false);

  // Open When
  const [owIdx, setOwIdx] = useState(null);

  // Emergency Kit
  const [kitMsg, setKitMsg] = useState(null);

  // Ultimate surprise
  const [showFinal, setShowFinal] = useState(false);
  const [finalStep, setFinalStep] = useState(0);

  useEffect(() => {
    if (!showFinal) return;
    const steps = [2000, 5000, 8000, 11000, 14000, 18000, 23000, 28000];
    const timers = steps.map((ms, i) => setTimeout(() => setFinalStep(i + 1), ms));
    return () => timers.forEach(clearTimeout);
  }, [showFinal]);

  /* ═══════════════════════════════════════
     RENDER
     ═══════════════════════════════════════ */
  return (
    <Box sx={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fce4ec 0%, #f3e5f5 35%, #ede7f6 65%, #fff3e0 100%)",
      backgroundSize: "400% 400%",
      animation: "bgShift 20s ease infinite",
      position: "relative",
      pb: 12,
    }}>
      <RainingHearts />
      <audio ref={audioRef} loop />

      {/* ── FLOATING MUSIC PLAYER ── */}
      <Box sx={{
        position: "fixed", top: 12, right: 12, zIndex: 1000,
        background: "rgba(255,255,255,0.72)", backdropFilter: "blur(14px)",
        borderRadius: "28px", p: "6px 14px",
        display: "flex", alignItems: "center", gap: 1,
        boxShadow: "0 6px 28px rgba(255,105,180,0.12)",
        border: "1px solid rgba(255,255,255,0.5)",
      }}>
        <IconButton size="small" onClick={toggleMusic} sx={{ color: "#d81b60" }}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>
        <Typography variant="caption" fontWeight="bold" sx={{ color: "#880e4f", maxWidth: 100, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {SOUNDTRACK[trackIdx].title}
        </Typography>
        <IconButton size="small" onClick={() => { playSynth("click"); setTrackIdx((i) => (i + 1) % 3); }} sx={{ color: "#880e4f" }}>
          <MusicNoteIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── BOTTOM NAV ── */}
      <Box sx={{
        position: "fixed", bottom: 12, left: "50%", transform: "translateX(-50%)",
        zIndex: 1000, width: "92%", maxWidth: 520,
        background: "rgba(255,255,255,0.78)", backdropFilter: "blur(14px)",
        borderRadius: "28px", boxShadow: "0 8px 36px rgba(0,0,0,0.08)",
        border: "1px solid rgba(255,255,255,0.5)", p: "2px",
      }}>
        <Tabs value={activeTab} onChange={(_, v) => { playSynth("click"); setActiveTab(v); }}
          variant="fullWidth" textColor="secondary" indicatorColor="secondary"
          sx={{ minHeight: 38, "& .MuiTabs-indicator": { height: 3, borderRadius: 3 } }}>
          <Tab label="📖 Story" sx={{ fontSize: "0.75rem", fontWeight: "bold", minHeight: 38, py: 0 }} />
          <Tab label="💖 Feel" sx={{ fontSize: "0.75rem", fontWeight: "bold", minHeight: 38, py: 0 }} />
          <Tab label="🎮 Play" sx={{ fontSize: "0.75rem", fontWeight: "bold", minHeight: 38, py: 0 }} />
          <Tab label="🔐 Vault" sx={{ fontSize: "0.75rem", fontWeight: "bold", minHeight: 38, py: 0 }} />
        </Tabs>
      </Box>

      {/* ── SCAVENGER PROGRESS ── */}
      {hearts.length > 0 && (
        <Box sx={{
          position: "fixed", bottom: 60, left: 12, zIndex: 1000,
          bgcolor: "rgba(255,255,255,0.82)", backdropFilter: "blur(10px)",
          borderRadius: "18px", px: 1.8, py: 0.8,
          boxShadow: "0 4px 20px rgba(233,30,99,0.12)",
          display: "flex", alignItems: "center", gap: 1,
          border: "1px solid rgba(233,30,99,0.15)",
        }}>
          <FavoriteIcon sx={{ color: "#ff4081", fontSize: 18, animation: hearts.length >= 5 ? "pulseHeart 1s infinite" : "none" }} />
          <Typography variant="caption" fontWeight="bold" sx={{ color: "#c2185b" }}>
            {hearts.length >= 5 ? "All Found! ❤️" : `${hearts.length}/5 Hearts`}
          </Typography>
        </Box>
      )}

      {signed && <Confetti />}

      {/* ═══════════════════════════════════
         HERO SECTION (ALWAYS VISIBLE)
         ═══════════════════════════════════ */}
      <Container maxWidth="sm" sx={{ pt: 7, pb: 3, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Box sx={{ position: "relative", mb: 2.5 }}>
          <Box sx={{ position: "absolute", inset: -8, borderRadius: "50%", border: "2px dashed rgba(233,30,99,0.3)", animation: "spin 25s linear infinite" }} />
          <Box component="img" src="/image/WhatsApp Image 2026-06-13 at 12.19.20 AM.jpeg" alt="Kuttymaa"
            sx={{ width: 170, height: 170, borderRadius: "50%", objectFit: "cover", border: "5px solid #fff", boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }} />
          {!hearts.includes(1) && (
            <IconButton onClick={() => findHeart(1)} sx={{ position: "absolute", top: 5, left: 5, color: "rgba(255,64,129,0.25)", "&:hover": { color: "#ff4081" } }}>
              <FavoriteIcon sx={{ fontSize: 14 }} />
            </IconButton>
          )}
        </Box>

        <Typography variant="h3" sx={{
          fontFamily: "'Pacifico',cursive",
          background: "linear-gradient(45deg,#e91e63,#ba68c8,#ff8f00)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          fontSize: { xs: "2rem", md: "3rem" }, mb: 0.5,
        }}>
          Happy Birthday, Kuttymaa! ❤️
        </Typography>

        <Typography variant="body2" sx={{ color: "#6a1b9a", mb: 3, maxWidth: 460, fontSize: { xs: "0.85rem", md: "1rem" } }}>
          You make ordinary days feel like a fairytale. This is my little world dedicated entirely to you.
        </Typography>

        {/* Counter */}
        <Box sx={{
          display: "flex", gap: 1.5, mb: 2, flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { u: "Days", v: elapsed.d }, { u: "Hrs", v: elapsed.h },
            { u: "Min", v: elapsed.m }, { u: "Sec", v: elapsed.s },
          ].map((t) => (
            <Box key={t.u} sx={{
              minWidth: 65, py: 1.5, px: 1, borderRadius: "14px",
              background: "rgba(255,255,255,0.5)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.6)", textAlign: "center",
            }}>
              <Typography variant="h5" fontWeight="bold" sx={{ color: "#d81b60", lineHeight: 1 }}>
                {String(t.v).padStart(2, "0")}
              </Typography>
              <Typography variant="caption" sx={{ color: "#880e4f", fontSize: "0.6rem", letterSpacing: 1 }}>
                {t.u}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="caption" sx={{ color: "#7b1fa2", fontStyle: "italic" }}>
          Since Feb 19, 2025 — counted in heartbeats
        </Typography>
      </Container>

      {/* ═══════════════════════════════════
         TAB 0 — STORY
         ═══════════════════════════════════ */}
      {activeTab === 0 && (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Netflix Episodes */}
          <Section title="The Movie of Us" icon={<LocalMoviesIcon sx={{ color: "#d81b60" }} />}>
            <Box sx={{
              display: "flex", gap: 2, overflowX: "auto", pb: 2, px: 1, width: "100%",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { height: 5 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "rgba(0,0,0,0.08)", borderRadius: 4 },
            }}>
              {[
                { ep: 1, title: "Stranger → Friend", story: "How it all began. Simple greetings that somehow sparked a universe.", time: "Feb 2025" },
                { ep: 2, title: "The Late-Night Calls", story: "Talking for hours, losing track of sleep, feeling like we spoke the same language.", time: "Mar 2025" },
                { ep: 3, title: "The Missing You Era", story: "The distance felt heavy, but every notification of yours kept me breathing.", time: "Apr 2025" },
                { ep: 4, title: "Arguments We Survived", story: "Our tiny storms only made us realize we never wanted to let go.", time: "May 2025" },
                { ep: 5, title: "My Favorite Human", story: "The ultimate realization — you are the one I want to share everything with.", time: "Today ❤️" },
              ].map((ep) => (
                <Card key={ep.ep} sx={{
                  minWidth: 240, p: 2.5, borderRadius: "16px",
                  background: "rgba(20,10,30,0.92)", color: "#fff",
                  scrollSnapAlign: "start",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": { transform: "translateY(-4px)", borderColor: "#e91e63" },
                }}>
                  <Typography variant="caption" sx={{ color: "#e91e63", fontWeight: "bold", letterSpacing: 1 }}>
                    EPISODE {ep.ep}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ my: 1, fontSize: "1.05rem" }}>
                    {ep.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#bbb", fontSize: "0.82rem", lineHeight: 1.6, minHeight: 70 }}>
                    "{ep.story}"
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, pt: 1, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                    <Typography variant="caption" sx={{ color: "#888" }}>{ep.time}</Typography>
                    <Typography variant="caption" sx={{ color: "#ff4081", fontWeight: "bold" }}>★ 10/10</Typography>
                  </Box>
                </Card>
              ))}
            </Box>
          </Section>

          {/* The Day I Fell */}
          <Section title="📖 The Day I Fell" icon="">
            <Glass sx={{ position: "relative" }}>
              {!hearts.includes(2) && (
                <IconButton onClick={() => findHeart(2)} sx={{ position: "absolute", bottom: 8, right: 8, color: "rgba(255,64,129,0.15)" }}>
                  <FavoriteIcon sx={{ fontSize: 14 }} />
                </IconButton>
              )}
              <Typography variant="body1" sx={{ fontStyle: "italic", lineHeight: 1.9, color: "#374151" }}>
                "We were talking normally. Nothing dramatic happened. No music played. No movie-style wind blew.
                <br /><br />
                Then suddenly I realized:
                <br />
                <strong style={{ color: "#c2185b" }}>"This is the person I want to tell everything to."</strong>"
              </Typography>
              <Typography variant="caption" sx={{ display: "block", mt: 2, color: "#8e24aa", fontWeight: "bold" }}>
                — The exact moment everything fell into place
              </Typography>
            </Glass>
          </Section>

          {/* 365 Days Calendar */}
          <Section title="📅 365 Days of You" icon="">
            <Typography variant="body2" align="center" sx={{ color: "#6a1b9a", mb: 2 }}>
              Tap a date to unlock a hidden memory.
            </Typography>
            <Grid container spacing={1.5} justifyContent="center" sx={{ maxWidth: 420, mx: "auto" }}>
              {Object.entries(CALENDAR_MEMORIES).map(([date, msg]) => (
                <Grid item xs={4} key={date}>
                  <Button fullWidth onClick={() => { playSynth("click"); setCalMsg(msg); }}
                    startIcon={<FavoriteIcon sx={{ color: "#e91e63", fontSize: 14 }} />}
                    sx={{
                      borderRadius: "10px", py: 1.5, textTransform: "none", fontSize: "0.8rem",
                      borderColor: "rgba(233,30,99,0.25)", color: "#880e4f",
                      bgcolor: "rgba(255,255,255,0.45)", border: "1px solid rgba(233,30,99,0.2)",
                      "&:hover": { bgcolor: "rgba(233,30,99,0.06)" },
                    }}>
                    {date}
                  </Button>
                </Grid>
              ))}
            </Grid>
            {calMsg && (
              <Box sx={{ mt: 2.5, p: 2, borderRadius: "14px", bgcolor: "rgba(255,64,129,0.06)", border: "1px dashed #ff4081", maxWidth: 460, animation: "fadeInUp 0.4s ease" }}>
                <Typography variant="body2" sx={{ color: "#374151", fontFamily: "'Outfit',sans-serif" }}>"{calMsg}"</Typography>
              </Box>
            )}
          </Section>

          {/* Days You Saved Me */}
          <Section title="🌧️ Days You Saved Me" icon="">
            {DAYS_SAVED.map((d, i) => (
              <Glass key={i} sx={{ mb: 2, borderLeft: "4px solid #ba68c8" }}>
                <Typography variant="caption" fontWeight="bold" sx={{ color: "#8e24aa" }}>{d.date}</Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#374151", lineHeight: 1.7 }}>{d.text}</Typography>
              </Glass>
            ))}
          </Section>

          {/* Our Soundtrack */}
          <Section title="🎵 Our Soundtrack" icon="">
            <Typography variant="body2" align="center" sx={{ color: "#6a1b9a", mb: 2, maxWidth: 420 }}>
              It's not just the songs — it's why they remind me of you.
            </Typography>
            {SOUNDTRACK.map((s, i) => (
              <Glass key={i} sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2, flexDirection: { xs: "column", sm: "row" } }}>
                <Box sx={{ textAlign: { xs: "center", sm: "left" }, flex: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#c2185b" }}>{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: "#616161", mt: 0.5, fontStyle: "italic" }}>"{s.reason}"</Typography>
                </Box>
                <Button size="small" variant="outlined" color="secondary"
                  onClick={() => { playSynth("click"); setTrackIdx(i); if (!isPlaying) { audioRef.current.play().catch(() => {}); setIsPlaying(true); } }}
                  sx={{ borderRadius: "16px", textTransform: "none", minWidth: 80 }}>
                  ▶ Play
                </Button>
              </Glass>
            ))}
          </Section>

          {/* Polaroids */}
          <Section title="📸 Sweet Memories" icon="">
            <Grid container spacing={2.5} justifyContent="center">
              {MEMORIES.slice(0, 6).map((m, i) => (
                <Grid item xs={6} sm={4} key={i}>
                  <Card sx={{
                    bgcolor: "#fff", p: 1.5, pb: 3, borderRadius: 0,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                    transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                    transition: "all 0.35s ease",
                    "&:hover": { transform: "scale(1.04) rotate(0deg)", boxShadow: "0 16px 36px rgba(255,64,129,0.15)" },
                  }}>
                    <CardMedia component="img" image={m.img} alt={m.date} sx={{ height: 180, objectFit: "cover" }} />
                    <Typography variant="body2" sx={{ fontFamily: "'Caveat',cursive", textAlign: "center", mt: 1.5, color: "#d81b60", fontWeight: 700, fontSize: "1.1rem" }}>
                      {m.joke}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Section>
        </Container>
      )}

      {/* ═══════════════════════════════════
         TAB 1 — FEEL (Interactive & Emotional)
         ═══════════════════════════════════ */}
      {activeTab === 1 && (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Reasons Counter */}
          <Section title="❤️ Reasons I Love You" icon="">
            <Glass sx={{ textAlign: "center" }}>
              <Typography variant="h4" fontWeight="bold" sx={{ color: "#d81b60", mb: 1 }}>
                {reasonCount.toLocaleString()} <span style={{ fontSize: "1rem", fontWeight: 400 }}>and counting...</span>
              </Typography>
              <Button variant="contained" color="secondary" onClick={drawReason} sx={{ borderRadius: "18px", px: 3.5, mb: 1 }}>
                Reveal A Reason ❤️
              </Button>
              {currentReason && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "rgba(233,30,99,0.04)", borderRadius: "12px", border: "1px dashed #e91e63", animation: "fadeInUp 0.4s ease" }}>
                  <Typography sx={{ fontFamily: "'Caveat',cursive", fontSize: "1.4rem", color: "#880e4f" }}>"{currentReason}"</Typography>
                </Box>
              )}
            </Glass>
          </Section>

          {/* Heartbeat Section */}
          <Section title="🫀 Heartbeat" icon="">
            <Glass sx={{ textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: "#6a1b9a", mb: 2 }}>Every click reveals a heartbeat moment.</Typography>
              <IconButton onClick={() => { playSynth("heartbeat"); setHbClicks((c) => (c >= 3 ? 1 : c + 1)); }}
                sx={{ bgcolor: "rgba(255,64,129,0.08)", p: 2.5, animation: "pulseHeart 1.2s infinite", "&:hover": { bgcolor: "rgba(255,64,129,0.15)" } }}>
                <FavoriteIcon sx={{ color: "#ff4081", fontSize: 44 }} />
              </IconButton>
              {hbClicks > 0 && (
                <Box sx={{ mt: 2.5, p: 2, bgcolor: "rgba(233,30,99,0.04)", borderRadius: "12px", borderLeft: "4px solid #e91e63", animation: "fadeInUp 0.4s ease" }}>
                  <Typography variant="subtitle2" fontWeight="bold" color="secondary">Heartbeat #{hbClicks}:</Typography>
                  <Typography variant="body2" sx={{ color: "#374151", mt: 0.5 }}>{hbMsgs[hbClicks - 1]}</Typography>
                </Box>
              )}
            </Glass>
          </Section>

          {/* Inside My Head */}
          <Section title="🧠 Inside My Head" icon="">
            <Glass>
              {[
                { label: "Thinking About You", val: 99.8, color: "#e91e63" },
                { label: "Missing You", val: 93, color: "#9c27b0" },
                { label: "Trying Not To Smile", val: 2, color: "#ff9800" },
                { label: "Successfully Not Smiling", val: 0, color: "#4caf50" },
              ].map((s) => (
                <Box key={s.label} sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                    <Typography variant="body2" fontWeight="bold">{s.label}</Typography>
                    <Typography variant="body2" fontWeight="bold">{s.val}%</Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={s.val}
                    sx={{ height: 7, borderRadius: 4, bgcolor: "rgba(0,0,0,0.04)", "& .MuiLinearProgress-bar": { bgcolor: s.color, borderRadius: 4 } }} />
                </Box>
              ))}
            </Glass>
          </Section>

          {/* Night Sky */}
          <Section title="🌙 The Night Sky" icon="" dark>
            <Box sx={{ width: "100%", height: 220, position: "relative", overflow: "hidden" }}>
              {starData.map((s) => (
                <IconButton key={s.id} onClick={() => { playSynth("click"); setStarMsg(s.text); }}
                  sx={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%`, color: "#ffd54f", animation: "twinkle 2s infinite alternate" }}>
                  <StarIcon sx={{ fontSize: 16 }} />
                </IconButton>
              ))}
              {!hearts.includes(3) && (
                <IconButton onClick={() => findHeart(3)} sx={{ position: "absolute", bottom: 6, left: 6, color: "rgba(255,255,255,0.1)" }}>
                  <FavoriteIcon sx={{ fontSize: 12 }} />
                </IconButton>
              )}
              {starMsg && (
                <Box sx={{ position: "absolute", bottom: 15, left: "5%", width: "90%", bgcolor: "rgba(255,255,255,0.92)", p: 1.5, borderRadius: "10px", textAlign: "center", animation: "fadeInUp 0.3s ease" }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: "#4a148c" }}>⭐ {starMsg}</Typography>
                </Box>
              )}
            </Box>
          </Section>

          {/* If I Could Freeze Time */}
          <Section title="⏸️ If I Could Freeze Time" icon="">
            {FREEZE_MOMENTS.map((m, i) => (
              <Glass key={i} sx={{ mb: 2, borderLeft: "4px solid #ff9800" }}>
                <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>"{m}"</Typography>
              </Glass>
            ))}
          </Section>

          {/* Butterfly Effect */}
          <Section title="🦋 The Butterfly Effect" icon="">
            <Grid container spacing={2} sx={{ maxWidth: 560 }}>
              <Grid item xs={12} sm={6}>
                <Glass sx={{ bgcolor: "rgba(0,0,0,0.02)", borderLeft: "4px solid #9e9e9e" }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#757575", mb: 1 }}>Without Kuttymaa:</Typography>
                  <Typography variant="body2" sx={{ color: "#888" }}>
                    • Same boring routine<br />• Quiet notifications<br />• Dreams with no one to share
                  </Typography>
                </Glass>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Glass sx={{ borderLeft: "4px solid #e91e63" }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#d81b60", mb: 1 }}>With Kuttymaa:</Typography>
                  <Typography variant="body2" sx={{ color: "#374151" }}>
                    • More smiles, laughter at nothing<br />• Every notification is exciting<br />• Every dream includes you
                  </Typography>
                </Glass>
              </Grid>
            </Grid>
          </Section>

          {/* Random Thought Generator */}
          <Section title="💭 Random Thought Generator" icon="">
            <Glass sx={{ textAlign: "center" }}>
              <Button variant="outlined" color="secondary" onClick={() => { playSynth("click"); setThought(thoughtsPool[Math.floor(Math.random() * thoughtsPool.length)]); }}
                sx={{ borderRadius: "18px", mb: 2 }}>
                What am I thinking right now?
              </Button>
              {thought && (
                <Box sx={{ p: 2, bgcolor: "rgba(233,30,99,0.04)", borderRadius: "10px", borderLeft: "4px solid #e91e63", animation: "fadeInUp 0.3s ease" }}>
                  <Typography variant="body2" fontStyle="italic">"{thought}"</Typography>
                </Box>
              )}
            </Glass>
          </Section>

          {/* Kuttymaa According to Different People */}
          <Section title="🎭 Kuttymaa According to..." icon="">
            <Glass>
              {[
                { role: "World", desc: "Just another girl.", accent: false },
                { role: "Friends", desc: "A great, helpful friend.", accent: false },
                { role: "Family", desc: "A sweet daughter.", accent: false },
                { role: "Me", desc: "My favorite person. My home.", accent: true },
              ].map((p) => (
                <Box key={p.role} sx={{ display: "flex", justifyContent: "space-between", py: 1.2, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: "#616161" }}>{p.role}</Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: p.accent ? "#d81b60" : "#374151" }}>{p.desc}</Typography>
                </Box>
              ))}
            </Glass>
          </Section>

          {/* Things I Hope For You */}
          <Section title="🌸 Things I Hope For You" icon="">
            <Grid container spacing={2} sx={{ maxWidth: 560 }}>
              {[
                "I hope you become everything you've dreamed of.",
                "I hope you never lose your beautiful smile.",
                "I hope you learn how amazing you truly are.",
                "I hope life is always gentle with your heart.",
              ].map((wish, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Glass sx={{ borderLeft: "4px solid #ba68c8" }}>
                    <Typography variant="body2" sx={{ color: "#374151" }}>{wish}</Typography>
                  </Glass>
                </Grid>
              ))}
            </Grid>
          </Section>
        </Container>
      )}

      {/* ═══════════════════════════════════
         TAB 2 — PLAY (Games & Puzzles)
         ═══════════════════════════════════ */}
      {activeTab === 2 && (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* ARCADE */}
          <Section title="👾 KUTTYMAA ARCADE" icon="">
            <Card sx={{
              p: 3, borderRadius: "20px", background: "rgba(15,5,25,0.94)", color: "#fff",
              border: "2px solid #ff4081", boxShadow: "0 12px 36px rgba(255,64,129,0.25)",
              width: "100%", maxWidth: 560, textAlign: "center",
            }}>
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 3, flexWrap: "wrap" }}>
                <Button size="small" variant="contained" color="secondary"
                  onClick={() => { setArcadeMode("catch"); setCatchScore(0); setBasketX(50); setFallingHearts([]); playSynth("click"); }}>
                  Catch Hearts 🧺
                </Button>
                <Button size="small" variant="contained" color="secondary" onClick={startMemory}>
                  Memory Match 🧩
                </Button>
                <Button size="small" variant="contained" color="secondary"
                  onClick={() => { setArcadeMode("quiz"); setQStep(0); setQScore(0); setQFb(""); setQDone(false); playSynth("click"); }}>
                  Quiz ❓
                </Button>
              </Box>

              {/* CATCH */}
              {arcadeMode === "catch" && (
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#ffd54f", mb: 1 }}>Score: {catchScore}/10</Typography>
                  <Box sx={{ width: "100%", height: 200, bgcolor: "#111", borderRadius: "10px", position: "relative", overflow: "hidden", border: "1px solid #333" }}>
                    {catchScore >= 10 ? (
                      <Box sx={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="h6" color="secondary" fontWeight="bold">🏆 Winner!</Typography>
                        <Typography variant="caption" sx={{ color: "#ffd54f", mt: 1 }}>"You caught every heart! But you already had mine." ❤️</Typography>
                      </Box>
                    ) : (
                      <>
                        {fallingHearts.map((h) => <FavoriteIcon key={h.id} sx={{ position: "absolute", left: `${h.x}%`, top: `${h.y}%`, color: "#ff4081", fontSize: 18 }} />)}
                        <Box sx={{ position: "absolute", bottom: 8, left: `${basketX}%`, transform: "translateX(-50%)", width: 46, height: 12, bgcolor: "#ffd54f", borderRadius: "4px" }} />
                      </>
                    )}
                  </Box>
                  {catchScore < 10 && (
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 1.5 }}>
                      <Button size="small" variant="outlined" onClick={() => setBasketX((x) => Math.max(x - 10, 5))} sx={{ color: "#fff", borderColor: "#555" }}>◀</Button>
                      <Button size="small" variant="outlined" onClick={() => setBasketX((x) => Math.min(x + 10, 95))} sx={{ color: "#fff", borderColor: "#555" }}>▶</Button>
                    </Box>
                  )}
                </Box>
              )}

              {/* MEMORY MATCH */}
              {arcadeMode === "memory" && (
                <Box>
                  <Typography variant="subtitle2" sx={{ color: "#ffd54f", mb: 1.5 }}>Matched: {matched.length / 2}/8</Typography>
                  <Grid container spacing={1} justifyContent="center" sx={{ maxWidth: 320, mx: "auto" }}>
                    {memCards.map((c) => {
                      const open = selCards.includes(c.id) || matched.includes(c.id);
                      return (
                        <Grid item xs={3} key={c.id}>
                          <Box onClick={() => clickCard(c.id)} sx={{
                            width: "100%", aspectRatio: "1", bgcolor: open ? "#e91e63" : "#333",
                            borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "1.5rem", cursor: "pointer", transition: "all 0.25s ease",
                            "&:hover": { transform: "scale(1.05)" },
                          }}>
                            {open ? c.val : "?"}
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                  {matched.length === memCards.length && memCards.length > 0 && (
                    <Typography variant="caption" sx={{ display: "block", mt: 2, color: "#ffd54f" }}>🎉 Perfect match! Just like us. ❤️</Typography>
                  )}
                </Box>
              )}

              {/* QUIZ */}
              {arcadeMode === "quiz" && (
                <Box>
                  {!qDone ? (
                    <>
                      <Typography variant="caption" sx={{ color: "#ff4081" }}>Q{qStep + 1}/3</Typography>
                      <Typography variant="h6" fontWeight="bold" sx={{ my: 2 }}>{quizData[qStep].q}</Typography>
                      <Grid container spacing={1}>
                        {quizData[qStep].opts.map((o, i) => (
                          <Grid item xs={6} key={i}>
                            <Button fullWidth variant="outlined" onClick={() => answerQuiz(i)} disabled={!!qFb}
                              sx={{ color: "#fff", borderColor: "#555", textTransform: "none" }}>{o}</Button>
                          </Grid>
                        ))}
                      </Grid>
                      {qFb && <Typography sx={{ mt: 2, color: "#ffd54f", fontStyle: "italic" }}>{qFb}</Typography>}
                    </>
                  ) : (
                    <Box>
                      <EmojiEventsIcon sx={{ fontSize: 50, color: "#ffd54f", mb: 1 }} />
                      <Typography variant="h6" sx={{ color: "#ffd54f" }}>Score: {qScore}/3</Typography>
                      <Typography variant="body2" sx={{ color: "#ccc", mt: 1 }}>Regardless of score, you have 100% of my love. ❤️</Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Card>
          </Section>

          {/* Puzzle */}
          <Section title="🧩 Pieces of You" icon="">
            <Glass>
              <Typography variant="body2" align="center" sx={{ color: "#616161", mb: 2 }}>Click each trait to piece together who you are to me.</Typography>
              <Grid container spacing={1.5}>
                {PUZZLE_PIECES.map((p) => {
                  const done = solved.includes(p.key);
                  return (
                    <Grid item xs={6} sm={4} key={p.key}>
                      <Button fullWidth variant={done ? "contained" : "outlined"} color="secondary"
                        onClick={() => { if (!done) { playSynth("click"); setSolved([...solved, p.key]); } }}
                        sx={{ p: 1.5, borderRadius: "12px", textTransform: "none", flexDirection: "column", minHeight: 70 }}>
                        <Typography variant="subtitle2" fontWeight="bold">{p.label}</Typography>
                        {done && <Typography variant="caption" sx={{ mt: 0.5, fontSize: "0.65rem", opacity: 0.9 }}>{p.detail}</Typography>}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
              {solved.length === PUZZLE_PIECES.length && (
                <Box sx={{ mt: 2.5, p: 2, textAlign: "center", bgcolor: "rgba(233,30,99,0.04)", borderRadius: "10px", border: "1px dashed #e91e63", animation: "fadeInUp 0.5s ease" }}>
                  <Typography variant="h6" color="secondary" fontWeight="bold">🧩 "This is the girl I fell in love with."</Typography>
                </Box>
              )}
            </Glass>
          </Section>

          {/* Things Kuttymaa Does */}
          <Section title="😂 Things Kuttymaa Does" icon="">
            <Glass>
              {[
                "Says 'I'm fine' when not fine at all.",
                "Overthinking Level: Expert 🧠",
                "Starts arguments with imaginary scenarios.",
                "Pretends not to be cute (but fails miserably).",
              ].map((item, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.2, p: 1.2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: "8px" }}>
                  <FavoriteIcon sx={{ color: "#ff4081", fontSize: 14 }} />
                  <Typography variant="body2" sx={{ color: "#374151" }}>{item}</Typography>
                </Box>
              ))}
            </Glass>
          </Section>

          {/* Relationship Statistics */}
          <Section title="📊 Relationship Statistics" icon="">
            <Glass>
              {[
                { label: "Hours spent talking", val: "∞" },
                { label: "Good morning texts sent", val: "480+" },
                { label: "Times she said 'I'm angry'", val: "87 😂" },
                { label: "Times she made me smile", val: "Every. Single. Day." },
                { label: "Days she occupied my mind", val: "100%" },
              ].map((s) => (
                <Box key={s.label} sx={{ display: "flex", justifyContent: "space-between", py: 1, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <Typography variant="body2" sx={{ color: "#616161" }}>{s.label}</Typography>
                  <Typography variant="body2" fontWeight="bold" sx={{ color: "#d81b60" }}>{s.val}</Typography>
                </Box>
              ))}
            </Glass>
          </Section>

          {/* If You Could Hear My Thoughts */}
          <Section title="🎤 If You Could Hear My Thoughts" icon="">
            <Glass>
              <Typography variant="body2" align="center" sx={{ color: "#616161", mb: 2 }}>Things I've thought but never said out loud.</Typography>
              {[
                "Sometimes I scroll back to our oldest chats just to smile and relive how we started.",
                "Whenever a love song plays, my brain immediately paints a picture of you.",
                "I often pause and wonder how I got so incredibly lucky to find you.",
              ].map((t, i) => (
                <Box key={i} sx={{ p: 2, mb: 1.5, bgcolor: "rgba(233,30,99,0.03)", borderRadius: "10px", borderLeft: "3px solid #ba68c8" }}>
                  <Typography variant="body2" sx={{ color: "#374151", fontStyle: "italic" }}>"{t}"</Typography>
                </Box>
              ))}
            </Glass>
          </Section>
        </Container>
      )}

      {/* ═══════════════════════════════════
         TAB 3 — VAULT (Gifts, Secrets, Finale)
         ═══════════════════════════════════ */}
      {activeTab === 3 && (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Vault of Secrets */}
          {!vaultOpen ? (
            <Section title="🔐 The Vault of Secrets" icon="">
              <Glass sx={{ textAlign: "center" }}>
                <LockIcon sx={{ fontSize: 50, color: "#d81b60", mb: 1.5 }} />
                <Typography variant="body2" sx={{ color: "#616161", mb: 2 }}>Password Hint: "The nickname only I call you."</Typography>
                <TextField fullWidth variant="outlined" placeholder="Enter Password" size="small"
                  value={vaultPw} onChange={(e) => setVaultPw(e.target.value)}
                  error={vaultErr} helperText={vaultErr ? "Wrong password. Think sweet!" : ""}
                  onKeyDown={(e) => { if (e.key === "Enter") { if (vaultPw.trim().toLowerCase() === "kuttymaa") { setVaultOpen(true); setVaultErr(false); playSynth("unlock"); } else { setVaultErr(true); playSynth("click"); } } }}
                  sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.4)", borderRadius: "10px" }} />
                <Button fullWidth variant="contained" color="secondary" sx={{ borderRadius: "18px" }}
                  onClick={() => { if (vaultPw.trim().toLowerCase() === "kuttymaa") { setVaultOpen(true); setVaultErr(false); playSynth("unlock"); } else { setVaultErr(true); playSynth("click"); } }}>
                  Unlock Vault
                </Button>
              </Glass>
            </Section>
          ) : (
            <Section title="" icon="">
              <Glass sx={{ border: "2px solid #e91e63", animation: "fadeInUp 0.6s ease" }}>
                <Box sx={{ textAlign: "center", mb: 2.5 }}>
                  <LockOpenIcon sx={{ fontSize: 44, color: "#4caf50", mb: 1 }} />
                  <Typography variant="h5" fontWeight="bold" sx={{ color: "#c2185b" }}>Welcome, Kuttymaa.</Typography>
                  <Typography variant="body2" color="text.secondary">These are the things I've never had the courage to say.</Typography>
                </Box>
                {[
                  { title: "❤️ When I First Fell For You", text: "It wasn't a sudden movie scene. It was during that second week, when you randomly sent me a silly joke. I was laughing so hard, and I realized I didn't care about anything else except making sure you were smiling too." },
                  { title: "🥺 What Scares Me About Losing You", text: "You've become my home. The thought of waking up without your notification, or not hearing your silly laugh, scares me more than anything. I want to protect us forever." },
                  { title: "👑 What I Admire Most", text: "Your pure, kind heart. You support everyone around you with so much patience, even when you're struggling yourself. You inspire me to be a kinder human being every single day." },
                ].map((s) => (
                  <Box key={s.title} sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#880e4f" }}>{s.title}</Typography>
                    <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.7, mt: 0.5 }}>{s.text}</Typography>
                  </Box>
                ))}
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Button size="small" variant="outlined" color="secondary" onClick={() => setVaultOpen(false)} sx={{ borderRadius: "16px" }}>Lock Vault</Button>
                </Box>
              </Glass>
            </Section>
          )}

          {/* Love Coupons */}
          <Section title="🎟️ Love Coupons" icon="">
            <Grid container spacing={2} sx={{ maxWidth: 560 }}>
              {coupons.map((c) => {
                const used = redeemed.includes(c.id);
                return (
                  <Grid item xs={12} sm={6} key={c.id}>
                    <Card sx={{
                      p: 2.5, borderRadius: "14px", bgcolor: "rgba(255,255,255,0.82)",
                      border: `2px dashed ${c.color}`, textAlign: "center", position: "relative",
                    }}>
                      <Typography variant="caption" fontWeight="bold" sx={{ color: c.color, letterSpacing: 1 }}>COUPON</Typography>
                      <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#374151", my: 1 }}>{c.title}</Typography>
                      <Button size="small" variant={used ? "contained" : "outlined"} disabled={used}
                        onClick={() => { playSynth("stamp"); setRedeemed([...redeemed, c.id]); }}
                        sx={{ borderRadius: "14px", borderColor: c.color, color: used ? "#fff" : c.color, bgcolor: used ? "#9e9e9e" : "transparent" }}>
                        {used ? "REDEEMED 💖" : "Redeem"}
                      </Button>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Section>

          {/* Open When Letters */}
          <Section title="💌 Open When... Letters" icon="">
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, justifyContent: "center", maxWidth: 560 }}>
              {OPEN_WHEN.map((ow, i) => (
                <Button key={i} onClick={() => { playSynth("click"); setOwIdx(i); }}
                  sx={{
                    borderRadius: "12px", px: 2, py: 1.5, minWidth: 150,
                    background: ow.bg, color: "#fff", fontWeight: "bold",
                    textTransform: "none", fontSize: "0.8rem",
                    boxShadow: `0 6px 18px ${ow.color}44`,
                    transition: "all 0.3s ease",
                    "&:hover": { transform: "translateY(-3px)", boxShadow: `0 10px 28px ${ow.color}66` },
                    flexDirection: "column", gap: 0.5,
                  }}>
                  <span style={{ fontSize: "1.5rem" }}>{ow.emoji}</span>
                  {ow.label}
                </Button>
              ))}
            </Box>
          </Section>

          {/* Emergency Kit */}
          <Section title="📦 Emergency Kuttymaa Kit" icon="">
            <Glass>
              <Grid container spacing={1.5}>
                {[
                  { label: "When Sad 🥺", msg: "🫂 Virtual Hug: Close your eyes and imagine me holding you tight. You are not alone. I love you." },
                  { label: "When Angry 😤", msg: "🍫 Digital Chocolate: I owe you your favorite chocolate. Redeemable immediately when we meet!" },
                  { label: "When Missing Me 📞", msg: "📞 Instant Call: Use this coupon to call me anytime, no matter what I'm doing." },
                  { label: "When Overthinking 🧠", msg: "💌 Reassurance: I choose you. Every day. Your fears are not real. You are my home." },
                ].map((k, i) => (
                  <Grid item xs={6} key={i}>
                    <Button fullWidth variant="outlined" color="secondary"
                      onClick={() => { playSynth("click"); setKitMsg(k.msg); }}
                      sx={{ p: 1.5, borderRadius: "10px", textTransform: "none", height: "100%", fontSize: "0.8rem" }}>
                      {k.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              {kitMsg && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "rgba(233,30,99,0.04)", borderRadius: "10px", border: "1px dashed #e91e63", animation: "fadeInUp 0.3s ease" }}>
                  <Typography variant="body2" sx={{ color: "#374151" }}>{kitMsg}</Typography>
                </Box>
              )}
            </Glass>
          </Section>

          {/* Terms & Conditions */}
          <Section title="📜 Terms & Conditions of Loving Kuttymaa" icon="">
            <Glass>
              {[
                { art: "Article 1", text: "Must remind her she's pretty, even when she completely disagrees." },
                { art: "Article 2", text: "Must survive and cherish occasional tiny storms of temper." },
                { art: "Article 3", text: "Must listen to random stories with undivided enthusiasm." },
                { art: "Article 4", text: "Must love her unconditionally, today, tomorrow, and forever." },
              ].map((a) => (
                <Typography key={a.art} variant="body2" sx={{ mb: 1, color: "#374151" }}>
                  <strong>{a.art}:</strong> {a.text}
                </Typography>
              ))}
              <Typography variant="body2" sx={{ color: "#c2185b", fontWeight: "bold", mt: 1 }}>Agreement Expires: NEVER.</Typography>
              <Button fullWidth variant={signed ? "contained" : "outlined"} color="secondary" disabled={signed}
                onClick={() => { playSynth("stamp"); setSigned(true); }}
                sx={{ mt: 2, borderRadius: "18px" }}>
                {signed ? "Signed & Sealed ✍️❤️" : "Agree & Sign Contract"}
              </Button>
            </Glass>
          </Section>

          {/* Alternate Universes */}
          <Section title="🌍 Alternate Universes" icon="">
            <Glass sx={{ textAlign: "center" }}>
              {[
                { u: "Universe 1", text: "We never met.", color: "#999" },
                { u: "Universe 2", text: "We met but never talked.", color: "#999" },
                { u: "Universe 3", text: "We talked but never became close.", color: "#999" },
              ].map((u) => (
                <Typography key={u.u} variant="body2" sx={{ mb: 0.8, color: u.color }}>{u.u}: {u.text}</Typography>
              ))}
              <Typography variant="body1" sx={{ color: "#e91e63", fontWeight: "bold", mt: 1.5 }}>
                This Universe ❤️: The one where you're reading this. The only one I want.
              </Typography>
            </Glass>
          </Section>

          {/* Missed Calls */}
          <Section title="📞 Missed Calls From My Heart" icon="">
            {[
              { time: "2:17 AM", reason: "Thinking about you again." },
              { time: "5:43 PM", reason: "Saw something that reminded me of you." },
            ].map((c, i) => (
              <Glass key={i} sx={{ mb: 1.5, display: "flex", alignItems: "center", gap: 2, borderLeft: "4px solid #ff4081" }}>
                <NotificationsIcon sx={{ color: "#ff4081" }} />
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold" color="secondary">Missed Call ({c.time})</Typography>
                  <Typography variant="caption" color="text.secondary">Reason: {c.reason}</Typography>
                </Box>
              </Glass>
            ))}
          </Section>

          {/* Message From Future Me */}
          <Section title="⏳ Message From Future Me" icon="">
            <Glass sx={{ borderLeft: "4px solid #ffd54f" }}>
              <Typography variant="caption" sx={{ color: "#8e24aa", fontWeight: "bold" }}>Date: June 13, 2030</Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#374151", fontStyle: "italic", lineHeight: 1.7 }}>
                "Hey Kuttymaa, We still laugh at the same silly things. We still annoy each other. And somehow, I still fall in love with you every single day. Happy Birthday."
              </Typography>
            </Glass>
          </Section>

          {/* Future Timeline */}
          <Section title="🗺️ Future Timeline" icon="">
            {[
              { year: "2026 🌸", goal: "First trip together — wherever we go becomes our favorite place." },
              { year: "2027 🏡", goal: "Building our dream home filled with warmth and laughter." },
              { year: "2028 ✨", goal: "More adventures, more memories, more of everything together." },
            ].map((f, i) => (
              <Glass key={i} sx={{ mb: 1.5, borderLeft: "4px solid #4fc3f7" }}>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#0277bd" }}>{f.year}</Typography>
                <Typography variant="body2" sx={{ color: "#374151", mt: 0.5 }}>{f.goal}</Typography>
              </Glass>
            ))}
          </Section>

          {/* Chat Recreations */}
          <Section title="💬 Chat Recreations" icon="">
            <Box sx={{ maxWidth: 420, width: "100%", display: "flex", flexDirection: "column", gap: 1.5 }}>
              {[
                { me: true, text: "Hey... can I tell you a secret nickname?" },
                { me: false, text: "Haha sure, what is it? 😂" },
                { me: true, text: "I'll call you Kuttymaa. The nickname only I call you." },
                { me: false, text: "Aww, I love it. ❤️" },
              ].map((m, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: m.me ? "flex-end" : "flex-start" }}>
                  <Box sx={{
                    p: 1.5, borderRadius: "14px", maxWidth: "78%",
                    bgcolor: m.me ? "#e91e63" : "#fff", color: m.me ? "#fff" : "#374151",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}>
                    <Typography variant="caption" sx={{ display: "block", fontWeight: "bold", mb: 0.3, color: m.me ? "rgba(255,255,255,0.7)" : "#7b1fa2", fontSize: "0.65rem" }}>
                      {m.me ? "Me" : "Kuttymaa"}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{m.text}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Section>

          {/* End Credits */}
          <Section title="" icon="" dark>
            <Typography variant="h6" sx={{ color: "#ff4081", mb: 2.5, letterSpacing: 2, textAlign: "center" }}>🎬 END CREDITS</Typography>
            {[
              { role: "Directed By", name: "Destiny" },
              { role: "Main Character", name: "Kuttymaa" },
              { role: "Supporting Character", name: "Me (Prasanth)" },
              { role: "Genre", name: "Romance" },
              { role: "Status", name: "Still Running ❤️" },
            ].map((c) => (
              <Box key={c.role} sx={{ display: "flex", justifyContent: "space-between", py: 0.8, borderBottom: "1px solid rgba(255,255,255,0.08)", maxWidth: 360, width: "100%", mx: "auto" }}>
                <Typography variant="caption" sx={{ color: "#aaa" }}>{c.role}</Typography>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: "#fff" }}>{c.name}</Typography>
              </Box>
            ))}
          </Section>

          {/* FINAL SURPRISE TRIGGER */}
          <Box sx={{ textAlign: "center", mt: 3, mb: 4 }}>
            <Typography variant="caption" sx={{ display: "block", color: "#9e9e9e", mb: 2, letterSpacing: 1 }}>
              Scroll down... one last thing awaits
            </Typography>
            <Button variant="contained" color="secondary"
              onClick={() => { playSynth("unlock"); setShowFinal(true); setFinalStep(0); }}
              sx={{ borderRadius: "26px", px: 4, py: 1.5, fontSize: "1rem", animation: "pulseHeart 1.5s infinite" }}>
              🎁 One Final Surprise
            </Button>
          </Box>

          {/* Hidden scavenger hearts */}
          {!hearts.includes(4) && (
            <IconButton onClick={() => findHeart(4)} sx={{ color: "rgba(0,0,0,0.03)", mx: "auto", display: "block" }}>
              <FavoriteIcon sx={{ fontSize: 12 }} />
            </IconButton>
          )}
          {!hearts.includes(5) && (
            <IconButton onClick={() => findHeart(5)} sx={{ color: "rgba(0,0,0,0.02)", position: "absolute", bottom: 90, left: 8 }}>
              <FavoriteIcon sx={{ fontSize: 10 }} />
            </IconButton>
          )}
        </Container>
      )}

      {/* ═══════════════════════════════════
         DIALOGS
         ═══════════════════════════════════ */}

      {/* Open When Dialog */}
      <Dialog open={owIdx !== null} onClose={() => setOwIdx(null)}
        slotProps={{ paper: { sx: { borderRadius: "18px", p: 0, maxWidth: 400, width: "90%", overflow: "hidden" } } }}>
        {owIdx !== null && (
          <>
            <Box sx={{ background: OPEN_WHEN[owIdx].bg, py: 3.5, px: 3, textAlign: "center", position: "relative" }}>
              <IconButton onClick={() => setOwIdx(null)} sx={{ position: "absolute", top: 8, right: 8, color: "rgba(255,255,255,0.7)" }}>
                <CloseIcon />
              </IconButton>
              <Typography sx={{ fontSize: "3rem", mb: 1 }}>{OPEN_WHEN[owIdx].emoji}</Typography>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "#fff" }}>{OPEN_WHEN[owIdx].label}</Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" sx={{ color: "#374151", lineHeight: 1.7 }}>{OPEN_WHEN[owIdx].text}</Typography>
              <Button fullWidth variant="outlined" color="secondary" onClick={() => setOwIdx(null)} sx={{ mt: 2.5, borderRadius: "14px" }}>
                Close Envelope
              </Button>
            </Box>
          </>
        )}
      </Dialog>

      {/* Scavenger Hunt Won Dialog */}
      <Dialog open={huntDone} onClose={() => setHuntDone(false)}
        slotProps={{ paper: { sx: { borderRadius: "18px", p: 4, textAlign: "center", maxWidth: 380 } } }}>
        <EmojiEventsIcon sx={{ fontSize: 55, color: "#ffd54f", mx: "auto", mb: 1.5 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ color: "#c2185b", mb: 1 }}>All Hearts Found! ❤️</Typography>
        <Typography variant="body2" sx={{ color: "#616161", mb: 2.5 }}>You found every hidden heart. But you've already held all of mine.</Typography>
        <Button variant="contained" color="secondary" onClick={() => setHuntDone(false)} sx={{ borderRadius: "18px" }}>I Love You Too</Button>
      </Dialog>

      {/* ═══════════════════════════════════
         ULTIMATE TYPEWRITER SURPRISE
         ═══════════════════════════════════ */}
      {showFinal && (
        <Box sx={{
          position: "fixed", inset: 0, bgcolor: "#000", zIndex: 9999,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          color: "#fff", p: 4, textAlign: "center",
        }}>
          <IconButton onClick={() => setShowFinal(false)}
            sx={{ position: "absolute", top: 16, right: 16, color: "rgba(255,255,255,0.3)", "&:hover": { color: "#fff" } }}>
            <CloseIcon sx={{ fontSize: 28 }} />
          </IconButton>

          <Box sx={{ maxWidth: 600 }}>
            {finalStep >= 1 && <Typography variant="h6" sx={{ fontStyle: "italic", mb: 2.5, animation: "fadeInUp 1s", color: "#aaa" }}>One last thing...</Typography>}
            {finalStep >= 2 && <Typography variant="body1" sx={{ color: "#888", mb: 1.5, animation: "fadeInUp 1s" }}>I could write thousands of words about you.</Typography>}
            {finalStep >= 3 && <Typography variant="body1" sx={{ color: "#888", mb: 1.5, animation: "fadeInUp 1s" }}>I could fill pages with memories.</Typography>}
            {finalStep >= 4 && <Typography variant="body1" sx={{ color: "#888", mb: 2.5, animation: "fadeInUp 1s" }}>I could spend hours explaining why I love you.</Typography>}
            {finalStep >= 5 && <Typography variant="body2" sx={{ color: "#ff4081", fontWeight: "bold", mb: 3, animation: "fadeInUp 1s" }}>But if I had to summarize everything in one sentence...</Typography>}
            {finalStep >= 6 && (
              <Typography variant="h3" fontWeight="bold" sx={{
                fontFamily: "'Pacifico',cursive", color: "#ff4081",
                fontSize: { xs: "1.8rem", md: "3.2rem" },
                animation: "pulseHeart 1.5s infinite", lineHeight: 1.3, mb: 3,
              }}>
                "Meeting you was the best thing that ever happened to me."
              </Typography>
            )}
            {finalStep >= 7 && (
              <Typography variant="h5" sx={{ color: "#ba68c8", animation: "fadeInUp 1s", mb: 2, fontSize: { xs: "1.1rem", md: "1.6rem" } }}>
                Happy Birthday, Kuttymaa ❤️
              </Typography>
            )}
            {finalStep >= 8 && (
              <Typography variant="caption" sx={{ color: "#555", animation: "fadeInUp 1.5s", position: "absolute", bottom: 25 }}>
                Not the end of our story. See you in our next chapter... ✨
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* ═══════════════════════════════════
         GLOBAL KEYFRAMES
         ═══════════════════════════════════ */}
      <style>{`
        @keyframes bgShift {
          0%{background-position:0% 50%}
          50%{background-position:100% 50%}
          100%{background-position:0% 50%}
        }
        @keyframes pulseHeart {
          0%{transform:scale(1)}
          50%{transform:scale(1.08)}
          100%{transform:scale(1)}
        }
        @keyframes spin {
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }
        @keyframes fadeInUp {
          from{opacity:0;transform:translateY(16px)}
          to{opacity:1;transform:translateY(0)}
        }
        @keyframes confettiFall {
          0%{transform:translateY(0) rotate(0deg);opacity:1}
          100%{transform:translateY(110vh) rotate(360deg);opacity:0}
        }
        @keyframes twinkle {
          0%{opacity:0.4;transform:scale(0.8)}
          100%{opacity:1;transform:scale(1.15)}
        }
        @keyframes rainFall {
          0%{transform:translateY(0) rotate(0deg);opacity:0}
          10%{opacity:1}
          90%{opacity:1}
          100%{transform:translateY(120vh) rotate(360deg);opacity:0}
        }
      `}</style>
    </Box>
  );
}
