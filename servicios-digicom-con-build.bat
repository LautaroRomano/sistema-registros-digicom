start /B /MIN cmd.exe /C "git pull origin && npm run build && start http://localhost:3000 && npm start --prefix ./"

