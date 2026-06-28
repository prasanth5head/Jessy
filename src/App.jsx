/* eslint-disable no-unused-vars, react-hooks/exhaustive-deps */
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
import galleryData from "./galleryData.json";

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
    img: "/image/IMG-20250709-WA0004.jpg",
    date: "A sweet little moment",
    story: "One of those pictures that instantly brings a smile to my face.",
    joke: "You always had the cutest expression 😍",
  },
  {
    img: "/image/IMG-20250709-WA0005.jpg",
    date: "A favorite memory",
    story: "Every time I see this, I remember how effortlessly beautiful it felt.",
    joke: "Still not over how good this picture looks 💖",
  },
  {
    img: "/image/IMG-20250712-WA0011.jpg",
    date: "Pure joy",
    story: "A little burst of happiness captured in the best way.",
    joke: "You were glowing and I was trying not to stare 😌",
  },
  {
    img: "/image/IMG-20250712-WA0012.jpg",
    date: "A tiny treasure",
    story: "Some memories are small, but they stay with you forever.",
    joke: "This one is way too pretty to keep to myself 📸",
  },
  {
    img: "/image/IMG-20250712-WA0013.jpg",
    date: "Bright and beautiful",
    story: "A reminder that joy can be found in the simplest moments.",
    joke: "The lighting was honestly unfair ✨",
  },
  {
    img: "/image/IMG-20250712-WA0014.jpg",
    date: "Soft and sweet",
    story: "The kind of moment that feels calm, warm, and unforgettable.",
    joke: "You make everything look extra lovely 🌸",
  },
  {
    img: "/image/IMG-20250712-WA0017.jpg",
    date: "Little spark",
    story: "A tiny piece of happiness I never want to lose.",
    joke: "That smile still melts me every time 😘",
  },
  {
    img: "/image/IMG-20250712-WA0018.jpg",
    date: "Golden memory",
    story: "Some pictures feel like they carry a whole feeling with them.",
    joke: "This one feels like sunshine and hearts 💛",
  },
  {
    img: "/image/IMG-20250712-WA0019.jpg",
    date: "Sweet surprise",
    story: "A memory that makes me smile without even trying.",
    joke: "You always know how to make things beautiful 🥰",
  },
  {
    img: "/image/IMG-20250712-WA0020.jpg",
    date: "Forever glowing",
    story: "The way this picture feels is exactly why I keep it close.",
    joke: "You are the definition of beautiful 💕",
  },
  {
    img: "/image/IMG-20250712-WA0021.jpg",
    date: "Just us",
    story: "Simple, genuine, and full of warmth.",
    joke: "This one says everything without saying much 😊",
  },
  {
    img: "/image/IMG-20250712-WA0022.jpg",
    date: "My favorite kind of memory",
    story: "A picture that feels like comfort and happiness all at once.",
    joke: "You make even ordinary moments feel magical ✨",
  },
  {
    img: "/image/IMG-20250712-WA0023.jpg",
    date: "Always cherished",
    story: "A beautiful little snapshot I will always treasure.",
    joke: "I could look at this forever and never get bored 💖",
  },
  {
    img: "/image/IMG-20250805-WA0004.jpg",
    date: "Forever favorite",
    story: "The kind of picture that feels like a warm memory every time you look at it.",
    joke: "You make every frame feel special ✨",
  },
  {
    img: "/image/IMG-20260423-WA0013.jpg",
    date: "A little extra sparkle",
    story: "One more beautiful memory to keep close.",
    joke: "This one is just too cute to leave out 💫",
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
  { label: "Open when you're sad 🥺", color: "#5c6bc0", gradient: "linear-gradient(135deg,#5c6bc0,#9575cd)", src: "/Voice Note/sad.ogg", message: "Hey... I know things feel heavy right now. But I need you to know — you are not alone. Not even for a second. I'm right here, always. You're stronger than you think, and this feeling will pass. I love you so much. 💙" },
  { label: "Open when you miss me 💖", color: "#e91e63", gradient: "linear-gradient(135deg,#e91e63,#f48fb1)", src: "/Voice Note/Missyou.ogg", message: "Missing me? Good. That means something real is there. 😄 Close your eyes — I'm closer than you think. Every memory we made is just proof that the best ones are still ahead. I miss you too, always. ❤️" },
  { label: "Open when you're crying 😭", color: "#00acc1", gradient: "linear-gradient(135deg,#00acc1,#26c6da)", src: "/Voice Note/cry.ogg", message: "I know it hurts. You can let it out — I'm with you in every tear. You're never alone, and your feelings always matter. Take your time, breathe, and know I'm holding you close. 💙" },
  { label: "Open when you need a smile 😊", color: "#f57c00", gradient: "linear-gradient(135deg,#f57c00,#ffb74d)", src: "/Voice Note/Happy.ogg", message: "Okay, stop whatever you're doing and just smile. Right now. Yes, really. 😄 Because you have the most beautiful smile in the world and it deserves to be seen. Everything's going to be okay. I promise. 🌟" },
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
  { id: "doubting", label: "Open when you're doubting yourself 🥺💫", emoji: "💫", color: "#6a1b9a", bg: "linear-gradient(135deg, #6a1b9a, #ab47bc)", content: "Stop doubting your magic. You are one of the smartest, most beautiful, and kindest souls I have ever met. You handle things with grace even when it's hard. I believe in you even when you can't. You've got this, my star. ✨" },
  { id: "cant-sleep", label: "Open when you can't sleep 🌙💤", emoji: "🌙", color: "#0d47a1", bg: "linear-gradient(135deg, #0d47a1, #1976d2)", content: "Can't sleep? Close your eyes and imagine resting your head on my shoulder. I'm whispering to you how much you mean to me. Take deep breaths. Let go of today's thoughts. I'm holding you tight. Goodnight, my love." },
  { id: "happy", label: "Open when you're happy 😄🎉", emoji: "🎉", color: "#ffd54f", bg: "linear-gradient(135deg, #fbc02d, #fdd835)", content: "Yay! Seeing you happy is my absolute favorite thing in the world! Keep that gorgeous smile on your face and spread your beautiful energy. Tell me all about it, I want to celebrate your happiness with you!" },
  { id: "crying", label: "Open when you're crying 😭🫂", emoji: "🫂", color: "#00acc1", bg: "linear-gradient(135deg, #00838f, #00acc1)", content: "I wish I could be there to wipe your tears. It's okay to let it out. Don't bottle it up. You are safe with me. Cry as much as you need to, and when you're ready, I'm here to make you laugh again. You are incredibly loved." }
];

// --- NEW DH INTERACTIVE HUB DATA ---
const REASONS_I_LOVE_YOU = [
  "Because you say 'hmm' before answering my questions when you're thinking.",
  "Because your laugh starts small and then becomes completely uncontrollable.",
  "Because you remember the tiniest details about things I said weeks ago.",
  "Because you pretend to be angry but still check if I ate my food.",
  "Because you send a message and somehow my worst moods disappear instantly.",
  "Because you overthink things simply because you care so deeply.",
  "Because you make ordinary, boring days feel incredibly special and important.",
  "Because you get defensive about your height when I tease you about it.",
  "Because you have a signature pout that melts my heart in a millisecond.",
  "Because you read old chats just to relive those sweet moments.",
  "Because you send me screenshots of random things that remind you of me.",
  "Because you try to hide your smile when I compliment you, but your eyes give it away.",
  "Because you make sleepy, half-awake voice notes that are the cutest things ever.",
  "Because you always make sure I'm safe when I'm traveling.",
  "Because you have an imaginary scenario argument list ready at all times.",
  "Because you support my dreams even when they seem completely wild.",
  "Because you look absolutely beautiful when you don't even realize it.",
  "Because you play with your hair when you're nervous or shy.",
  "Because you say 'I'm fine' in that specific tone that tells me everything.",
  "Because you pretend not to be cute while doing the most adorable things.",
  "Because you listen to my long, rambling stories with actual enthusiasm.",
  "Because you trust me with your deepest secrets and vulnerable thoughts.",
  "Because you're my favorite notification on my phone screen.",
  "Because you are my first and last thought of every single day.",
  "Because you look like a little kid when you get excited about food.",
  "Because you call me by that special nickname only we share.",
  "Because you hold onto my arm like you never want to let go.",
  "Because you write cute paragraphs when I least expect them.",
  "Because you have a list of terms and conditions for loving you.",
  "Because you claim you don't care, but you're actually the most caring person ever.",
  "Because you remember our special dates and anniversaries so precisely.",
  "Because you understand my silent moods without me saying a word.",
  "Because you get jealous in the most affectionate, cute way.",
  "Because you send me random selfies that make my heart race.",
  "Because you are the best plot twist in my life's story.",
  "Because you have the softest heart, even if you try to act tough.",
  "Because you make me want to be the best version of myself for you.",
  "Because you let me win the argument sometimes (even if we both know you actually won).",
  "Because you look so cute when you are sleepy and trying to stay awake for me.",
  "Because you make even simple grocery shopping feel like a fun date.",
  "Because you have a heart that belongs completely to me.",
  "Because you believe in us, even through long distances.",
  "Because you occupy 99.8% of my mind space.",
  "Because you make me feel safe, heard, and completely understood.",
  "Because you are my home and my favorite adventure all in one.",
  "Because you look so lovely in traditional wear.",
  "Because you make funny faces to make me laugh when I'm stressed.",
  "Because you choose me, day after day, through everything.",
  "Because you are my favorite person in the entire universe.",
  "Because you send a message and somehow my bad mood disappears.",
  "Because you say you're angry but still care about me.",
  "Because you make ordinary days feel important.",
  "Because you look cute when you overthink.",
  "Because you're always my favorite hello and hardest goodbye.",
  "Because you make my heart warm even in cold weather.",
  "Because your eyes sparkle when you smile.",
  "Because you have a beautiful soul that matches your face.",
  "Because you are my absolute dream come true.",
  "Because you make me feel loved every single day.",
  "Because you are the reason I smile at my phone."
];

const NETFLIX_EPISODES = [
  { id: 1, title: "Episode 1: Stranger ➔ Friend", duration: "45m", match: "98% Match", year: "2025", desc: "The season opener. One random message turns into a whole new world. Follow the sparks as casual conversations turn into midnight habits.", thoughts: "You probably thought it was a normal day. I had no idea my life was about to change.", img: "/image/WhatsApp Image 2026-06-13 at 12.19.15 AM.jpeg" },
  { id: 2, title: "Episode 2: The Late-Night Calls", duration: "55m", match: "99% Match", year: "2025", desc: "Endless calls, learning each other's secrets, and losing track of time entirely. Who fell asleep first? That remains a mystery.", thoughts: "I pretended I wasn't tired because I never wanted our conversation to end.", img: "/image/WhatsApp Image 2026-06-13 at 12.19.15 AM (2).jpeg" },
  { id: 3, title: "Episode 3: The Missing You Era", duration: "50m", match: "97% Match", year: "2025", desc: "Navigating distances, screenshots, and counting days. An emotional look at how even miles away, every text felt like a warm hug.", thoughts: "Sometimes I read old chats just to relive those moments and feel you close.", img: "/image/WhatsApp Image 2026-06-13 at 12.19.19 AM.jpeg" },
  { id: 4, title: "Episode 4: The Arguments We Survived", duration: "48m", match: "95% Match", year: "2025", desc: "Every couple has storms. A look at the misunderstandings, the 'I'm fine' texts, the apologies, and the realization that we are stronger together.", thoughts: "You probably don't remember, but I was struggling, and your random text saved my day.", img: "/image/WhatsApp Image 2026-06-13 at 12.29.00 AM.jpeg" },
  { id: 5, title: "Episode 5: My Favorite Human", duration: "60m", match: "100% Match", year: "2026", desc: "The season finale (so far). Realizing you are my safe place, my happiest memory, and the person I want to tell everything to.", thoughts: "Out of all the paths life could have taken, I'm grateful every day they led to you.", img: "/image/WhatsApp Image 2026-06-13 at 12.29.01 AM.jpeg" }
];

