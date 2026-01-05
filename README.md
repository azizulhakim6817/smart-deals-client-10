## client side vercel

--- https://smart-deals-client-10.vercel.app/

## 1. server side vercel

--- https://smart-deals-server-10.vercel.app/latest-products

## At first VS-code terminal --> npm run dev 

## 1. vercel.json file add --------

```js
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

## 2.server deployment url change to added gitHub push

1. http://localhost:5173
   to change
2. Deploy url : https://smart-deals-client-10.vercel.app/

## 3. .env file after deploy have to added

## 4. firebase-project-smart-deals

(https://console.firebase.google.com/) --

1. Authentication---sitting-Authorized domains--add domain
   --smart-deals-client-10.vercel.app ---- add


# 1. netlify deploy 
1. public folder 
  -- create file =>  _redirects
/*    /index.html   200
