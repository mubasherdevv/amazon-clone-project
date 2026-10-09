#!/usr/bin/env node

/**
 * 8x Assignment - Automated Agent Capture Hook
 * Captures verbatim prompt and final response for each exchange.
 */

const fs = require('fs');
const path = require('path');

const LOGS_DIR = path.resolve(__dirname);
const SESSION_ID = process.env.SESSION_ID || '4cf692cc-22ea-4a23-8b04-447176570fb3';
const MODEL_NAME = process.env.MODEL_NAME || 'models/gemini-3.8-flash';
const AUTHOR = process.env.AUTHOR || 'withm345';
const PROJECT = '8x-assignment';

function getSessionLogPath(sessionId) {
  const dateStr = new Date().toISOString().split('T')[0];
  const timeStr = new Date().toISOString().split('T')[1].replace(/:/g, '-').split('.')[0];
  return path.join(LOGS_DIR, `${dateStr}_${timeStr}_${sessionId}.md`);
}

function appendLogEntry({ sessionId, type, num, content, timestamp, model }) {
  const files = fs.readdirSync(LOGS_DIR).filter(f => f.endsWith(`_${sessionId}.md`));
  let filePath;

  if (files.length > 0) {
    filePath = path.join(LOGS_DIR, files[0]);
  } else {
    filePath = getSessionLogPath(sessionId);
    const dateStr = new Date().toISOString().split('T')[0];
    const header = `---
session_id: ${sessionId}
date: ${dateStr}
author: ${AUTHOR}
model: ${model || MODEL_NAME}
tool: google-ai-studio-build
project: ${PROJECT}
total_exchanges: 1
first_prompt_time: ${timestamp}
last_prompt_time: ${timestamp}
---

# Session Log - ${dateStr}

Session: \`${sessionId.substring(0, 8)}\` | Project: \`${PROJECT}\` | Author: \`${AUTHOR}\`

---

`;
    fs.writeFileSync(filePath, header, 'utf8');
  }

  const shortSession = sessionId.substring(0, 8);
  const entry = `[LOG_ENTRY type=${type} num=${num} session=${shortSession}]
timestamp: ${timestamp}
model: ${model || MODEL_NAME}

${content}


`;

  fs.appendFileSync(filePath, entry, 'utf8');
}

module.exports = { appendLogEntry, getSessionLogPath };
