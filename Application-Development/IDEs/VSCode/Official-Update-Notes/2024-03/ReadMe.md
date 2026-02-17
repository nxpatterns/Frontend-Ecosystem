# VSCode Updates 2024-03

## Proposed APIs

### Terminal shell integration API
A new proposed API that enables accessing some of the information provided by shell integration-activated terminals is now available. With this API, it is possible to listen to the incoming data and exit codes of commands being executed in the terminal. It also introduces a more reliable way to execute commands that wait for the prompt to be available, before sending the command which helps fix some conflicts/race conditions that can occur with various shell set ups.

Here's an example of using the Terminal.shellIntegration.executeCommand proposal:

```ts
// Execute a command in a terminal immediately after being created
const myTerm = window.createTerminal();
window.onDidActivateTerminalShellIntegration(async ({ terminal, shellIntegration }) => {
  if (terminal === myTerm) {
    const command = shellIntegration.executeCommand('echo "Hello world"');
    const code = await command.exitCode;
    console.log(`Command exited with code ${code}`);
  }
}));
```

```ts
// Fallback to sendText if there is no shell integration within 3 seconds of launching
setTimeout(() => {
  if (!myTerm.shellIntegration) {
    myTerm.sendText('echo "Hello world"');
    // Without shell integration, we can't know when the command has finished or what the
    // exit code was.
  }
}, 3000);
```

Here's an example of listening to the data stream of a command:

```ts
// Create a terminal and log all data via console.log
const myTerm = window.createTerminal();
window.onDidStartTerminalShellExecution(execution => {
  if (execution.terminal === myTerm) {
    const stream = execution.createDataStream();
    for await (const data of stream) {
      console.log(data);
    }
  }
});
```

You can review the new API here.
