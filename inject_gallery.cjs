const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

const startStr = '{/* Netflix Carousel */}';
const endStr = '{/* Polaroid Memory Grid */}';

const startIndex = code.indexOf(startStr);
const endIndex = code.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
  const newModule = `{/* Categorized Folder Memories */}
            <Box sx={{ mb: 6 }}>
              {Object.keys(galleryData).map((folderName) => (
                <Box key={folderName} sx={{ mb: 4 }}>
                  <Typography variant="h5" color="white" fontWeight="bold" mb={2} sx={{ fontFamily: "'Outfit', sans-serif", textTransform: 'capitalize' }}>
                    📁 {folderName}
                  </Typography>
                  <Grid container spacing={2} sx={{ overflowX: "auto", flexWrap: { xs: "nowrap", md: "wrap" }, pb: 2 }}>
                    {galleryData[folderName].map((imgSrc, idx) => (
                      <Grid item xs={8} sm={4} md={3} key={idx} sx={{ flexShrink: 0 }}>
                        <Card className="glass-card" sx={{ borderRadius: 3, overflow: "hidden", transition: "all 0.3s ease", "&:hover": { transform: "scale(1.05)" } }}>
                          <CardMedia component="img" image={imgSrc} sx={{ height: 200, objectFit: "cover" }} />
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ))}
            </Box>

            `;
  code = code.substring(0, startIndex) + newModule + code.substring(endIndex);
  fs.writeFileSync('src/App.jsx', code);
  console.log('Successfully replaced Netflix module with Folder Gallery.');
} else {
  console.log('Could not find start or end strings.');
}
