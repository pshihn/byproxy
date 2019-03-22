# ByProxy

ByProxy allows the client to access an object or module on the server as if it was a local object with an API. 

For example, a *calculator* server:

**On the server:**
```javascript
class Calculator {
  constructor() {
    this.opCount = 0;
  }
  add(a, b) {
    this.opCount++;
    return a + b;
  }
  subtract(a, b) {
    this.opCount++;
    return a - b;
  }
}
// Serve an instance of Calculator via Express
byproxy.serve(app, '/calculator', new Calculator()); 
```

**On the client:**
```javascript
const calculator = byproxy.link('/calculator');

const sum = await calculator.add(2, 6);       // 8
const diff = await calculator.subtract(6, 2); // 4
console.log(await calculator.opCount);        // 2
```

## Advantages
* No need to configure different rest methods for each function call. It is handled automatically. 
* When you want to add a new feature, just add a new method. Since the client is interacting with a *proxy* of the object on the server, no other setup is needed. 
* If using types, both the server and client will have the same interfaces - avoids bugs and duplication of definitions. 

## Other features

#### Seamlessly deal with async functions
Server: 
```javascript
byproxy.serve(app, '/updater', {
  async delayedUpdate() {
    return new Promise(........);
  }
}); 
```
Client:
```javascript
const result = await updater.delayedUpdate();
```

#### Proxy a whole module
Server:
```javascript
const mymod = require('my-awesome-mod');
byproxy.serve(app, '/updater', mymod);
```