const LOVE_COUPONS = [
  { title: "Forehead Kiss Coupon 😘", desc: "Redeemable for one warm forehead kiss whenever you need to feel safe.", code: "KISS-FOREHEAD-999" },
  { title: "Movie Night Choice 🎬", desc: "You get to choose the movie, the snacks, and I can't complain at all.", code: "MOVIE-PREMIUM-777" },
  { title: "Win the Argument Coupon 😂", desc: "Play this card to instantly win any lighthearted argument. Single-use!", code: "ARGUMENT-WINNER-100" },
  { title: "Unlimited Hugs Session 🤗", desc: "One session of tight, comfortable hugs that last as long as you want.", code: "HUG-UNLIMITED-INF" },
  { title: "Emergency Comfort Call 📞", desc: "Redeemable at any hour of the night. I will wake up and listen.", code: "EMERGENCY-CALL-SOS" }
];

const CALENDAR_MEMORIES = {
  3: "The day we talked for 6 hours straight.",
  7: "You looked beautiful in your photo and didn't even realize it.",
  12: "We laughed for 2 hours over something that wasn't even funny.",
  19: "The anniversary date. The day our story truly began. ❤️",
  24: "You sent me a surprise message that made my entire week.",
  28: "The night I listened to your favorite song on loop thinking of you."
};

const THOUGHTS_GENERATOR_LIST = [
  "She's probably being cute right now.",
  "I should tell her I love her again.",
  "I wonder if she's smiling.",
  "She's my favorite notification.",
  "I got so incredibly lucky with her.",
  "I wish I could hug her right this second."
];

const PICKUP_LINES = [
  "Are you a magician? Because whenever I look at you, everyone else disappears. ✨",
  "Is your name Google? Because you have everything I've been searching for. 🔍",
  "Do you have a map? I keep getting lost in your eyes. 🗺️",
  "If I could rearrange the alphabet, I'd put 'U' and 'I' together. 💕",
  "Are you carbon? Because I want to build a stable bond with you. 🧪",
  "I must be in a museum, because you are a complete work of art. 🎨"
];

// --- GAME HELPER COMPONENTS ---
function CatchHeartsGame() {
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let basket = { x: canvas.width / 2 - 30, w: 60, h: 15, speed: 8 };
    let hearts = [];
    let gameScore = 0;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        basket.x = Math.max(0, basket.x - basket.speed * 2);
      } else if (e.key === "ArrowRight") {
        basket.x = Math.min(canvas.width - basket.w, basket.x + basket.speed * 2);
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        basket.x = Math.max(0, Math.min(canvas.width - basket.w, touchX - basket.w / 2));
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      basket.x = Math.max(0, Math.min(canvas.width - basket.w, mouseX - basket.w / 2));
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("mousemove", handleMouseMove);

    const spawnHeart = () => {
      hearts.push({
        x: 10 + Math.random() * (canvas.width - 20),
        y: 0,
        size: 10 + Math.random() * 10,
        speed: 2 + Math.random() * 3
      });
    };

    let spawnTimer = 0;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#ff4081";
      ctx.fillRect(basket.x, canvas.height - basket.h - 5, basket.w, basket.h);
      ctx.fillStyle = "#ffffff";
      ctx.font = "12px Outfit";
      ctx.fillText("🧺 Catch!", basket.x + 8, canvas.height - 9);

      spawnTimer++;
      if (spawnTimer > 40) {
        spawnHeart();
        spawnTimer = 0;
      }

      for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];
        heart.y += heart.speed;

        ctx.fillStyle = "#e91e63";
        ctx.beginPath();
        const size = heart.size;
        ctx.moveTo(heart.x, heart.y + size * 0.25);
        ctx.bezierCurveTo(heart.x, heart.y, heart.x - size / 2, heart.y, heart.x - size / 2, heart.y + size * 0.25);
        ctx.bezierCurveTo(heart.x - size / 2, heart.y + size * 0.6, heart.x, heart.y + size * 0.8, heart.x, heart.y + size);
        ctx.bezierCurveTo(heart.x, heart.y + size * 0.8, heart.x + size / 2, heart.y + size * 0.6, heart.x + size / 2, heart.y + size * 0.25);
        ctx.bezierCurveTo(heart.x + size / 2, heart.y, heart.x, heart.y, heart.x, heart.y + size * 0.25);
        ctx.closePath();
        ctx.fill();

        const basketY = canvas.height - basket.h - 5;
        if (
          heart.y + size >= basketY &&
          heart.x >= basket.x &&
          heart.x <= basket.x + basket.w
        ) {
          gameScore++;
          setScore(gameScore);
          hearts.splice(i, 1);
          if (gameScore >= 15) {
            setGameWon(true);
            setIsPlaying(false);
            if (gameScore > highScore) setHighScore(gameScore);
          }
        } else if (heart.y > canvas.height) {
          hearts.splice(i, 1);
        }
      }

      if (isPlaying) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (canvas) {
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom>
        ❤️ Catch the Hearts
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
        Move mouse or drag finger. Catch 15 hearts to win!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, mb: 1 }}>
        <Typography variant="body2" fontWeight="bold">Score: {score}</Typography>
        <Typography variant="body2" fontWeight="bold">High: {highScore}</Typography>
      </Box>
      <Box sx={{ position: "relative", width: 280, height: 200, mx: "auto", border: "2px solid #ff80ab", borderRadius: 4, overflow: "hidden", bgcolor: "#fff0f5" }}>
        <canvas ref={canvasRef} width={280} height={200} style={{ display: "block" }} />
        {!isPlaying && (
          <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", bgcolor: "rgba(255,255,255,0.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 }}>
            <Typography variant="body1" fontWeight="bold" color="#e91e63" gutterBottom>
              {gameWon ? "🎉 You Won! You caught 15 hearts!" : "Ready to play?"}
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setScore(0);
                setGameWon(false);
                setIsPlaying(true);
              }}
              sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20, mt: 1 }}
            >
              {gameWon ? "Play Again" : "Start Game"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function MemoryMatchGame() {
  const images = [
    "/image/IMG-20250709-WA0004.jpg",
    "/image/IMG-20250709-WA0005.jpg",
    "/image/IMG-20250712-WA0011.jpg",
    "/image/IMG-20250712-WA0012.jpg",
    "/image/IMG-20250712-WA0013.jpg",
    "/image/IMG-20250712-WA0014.jpg",
    "/image/IMG-20250712-WA0017.jpg",
    "/image/IMG-20250712-WA0018.jpg",
    "/image/IMG-20250712-WA0019.jpg",
    "/image/IMG-20250712-WA0020.jpg",
    "/image/IMG-20250712-WA0021.jpg",
    "/image/IMG-20250712-WA0022.jpg",
    "/image/IMG-20250712-WA0023.jpg",
    "/image/IMG-20250805-WA0004.jpg",
    "/image/IMG-20260423-WA0013.jpg"
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const initGame = () => {
    const deck = [...images, ...images]
      .map((img, index) => ({ id: index, img, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (id) => {
    if (flipped.length === 2 || matched.includes(id) || flipped.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlipped;
      if (cards[firstId].img === cards[secondId].img) {
        setMatched((prev) => {
          const next = [...prev, firstId, secondId];
          if (next.length === cards.length) {
            setGameWon(true);
          }
          return next;
        });
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom>
        🧩 Photo Memory Match
      </Typography>
      <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
        Find matching pairs of our sweet photos! Moves: {moves}
      </Typography>
      <Grid container spacing={1.5} sx={{ maxWidth: 300, width: "100%", mx: "auto", justifyContent: "center" }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <Grid item xs={4} key={card.id}>
              <Box
                onClick={() => handleCardClick(index)}
                sx={{
                  width: "100%",
                  minWidth: 80,
                  pt: "100%",
                  position: "relative",
                  cursor: "pointer",
                  perspective: 1000
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.6s",
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "none",
                    borderRadius: 3,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      bgcolor: "#ff4081",
                      borderRadius: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff"
                    }}
                  >
                    <FavoriteIcon sx={{ fontSize: 24 }} />
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: 3,
                      overflow: "hidden"
                    }}
                  >
                    <Box
                      component="img"
                      src={card.img}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {gameWon && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" color="success.main" fontWeight="bold" gutterBottom>
            🎉 You matched all pairs in {moves} moves!
          </Typography>
          <Button
            variant="contained"
            onClick={initGame}
            sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20 }}
          >
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
}

function NightSky() {
  const [activeMemory, setActiveMemory] = useState(null);
  const [stars] = useState(() => {
    const starThoughts = [
      "The day you made me laugh until my stomach hurt. 😂",
      "The day I realized I loved you. 💖",
      "The day I missed you the most. 🌧️",
      "The day we had our first 5-hour phone call. 📞",
      "When I saw your selfie and smiled like an idiot. 🫣",
      "The first time you called me by my nickname. 🥺",
      "The night we stayed up until 4 AM talking. 🌙",
      "When you said you were angry but still cared about me. 🥰",
      "The exact moment I knew you were my person. 🌹",
      "The day we resolved our biggest fight. 🤝",
      "When you sent that sleepy, adorable voice note. 🎙️",
      "Hearing your real laugh for the first time. 🔊",
      "When you overthought things because you cared deeply. 🧠",
      "That sunset where I wished you were next to me. 🌅",
      "The time you made my bad mood disappear in seconds. 🪄",
      "When you said 'no refunds' and I smiled. 🔒",
      "The first time you texted 'I miss you' first. 💬",
      "Our first selfie swap war. 📸",
      "The first time we planned a virtual date. 🍕",
      "The day you sent a random reassure message. 🫂"
    ];

    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      size: 2 + Math.random() * 3,
      pulse: 1 + Math.random() * 2,
      thought: starThoughts[i % starThoughts.length]
    }));
  });


  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h5" color="white" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
        🌙 The Night Sky
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
        Click on any star in Kuttymaa's night sky to reveal a secret thought...
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 300,
          background: "radial-gradient(circle at center, #0f172a, #020617)",
          borderRadius: 5,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.15)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3)"
        }}
      >
        {stars.map((star) => (
          <Box
            key={star.id}
            onClick={() => setActiveMemory(star.thought)}
            sx={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              bgcolor: "#fff",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 0 10px #fff, 0 0 20px #ff80ab",
              animation: `sparkle ${star.pulse}s infinite alternate`,
              "&:hover": {
                transform: "scale(2.5)",
                bgcolor: "#ff4081",
                boxShadow: "0 0 15px #ff4081, 0 0 30px #ff4081"
              },
              transition: "transform 0.2s"
            }}
          />
        ))}

        {activeMemory && (
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: "5%",
              width: "90%",
              bgcolor: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(5px)",
              color: "#c2185b",
              p: 2,
              borderRadius: 3,
              boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              animation: "fadeInUp 0.3s ease",
              textAlign: "center",
              zIndex: 10
            }}
          >
            <Typography variant="body2" fontWeight="bold" sx={{ fontFamily: "'Outfit', sans-serif" }}>
              {activeMemory}
            </Typography>
            <Button
              size="small"
              onClick={() => setActiveMemory(null)}
              sx={{ mt: 1, color: "#ff4081", textTransform: "none", fontWeight: "bold" }}
            >
              Close
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function LoveMap() {
  const [activePin, setActivePin] = useState(null);

  const pins = [
    { id: 1, name: "Where We Met 🌍", x: 25, y: 35, memory: "The digital universe where our paths crossed. One message turned into a lifetime story." },
    { id: 2, name: "First Call Location 📞", x: 45, y: 55, memory: "The location of our very first call. We talked for hours and forgot that time existed." },
    { id: 3, name: "First Photo Exchange 📸", x: 65, y: 40, memory: "When we shared our photos and I saw your beautiful smile. My heart skipped a beat." },
    { id: 4, name: "Our Dream Café ☕", x: 75, y: 70, memory: "The virtual coffee dates we share, sipping drinks and talking about our dreams." }
  ];

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h5" color="white" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
        🗺️ Our Love Map
      </Typography>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
        Click on the pins to explore key milestones in our journey.
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 320,
          background: "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
          borderRadius: 5,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.4)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.15)"
        }}
      >
        <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0, pointerEvents: "none" }}>
          <path d="M 25 35 Q 45 55 65 40 T 75 70" fill="none" stroke="#ff4081" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {pins.map((pin) => (
          <Box
            key={pin.id}
            onClick={() => setActivePin(pin)}
            sx={{
              position: "absolute",
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              cursor: "pointer",
              transform: "translate(-50%, -50%)",
              "&:hover": { transform: "translate(-50%, -50%) scale(1.2)" },
              transition: "transform 0.2s"
            }}
          >
            <Box
              sx={{
                width: 16, height: 16, bgcolor: "#e91e63", borderRadius: "50%",
                border: "2px solid #fff", boxShadow: "0 0 10px rgba(233,30,99,0.8)",
                animation: "pulseHeart 2s infinite"
              }}
            />
            <Typography variant="caption" sx={{ display: "block", mt: 0.5, bgcolor: "rgba(255,255,255,0.85)", px: 0.8, py: 0.2, borderRadius: 2, fontWeight: "bold", color: "#c2185b", whiteSpace: "nowrap" }}>
              {pin.name}
            </Typography>
          </Box>
        ))}

        {activePin && (
          <Dialog
            open={activePin !== null}
            onClose={() => setActivePin(null)}
            PaperProps={{ sx: { borderRadius: 4, p: 3, maxWidth: 300, textAlign: "center" } }}
          >
            <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom>
              {activePin.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#555", mb: 2 }}>
              {activePin.memory}
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => setActivePin(null)}
              sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20 }}
            >
              Sweet! ❤️
            </Button>
          </Dialog>
        )}
      </Box>
    </Box>
  );
}

