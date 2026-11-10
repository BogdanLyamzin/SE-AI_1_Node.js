# Log Inspector — Live Coding Starter

No external dependencies are required. Run commands from this directory.

## Start

```powershell
npm start
```

The entry point reads the small sample log. Add CLI commands during the lesson.

## Sample data

- `src/data/server.log` — includes error messages.
- `src/data/no-errors.log` — contains no errors.
- `src/data/big-server.log` — a generated 20 MiB log, excluded from Git.

To create the large log if it is missing:

```powershell
npm run generate:log
```

## Live coding

Write `src/readfile-demo.js` and `src/readfile-stream.js` from scratch during the lesson. Their npm scripts are already configured:

```powershell
npm run demo:readfile
npm run demo:stream
```
