

## Debugger

In the debugger screenshot, the interpreter is executing the userdefined word `: myword1 1 + ;`. Because user-defined operations are stored as a single long string in a dictionary, the anonymous function that handles each single word calls the`process` function to split the long string into separated words. 

The debugger is helpful in that it displays the values of each variable at each line in which the variable appears. It is also helpful that it shows local and global variables separately, as well as the closure of anonymous functions.

## Reflection

1. New Pespective: The JavaScript lab differs from the C++/Racket version because the stack is passed by reference, instead of by value. Therefore, none of the stack manipulation functions has a return value. 
2. Lack of types: I did not find the lack of types damaging to my productivity at any particular instance. Instead, I find it easier during the coding process since I'm more used to using python, which is also a dynamically typed language. However, I can imagine sometimes this will be troublesome for debugging if there exists some sort of bug in the code, because without a type error at compile time, it's difficult to find out where exactly the program starts to go wrong.
3. Programming features:
   - Maps:  in the `process` function, `forEach()` method takes each element in the array as the parameter for the anonymous function, which is similar to `map`. However, unlike `map`, it doesn't return a new array or change the values in the original array. Instead, the 
   - Closure: in `process`, the anonymous function creates a closure environment, which bounds the variable `stack` and `terminal` (the latter is used by stack manipulation functions to display error message if there aren't enough elements on the stack for a certin operation).