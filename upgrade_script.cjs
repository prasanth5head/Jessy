const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add framer-motion import
if (!code.includes('framer-motion')) {
  code = code.replace(/import \{ useState, useRef, useEffect \} from "react";/, 
    'import { useState, useRef, useEffect } from "react";\nimport { motion, AnimatePresence } from "framer-motion";');
}

// 2. Add glass classes to UI components safely
code = code.replace(/<Card sx=\{/g, '<Card className="glass-card" sx={');
// Only replace <Card> if it's an opening tag not followed by a closing bracket directly
code = code.replace(/<Card>/g, '<Card className="glass-card">');
code = code.replace(/<Box sx=\{\{\s*p:\s*[34]/g, '<Box className="glass-panel" sx={{ p: 3');

// 3. Make buttons premium
code = code.replace(/<Button\n/g, '<Button className="glass-button"\n');
code = code.replace(/<Button /g, '<Button className="glass-button" ');

// 4. Wrap the MAIN App container
// The App function returns: 
// return (
//   <Box sx={{
// We will just do a targeted replace for the first one inside function App() {
// Wait, safer to replace the return statement of `function App()` directly.
const appReturnIndex = code.indexOf('return (\\n    <Box sx={{ minHeight: "100vh"');
if (appReturnIndex !== -1) {
    code = code.replace(/return \(\n\s*<Box sx=\{\{ minHeight: "100vh"/, 
      'return (\n    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="app-container">\n      <Box sx={{ minHeight: "100vh"');
    
    // Find the last closing tag of App. It should be the last `</Box>\n  );\n}` in the file.
    const lastBoxIndex = code.lastIndexOf('</Box>\n  );\n}');
    if (lastBoxIndex !== -1) {
        code = code.substring(0, lastBoxIndex) + '</Box>\n    </motion.div>\n  );\n}' + code.substring(lastBoxIndex + 14);
    }
}

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx upgraded successfully');
