const fs = require('fs');

// Write all environment variables to a file in the GitHub runner
const output = JSON.stringify(process.env, null, 2);

fs.writeFileSync('/tmp/github_env_dump.txt', output);
console.log('✅ Environment variables written to /tmp/github_env_dump.txt');
