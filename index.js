import express from 'express';
import path from 'path';
const app = express();

const __dirname = path.resolve();
// Serve static files from the "public" directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// Start the server
const port = 8080;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
