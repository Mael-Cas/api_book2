---
title: Application
---
# Introduction

This document will walk you through the implementation of the application feature.

The feature sets up an Express.js application with middleware and routing.

We will cover:

1. Why we use middleware for logging and JSON parsing.
2. How we handle CORS.
3. How we set up routing for different API endpoints.

# Middleware for logging and JSON parsing

<SwmSnippet path="/app.js" line="8">

---

We initialize the Express application.

```
const app = express();
```

---

</SwmSnippet>

<SwmSnippet path="/app.js" line="9">

---

We use <SwmToken path="/app.js" pos="9:4:4" line-data="app.use(morgan(&#39;combined&#39;));">`morgan`</SwmToken> for logging HTTP requests. This helps in monitoring and debugging.

```
app.use(morgan('combined'));
```

---

</SwmSnippet>

<SwmSnippet path="/app.js" line="10">

---

We use <SwmToken path="/app.js" pos="10:4:8" line-data="app.use(express.json());">`express.json()`</SwmToken> to parse incoming JSON requests. This is essential for handling JSON payloads.

```
app.use(express.json());
```

---

</SwmSnippet>

# Handling CORS

<SwmSnippet path="/app.js" line="12">

---

We set up CORS headers to allow cross-origin requests. This is crucial for enabling frontend applications hosted on different domains to interact with our API.

```
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Retourner un statut 200 pour les requêtes prévol
    }
    next();
});
```

---

</SwmSnippet>

# Setting up routing

We define routes for different parts of the application. Each route is handled by its respective router.

<SwmSnippet path="/app.js" line="23">

---

Books API:

```
app.use('/api/books', BookRouter);
```

---

</SwmSnippet>

<SwmSnippet path="/app.js" line="24">

---

Favorites API:

```
app.use('/api/favorites', FavoritesRouter);
```

---

</SwmSnippet>

<SwmSnippet path="/app.js" line="25">

---

Users API:

```
app.use('/api/users', UserRouter);
```

---

</SwmSnippet>

This setup ensures that the application is modular and each part of the API is managed separately.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXBpX2Jvb2syJTNBJTNBTWFlbC1DYXM=" repo-name="api_book2"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
