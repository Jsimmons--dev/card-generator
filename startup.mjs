import { spawn } from 'node:child_process'
var isWin = process.platform === "win32";
var isMac = process.platform === "darwin";

var shell = isWin ? 'powershell.exe' : isMac ? 'bash' : 'bash';

const AppServer =  spawn('npx http-server -p 8081 -P http://127.0.0.1:8082 ./App/', { shell })

AppServer.stdout.on('data', (data) => {
  console.log(data.toString());
});

AppServer.stderr.on('data', (data) => {
  console.error(data.toString());
});

AppServer.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
}); 

const CardAssetServer =  spawn('npx http-server -p 8082 --cors ./cardLibrary/', { shell })

CardAssetServer.stdout.on('data', (data) => {
  console.log(data.toString());
});

CardAssetServer.stderr.on('data', (data) => {
  console.error(data.toString());
});

CardAssetServer.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
}); 

const ServiceServer =  spawn('node --watch Service/index.mjs', { shell })

ServiceServer.stdout.on('data', (data) => {
  console.log(data.toString());
});

ServiceServer.stderr.on('data', (data) => {
  console.error(data.toString());
});

ServiceServer.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
}); 