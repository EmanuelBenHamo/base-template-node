const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);

const taskRoutes = require('./api/task/task.routes');
// const connectSockets = require('./api/socket/socket.routes');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'delta bravo', // change the secret in your project
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// tell the server where from it should serve the front end files
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8081', 'http://127.0.0.1:8081', 'http://localhost:8080', 'http://127.0.0.1:3030', 'http://localhost:3030'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/task', taskRoutes);
// connectSockets(io)

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;

http.listen(port, () => {
    logger.info(`Server is running on port: ${port}`);
});