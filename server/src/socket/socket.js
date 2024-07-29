const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();

module.exports = { app };