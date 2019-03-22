# ByProxy

In web applications, developers often map a set of rest calls to methods on a server. These could be functions in a module or methods in an object. On the client, the code will usually make a rest call to a specific url matching the method on the server. 

ByProxy allows the client to access the object/module on the server as if it was a local object with an API. 

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
