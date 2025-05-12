> [!WARNING]  
> I no longer use or maintain this library. I don't really code in JavaScript anymore (I switched to Rust). If you want to maintain or fork it let me know (you can email me) and I can put the link here.
>
> Also looking back at this project I think transferring functions through `postMessage` is a bad idea.

# post-any-message

![Created with ](https://img.shields.io/badge/Created%20with-@programmerraj/create-3cb371?style=flat)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Like browser postMessage(), but you can transfer functions and stuff

## Use Case
There are many environments when you have to use `postMessage()` to communicate (like [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers), Chrome Extensions).

Posting messages let's you transfer *data* like numbers, strings, objects, and arrays. But what if you wanted to transfer a function? The goal of this package is to let you transfer anything.

## Examples
You can find examples in the `test` directory in the git repo.

## What can be transferred?
This is the list of things that can be transferred. If you want to transfer something that's not on the list, make an issue and it will probably be added to the list. One thing that could be added is transferring promises.
- array
- boolean
- function (can transfer any parameters and return values that are on this list)
- number
- object
- string

## Note about transferring functions
A [MessageChannel](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel) is used to tell one context to call the function. Since message responses are not called synchronously, **all functions are turned into async functions**. For example, if you are transferring the following code:
```js
(a, b) => a + b
```
You would have to call it like this:
```js
const decodedFnIsNowAsync = decode(transferredFunction)
await decodedFnIsNowAsync(5, 6)
```
