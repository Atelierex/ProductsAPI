const express = require('express');
const request = require('request');

const servers = require('./serverConfig.js')
let currentServer = 0;

const requestHandler = (req, res) => {
  req.pipe(request({url: servers[currentServer] + req.url})).pipe(res)
  currentServer = (currentServer + 1) % servers.length;
}

const server = express().get('*', requestHandler);

server.listen(3000);