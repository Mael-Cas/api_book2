---
title: Server
---
# Introduction

This document will walk you through the implementation of the server setup feature.

The feature sets up a server, handles port normalization, error handling, and starts listening for connections.

We will cover:

1. Port normalization
2. Setting the port for the app
3. Error handling
4. Server creation and event handling

# Port normalization

<SwmSnippet path="/server.js" line="4">

---

We need to ensure the port is a valid number or string. This function normalizes the port value.

```
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
```

---

</SwmSnippet>

<SwmSnippet path="/server.js" line="15">

---

We then use this function to set the port, defaulting to '10010' if not provided.

```
const port = normalizePort(process.env.PORT || '10010');
```

---

</SwmSnippet>

# Setting the port for the app

<SwmSnippet path="/server.js" line="16">

---

We set the normalized port value to the app.

```
app.set('port', port);
```

---

</SwmSnippet>

# Error handling

<SwmSnippet path="/server.js" line="18">

---

We define an error handler to manage common server errors like permission issues or address in use.

```
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
```

---

</SwmSnippet>

# Server creation and event handling

<SwmSnippet path="/server.js" line="38">

---

We create the server using the app instance.

```
const server = http.createServer(app);
```

---

</SwmSnippet>

<SwmSnippet path="/server.js" line="40">

---

We attach the error handler and a listening event to log the server's address.

```
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});
```

---

</SwmSnippet>

<SwmSnippet path="/server.js" line="47">

---

Finally, we start the server to listen on the specified port.

```
server.listen(port);
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXBpX2Jvb2syJTNBJTNBTWFlbC1DYXM=" repo-name="api_book2"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
