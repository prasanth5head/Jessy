const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

const folderGridStart = '{/* Categorized Folder Memories */}';
const folderGridEnd = '{/* Polaroid Memory Grid */}';
const startIndex = code.indexOf(folderGridStart);
const endIndex = code.indexOf(folderGridEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newModule = `{/* Categorized Folder Memories */}
            <Box sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" color="white" fontWeight="bold" sx={{ fontFamily: "'Outfit', sans-serif" }}>
                  🗂️ Memory Lane (Images)
                </Typography>
              </Box>
              
              {Object.keys(galleryData).map((folderName) => (
                <Card key={folderName} className="glass-card" sx={{ mb: 4, p: 3, borderRadius: 4, bgcolor: 'rgba(255, 192, 203, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                  <Typography variant="subtitle1" sx={{ color: '#ffd54f', fontWeight: 'bold', mb: 1, textTransform: 'uppercase' }}>
                    {folderName}
                  </Typography>

                  <Typography variant="subtitle1" align="center" sx={{ color: '#ff80ab', fontStyle: 'italic', fontWeight: 'bold', mb: 3 }}>
                    The incrediables year for us
                  </Typography>

                  <Box sx={{ 
                    display: 'flex', 
                    gap: 1.5, 
                    overflowX: 'auto', 
                    flexWrap: openFolders[folderName] ? 'wrap' : 'nowrap', 
                    pb: 2, 
                    '&::-webkit-scrollbar': { height: 6 }, 
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,64,129,0.5)', borderRadius: 3 } 
                  }}>
                    {galleryData[folderName].map((imgSrc, idx) => (
                      <Box key={idx} sx={{ 
                        flexShrink: 0, 
                        width: 90, 
                        height: 110, 
                        borderRadius: 1.5, 
                        overflow: 'hidden', 
                        cursor: 'pointer', 
                        display: (openFolders[folderName] || idx < 6) ? 'block' : 'none',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }} onClick={() => setSelectedGalleryImage(imgSrc)}>
                        <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </Box>
                    ))}
                  </Box>

                  {galleryData[folderName].length > 6 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                      <Button onClick={() => toggleFolder(folderName)} sx={{ color: '#64b5f6', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {openFolders[folderName] ? 'SHOW LESS' : 'VIEW ALL'}
                      </Button>
                    </Box>
                  )}
                </Card>
              ))}
            </Box>

            `;
  code = code.substring(0, startIndex) + newModule + code.substring(endIndex);
  fs.writeFileSync('src/App.jsx', code);
  console.log('UI updated to match screenshot.');
} else {
  console.log('Could not find injection points.');
}