function TypewriterFinalSequence({ onClose }) {
  const [stage, setStage] = useState(0);
  const [text, setText] = useState("");
  
  const messages = [
    "Before you close this page...",
    "I hope you always remember something.",
    "You were loved on your good days.",
    "You were loved on your bad days.",
    "You were loved when you laughed.",
    "You were loved when you cried.",
    "You were loved when you felt strong.",
    "You were loved when you felt broken.",
    "And you'll be loved tomorrow too.",
    "Out of all the people in this world,",
    "all the places I could have been,",
    "all the paths life could have taken,",
    "I'm grateful every single day that they led me to you.",
    "Meeting you was the best thing that ever happened to me. ❤️",
    "Happy Birthday, Kuttymaa. 🎂",
    "See you in our next chapter..."
  ];

  useEffect(() => {
    let timer;
    let charIndex = 0;
    let currentMsg = messages[stage];
    
    const type = () => {
      if (charIndex <= currentMsg.length) {
        setText(currentMsg.slice(0, charIndex));
        charIndex++;
        timer = setTimeout(type, 60);
      } else {
        timer = setTimeout(() => {
          if (stage < messages.length - 1) {
            setStage(stage + 1);
            setText("");
          } else {
            setStage(stage + 1);
          }
        }, 2200);
      }
    };

    type();

    return () => clearTimeout(timer);
  }, [stage]);

  if (stage >= messages.length) {
    return (
      <Box sx={{ animation: "fadeIn 2s ease" }}>
        <Typography variant="h3" sx={{ fontFamily: "'Caveat', cursive", color: "#ff4081", mb: 3 }}>
          Forever Yours.
        </Typography>
        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 4, fontFamily: "'Outfit', sans-serif" }}>
          Happy Birthday, Kuttymaa! ❤️
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20 }}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  return (
    <Typography
      sx={{
        fontFamily: stage >= 12 ? "'Caveat', cursive" : "'Outfit', sans-serif",
        fontSize: stage >= 12 ? { xs: "1.8rem", md: "2.8rem" } : { xs: "1.2rem", md: "1.8rem" },
        lineHeight: 1.6,
        fontWeight: stage >= 12 ? "bold" : "normal",
        color: stage >= 13 ? "#ff4081" : "#fff",
        minHeight: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {text}
      <Box component="span" sx={{ display: "inline-block", width: 3, height: "1.2em", bgcolor: "#ff4081", ml: 0.5, animation: "blink 1s step-end infinite" }} />
    </Typography>
  );
}

const COUPLE_QUIZ = [
  { q: "What's my absolute favorite thing about you?", options: ["Your looks", "Your kindness", "Your cooking", "Your jokes"], a: "Your kindness", feedback: "Correct ❤️ Your gentle soul is my favorite." },
  { q: "Who fell in love first?", options: ["Me", "You", "We fell at the exact same time", "Still deciding"], a: "Me", feedback: "Guilty. I fell first, and I fell hard. ❤️" },
  { q: "What's my dream date with you?", options: ["Fancy dinner", "Movie night", "Late night drive", "Cozy at home with food"], a: "Cozy at home with food", feedback: "Yes! Nothing beats being lazy together with good food. 🍕❤️" },
  { q: "What is the song that feels most like us?", options: ["A love ballad", "A happy dance track", "A slow melody", "A remix"], a: "A love ballad", feedback: "Exactly — our story feels like a beautiful love ballad. 🎶" },
  { q: "What do I love most when you text me?", options: ["Your morning messages", "Your goodnight notes", "Your long stories", "Your emoji replies"], a: "Your goodnight notes", feedback: "Right — your goodnight notes make my heart calm and happy. 🌙" },
  { q: "What always makes me smile about you?", options: ["Your laugh", "Your voice", "Your style", "Your food"], a: "Your laugh", feedback: "Yes! Your laugh is one of the sweetest sounds I know. 😊" },
  { q: "What do I think is the cutest thing you do?", options: ["Send selfies", "Send voice notes", "Share memes", "Send long texts"], a: "Send voice notes", feedback: "Absolutely — your voice notes feel so close and warm. 💌" },
  { q: "What moment do I cherish most?", options: ["Our first call", "Our first picture", "Our first plan", "Our first date"], a: "Our first call", feedback: "Yes — that first call was the moment everything changed. 💫" },
  { q: "What do I hope for our future?", options: ["Travel together", "Build a home", "Always stay kind", "All of these"], a: "All of these", feedback: "Exactly — I want all of those beautiful things with you. ✨" },
  { q: "What makes me feel safe with you?", options: ["Your honesty", "Your patience", "Your hugs", "Your words"], a: "Your honesty", feedback: "Correct — your honesty is the foundation of everything. ❤️" },
  { q: "What do I miss most when we're apart?", options: ["Your voice", "Your smile", "Your messages", "Your presence"], a: "Your presence", feedback: "Yes — being close to you is what I miss most. 💕" },
  { q: "Which of these is my favorite thing to do with you?", options: ["Talk all night", "Watch movies", "Eat together", "Walk together"], a: "Talk all night", feedback: "Right — our all-night talks are the best memories. 🌙" },
  { q: "What do I admire most about you?", options: ["Your strength", "Your kindness", "Your beauty", "Your sense of humor"], a: "Your kindness", feedback: "Yes — your kindness is what makes you truly special. 💖" },
  { q: "How do I feel when you say my name?", options: ["Warm", "Happy", "Loved", "All of the above"], a: "All of the above", feedback: "Exactly — your voice makes me feel all of that. 🥰" },
  { q: "What do I want to promise you forever?", options: ["My time", "My support", "My love", "All of these"], a: "All of these", feedback: "Exactly — I promise you my whole heart and everything I have. 💞" },
];

const MUSIC_MEMORIES = [
  { title: "Our first long call 📞", song: "The song we talked over", desc: "We lost track of time entirely.", src: "" },
  { title: "The song that reminds me of you 🎶", song: "Every time it plays", desc: "It feels like you're right next to me.", src: "" },
  { title: "When I missed you the most 🌧️", song: "Late night playlist", desc: "This got me through the long nights.", src: "" },
  { title: "Our Special Soundtrack 🎵", song: "Marappadhilai Nenje", desc: "A new song added to the soundtrack just for you.", src: "" },
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
          width: "100%",
          objectFit: "contain",
          objectPosition: "center",
          borderRadius: 0,
          border: "1px solid #f0f0f0",
          bgcolor: "#fffafc",
          display: "block",
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

class HeartParticle {
  constructor(canvas, isBurst = false, burstX = 0, burstY = 0) {
    this.canvas = canvas;
    this.isBurst = isBurst;
    this.reset(isBurst, burstX, burstY);
    if (!isBurst) {
      this.y = Math.random() * canvas.height;
    }
  }

  reset(isBurst = false, burstX = 0, burstY = 0) {
    const canvas = this.canvas;
    this.size = 12 + Math.random() * 16;
    
    const colors = [
      "rgba(255, 64, 129, 0.45)",  // #ff4081
      "rgba(255, 128, 171, 0.45)", // #ff80ab
      "rgba(233, 30, 99, 0.45)",   // #e91e63
      "rgba(186, 104, 200, 0.4)",  // #ba68c8
      "rgba(255, 215, 0, 0.35)"    // gold
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.type = Math.random() > 0.4 ? "heart" : "sparkle";

    if (isBurst) {
      this.x = burstX;
      this.y = burstY;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      this.speedX = Math.cos(angle) * speed;
      this.speedY = Math.sin(angle) * speed;
      this.opacity = 0.8 + Math.random() * 0.2;
      this.decay = 0.01 + Math.random() * 0.02;
      this.size = 8 + Math.random() * 8;
    } else {
      this.x = Math.random() * canvas.width;
      this.y = -20 - Math.random() * 50;
      this.speedY = 0.8 + Math.random() * 1.5;
      this.speedX = -0.3 + Math.random() * 0.6;
      this.opacity = 0.2 + Math.random() * 0.45;
      this.decay = 0;
    }

    this.vx = 0;
    this.vy = 0;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.01 + Math.random() * 0.02;
  }

  update(mouseX, mouseY) {
    if (this.decay > 0) {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity -= this.decay;
      this.size *= 0.98;
    } else {
      this.wobble += this.wobbleSpeed;
      
      if (mouseX !== null && mouseY !== null) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.hypot(dx, dy);
        const forceRadius = 150;
        if (dist < forceRadius) {
          const force = (forceRadius - dist) / forceRadius;
          const angle = Math.atan2(dy, dx);
          this.vx += Math.cos(angle) * force * 0.8;
          this.vy += Math.sin(angle) * force * 0.6;
        }
      }

      this.vx *= 0.92;
      this.vy *= 0.92;

      this.x += this.speedX + Math.sin(this.wobble) * 0.4 + this.vx;
      this.y += this.speedY + this.vy;

      if (this.y > this.canvas.height + 20 || this.x < -20 || this.x > this.canvas.width + 20) {
        this.reset();
      }
    }
  }

  draw(ctx) {
    if (this.opacity <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = this.type === "sparkle" ? 8 : 2;
    ctx.shadowColor = this.color;

    if (this.type === "heart") {
      ctx.beginPath();
      const x = this.x;
      const y = this.y;
      const size = this.size;
      
      ctx.moveTo(x, y + size * 0.25);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.25);
      ctx.bezierCurveTo(x - size / 2, y + size * 0.6, x, y + size * 0.8, x, y + size);
      ctx.bezierCurveTo(x, y + size * 0.8, x + size / 2, y + size * 0.6, x + size / 2, y + size * 0.25);
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.25);
      
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      const x = this.x;
      const y = this.y;
      const size = this.size * 0.6;
      ctx.moveTo(x, y - size);
      ctx.quadraticCurveTo(x, y, x + size, y);
      ctx.quadraticCurveTo(x, y, x, y + size);
      ctx.quadraticCurveTo(x, y, x - size, y);
      ctx.quadraticCurveTo(x, y, x, y - size);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
}

function HeartRainBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let mouse = { x: null, y: null };
    let particles = [];
    let burstParticles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particleCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));
      particles = Array.from({ length: particleCount }, () => new HeartParticle(canvas));
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      const burstCount = 12;
      for (let i = 0; i < burstCount; i++) {
        burstParticles.push(new HeartParticle(canvas, true, e.clientX, e.clientY));
      }
      if (burstParticles.length > 150) {
        burstParticles.splice(0, burstParticles.length - 150);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update(mouse.x, mouse.y);
        p.draw(ctx);
      });

      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.update();
        if (bp.opacity <= 0) {
          burstParticles.splice(i, 1);
        } else {
          bp.draw(ctx);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [reasonsCount, setReasonsCount] = useState(1247);
  const [currentReason, setCurrentReason] = useState("");
  const [reasonsDialogOpen, setReasonsDialogOpen] = useState(false);
  const [vaultPassword, setVaultPassword] = useState("");
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultError, setVaultError] = useState("");
  const [randomThought, setRandomThought] = useState("");
  const [pickupLine, setPickupLine] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [galleryViewMode, setGalleryViewMode] = useState("netflix"); // "netflix" | "folders"
  const [lightboxImage, setLightboxImage] = useState(null); // { src, folderName, index }

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
  const extraAudioRef = useRef(null);

  // Vault unlock handler
  const handleUnlockVault = () => {
    const pw = vaultPassword.trim().toLowerCase();
    if (pw === "kuttymaa" || pw === "jessy" || pw === "kutty" || pw === "k" || pw === "j") {
      setVaultUnlocked(true);
      setVaultError("");
    } else {
      setVaultError("Hmm, that's not right. Try again! 💕");
    }
  };

  // --- Lightbox Helpers ---
  const handleLightboxPrev = () => {
    if (!lightboxImage) return;
    const images = galleryData[lightboxImage.folderName];
    const prevIndex = (lightboxImage.index - 1 + images.length) % images.length;
    setLightboxImage({ src: images[prevIndex], folderName: lightboxImage.folderName, index: prevIndex });
  };

  const handleLightboxNext = () => {
    if (!lightboxImage) return;
    const images = galleryData[lightboxImage.folderName];
    const nextIndex = (lightboxImage.index + 1) % images.length;
    setLightboxImage({ src: images[nextIndex], folderName: lightboxImage.folderName, index: nextIndex });
  };

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
  const [capsuleSaved, setCapsuleSaved] = useState(() => !!localStorage.getItem("kuttymaa_capsule"));

  const saveCapsule = () => {
    if (capsuleMessage.trim()) {
      localStorage.setItem("kuttymaa_capsule", capsuleMessage);
      setCapsuleSaved(true);
    }
  };


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
    if (idx === 3) return extraAudioRef;
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
      title: "Happy Birthday, Kuttymaa! 🎉",
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

      <audio
        ref={extraAudioRef}
        loop
        src="/Marappadhilai-Nenje-(Additional-Song)-MassTamilan.io.mp3"
      />

      {/* Heart Rain Background */}
      <HeartRainBackground />

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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 10 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", py: { xs: 8, md: 10 }, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "inline-block", position: "relative", mb: 3, overflow: "visible" }}>
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
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: { xs: "2.5rem", md: "4.5rem" },
                mb: 1,
                px: 2,
                pb: 1,
                filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.15))",
                animation: "pulseText 3s ease-in-out infinite",
                overflow: "visible",
                lineHeight: 1.3,
              }}
            >
              Happy Birthday, Kuttymaa! ❤️
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
              src="/image/IMG-20250712-WA0022.jpg"
              alt="Kuttymaa"
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

        {/* Dashboard Tab Bar */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1.5, flexWrap: "wrap", mt: 2, mb: 4, position: "relative", zIndex: 10 }}>
          {[
            { id: "home", label: "🏠 Home & Stats" },
            { id: "memories", label: "🎬 Memory Lane" },
            { id: "vault", label: "💌 Love Vault" },
            { id: "journey", label: "✨ Our Journey" },
            { id: "arcade", label: "🕹️ Arcade Hub" },
            { id: "cosmos", label: "🌌 Sky & Map" },
            { id: "future", label: "🌸 Future Trail" }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "contained" : "outlined"}
              sx={{
                borderRadius: 50,
                px: { xs: 2, sm: 3 },
                py: 1,
                fontFamily: "'Outfit', sans-serif",
                fontWeight: "bold",
                fontSize: "0.85rem",
                color: activeTab === tab.id ? "#fff" : "#ff4081",
                bgcolor: activeTab === tab.id ? "#ff4081" : "rgba(255,255,255,0.65)",
                borderColor: "#ff4081",
                backdropFilter: "blur(8px)",
                boxShadow: activeTab === tab.id ? "0 8px 20px rgba(255, 64, 129, 0.3)" : "none",
                "&:hover": {
                  bgcolor: activeTab === tab.id ? "#d81b60" : "rgba(255, 64, 129, 0.1)",
                  borderColor: "#d81b60"
                },
                transition: "all 0.3s ease"
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Box>

        {/* Home Tab Panel */}
        {activeTab === "home" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "2px solid rgba(255,64,129,0.15)", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                  <Typography variant="h5" color="#c2185b" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    Reasons I Love You Counter
                  </Typography>
                  <Typography variant="h3" color="#ff4081" fontWeight="bold" sx={{ fontFamily: "'Pacifico', cursive", my: 3 }}>
                    {reasonsCount} and counting...
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => {
                      const next = reasonsCount + 1;
                      setReasonsCount(next);
                      const randomReason = REASONS_I_LOVE_YOU[Math.floor(Math.random() * REASONS_I_LOVE_YOU.length)];
                      setCurrentReason(randomReason);
                      setReasonsDialogOpen(true);
                    }}
                    sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20, px: 4, py: 1.2, fontWeight: "bold", "&:hover": { bgcolor: "#d81b60" } }}
                  >
                    Click to reveal a reason ❤️
                  </Button>
                  <Typography variant="caption" sx={{ color: "#777", mt: 2, fontFamily: "'Outfit', sans-serif" }}>
                    Every click reveals a hyper-specific observation.
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif", mb: 3 }}>
                    🧠 Inside My Head
                  </Typography>
                  {[
                    { label: "Thinking About You", value: 99.8, color: "#ff4081" },
                    { label: "Missing You", value: 93, color: "#ba68c8" },
                    { label: "Trying Not To Smile", value: 2, color: "#ffd54f" },
                    { label: "Successfully Not Smiling", value: 0, color: "#9e9e9e" }
                  ].map((item) => (
                    <Box key={item.label} sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                        <Typography variant="body2" fontWeight="bold" color="#4a4a4a">{item.label}</Typography>
                        <Typography variant="body2" fontWeight="bold" color="#c2185b">{item.value}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={item.value} sx={{ height: 12, borderRadius: 5, bgcolor: "rgba(0,0,0,0.05)", "& .MuiLinearProgress-bar": { bgcolor: item.color, borderRadius: 5 } }} />
                    </Box>
                  ))}
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 3 }}>
                    <AccessTimeIcon sx={{ color: "#e91e63", fontSize: 28 }} />
                    <Typography variant="h5" fontWeight="bold" color="#d81b60" sx={{ fontFamily: "'Outfit', sans-serif" }}>
                      Our Time Together...
                    </Typography>
                    {!foundHearts.includes(4) && (
                      <IconButton onClick={() => handleFindHeart(4)} sx={{ color: "rgba(255, 64, 129, 0.25)", p: 0.5, "&:hover": { color: "#ff4081" } }}>
                        <FavoriteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    )}
                  </Box>
                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {[
                      { label: "Days", value: timeElapsed.days },
                      { label: "Hours", value: timeElapsed.hours },
                      { label: "Minutes", value: timeElapsed.minutes },
                      { label: "Seconds", value: timeElapsed.seconds }
                    ].map((item) => (
                      <Grid item xs={6} sm={3} key={item.label} sx={{ textAlign: "center" }}>
                        <Box sx={{ p: 2, bgcolor: "rgba(233,30,99,0.04)", borderRadius: 3, border: "1.5px solid rgba(233,30,99,0.1)" }}>
                          <Typography sx={{ fontFamily: "'Pacifico', cursive", fontSize: "1.8rem", color: "#e91e63" }}>
                            {String(item.value).padStart(2, "0")}
                          </Typography>
                          <Typography sx={{ fontFamily: "'Outfit', sans-serif", color: "#666", fontSize: "0.8rem", fontWeight: "bold" }}>
                            {item.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                  <Typography align="center" sx={{ color: "#777", mt: 3, fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem" }}>
                    Since February 19, 2025 ❤️
                  </Typography>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    📊 Playful Stats
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {[
                      { title: "Hours Spent Talking 📞", value: "1,840+ hrs" },
                      { title: "Good Morning Texts Sent 🌅", value: "480+ texts" },
                      { title: "Times She Said 'I'm Angry' 😂", value: "99+ times" },
                      { title: "Times She Made Me Smile 😊", value: "Infinite" }
                    ].map((stat) => (
                      <Grid item xs={6} key={stat.title}>
                        <Box sx={{ p: 2, bgcolor: "rgba(233,30,99,0.03)", borderRadius: 3, height: "100%" }}>
                          <Typography variant="body2" sx={{ color: "#555", fontWeight: "bold", fontSize: "0.85rem", mb: 1 }}>{stat.title}</Typography>
                          <Typography variant="h6" color="#c2185b" fontWeight="bold">{stat.value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    📞 Missed Calls From My Heart
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                    {[
                      { time: "2:17 AM", reason: "Thinking about you again. 🌙" },
                      { time: "5:43 PM", reason: "Saw something that reminded me of you. 🌸" }
                    ].map((call, i) => (
                      <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "rgba(233,30,99,0.04)", borderRadius: 3, border: "1px solid rgba(233,30,99,0.08)" }}>
                        <Box sx={{ width: 40, height: 40, borderRadius: "50%", bgcolor: "#ffebee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: "1.2rem" }}>📞</span>
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight="bold" color="#c2185b">Missed Call • {call.time}</Typography>
                          <Typography variant="caption" color="#666">Reason: {call.reason}</Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    😂 Things Kuttymaa Does (Affectionate Roasts)
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
                    {[
                      { title: "Says 'I'm fine' when not fine 🤫", desc: "Requires pro decoding skills to see she actually wants comfort." },
                      { title: "Overthinks level: Expert 🧠", desc: "Successfully finding hypothetical scenarios to worry about." },
                      { title: "Starts arguments with imaginary scenarios 💭", desc: "'What if we met in another timeline and I was a cat?'" },
                      { title: "Pretends not to be cute 🧸", desc: "A total failure because she melts my heart easily." }
                    ].map((roast, i) => (
                      <Box key={i} sx={{ p: 1.5, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 3 }}>
                        <Typography variant="body2" fontWeight="bold" color="#374151">{roast.title}</Typography>
                        <Typography variant="caption" color="#666">{roast.desc}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "2px solid rgba(255,64,129,0.15)" }}>
                  <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    📜 Terms & Conditions of Loving Kuttymaa
                  </Typography>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {[
                      { art: "Article 1", text: "Must remind her she's pretty even when she strongly disagrees." },
                      { art: "Article 2", text: "Must survive occasional tiny storms and sweet temper outbursts." },
                      { art: "Article 3", text: "Must listen to random, long stories with absolute enthusiasm." },
                      { art: "Article 4", text: "Must love her forever. Agreement expires: NEVER." }
                    ].map((tc) => (
                      <Grid item xs={12} sm={6} key={tc.art}>
                        <Box sx={{ p: 2, bgcolor: "rgba(233,30,99,0.03)", borderRadius: 3, height: "100%", borderLeft: "4px solid #ff4081" }}>
                          <Typography variant="body2" fontWeight="bold" color="#c2185b">{tc.art}</Typography>
                          <Typography variant="body2" color="#555">{tc.text}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>

              {/* Personalized Awards */}
              <Grid item xs={12}>
                <Box sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
                    <EmojiEventsIcon sx={{ color: "white", fontSize: 30 }} />
                    <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit',sans-serif", textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
                      Personalized Awards 🏆
                    </Typography>
                  </Box>
                  <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
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
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Memories Tab Panel */}
        {activeTab === "memories" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2 }}>
            {/* 🎬 The Movie of Us — Folder Gallery */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" mb={4} sx={{ fontFamily: "'Outfit', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                🎬 The Movie of Us
              </Typography>

              {Object.keys(galleryData).map((folderName) => (
                <Box key={folderName} sx={{ mb: 5 }}>
                  {/* Folder Header */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2, pl: 0.5 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontFamily: "'Outfit', sans-serif",
                        color: "#fff",
                        textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                        textTransform: "capitalize",
                        letterSpacing: "0.5px"
                      }}
                    >
                      📁 {folderName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Outfit', sans-serif" }}>
                      {galleryData[folderName].length} photos
                    </Typography>
                  </Box>

                  {/* Horizontal scroll row */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      overflowX: "auto",
                      pb: 1.5,
                      "&::-webkit-scrollbar": { height: 4 },
                      "&::-webkit-scrollbar-track": { bgcolor: "rgba(255,255,255,0.1)", borderRadius: 2 },
                      "&::-webkit-scrollbar-thumb": { bgcolor: "#e50914", borderRadius: 2 }
                    }}
                  >
                    {galleryData[folderName].map((imgSrc, idx) => (
                      <Box
                        key={idx}
                        onClick={() => setLightboxImage({ src: imgSrc, folderName, index: idx })}
                        sx={{
                          flexShrink: 0,
                          width: { xs: 140, sm: 180, md: 200 },
                          height: { xs: 140, sm: 180, md: 200 },
                          borderRadius: 2,
                          overflow: "hidden",
                          cursor: "pointer",
                          position: "relative",
                          transition: "transform 0.25s ease, box-shadow 0.25s ease",
                          "&:hover": {
                            transform: "scale(1.06)",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.55)",
                            "& .img-overlay": { opacity: 1 }
                          }
                        }}
                      >
                        <img
                          src={imgSrc}
                          alt={`${folderName} ${idx + 1}`}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                        <Box
                          className="img-overlay"
                          sx={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                            opacity: 0,
                            transition: "opacity 0.25s ease",
                            display: "flex",
                            alignItems: "flex-end",
                            p: 1
                          }}
                        >
                          <Typography variant="caption" sx={{ color: "#fff", fontFamily: "'Outfit', sans-serif", fontWeight: "bold" }}>
                            {idx + 1} / {galleryData[folderName].length}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Polaroid Memory Grid */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" align="center" color="white" fontWeight="bold" mb={4} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                📸 Polaroid Memories
              </Typography>
              <Grid container spacing={4} sx={{ justifyContent: "center" }}>
                {MEMORIES.map((m, i) => (
                  <Grid item xs={12} sm={6} md={4} key={i}>
                    <PolaroidCard img={m.img} caption={m.story} rotation={i % 2 === 0 ? -2 : 2} />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Soundtracks */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
                <LibraryMusicIcon sx={{ color: "white", fontSize: 28 }} />
                <Typography variant="h5" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif" }}>
                  🎵 Our Soundtrack
                </Typography>
              </Box>
              <Grid container spacing={3} sx={{ maxWidth: 960, mx: "auto", alignItems: "stretch" }}>
                {MUSIC_MEMORIES.map((music, i) => (
                  <Grid item xs={12} sm={4} key={i}>
                    <Card sx={{ p: 3, borderRadius: 4, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(10px)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
                      <LibraryMusicIcon sx={{ fontSize: 40, color: "#e91e63", mb: 2 }} />
                      <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: "'Outfit', sans-serif", color: "#c2185b", mb: 1 }}>{music.title}</Typography>
                      <Typography sx={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: "#616161", mb: 2, flexGrow: 1 }}>{music.desc}</Typography>
                      
                      <Box sx={{ bgcolor: "rgba(233,30,99,0.05)", p: 1.5, borderRadius: 2, mb: 2, width: "100%" }}>
                        <Typography variant="caption" sx={{ fontStyle: "italic", color: "#8e24aa" }}>
                          {i === 0 && "Why it counts: Because that night, I realized your voice was my favorite melody. ❤️"}
                          {i === 1 && "Why it counts: Every lyric feels like it was written directly about your smile. 🎶"}
                          {i === 2 && "Why it counts: On long lonely nights, this was the bridge that connected my thoughts to you. 🌧️"}
                          {i === 3 && "Why it counts: This song reminds me of the way you look at me with so much love. 💕"}
                        </Typography>
                      </Box>

                      <Button
                        variant={playingMemoryIdx === i ? "contained" : "outlined"}
                        onClick={() => playMusicMemory(i)}
                        startIcon={playingMemoryIdx === i ? <PauseIcon /> : <PlayArrowIcon />}
                        sx={{ borderRadius: 20, color: playingMemoryIdx === i ? "#fff" : "#e91e63", bgcolor: playingMemoryIdx === i ? "#e91e63" : "transparent", borderColor: "#e91e63" }}
                      >
                        {playingMemoryIdx === i ? "Pause" : "Play Track"}
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* 365 Days Calendar */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" mb={3} sx={{ fontFamily: "'Outfit', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                📅 365 Days of You Calendar
              </Typography>
              <Card sx={{ p: 4, borderRadius: 5, background: "rgba(255,255,255,0.92)", maxWidth: 500, mx: "auto" }}>
                <Typography variant="subtitle1" fontWeight="bold" color="#c2185b" align="center" mb={2}>June 2025</Typography>
                <Grid container spacing={1} sx={{ justifyContent: "center" }}>
                  {Array.from({ length: 30 }).map((_, dIdx) => {
                    const dayNum = dIdx + 1;
                    const hasMemory = CALENDAR_MEMORIES[dayNum];
                    return (
                      <Grid item xs={1.7} key={dayNum} sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                          onClick={() => {
                            if (hasMemory) {
                              setCurrentReason(hasMemory);
                              setReasonsDialogOpen(true);
                            }
                          }}
                          variant={hasMemory ? "contained" : "outlined"}
                          sx={{
                            width: 40, height: 40, minWidth: 40, borderRadius: "50%", p: 0,
                            bgcolor: hasMemory ? "#ff4081" : "transparent",
                            color: hasMemory ? "#fff" : "#777",
                            borderColor: hasMemory ? "#ff4081" : "rgba(0,0,0,0.15)",
                            fontWeight: "bold",
                            "&:hover": { bgcolor: hasMemory ? "#e91e63" : "rgba(0,0,0,0.05)" }
                          }}
                        >
                          {dayNum}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
                <Typography variant="caption" sx={{ display: "block", color: "#666", mt: 3, textAlign: "center", fontStyle: "italic" }}>
                  *Click on highlighted dates to unlock calendar thoughts!
                </Typography>
              </Card>
            </Box>

            {/* Freeze Time */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" mb={3} sx={{ fontFamily: "'Outfit', sans-serif", textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                ⏳ If I Could Freeze Time Moments
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 650, mx: "auto" }}>
                {[
                  "19 feb 2025 first meet on snap",
                  "1 march 2025 first long term call around 5 hours, unconditionally",
                  "7 july 2025 first poem for my kuttymaa",
                  "12 july 2025 my kuttymaa wanted to talk with me at 12am, and I felt so happy to have her in my life",
                  "6 aug 2025 my kuttymaa put a sweet status for me and mentioned me",
                  "11 aug 2025 I called my kuttymaa by her dad's name, George Bush, and it made us laugh",
                  "14 aug 2025 first video call",
                  "14 aug 2025 long video call with my kuttymaaa",
                  "3 sept 2025 she blocked me everywhere",
                  "16 nov 2025 we talked again and grew even closer over the next two months",
                  "20 dec 2025 first time my kuttymaa on my dream the untold story with you happy ah kai pudichu oru vayal pakkathula nadanthu porom nii sirichu sirichu pesura romba happy romba romba romba happy ah namma journey 1 day kovil porom oru vayikaal jolly ah thanniya kaal nianichutu something anga orama sappadu saptu aprm unnai karur la vittutu aprm nan erode vanthutan",
                  "18 nov 2025 my kuttymaa told me I am her gem and that she never wanted to leave me",
                  "10 jan 2026 I shared my loneliness with her",
                  "4 feb 2026 she blocked me again",
                  "13 may 2026 she came back to talk, gave me clarity, and made me feel how deeply she missed me",
                  "7 june 2026 we had a late-night conversation full of warmth, affection, and unforgettable closeness",
                  "12 june 2026 she blocked me again because she felt guilty"
                ].map((moment, mIdx) => (
                  <Card key={mIdx} sx={{ p: 3, borderRadius: 4, background: "rgba(255,255,255,0.9)", borderLeft: "5px solid #ff4081" }}>
                    <Typography variant="body1" fontWeight="bold" color="#c2185b" sx={{ fontFamily: "'Outfit', sans-serif" }}>
                      Moment #{mIdx + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#374151", mt: 1 }}>
                      {moment}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Box>

            {/* Video surprises card */}
            <Box sx={{ pb: 4, textAlign: "center" }}>
              <Card sx={{ p: 4, borderRadius: 6, background: "linear-gradient(135deg, rgba(186,104,200,0.1), rgba(255,255,255,0.9))", border: "2px solid rgba(186,104,200,0.3)", maxWidth: 500, mx: "auto" }}>
                <Typography variant="h6" color="#8e24aa" fontWeight="bold" gutterBottom>
                  🎬 Video Surprise Reels
                </Typography>
                <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                  Watch special customized video diaries dedicated to you.
                </Typography>
                <Button
                  variant="contained"
                  onClick={openVideoSurpriseDialog}
                  sx={{ bgcolor: "#ab47bc", color: "#fff", borderRadius: 20, px: 4, py: 1.2, fontWeight: "bold", "&:hover": { bgcolor: "#8e24aa" } }}
                >
                  Open Video Player 🎬
                </Button>
              </Card>
            </Box>
          </Box>
        )}

        {/* Love Vault Tab Panel */}
        {activeTab === "vault" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2 }}>
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {/* Vault check card */}
              <Grid item xs={12} md={6}>
                {!vaultUnlocked ? (
                  <Card sx={{ p: 4, borderRadius: 6, background: "linear-gradient(135deg, #2c3e50, #000)", color: "#fff", border: "2px solid rgba(255,255,255,0.1)", textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}>
                    <LockIcon sx={{ fontSize: 60, color: "#ff4081", mb: 2, animation: "pulseHeart 2s infinite" }} />
                    <Typography variant="h5" fontWeight="bold" mb={2} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                      🔒 Vault of Secrets
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 3 }}>
                      Unlock to read what I admire most, what scares me, and the exact moment I fell. Hint: starts with k or j.
                    </Typography>
                    <TextField
                      placeholder="Enter nickname..."
                      value={vaultPassword}
                      onChange={(e) => setVaultPassword(e.target.value)}
                      size="small"
                      sx={{
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: 2,
                        input: { color: "#fff", textAlign: "center" },
                        fieldset: { borderColor: "rgba(255,255,255,0.2)" },
                        "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#ff4081" },
                        mb: 2,
                        width: "100%"
                      }}
                    />
                    {vaultError && <Typography variant="caption" color="error" sx={{ display: "block", mb: 2 }}>{vaultError}</Typography>}
                    <Button
                      variant="contained"
                      onClick={handleUnlockVault}
                      sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20, px: 5, py: 1.2, fontWeight: "bold", "&:hover": { bgcolor: "#d81b60" } }}
                    >
                      Unlock Secrets 🔑
                    </Button>
                  </Card>
                ) : (
                  <Card sx={{ p: 4, borderRadius: 6, background: "linear-gradient(135deg, #fff0f5, #fff)", border: "2px solid #ff4081", height: "100%", position: "relative" }}>
                    <IconButton onClick={() => setVaultUnlocked(false)} sx={{ position: "absolute", top: 10, right: 10 }} size="small"><LockIcon sx={{ color: "#ff4081" }} /></IconButton>
                    <Typography variant="h5" color="#c2185b" fontWeight="bold" align="center" mb={3} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                      🔑 Welcome, Kuttymaa.
                    </Typography>
                    
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left" }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color="#ff4081">📖 The Day I Fell</Typography>
                        <Typography variant="body2" sx={{ color: "#374151", mt: 1, lineHeight: 1.7 }}>
                          We were talking normally. Nothing dramatic happened. No music. No movie scene. Then suddenly I realized: "This is the person I want to tell everything to." ❤️
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color="#ff4081">🤝 What I Admire Most</Typography>
                        <Typography variant="body2" sx={{ color: "#374151", mt: 1, lineHeight: 1.7 }}>
                          Your absolute innocence, your pure soul, and the fierce loyalty you carry. You love with all your heart, and that is rare.
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" color="#ff4081">🔒 What Scares Me</Typography>
                        <Typography variant="body2" sx={{ color: "#374151", mt: 1, lineHeight: 1.7 }}>
                          Losing the comfort, the laughter, and the safe place we built together. You are my home, and losing home is terrifying.
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                )}
              </Grid>

              {/* Emergency Kit */}
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <Typography variant="h5" color="#d81b60" fontWeight="bold" align="center" mb={3} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    📦 Emergency Kuttymaa Kit
                  </Typography>
                  <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {[
                      { label: "When Sad 🫂", content: "Virtual Hug: Close your eyes and feel my arms around you. Reassurance letter: I am right here, I'm never letting go. You are safe." },
                      { label: "When Angry 🍫", content: "Virtual Chocolate Box: Here is a giant box of double-fudge dark chocolates. Single-click eating, calorie-free comfort!" },
                      { label: "When Missing Me 📞", content: "Instant Call Coupon: Redeemable now! Hit call, and I will pick up no matter what I'm doing." },
                      { label: "When Overthinking 💌", content: "Reassurance: Breathe. Everything is okay. My feelings haven't changed, they grow stronger every single day. I choose you." }
                    ].map((kit, kIdx) => (
                      <Grid item xs={6} key={kIdx}>
                        <Button
                          fullWidth variant="contained"
                          onClick={() => {
                            setCurrentReason(kit.content);
                            setReasonsDialogOpen(true);
                          }}
                          sx={{
                            height: 100, borderRadius: 4, bgcolor: "rgba(255,255,255,0.9)", color: "#c2185b",
                            fontFamily: "'Outfit', sans-serif", fontWeight: "bold", border: "1.5px solid rgba(255,64,129,0.2)",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.06)", flexDirection: "column", textTransform: "none",
                            "&:hover": { bgcolor: "#fff", transform: "scale(1.04)" }
                          }}
                        >
                          {kit.label}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Card>
              </Grid>
            </Grid>

            {/* Love Coupons */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" align="center" mb={3} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                🎫 Redeemable Love Coupons
              </Typography>
              <Grid container spacing={3} sx={{ justifyContent: "center" }}>
                {LOVE_COUPONS.map((coupon, cIdx) => (
                  <Grid item xs={12} sm={6} md={4} key={cIdx}>
                    <Card
                      sx={{
                        p: 3, borderRadius: 4, background: "linear-gradient(135deg, #fff, #ffebee)",
                        border: "2px dashed #ff4081", textCenter: "center", position: "relative",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight="bold" color="#c2185b">{coupon.title}</Typography>
                      <Typography variant="body2" sx={{ color: "#666", my: 2, height: 40, overflow: "hidden" }}>{coupon.desc}</Typography>
                      <Box sx={{ bgcolor: "rgba(233,30,99,0.05)", p: 1, borderRadius: 2, mb: 2, textAlign: "center" }}>
                        <Typography variant="caption" sx={{ fontFamily: "monospace", fontWeight: "bold", color: "#e91e63" }}>CODE: {coupon.code}</Typography>
                      </Box>
                      <Button
                        fullWidth size="small" variant="contained"
                        onClick={() => {
                          setSelectedCoupon(coupon);
                          // Trigger confetti
                          setOpenSurprise(true);
                          setTimeout(() => setOpenSurprise(false), 3000);
                        }}
                        sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20, "&:hover": { bgcolor: "#d81b60" } }}
                      >
                        Redeem Coupon 🎫
                      </Button>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              {selectedCoupon && (
                <Dialog open={selectedCoupon !== null} onClose={() => setSelectedCoupon(null)} PaperProps={{ sx: { borderRadius: 6, p: 4, textAlign: "center", maxWidth: 350 } }}>
                  <Typography variant="h5" color="#c2185b" fontWeight="bold" gutterBottom>Coupon Activated! 🎉</Typography>
                  <Typography sx={{ my: 2, color: "#374151" }}>You have officially redeemed: <br/><strong>{selectedCoupon.title}</strong></Typography>
                  <Typography variant="caption" color="text.secondary">Screenshot this code: <strong>{selectedCoupon.code}</strong> and send it to Prasanth! 💬</Typography>
                  <Button variant="contained" onClick={() => setSelectedCoupon(null)} sx={{ mt: 3, bgcolor: "#ff4081", borderRadius: 20 }}>Awesome! ❤️</Button>
                </Dialog>
              )}
            </Box>

            {/* Open When Letters */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 4 }}>
                <EmailIcon sx={{ color: "white", fontSize: 28 }} />
                <Typography variant="h5" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit', sans-serif" }}>
                  💌 Open When Letters
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "center", px: { xs: 2, md: 0 }, maxWidth: 1000, mx: "auto" }}>
                {OPEN_WHEN_LETTERS.map((letter, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setOpenWhenLetter(idx)}
                    sx={{
                      borderRadius: 4, px: 3, py: 2, minWidth: { xs: "100%", sm: 220 }, maxWidth: 280,
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

            {/* Sealed Envelope */}
            <Box sx={{ py: 4, position: "relative", zIndex: 1 }}>
              <Card
                onClick={openLetter}
                sx={{
                  cursor: "pointer", p: letterOpen ? { xs: 4, md: 6 } : { xs: 4, md: 5 },
                  borderRadius: 6, backdropFilter: "blur(20px)",
                  background: letterOpen ? "rgba(255,255,255,0.95)" : "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)",
                  border: letterOpen ? "2px solid rgba(255, 64, 129, 0.2)" : "2px dashed rgba(255, 255, 255, 0.8)",
                  boxShadow: letterOpen ? "0 30px 60px rgba(255, 64, 129, 0.2)" : "0 20px 45px rgba(0,0,0,0.08)",
                  transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  textAlign: "center"
                }}
              >
                {!letterOpen ? (
                  <Box sx={{ py: 6 }}>
                    <Box sx={{ display: "inline-flex", p: 2.5, borderRadius: "50%", bgcolor: "rgba(255, 64, 129, 0.15)", mb: 3, animation: "heartbeat 2s infinite" }}>
                      <FavoriteIcon sx={{ color: "#ff4081", fontSize: 50 }} />
                    </Box>
                    <Typography variant="h4" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#d81b60", mb: 1.5 }}>
                      To Kuttymaa, My Love 💌
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#5c5c5c", fontSize: "1.1rem", mb: 3 }}>
                      Click to open your special handwritten letter
                    </Typography>
                    <Button variant="contained" sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20, px: 4 }}>
                      Open Letter 💖
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ animation: "fadeInUp 0.8s cubic-bezier(0.19, 1, 0.22, 1)", textAlign: "left" }}>
                    <IconButton onClick={(e) => { e.stopPropagation(); closeLetter(); }} sx={{ position: "absolute", right: 20, top: 20 }}><CloseIcon /></IconButton>
                    <Typography variant="h3" align="center" sx={{ fontFamily: "'Pacifico', cursive", color: "#d81b60", mb: 4 }}>
                      My Dearest Kuttymaa,
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2.0, fontSize: "1.1rem", mb: 4 }}>
                      Words often fail me when I try to write down what you mean to me. You came into my life like a quiet breeze, and before I knew it, you became my entire atmosphere. Every laugh we share, every late-night call where we lose track of time, and even the moments when distance makes things hard, only serves to show me how special what we have is. <br/><br/>
                      You have a way of lighting up my darkest days with just a single text. I love your innocence, your gentle soul, and the fierce loyalty you carry. On your birthday, I want to promise you that no matter what storms come, I am holding your hand. I believe in you, in your dreams, and in us. Thank you for choosing me every single day. Happy Birthday, my love. ❤️
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                      <Box component="img" src="/letter/WhatsApp Image 2026-06-16 at 6.50.00 PM.jpeg" alt="Letter Photo" sx={{ width: '100%', maxWidth: 420, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
                    </Box>
                    <Typography align="right" sx={{ fontFamily: "'Caveat', cursive", fontSize: "2rem", color: "#ff4081", fontWeight: "bold" }}>
                      Yours Forever, Prasanth.
                    </Typography>
                  </Box>
                )}
              </Card>
            </Box>
          </Box>
        )}

        {/* Our Beautiful Journey Tab Panel */}
        {activeTab === "journey" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2, maxWidth: 800, mx: "auto" }}>
            {/* Journey Header */}
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="h3" sx={{ fontFamily: "'Pacifico', cursive", color: "#ff4081", mb: 2, textShadow: "0 4px 20px rgba(255,64,129,0.3)" }}>
                Our Beautiful Journey ✨
              </Typography>
              <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit', sans-serif", fontSize: "1.1rem", maxWidth: 600, mx: "auto" }}>
                A love story written in smiles, late-night calls, and little moments that changed everything.
              </Typography>
            </Box>

            {/* Chapter Cards */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {/* Chapter 1 */}
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,240,245,0.95))", border: "2px solid rgba(255,64,129,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,64,129,0.1), transparent)", pointerEvents: "none" }} />
                <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#c2185b", mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
                  💖 The Day Everything Changed
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2, fontSize: "1.05rem", fontStyle: "italic" }}>
                  "I never knew one person could change my whole world until you came into my life. What started as simple conversations slowly became the most beautiful part of my every day. Meeting you wasn't just a moment—it was the beginning of my favorite story."
                </Typography>
              </Card>

              {/* Chapter 2 */}
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(232,245,255,0.95))", border: "2px solid rgba(76,195,247,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(76,195,247,0.1), transparent)", pointerEvents: "none" }} />
                <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#1565c0", mb: 2 }}>
                  🌍❤️ Through Every Distance
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2, fontSize: "1.05rem", fontStyle: "italic" }}>
                  "There were times when life kept us apart and moments when we couldn't be together as much as we wanted. Yet somehow, every reunion felt special, every message felt precious, and every call reminded me that our bond was stronger than any distance or absence."
                </Typography>
              </Card>

              {/* Chapter 3 */}
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,243,224,0.95))", border: "2px solid rgba(255,183,77,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: -15, left: "50%", width: 80, height: 80, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,183,77,0.15), transparent)", pointerEvents: "none" }} />
                <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#e65100", mb: 2 }}>
                  🌹 The Real You
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2, fontSize: "1.05rem", fontStyle: "italic" }}>
                  "You may be a little short-tempered sometimes, but that's one of the many things that makes you uniquely you. Behind that tiny storm is the sweetest, most innocent soul I've ever known. Your heart is pure, your intentions are genuine, and your smile has a way of making everything better."
                </Typography>
              </Card>

              {/* Chapter 4 */}
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(243,229,245,0.95))", border: "2px solid rgba(186,104,200,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#7b1fa2", mb: 2 }}>
                  🤗 Our Safe Place
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2, fontSize: "1.05rem", fontStyle: "italic" }}>
                  "One of the things I treasure most is the trust we share. You've let me see the real you—the happy you, the emotional you, the stubborn you, and the innocent you. Knowing that you're comfortable being yourself with me is one of the greatest gifts you've ever given me."
                </Typography>
              </Card>

              {/* Chapter 5 */}
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(232,245,233,0.95))", border: "2px solid rgba(129,199,132,0.15)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#2e7d32", mb: 2 }}>
                  📸 The Memories We Created
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2, fontSize: "1.05rem", fontStyle: "italic" }}>
                  "From random conversations to unforgettable moments, from laughter that made our cheeks hurt to the smallest memories that only we understand, every moment with you has become a piece of a beautiful collection I'll cherish forever."
                </Typography>
              </Card>

              {/* Chapter 6 */}
              <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,235,238,0.95))", border: "2px solid rgba(244,67,54,0.12)", boxShadow: "0 20px 50px rgba(0,0,0,0.08)", position: "relative", overflow: "hidden" }}>
                <Typography variant="h5" sx={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, color: "#c62828", mb: 2 }}>
                  ❤️ My Happiness, My Home
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2, fontSize: "1.05rem", fontStyle: "italic" }}>
                  "What I love most is seeing you happy. Some of my favorite memories are the moments when we forgot about everything else and simply enjoyed being together. Your happiness has become my happiness, and your smile will always be one of my favorite sights in the world."
                </Typography>
              </Card>

              {/* Final Chapter - Birthday */}
              <Card sx={{ p: { xs: 4, md: 6 }, borderRadius: 6, background: "linear-gradient(135deg, #fff0f5, #fce4ec, #fff)", border: "3px solid rgba(255,64,129,0.3)", boxShadow: "0 25px 60px rgba(255,64,129,0.15)", textAlign: "center", position: "relative", overflow: "hidden" }}>
                <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at 50% 0%, rgba(255,64,129,0.08), transparent 70%)", pointerEvents: "none" }} />
                <CakeIcon sx={{ fontSize: 50, color: "#ff4081", mb: 2, animation: "heartbeat 2s infinite" }} />
                <Typography variant="h4" sx={{ fontFamily: "'Pacifico', cursive", color: "#c2185b", mb: 3 }}>
                  Today & Forever 🎂✨
                </Typography>
                <Typography variant="body1" sx={{ fontFamily: "'Outfit', sans-serif", color: "#374151", lineHeight: 2.2, fontSize: "1.1rem", fontStyle: "italic", maxWidth: 600, mx: "auto", mb: 4 }}>
                  "On your birthday, I just want you to know how grateful I am for every moment, every memory, every challenge we've overcome, and every smile we've shared. Thank you for trusting me, for staying by my side, and for being the beautiful person you are. No matter what comes next, our story will always be one of the most precious parts of my life."
                </Typography>
                <Box sx={{ p: 3, borderRadius: 4, background: "linear-gradient(135deg, #ff4081, #e91e63)", display: "inline-block", boxShadow: "0 10px 30px rgba(255,64,129,0.4)" }}>
                  <Typography variant="h5" sx={{ fontFamily: "'Caveat', cursive", color: "#fff", fontWeight: "bold", fontSize: "1.6rem" }}>
                    Happy Birthday, My Love. ❤️🎂✨
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ fontFamily: "'Caveat', cursive", color: "#ff4081", mt: 3, fontSize: "1.4rem", fontWeight: "bold" }}>
                  "You are my favorite chapter, my safest place, and the most beautiful blessing life has given me."
                </Typography>
              </Card>
            </Box>
          </Box>
        )}

        {/* Arcade Hub Tab Panel */}
        {activeTab === "arcade" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 5, background: "rgba(255,255,255,0.92)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <CatchHeartsGame />
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 5, background: "rgba(255,255,255,0.92)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <MemoryMatchGame />
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ p: { xs: 3, md: 5 }, borderRadius: 6, background: "rgba(255,255,255,0.95)", border: "1.5px solid rgba(255,64,129,0.15)" }}>
                  <Typography variant="h5" color="#d81b60" fontWeight="bold" align="center" mb={3} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                    🎮 Couple Quiz Challenge
                  </Typography>
                  {!quizFinished ? (
                    <Box textAlign="center" sx={{ animation: "fadeInUp 0.5s ease" }}>
                      <Typography sx={{ color: "#d81b60", fontWeight: "bold", mb: 2 }}>Question {quizStep + 1} of {COUPLE_QUIZ.length}</Typography>
                      <Typography variant="h6" sx={{ color: "#374151", mb: 4, fontWeight: "bold" }}>{COUPLE_QUIZ[quizStep].q}</Typography>
                      <Grid container spacing={2}>
                        {COUPLE_QUIZ[quizStep].options.map((opt, i) => (
                          <Grid item xs={12} sm={6} key={i}>
                            <Button
                              fullWidth variant="outlined"
                              onClick={() => handleQuizAnswer(opt)}
                              disabled={!!quizFeedback}
                              sx={{ p: 2, borderRadius: 3, borderColor: "rgba(233,30,99,0.3)", color: "#c2185b", textTransform: "none" }}
                            >
                              {opt}
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                      {quizFeedback && (
                        <Typography sx={{ mt: 3, fontFamily: "'Caveat',cursive", fontSize: "1.5rem", color: "#d81b60" }}>{quizFeedback}</Typography>
                      )}
                    </Box>
                  ) : (
                    <Box textAlign="center">
                      <EmojiEventsIcon sx={{ fontSize: 60, color: "#ffd54f", mb: 2 }} />
                      <Typography variant="h4" sx={{ fontFamily: "'Pacifico',cursive", color: "#d81b60", mb: 2 }}>Quiz Complete!</Typography>
                      <Typography sx={{ fontSize: "1.2rem", color: "#4a4a4a" }}>
                        You scored {quizScore} out of {COUPLE_QUIZ.length}. Regardless of the score, you win my heart every day. ❤️
                      </Typography>
                      <Button variant="contained" onClick={() => { setQuizStep(0); setQuizScore(0); setQuizFinished(false); }} sx={{ mt: 3, bgcolor: "#ff4081", borderRadius: 20 }}>Retry Quiz</Button>
                    </Box>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Cosmos Tab Panel */}
        {activeTab === "cosmos" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 5, bgcolor: "#050014", border: "1.5px solid rgba(255,255,255,0.15)", height: "100%", position: "relative" }}>
                  {!foundHearts.includes(5) && (
                    <IconButton onClick={() => handleFindHeart(5)} sx={{ position: "absolute", bottom: 10, right: 10, color: "rgba(255,255,255,0.2)", "&:hover": { color: "#ff4081" } }}>
                      <FavoriteIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  )}
                  <NightSky />
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card sx={{ p: 3, borderRadius: 5, background: "rgba(255,255,255,0.92)", border: "1.5px solid rgba(255,255,255,0.6)", height: "100%" }}>
                  <LoveMap />
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Future Tab Panel */}
        {activeTab === "future" && (
          <Box sx={{ animation: "fadeInUp 0.6s ease", mt: 2 }}>
            {/* Timeline */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" align="center" mb={2} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                🌸 Interactive Roadmap Timeline
              </Typography>
              <Typography align="center" sx={{ color: "rgba(255,255,255,0.8)", mb: 4 }}>Our dreams and adventures, plotted in time... ✨</Typography>
              
              <Box sx={{ maxWidth: 700, mx: "auto", px: 2, position: "relative" }}>
                <Box sx={{ position: "absolute", left: { xs: 28, md: 36 }, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, #ff4081, #ba68c8, #5c6bc0)", opacity: 0.5 }} />
                {[
                  { year: "2026 🌸", title: "First Trip Together ✈️", desc: "Exploring new horizons, hand in hand. Wherever we go, it becomes our favorite place." },
                  { year: "2027 🏡", title: "Our Dream Cozy Nest", desc: "Building a space filled with warmth, endless coffee, and arguments over wall colors. 😂" },
                  { year: "2028 ✨", title: "More Adventures", desc: "Sipping coffee, writing stories, sharing sunsets, and growing stronger together." },
                  { year: "2030 ⏳", title: "Letter from Future Me", desc: "Click below to read a message sent from June 13, 2030." }
                ].map((item, i) => (
                  <Box key={i} sx={{ display: "flex", gap: 3, mb: 4, alignItems: "flex-start", position: "relative" }}>
                    <Box sx={{ minWidth: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#fff", border: "2.5px solid #ff4081", zIndex: 1, fontWeight: "bold", color: "#c2185b" }}>
                      {item.year.split(" ")[0]}
                    </Box>
                    <Card sx={{ flex: 1, p: 3, borderRadius: 4, background: "rgba(255,255,255,0.88)", border: "1.5px solid rgba(255,255,255,0.6)", transition: "all 0.3s ease", "&:hover": { transform: "translateX(6px)" } }}>
                      <Typography fontWeight="bold" color="#c2185b" mb={1}>{item.title}</Typography>
                      <Typography variant="body2" color="#4a4a4a" mb={2}>{item.desc}</Typography>
                      {i === 3 && (
                        <Button
                          size="small" variant="contained"
                          onClick={() => {
                            setCurrentReason("Date: June 13, 2030 \n\nHey Kuttymaa, \n\nWe still laugh at the same silly things. We still annoy each other. And somehow I still fall in love with you every day. Happy 5-year future anniversary! \n\nLove, \nPrasanth.");
                            setReasonsDialogOpen(true);
                          }}
                          sx={{ bgcolor: "#ff4081", borderRadius: 20 }}
                        >
                          Read Future Letter ✉️
                        </Button>
                      )}
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Alternate Universes */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" align="center" mb={3} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                🌍 Alternate Universes
              </Typography>
              <Grid container spacing={3} sx={{ maxWidth: 900, mx: "auto" }}>
                {[
                  { title: "Universe 1", desc: "The universe where we never met. Different routines, different dreams. A gray, empty universe." },
                  { title: "Universe 2", desc: "The universe where we met, but we never spoke. Just strangers who passed by each other in the crowd." },
                  { title: "Universe 3", desc: "The universe where we spoke, but never became close. Just friends who checked up once a year." },
                  { title: "This Universe ❤️", desc: "The one where you are reading this right now. The one where we talk for hours, annoy each other, and love deeply. The only universe I want.", highlight: true }
                ].map((uni, uIdx) => (
                  <Grid item xs={12} sm={6} md={3} key={uIdx}>
                    <Card sx={{ p: 3, borderRadius: 4, height: "100%", bgcolor: uni.highlight ? "#fff" : "rgba(255,255,255,0.8)", border: uni.highlight ? "2.5px solid #ff4081" : "1px solid rgba(255,255,255,0.4)" }}>
                      <Typography variant="subtitle1" fontWeight="bold" color={uni.highlight ? "#ff4081" : "#555"} align="center" mb={2}>{uni.title}</Typography>
                      <Typography variant="body2" sx={{ color: "#4a4a4a", lineHeight: 1.6 }}>{uni.desc}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Things I Hope For You */}
            <Box sx={{ mb: 6 }}>
              <Card sx={{ p: 4, borderRadius: 6, background: "rgba(255,255,255,0.92)", maxWidth: 650, mx: "auto" }}>
                <Typography variant="h6" color="#d81b60" fontWeight="bold" align="center" mb={3}>
                  🌸 Things I Hope For You (Personal Wishes)
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, textAlign: "left" }}>
                  {[
                    "I hope you become everything you've ever dreamed of, succeeding in all your goals.",
                    "I hope you never lose that precious smile of yours that lights up my entire screen.",
                    "I hope you learn how amazing, intelligent, and strong you truly are.",
                    "I hope life is always gentle with your heart, and I promise to try my best to keep it safe."
                  ].map((hope, hIdx) => (
                    <Box key={hIdx} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1.2rem", color: "#ff4081" }}>🌸</span>
                      <Typography variant="body2" color="#374151">{hope}</Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>

            {/* Kuttymaa According to People */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" color="white" fontWeight="bold" align="center" mb={3} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                🎭 Kuttymaa According to Different People
              </Typography>
              <Grid container spacing={3} sx={{ maxWidth: 800, mx: "auto" }}>
                {[
                  { label: "The World 🌍", desc: "Just another girl in the crowd." },
                  { label: "Her Friends 👥", desc: "A sweet, supportive, fun friend." },
                  { label: "Her Family 🏡", desc: "A beloved, caring daughter." },
                  { label: "Me ❤️", desc: "My absolute favorite person, my home, my universe." }
                ].map((people, pIdx) => (
                  <Grid item xs={6} sm={3} key={pIdx}>
                    <Card sx={{ p: 2.5, borderRadius: 3, textAlign: "center", bgcolor: "rgba(255,255,255,0.9)", height: "100%", border: "1.5px solid rgba(255,64,129,0.1)" }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="#c2185b" mb={1}>{people.label}</Typography>
                      <Typography variant="body2" color="#4a4a4a">{people.desc}</Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Buttons: Thought generator, Pickup lines */}
            <Box sx={{ py: 4, display: "flex", gap: 3, justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="contained"
                onClick={() => {
                  const t = THOUGHTS_GENERATOR_LIST[Math.floor(Math.random() * THOUGHTS_GENERATOR_LIST.length)];
                  setRandomThought(t);
                }}
                sx={{ bgcolor: "#ff4081", color: "#fff", borderRadius: 20, px: 4, py: 1.2, fontWeight: "bold" }}
              >
                💭 What am I thinking right now?
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  const l = PICKUP_LINES[Math.floor(Math.random() * PICKUP_LINES.length)];
                  setPickupLine(l);
                }}
                sx={{ bgcolor: "#ba68c8", color: "#fff", borderRadius: 20, px: 4, py: 1.2, fontWeight: "bold" }}
              >
                🌹 Get a pickup line
              </Button>

              {randomThought && (
                <Dialog open={randomThought !== ""} onClose={() => setRandomThought("")} PaperProps={{ sx: { borderRadius: 4, p: 3, textAlign: "center", maxWidth: 320 } }}>
                  <Typography variant="h6" color="#d81b60" fontWeight="bold" gutterBottom>🧠 My Thought Right Now</Typography>
                  <Typography variant="body1" sx={{ fontStyle: "italic", my: 2, color: "#374151" }}>"{randomThought}"</Typography>
                  <Button variant="contained" onClick={() => setRandomThought("")} sx={{ bgcolor: "#ff4081", borderRadius: 20 }}>Cute! ❤️</Button>
                </Dialog>
              )}

              {pickupLine && (
                <Dialog open={pickupLine !== ""} onClose={() => setPickupLine("")} PaperProps={{ sx: { borderRadius: 4, p: 3, textAlign: "center", maxWidth: 320 } }}>
                  <Typography variant="h6" color="#8e24aa" fontWeight="bold" gutterBottom>🌹 Pick-up Line for You</Typography>
                  <Typography variant="body1" sx={{ my: 2, color: "#374151" }}>"{pickupLine}"</Typography>
                  <Button variant="contained" onClick={() => setPickupLine("")} sx={{ bgcolor: "#ba68c8", borderRadius: 20 }}>Smile! 😊</Button>
                </Dialog>
              )}
            </Box>
          </Box>
        )}

        {/* Digital Love Notes Jar Drawer */}
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

        {/* Voice Notes */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
            <MicIcon sx={{ color: "white", fontSize: 30 }} />
            <Typography variant="h4" fontWeight="bold" color="white" sx={{ fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1.8rem", md: "2.4rem" }, textShadow: "0 4px 10px rgba(106,27,154,0.2)" }}>
              Hidden Voice Notes 🎤
            </Typography>
          </Box>
          <Typography align="center" sx={{ color: "rgba(255,255,255,0.8)", mb: 5, fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem" }}>
            Special audio messages simulated for you 🔊
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
                  transition: "all 0.35s ease",
                  "&:hover": { transform: "translateY(-6px) scale(1.04)", boxShadow: `0 20px 45px ${note.color}88` },
                }}
              >
                <MicIcon sx={{ fontSize: 32 }} />
                {note.label}
              </Button>
            ))}
          </Box>
        </Box>

        {/* ── Before You / After You ── */}
        <Box sx={{ py: 6, position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} sx={{ maxWidth: 900, mx: "auto", px: 2 }}>
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
                    placeholder="Dear future Kuttymaa..."
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
            <Card sx={{ borderRadius: 4, overflow: "hidden", position: "relative", paddingTop: "56.25%", border: "2px solid rgba(255,255,255,0.2)" }}>
              <Box component="img" src="/msgforyou/WhatsApp Image 2026-06-14 at 9.45.08 AM.jpeg" alt="Message For You" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }} />
              <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.65) 80%)" }} />
              <Typography sx={{ position: "absolute", bottom: 24, left: 24, right: 24, color: "#ffffff", fontFamily: "'Outfit',sans-serif", fontSize: { xs: "1rem", md: "1.2rem" }, fontWeight: 700, textShadow: "0 0 20px rgba(0,0,0,0.8)", lineHeight: 1.4 }}>
                "Every message from you feels like a little piece of forever."
              </Typography>
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
              onClick={() => window.open("/public/VID-20260628-WA0001.mp4", "_blank")}
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
          <Typography sx={{ display: "inline-block", color: "rgba(255,255,255,0.95)", fontFamily: "'Outfit',sans-serif", fontSize: "0.95rem", mb: 3, letterSpacing: "2px", textTransform: "uppercase", px: 3, py: 1, borderRadius: 3, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}>
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

          {/* Moments video list */}
          {(() => {
            const MOMENTS_VIDEOS = [
              { src: "/Moments/Screenrecorder-2026-06-20-17-15-26-124.mp4", label: "Moment 1 🌸" },
              { src: "/Moments/Screenrecorder-2026-06-20-17-17-12-903.mp4", label: "Moment 2 💫" },
              { src: "/Moments/Screenrecorder-2026-06-20-17-40-12-553.mp4", label: "Moment 3 🌙" },
              { src: "/Moments/Screenrecorder-2026-06-20-17-42-16-575.mp4", label: "Moment 4 💖" },
              { src: "/Moments/Screenrecorder-2026-06-20-18-12-12-138.mp4", label: "Moment 5 ✨" },
              { src: "/Moments/Screenrecorder-2026-06-27-16-11-21-211.mp4", label: "Moment 6 🎀" },
              { src: "/Moments/Screenrecorder-2026-06-27-16-14-59-420.mp4", label: "Moment 7 🌺" },
              { src: "/Moments/Screenrecorder-2026-06-27-16-48-01-885.mp4", label: "Moment 8 💝" },
              { src: "/Moments/Screenrecorder-2026-06-27-17-10-50-992.mp4", label: "Moment 9 🦋" },
              { src: "/Moments/Screenrecorder-2026-06-27-18-34-07-963.mp4", label: "Moment 10 🌈" },
              { src: "/Moments/VID-20250804-WA0024.mp4", label: "Moment 11 💌" },
              { src: "/Moments/VID-20260514-WA0000.mp4", label: "Moment 12 🩷" },
              { src: "/Moments/20251203232759917.mp4", label: "Moment 13 ✨" },
            ];
            return (
              <>
                {/* Main Video Player */}
                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    border: "4px solid #ffffff",
                    lineHeight: 0,
                    bgcolor: "#08060d",
                    mb: 2,
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
                      maxHeight: "55vh",
                      borderRadius: 1,
                      objectFit: "contain",
                    }}
                  >
                    <source src={MOMENTS_VIDEOS[activeVideo].src} type="video/mp4" />
                  </Box>
                </Box>

                {/* Now playing label */}
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: "#ab47bc", fontFamily: "'Outfit', sans-serif", mb: 1.5, textAlign: "center" }}
                >
                  ▶ Playing: {MOMENTS_VIDEOS[activeVideo].label}
                </Typography>

                {/* Scrollable thumbnail strip */}
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    overflowX: "auto",
                    pb: 1,
                    px: 0.5,
                    "&::-webkit-scrollbar": { height: 4 },
                    "&::-webkit-scrollbar-track": { bgcolor: "rgba(0,0,0,0.05)", borderRadius: 2 },
                    "&::-webkit-scrollbar-thumb": { bgcolor: "#ab47bc", borderRadius: 2 },
                  }}
                >
                  {MOMENTS_VIDEOS.map((vid, idx) => (
                    <Box
                      key={idx}
                      onClick={() => {
                        if (videoRef.current) videoRef.current.pause();
                        setActiveVideo(idx);
                      }}
                      sx={{
                        flexShrink: 0,
                        width: 90,
                        cursor: "pointer",
                        borderRadius: 2,
                        overflow: "hidden",
                        border: activeVideo === idx ? "2.5px solid #ab47bc" : "2.5px solid transparent",
                        opacity: activeVideo === idx ? 1 : 0.6,
                        transition: "all 0.2s ease",
                        "&:hover": { opacity: 1, transform: "scale(1.05)" },
                        bgcolor: "#1a0a2e",
                      }}
                    >
                      <Box
                        component="video"
                        src={vid.src}
                        muted
                        preload="metadata"
                        sx={{ width: "100%", height: 60, objectFit: "cover", display: "block", pointerEvents: "none" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          display: "block",
                          textAlign: "center",
                          color: activeVideo === idx ? "#ab47bc" : "#888",
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: "bold",
                          fontSize: "0.65rem",
                          py: 0.5,
                          px: 0.5,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {vid.label}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            );
          })()}
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
                  🎙️ Voice note from Prasanth — read the message above with your heart 💙
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
                Kuttymaa's Birthday Project
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 2, letterSpacing: "2px" }}>
                PRODUCED & DIRECTED BY
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#fff", fontSize: "1.8rem", mb: 5 }}>
                Prasanth
              </Typography>

              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1.2rem", mb: 2, letterSpacing: "2px" }}>
                STARRING
              </Typography>
              <Typography sx={{ fontFamily: "'Outfit',sans-serif", color: "#fff", fontSize: "1.8rem", mb: 5 }}>
                Kuttymaa ❤️
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

      {/* ── Lightbox Dialog ── */}
      <Dialog
        open={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            bgcolor: "rgba(0,0,0,0.96)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={() => setLightboxImage(null)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.12)",
            zIndex: 10,
            "&:hover": { bgcolor: "rgba(255,64,129,0.5)" },
            transition: "background 0.2s"
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Folder + position label */}
        {lightboxImage && (
          <Typography
            variant="caption"
            sx={{
              position: "absolute",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: "0.5px",
              textTransform: "capitalize"
            }}
          >
            📁 {lightboxImage.folderName} &nbsp;·&nbsp; {lightboxImage.index + 1} / {galleryData[lightboxImage.folderName]?.length}
          </Typography>
        )}

        {/* Prev button */}
        <IconButton
          onClick={handleLightboxPrev}
          sx={{
            position: "absolute",
            left: { xs: 6, sm: 20 },
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(229,9,20,0.7)" },
            transition: "background 0.2s",
            zIndex: 10,
            p: { xs: 1, sm: 1.5 }
          }}
        >
          <KeyboardArrowLeftIcon sx={{ fontSize: { xs: 28, sm: 40 } }} />
        </IconButton>

        {/* Image */}
        {lightboxImage && (
          <Box
            component="img"
            src={lightboxImage.src}
            alt="Gallery preview"
            sx={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: 2,
              boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              userSelect: "none",
              animation: "fadeInUp 0.2s ease"
            }}
          />
        )}

        {/* Next button */}
        <IconButton
          onClick={handleLightboxNext}
          sx={{
            position: "absolute",
            right: { xs: 6, sm: 20 },
            color: "#fff",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(229,9,20,0.7)" },
            transition: "background 0.2s",
            zIndex: 10,
            p: { xs: 1, sm: 1.5 }
          }}
        >
          <KeyboardArrowRightIcon sx={{ fontSize: { xs: 28, sm: 40 } }} />
        </IconButton>

        {/* Bottom thumbnail strip */}
        {lightboxImage && (
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 0.8,
              maxWidth: "80vw",
              overflowX: "auto",
              pb: 0.5,
              "&::-webkit-scrollbar": { height: 3 },
              "&::-webkit-scrollbar-thumb": { bgcolor: "#e50914", borderRadius: 2 }
            }}
          >
            {galleryData[lightboxImage.folderName]?.map((src, i) => (
              <Box
                key={i}
                onClick={() => setLightboxImage({ src, folderName: lightboxImage.folderName, index: i })}
                component="img"
                src={src}
                alt={`thumb-${i}`}
                sx={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  objectFit: "cover",
                  borderRadius: 1,
                  cursor: "pointer",
                  opacity: lightboxImage.index === i ? 1 : 0.45,
                  border: lightboxImage.index === i ? "2px solid #e50914" : "2px solid transparent",
                  transition: "all 0.2s ease",
                  "&:hover": { opacity: 1 }
                }}
              />
            ))}
          </Box>
        )}
      </Dialog>
    </Box>
  );
}
