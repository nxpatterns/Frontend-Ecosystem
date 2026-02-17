# Memory & CPU

There is currently no library that provides real-time memory and CPU consumption of an Angular application directly in the browser console. (I could develop it, someone pays for it).

However, you can use browser tools such as the `Chrome DevTools` to monitor memory usage and performance of your application.

In Chrome DevTools, you can use the `Performance` panel to analyze the performance of your application. The panel provides information on the CPU usage, memory usage, layout, and paint performance of your application. You can also use the `Timeline` view to see a detailed view of what's happening in your application over time.

Additionally, you can use the `Memory` panel to monitor memory usage of your application and identify memory leaks. The panel provides a heap snapshot that shows the memory usage of your application and allows you to analyze the data and find objects that are retaining memory and causing memory leaks.

## Memory Leak Hunter

To integrate Memory Leak Hunter in your Angular application and run it only in development mode, you can follow these steps:

1. Install the library: You can install the Memory Leak Hunter library using npm by running the following command:

`npm install memory-leak-hunter`

2. Import the library in your code: In the root component of your application, or in a shared module, import the Memory Leak Hunter library using the following code:

`import { enable, leakHunter } from 'memory-leak-hunter';`

3. Start the memory leak hunter: Start the memory leak hunter in your code by calling the `enable` function. You can also specify the interval at which heap snapshots should be taken, for example:

```ts
if (!environment.production) {
  enable({ interval: 5000 });
  leakHunter();
}
```

Note that in this example, the memory leak hunter is only started if the environment is not in production mode.

4. Analyze the results: The results of the memory leak hunter can be found in the browser console, where you will see a report of any detected memory leaks, including a list of objects that are retaining memory and the code location where they were created.

By following these steps, you can integrate Memory Leak Hunter into your Angular application and run it only in development mode to help detect and diagnose memory leaks. It's important to note that while Memory Leak Hunter can be a useful tool, it is not a silver bullet and should be used in conjunction with other techniques to effectively detect and fix memory leaks in your application.
