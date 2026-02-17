/*
 A typical way of creating a subclass is to define
 the subclass, set its prototype to an instance of the
 superclass, and then define properties on that instance.
 This can get awkward especially for getters and setters.
 Instead, you can use this code to set the prototype:
*/

function superclass() {}
superclass.prototype = {
    // Define your methods and properties here
};

function subclass() {}
subclass.prototype = Object.create(
    superclass.prototype,
    {
        // Define your methods and properties here
    }
);