// See the following on using objects as key/value dictionaries
// https://stackoverflow.com/questions/1208222/how-to-do-associative-array-hashing-in-javascript
var words = {"+": add, "-": sub, "*": mult, "/": divide, "nip": nip, "swap": swap, "over": over, "<": lt, "=": eq, ">": gt};
var userDefined = {};

function add(stack){
    if (stack.length < 2) {
        alert("Can't perform add because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(first+second);
    }
}

function sub(stack){
    if (stack.length < 2) {
        alert("Can't perform sub because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(second - first);
    }
}

function mult(stack){
    if (stack.length < 2) {
        alert("Can't perform mult because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(second * first);
    }
}

function divide(stack){
    if (stack.length < 2) {
        alert("Can't perform divide because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(second / first);
    }
}

function nip(stack){
    if (stack.length < 2) {
        alert("Can't perform nip because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(first);
    }
}

function swap(stack){
    if (stack.length < 2) {
        alert("Can't perform swap because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(first);
        stack.push(second);
    }
}

function over(stack){
    if (stack.length < 2) {
        alert("Can't perform over because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        stack.push(second);
        stack.push(first);
        stack.push(second);
    }
}

function gt(stack){
    if (stack.length < 2) {
        alert("Can't perform comparison because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        if (second > first){
            stack.push(-1);
        } 
        else {
            stack.push(0);
        }
    }
}

function lt(stack){
    if (stack.length < 2) {
        alert("Can't perform comparison because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        if (second < first){
            stack.push(-1);
        } 
        else {
            stack.push(0);
        }
    }
}

function eq(stack){
    if (stack.length < 2) {
        alert("Can't perform comparison because stack size is too small.")
    }
    else {
        var first = stack.pop();
        var second = stack.pop();
        if (second == first){
            stack.push(-1);
        } 
        else {
            stack.push(0);
        }
    }
}

/** 
 * set the length of the array to 0 so that the stack will be empty.
 * @param {Array[Number]} The stack to reset
 */
function emptyStack(stack) {
    stack.length = 0;
    renderStack(stack);
}

/**
 * Print a string out to the terminal, and update its scroll to the
 * bottom of the screen. You should call this so the screen is
 * properly scrolled.
 * @param {Terminal} terminal - The `terminal` object to write to
 * @param {string}   msg      - The message to print to the terminal
 */
function print(terminal, msg) {
    terminal.print(msg);
    $("#terminal").scrollTop($('#terminal')[0].scrollHeight + 40);
}

/** 
 * Sync up the HTML with the stack in memory
 * @param {Array[Number]} The stack to render
 */
function renderStack(stack) {
    $("#thestack").empty();
    stack.slice().reverse().forEach(function(element) {
        $("#thestack").append("<tr><td>" + element + "</td></tr>");
    });
};

/** 
 * Process a user input, update the stack accordingly, write a
 * response out to some terminal.
 * @param {Array[Number]} stack - The stack to work on
 * @param {string} input - The string the user typed
 * @param {Terminal} terminal - The terminal object
 */
function process(stack, allInputs, terminal) {
    var ops = allInputs.trim().split(/ +/);
    // The user typed a number
    if (ops[0] == ":") {
        userDefined[ops[1]] = ops.slice(2, -1).join(' ');
    }
    else {
        ops.forEach(function(input) {
            if (!(isNaN(Number(input)))) {
                print(terminal,"pushing " + Number(input));
                stack.push(Number(input));
            } else if (input === ".s") {
                print(terminal, " <" + stack.length + "> " + stack.slice().join(" "));
            } else if (input in words) {
                words[input](stack);
            } else if (input in userDefined) {
                process(stack, userDefined[input], terminal);
            } else {
                print(terminal, ":-( Unrecognized input");
            }
            renderStack(stack);
        });
    }
};

function runRepl(terminal, stack) { 
    $("#reset").click(function() {
        emptyStack(stack);
    });
    terminal.input("Type a forth command:", function(line) {
        print(terminal, "User typed in: " + line);
        process(stack, line, terminal);
        runRepl(terminal, stack);
    });
};

// Whenever the page is finished loading, call this function. 
// See: https://learn.jquery.com/using-jquery-core/document-ready/
$(document).ready(function() {
    var terminal = new Terminal();
    terminal.setHeight("400px");
    terminal.blinkingCursor(true);
    
    // Find the "terminal" object and change it to add the HTML that
    // represents the terminal to the end of it.
    $("#terminal").append(terminal.html);

    var stack = [];

    print(terminal, "Welcome to HaverForth! v0.1");
    print(terminal, "As you type, the stack (on the right) will be kept in sync");

    runRepl(terminal, stack);

});
