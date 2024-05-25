run the app view with
```
cd App
npx http-server -P http://127.0.0.1:8082
```
and

```
npx http-server .\cardLibrary\
```

run the backend
```
node Service/index.js
```

This will allow you to serve out of App and will serve artifacts from the cardLibrary folder.