# Server Deployment steps

comment await commands outside api methods for solving gateway timeout error
//comment following commands

```js
client.close();
await client.db("admin").command({ ping: 1 });
```

# create vercel.json file for configuring server

```js
{
"version": 2,
"builds": [
{
"src": "index.js",
"use": "@vercel/node"
}
],
"routes": [
{
"src": "/(.\*)",
"dest": "index.js",
"methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
}
]
}
```

# Whitelisting the ip address or allow from anywhere ( Security > Database & Network Access > IP Access List > Add IP Address

For Firebase Token Verification
4-a . If you are using Firebase jwt token verification on the server, convert the service key from utf8 to base64 string:

```js
// encode.js
const fs = require("fs");
const key = fs.readFileSync("./firebase-admin-key.json", "utf8");
const base64 = Buffer.from(key).toString("base64");
console.log(base64);
```

Run this file by using: node encode.js your file name
4-b. Now get the key from base64 to utf8

// index.js
const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString("utf8");
const serviceAccount = JSON.parse(decoded);
Deploy to Vercel
npm i -g vercel
vercel login
vercel
vercel --prod

- After completed the deployment . click on inspect link and copy the production domain
- setup your environment variables in vercel
- check your public API

### SUCCESS@DESKTOP-L6H5HFO MINGW64 /d/Desktop/Level-1-12/Milstone-10/final-project/smart-deals-server (main)

$ vercel --prod
Vercel CLI 50.1.3
? Set up and deploy “D:\Desktop\Level-1-12\Milstone-10\final-project\smart-deals-server”? yes
? Which scope should contain your project? Azizul hakim's projects
? Link to existing project? no
? What’s your project’s name? smart-deals-api-server
? In which directory is your code located? ./
? Do you want to change additional project settings? no
🔗 Linked to azizul-hakims-projects-55c9db77/smart-deals-api-server (created .vercel and added it to .gitignore)
? Detected a repository. Connect it to this project? no
🔍 Inspect: https://vercel.com/azizul-hakims-projects-55c9db77/smart-deals-api-server/DUj43fP4tVXP2FnYvHBFX6E8WPeN [4s]
✅ Production: https://smart-deals-api-server-2j9diixgc.vercel.app [25s]
🔗 Aliased: https://smart-deals-api-server-pi.vercel.app [25s]
❗️ Due to `builds` existing in your configuration file, the Build and Development Settings defined in your Project Settings will not apply. Learn More: https://vercel.link/unused-build-settings

```


```
