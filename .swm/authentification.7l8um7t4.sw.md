---
title: Authentification
---
# Introduction

This document will walk you through the implementation of the authentication feature.

The feature ensures that only authenticated users with the appropriate roles can access certain parts of the application.

We will cover:

1. How the authentication middleware extracts and verifies the token.
2. How role-based access control is enforced for admin users.
3. How role-based access control is enforced for general users.

# Token extraction and verification

<SwmSnippet path="/middleware/auth.js" line="3">

---

The authentication middleware is responsible for extracting the token from the request headers, verifying it, and attaching the user information to the request object.

```
exports.Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'TOKEN');
        const userId = decoded.userId;
        const role = decoded.roles;

        req.auth = {
            userId: userId,
            role: role,
        };
```

---

</SwmSnippet>

<SwmSnippet path="middleware/auth.js" line="16">

---

If the token is valid, the middleware proceeds to the next middleware in the stack.

```
    }catch (error){
        res.status(401).send({error})
    }
}
```

---

</SwmSnippet>

# Admin role-based access control

<SwmSnippet path="/middleware/auth.js" line="22">

---

The admin middleware checks if the authenticated user has an 'ADMIN' role. If not, it returns a 403 status code.

```
exports.admin = (req, res, next) => {
    if (req.auth.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Accès interdit : Admin requis' });
    }
    next(); // Si l'utilisateur est admin, on passe au middleware suivant
};
```

---

</SwmSnippet>

# User role-based access control

<SwmSnippet path="/middleware/auth.js" line="30">

---

The user middleware checks if the authenticated user has either a 'USER' or 'ADMIN' role. If not, it returns a 403 status code.

```
exports.user = (req, res, next) => {
    if (req.auth.role !== 'USER' && req.auth.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Accès interdit : Utilisateur requis' });
    }
    next(); // Si l'utilisateur est user ou admin, on passe au middleware suivant
};
```

---

</SwmSnippet>

This setup ensures that only users with the appropriate roles can access specific routes, enhancing the security of the application.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBYXBpX2Jvb2syJTNBJTNBTWFlbC1DYXM=" repo-name="api_book2"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
