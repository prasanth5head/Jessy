const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// ============================================================
// 1. FIX POLAROID SECTION — Match the HTML the user shared
//    Full-width cards stacked vertically, no rotation, clean card
//    with img using width:100% height:auto object-fit:contain
// ============================================================

// Replace the PolaroidCard component with a cleaner version
const oldPolaroid = `function PolaroidCard({ img, caption, rotation }) {
  return (
    <Card
      sx={{
        background: "#ffffff",
        p: 2,
        pb: 4,
        borderRadius: 0,
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
        transform: \`rotate(\${rotation}deg)\`,
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
          height: "auto",
          width: "100%",
          maxHeight: 500,
          objectFit: "contain",
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
}`;

const newPolaroid = `function PolaroidCard({ img, caption, rotation }) {
  return (
    <Card
      sx={{
        background: "#ffffff",
        borderRadius: 2,
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
        "&:hover": {
          transform: "scale(1.02) translateY(-5px)",
          boxShadow: "0 25px 45px rgba(255, 64, 129, 0.25)",
          zIndex: 10,
        },
      }}
    >
      <Box sx={{ p: 1.5 }}>
        <img
          alt={caption}
          src={img}
          style={{ width: "100%", height: "auto", objectFit: "contain", display: "block" }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          fontFamily: "'Caveat', cursive",
          fontWeight: 700,
          textAlign: "center",
          py: 2,
          px: 2,
          color: "#d81b60",
          fontSize: "1.5rem",
        }}
      >
        {caption}
      </Typography>
    </Card>
  );
}`;

code = code.replace(oldPolaroid, newPolaroid);

// Fix the Polaroid Grid — single column centered like the user's HTML
code = code.replace(
  /<Grid container spacing={4} sx={{ justifyContent: "center" }}>\s*\{MEMORIES\.map\(\(m, i\) => \(\s*<Grid item xs={12} sm={6} md={4} key={i}>/,
  `<Grid container spacing={4} sx={{ justifyContent: "center" }}>
                {MEMORIES.map((m, i) => (
                  <Grid item xs={12} sm={10} md={8} key={i}>`
);

// ============================================================
// 2. FIX MEMORY LANE SECTION — Match the grid card layout
//    from the user's other site version
// ============================================================

const folderGridStart = '{/* Categorized Folder Memories */}';
const folderGridEnd = '{/* Polaroid Memory Grid */}';
const startIndex = code.indexOf(folderGridStart);
const endIndex = code.indexOf(folderGridEnd);

const FOLDER_SUBTITLES = {
  "Call": "our voice is the sweetest melody",
  "image": "the incrediables year for us",
  "insta": "our social media love story",
  "Kuttymaa Rejections": "even rejections are cute with you",
  "Message(SMS)": "every text holds a memory",
  "Poem": "words from my heart to yours",
  "Snap": "our snapchat moments together",
  "VideoCall": "seeing your face lights up my day",
  "Wallpaper": "you are my wallpaper and my world",
  "Whatsapp": "our endless conversations",
  "Your House": "where my heart feels at home",
  "Moments": "our live moments together"
};

if (startIndex !== -1 && endIndex !== -1) {
  // Build the subtitle map as a JS object string for inline use
  const subtitleEntries = Object.entries(FOLDER_SUBTITLES)
    .map(([k, v]) => `"${k}": "${v}"`)
    .join(', ');

  const newModule = `{/* Categorized Folder Memories */}
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" align="center" color="white" fontWeight="bold" mb={2} sx={{ fontFamily: "'Outfit', sans-serif" }}>
                🗂️ Memory Lane (Images)
              </Typography>
              <Grid container spacing={3}>
                {Object.keys(galleryData).map((folderName) => {
                  const subtitles = {${subtitleEntries}};
                  return (
                  <Grid item xs={12} sm={6} md={4} key={folderName}>
                    <Card sx={{ 
                      bgcolor: 'rgba(255, 192, 203, 0.12)', 
                      border: '1px solid rgba(255, 255, 255, 0.15)', 
                      borderRadius: 3, 
                      p: 2,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease',
                      '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(255,64,129,0.2)' }
                    }}>
                      <Typography variant="body1" sx={{ color: '#ffd54f', fontWeight: 'bold', mb: 0.5 }}>
                        {folderName}
                      </Typography>
                      <Typography variant="subtitle1" align="center" sx={{ color: '#ff80ab', fontStyle: 'italic', fontWeight: 'bold', mb: 2, fontSize: '0.85rem' }}>
                        {subtitles[folderName] || "our beautiful memories"}
                      </Typography>

                      <Box sx={{ 
                        display: 'flex', 
                        gap: 0.8, 
                        overflowX: 'auto',
                        flexWrap: 'nowrap',
                        mb: 1,
                        '&::-webkit-scrollbar': { height: 4 },
                        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,64,129,0.4)', borderRadius: 2 }
                      }}>
                        {galleryData[folderName].slice(0, openFolders[folderName] ? galleryData[folderName].length : 6).map((imgSrc, idx) => (
                          <Box 
                            key={idx} 
                            component="img"
                            alt={imgSrc.split('/').pop()}
                            src={imgSrc}
                            onClick={() => setSelectedGalleryImage(imgSrc)}
                            sx={{ 
                              width: 70, 
                              height: 85, 
                              borderRadius: 1.5, 
                              objectFit: 'cover', 
                              flexShrink: 0, 
                              cursor: 'pointer',
                              transition: 'transform 0.2s',
                              '&:hover': { transform: 'scale(1.08)' }
                            }} 
                          />
                        ))}
                      </Box>

                      {galleryData[folderName].length > 6 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Button size="small" onClick={() => toggleFolder(folderName)} sx={{ color: '#64b5f6', fontWeight: 'bold', textTransform: 'capitalize' }}>
                            {openFolders[folderName] ? 'Show Less' : 'View All'}
                          </Button>
                        </Box>
                      )}
                    </Card>
                  </Grid>
                  );
                })}
              </Grid>
            </Box>

            `;
  code = code.substring(0, startIndex) + newModule + code.substring(endIndex);
}

fs.writeFileSync('src/App.jsx', code);
console.log('Memory Lane + Polaroid updated to match screenshot layout.');
