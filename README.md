# HaverForth in JavaScript

To begin with, see my slides on JavaScript:
http://kmicinski.com/cmsc245/slides/javascript-intro.pdf

In this project you'll be implementing HaverForth: an interactive
Forth interpreter in JavaScript. It's interactive because it keeps
track of the stack on the right hand side of the screen. We'll also
extend it with things like building in buttons for various
user-defined keywords.

For this lab, you won't have to handle all of Forth. For example, you
won't have to handle loops or complicated uses of if/then/else. You
will, however, have to implement user-defined functions. You'll also
have to learn and understand the relevant JavaScript to be able to
update the stack and things.

First things first: open the file `index.html` with your web
browser. This is HaverForth running in real time.

The implementation of this project is in `js/main.js`. You will write
your code there. The code uses the
[terminal.js](http://www.erikosterberg.com/terminaljs/) library to
display a terminal to the user. However, you won't have to use
terminal's API explicitly, since I've already written most of the code
for you.

# Task 1: Implementing more of a forth interpreter

**Note: Lab 7 Begins here and continues until noted**

Your task with this part of the lab is to apply some of the concepts
from previous labs in JavaScript. As you can see in the code written 

1. Implement a function named `emptyStack`, which accepts a stack as
   its input and makes the stack empty. Remember, the stack is passed
   by reference.

2. Connect this function up to the "reset" button. To do this, use
   JQuery's `click` method. The "reset" button is identified by the
   HTML ID `reset`. To select the `reset` button using JQuery, you can
   use following piece of code:

```
var resetButton = $("#reset"); // resetButton now references 
                               // the HTML button with ID "reset"
```

   Documentation for `click` can be found here: https://api.jquery.com/click/

3. Implement the follow functions on stacks in JavaScript:

    - Standard arithmetic operations: `+`, `-`, `*`, and `/`
    - `nip`
    - `swap`
    - `over`
    - `>`
    - `=`
    - `<`

   Note that each of these functions should accept a stack as input
   and return nothing. JavaScript passes its arguments by reference,
   so changing the stack

4. Implement a key/value datastructure that allows associating each
   word with the corresponding function. I have begun to implement
   this in `main.js` using the `words` object. In JavaScript, you can
   use objects as a key/value store. You can iterate through the keys,
   check if there is an associated value, etc.. To understand how,
   read the following links:

   - https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
  - https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript
  
  **Your task** in this part is to extend the `process` function to
  use an object to lookup functions (values) corresponding to words
  (keys) for each of the operations. For example, while `process` uses
  a large set of `if` statements now, you should modify it so that it
  instead looks up the corresponding word in the map. You can feel
  free to keep the code that pushes integers on the stack the same.

5. Right now, `process` function can handle at most one word at
   once. This is because it compares its input string to the words in
   the key/value datastructure you implemented in part (4). But now I
   want you to be able to handle arbitrary things. For example, right
   now even if you enter ".s " as the input it won't match. Also, if
   you write "2 2 4 + *" it won't handle anything past the first 2. 

   To rectify this, you should process each input in turn. To do this,
   you should use the function `split`, which will split a string into
   whitespace-separated components. To split the list up into an
   array, you can use the `.trim()` and `.split()` functions. For
   example, consider the following:

```
> "    1 2    3".trim().split(/ +/)
[ '1', '2', '3' ]
```

   See the following SO post: https://stackoverflow.com/questions/1418050/string-strip-for-javascript

   Once you have an array of strings, you can iterate through them
   using a variety of functions in JavaScript: `forEach`, `map`,
   `transform`, etc.. This will allow you to process each of the
   inputs in turn.

   **Deliverable**: Your Forth calculator must be able to process more
   than just one input per line.

6. Implement user-defined words. You may make the following
   assumptions:

   - A user-defined word will begin with a `:` and end with a `;`
   - The word's whole definition will be given on a single line
   - If a word is defined, it is the only thing that occurs on that
     line
   - No built in operator will be redefined (e.g., won't try to
     redefine '+')

   Your words do **not** need to be recursive, but should be able to
   call each other. For example, the following should work

```
: myword1 1 + ;
: myword2 2 * ;
1 myword1 myword2
```

    You must implement these in a key/value association, probably just
    by extending the `words` object.

7. Demonstrate that you can use the JavaScript debugger by taking a
   screenshot of it processing some line you input. Describe what's
   happening in the screenshot and write up something you found useful
   about the JavaScript debugger.

8. Compare and contrast each thing you've done here to your
   implementation in C++. Answer the following questions:

   - What new perspective did you gain by redoing the lab in
     JavaScript?

   - Can you point to one instance where the lack of types in
     JavaScript was damaging to your productivity?
   
   - Did JavaScript's lack of types surprise you? Or hurt you in any
     way? Or was it easier than C++ because you didn't have to
     annotate the program with types? Either answer is fine here, as
     long as you provide some thoughtful reflection.

   - Describe a few features of programming your previous lab that you
     used here. For example, describe how you observed any of the
     following in JS:

      - Objects 
      - Maps (ala std::map in C++)
      - Prototypes
      - Dynamic typing
      - Closures

**End of Lab 7**

# Final Project

(Note that this is just one of a set of options that you may do for
the final project. Refer to the course webpage and Piazza for the
other options.)

8. For each user-defined word, you must add a button to the HTML
   that--when clicked on--runs that word. For example, after defining
   the following two words above, there should be two buttons under
   the console that have the text "myword1" and "myword2", which
   should be clickable and--when clicked--run the `myword1` and
   `myword2` words respectively.

    You will need to figure out how to add a piece of HTML which
    dynamically generates the button and runs the corresponding
    function when it runs.

    I offer up the following links for perspective:
    https://stackoverflow.com/questions/8936652/dynamically-create-buttons-with-jquery
    
9. So far in the lab, we have been implementing the stack as an
   array. This is fine, but lacks the kinds of abstraction we might
   want in a higher-level language. Instead of using an array, I want
   you to build a JavaScript class which provides the following
   methods:

   - Create an empty stack
   - Pop an object from the stack
   - Push an object onto the stack
   
   To do this, read about how classes work in JavaScript:
   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
   - https://www.phpied.com/3-ways-to-define-a-javascript-class/
   - https://javascript.info/class
   
10. Notice that throughout the code, we had to call the `renderStack`
    function each time we updated the stack. This is poor programming
    practice: we don't to make the programmer rerender the
    stack. Instead, what we'd like is to have it so that the
    programmer can pass in an "observer": a function which is called
    each time the stack changes (in this case). You can read more
    about the observer pattern here:
    https://en.wikipedia.org/wiki/Observer_pattern
    
    To understand one concrete use of the observer pattern in
    JavaScript, see this tutorial:
    http://www.dofactory.com/javascript/observer-design-pattern

    For this part, I want you to do the following:
    
    - Create a *subclass* of your stack class, called
      `ObservableStack`

    For information about inheritance in JavaScript, you can either
    see my slides or read the following tutorials:

      - http://markdalgleish.com/2012/10/a-touch-of-class-inheritance-in-javascript/
      - http://sporto.github.io/blog/2013/02/22/a-plain-english-guide-to-javascript-prototypes/
    
    - Your class `ObservableStack` should have a method
      `registerObserver` which accepts a function, `observer`, as its
      input. Each time the stack changes, your subclass should call
      `observer` with the current stack. Note that for full credit,
      you should be able to register a *list* of observers. (For this
      part, you don't need to implement anything that unregisters
      observers.)

11. Modify your Forth implementation so that instead of using an array
    for the stack, you instead use your own `ObservableStack`
    class. Use the `registerObserver` method of your stack object to
    register a function which calls renderStack for each change to the
    stack so that you don't have to continually call it.

12. Pick one other feature of your own choosing and implement it. For
    example, you could implement `if/else` in forth into your
    interpreter (easy), you could allow the user to rearrange the HTML
    and correspondingly make updates to the model (very hard), or
    anything in between. For example, you could provide an HTML
    `<canvas>` and some FORTH words that when executed draw shapes on
    this canvas (such as `2 1 1 circle`, that draws a circle of radius
    2 at point 1,1), you could do that using this tutorial:
    https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial

12. Reflect upon the following questions and write up an email to me:

    - What was the most challenging part of this lab?
    
    - What did you enjoy most about JavaScript?
    
    - What did you least enjoy about JavaScript?

    - Do you think you would choose JavaScript over other languages
      for this task? What other language would you have chosen to
      implement the interpreter in, and why?

    - Did the lack of type safety hurt you on this lab? Were there any
      points at which you got tripped up by not having types?

    - Were any of the concepts used in class helpful to you completing
      this project, even though this lab is in JavaScript (vs Racket /
      C++)?

    - If you could add one feature to this application, but don't have
      time / know-how to do so, what would it be? What concepts from
      the class do you envision could help get you there?
