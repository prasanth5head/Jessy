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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CakeIcon from "@mui/icons-material/Cake";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

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
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const letterAudioRef = useRef(null);
  const surpriseAudioRef = useRef(null);

  const handleVideoPlay = () => {
    if (isPlaying) {
      setWasMusicPlaying(true);
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setWasMusicPlaying(false);
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
    if (isPlaying) {
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
              onClick={() => {
                setOpenVideoSurprise(true);
              }}
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
        `}
      </style>
    </Box>
  );
}
