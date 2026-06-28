const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Polaroid Image issue - change objectFit: "cover" and fixed height to height: "auto", width: "100%", objectFit: "contain"
// Or simply remove fixed height and use auto so it doesn't crop but maintains aspect ratio.
code = code.replace(/height: \{ xs: 260, md: 320 \},\s*objectFit: "cover"/, 'height: "auto",\n          width: "100%",\n          maxHeight: 500,\n          objectFit: "contain"');

// 2. Folder hide/show
// Add state for open folders: const [openFolders, setOpenFolders] = useState({});
if (!code.includes('const [openFolders')) {
    code = code.replace(/const \[activeTab, setActiveTab\] = useState\("home"\);/, 'const [activeTab, setActiveTab] = useState("home");\n  const [openFolders, setOpenFolders] = useState({});\n  const toggleFolder = (folder) => setOpenFolders(prev => ({ ...prev, [folder]: !prev[folder] }));');
}

// Update the folder render block
const folderGridStart = '{/* Categorized Folder Memories */}';
const folderGridEnd = '{/* Polaroid Memory Grid */}';
const startIndex = code.indexOf(folderGridStart);
const endIndex = code.indexOf(folderGridEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newModule = `{/* Categorized Folder Memories */}
            <Box sx={{ mb: 6 }}>
              {Object.keys(galleryData).map((folderName) => (
                <Box key={folderName} sx={{ mb: 4 }}>
                  <Card className="glass-card" onClick={() => toggleFolder(folderName)} sx={{ cursor: 'pointer', mb: 2, p: 2, display: 'flex', alignItems: 'center', transition: 'all 0.3s ease', '&:hover': { transform: 'scale(1.02)' } }}>
                    <Typography variant="h5" color="white" fontWeight="bold" sx={{ fontFamily: "'Outfit', sans-serif", textTransform: 'capitalize' }}>
                      {openFolders[folderName] ? '📂' : '📁'} {folderName} ({galleryData[folderName].length} photos)
                    </Typography>
                  </Card>
                  
                  <AnimatePresence>
                    {openFolders[folderName] && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <Grid container spacing={2} sx={{ pb: 2 }}>
                          {galleryData[folderName].map((imgSrc, idx) => (
                            <Grid item xs={6} sm={4} md={3} key={idx}>
                              <Card className="glass-card" onClick={() => setSelectedGalleryImage(imgSrc)} sx={{ cursor: "pointer", borderRadius: 3, overflow: "hidden", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.05)" } }}>
                                <CardMedia component="img" image={imgSrc} sx={{ height: 200, objectFit: "cover" }} />
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              ))}
            </Box>

            `;
  code = code.substring(0, startIndex) + newModule + code.substring(endIndex);
}

fs.writeFileSync('src/App.jsx', code);
console.log('UI tweaked successfully.');
