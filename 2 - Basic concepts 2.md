# Lesson 2 - Basic concepts 2

## Table of contents
- [Basic Functions](#basic_functions)
- [Error Handling](#error_handling)
- [Garbage Collector](#garbage_collector)
- [Coroutines](#coroutines)
- [Keywords](#keywords)
- [Operators](#operators)

<br/><hr/><a name='basic_functions'></a>

## Basic functions

- `assert (v [, message])`<br/><br/>
Raises an error if the value of its argument `v` is `false` (i.e., `nil` or `false`); otherwise, returns all its arguments. In case of error, message is the error object; when absent, it defaults to "`assertion failed!`"<br/><br/>
Examples:
```lua
local isTrue = true
assert(isTrue, 'Not true ;/') -- no error
assert(not isTrue, 'Not true!') -- ERROR: Not true!
```
<hr/><br/>

- `collectgarbage([opt [, arg]])`<br/><br/>
This function is a generic interface to the garbage collector. It performs different functions according to its first argument, opt:
- <b>collect:</b> Performs a full garbage-collection cycle. This is the default option.
- <b>stop:</b> Stops automatic execution of the garbage collector. The collector will run only when explicitly invoked, until a call to restart it.
- <b>restart:</b> Restarts automatic execution of the garbage collector.
- <b>count:</b> Returns the total memory in use by Lua in Kbytes. The value has a fractional part, so that it multiplied by 1024 gives the exact number of bytes in use by Lua.
- <b>step:</b> Performs a garbage-collection step. The step "size" is controlled by arg. With a zero value, the collector will perform one basic (indivisible) step. For non-zero values, the collector will perform as if that amount of memory (in Kbytes) had been allocated by Lua. Returns true if the step finished a collection cycle.
- <b>isrunning:</b> Returns a boolean that tells whether the collector is running (i.e., not stopped).
- <b>incremental:</b> Change the collector mode to incremental. This option can be followed by three numbers: the garbage-collector pause, the step multiplier, and the step size. A zero means to not change that value.
- <b>generational:</b> Change the collector mode to generational. This option can be followed by two numbers: the garbage-collector minor multiplier and the major multiplier. A zero means to not change that value.<br/><br/>
<i>More on that later</i>

<hr/><br/>

- `dofile([filename])`<br/><br/>
Opens the named file and executes its content as a Lua chunk. When called without arguments, `dofile` executes the content of the standard input (`stdin`). Returns all values returned by the chunk. In case of errors, `dofile` propagates the error to its caller. (That is, `dofile` does <b>not</b> run in protected mode.)

<hr/><br/>

- `error(message [, level])`<br/><br/>
Raises an error with message as the `error` object. This function never returns.
Usually, `error` adds some information about the error position at the beginning of the message, if the message is a string. The level argument specifies how to get the error position. With level 1 (the default), the error position is where the error function was called. Level 2 points the error to where the function that called error was called; and so on. Passing a level 0 avoids the addition of error position information to the message.

<hr/><br/>

- `_G`<br/><br/>
A global variable (not a function) that holds the global environment. Lua itself does not use this variable; changing its value does not affect any environment, nor vice versa.

<hr/><br/>

- `ipairs(tbl)`<br/><br/>
Returns three values (an iterator function, the table `tbl`, and 0) so that the construction will iterate over the key–value pairs (`1,tbl[1]`), (`2,tbl[2]`), ..., up to the first absent index:
```lua
for i,v in ipairs(tbl) do --[[ code ]] end
```

<hr/><br/>

- `load(chunk [, chunkname [, mode [, env]]])`<br/><br/>
Loads a chunk.<br/>
If chunk is a string, the chunk is this string. If chunk is a function, load calls it repeatedly to get the chunk pieces. Each call to chunk must return a string that concatenates with previous results. A return of an empty string, nil, or no value signals the end of the chunk.<br/><br/>
If there are no syntactic errors, load returns the compiled chunk as a function; otherwise, it returns fail plus the error message.<br/><br/>
When you load a main chunk, the resulting function will always have exactly one upvalue, the _ENV variable. However, when you load a binary chunk created from a function, the resulting function can have an arbitrary number of upvalues, and there is no guarantee that its first upvalue will be the _ENV variable. (A non-main function may not even have an _ENV upvalue.)<br/><br/>
Regardless, if the resulting function has any upvalues, its first upvalue is set to the value of env, if that parameter is given, or to the value of the global environment. Other upvalues are initialized with nil. All upvalues are fresh, that is, they are not shared with any other function.<br/><br/>
`chunkname` is used as the name of the chunk for error messages and debug information. When absent, it defaults to chunk, if chunk is a string, or to `"=(load)"` otherwise.<br/><br/>
The string mode controls whether the chunk can be text or binary (that is, a precompiled chunk). It may be the string "b" (only binary chunks), "t" (only text chunks), or "bt" (both binary and text). The default is "bt".<br/><br/>
It is safe to load malformed binary chunks; load signals an appropriate error. However, Lua does not check the consistency of the code inside binary chunks; running maliciously crafted bytecode can crash the interpreter.

<hr/><br/>

- `loadfile([filename [, mode [, env]]])`<br/><br/>
Similar to load, but gets the chunk from file filename or from the standard input, if no file name is given.

<hr/><br/>

- `next(tbl [, index])`<br/><br/>
Allows a program to traverse all fields of a table. Its first argument is a table and its second argument is an index in this table. A call to next returns the next index of the table and its associated value. When called with nil as its second argument, next returns an initial index and its associated value. When called with the last index, or with nil in an empty table, next returns nil. If the second argument is absent, then it is interpreted as nil. In particular, you can use `next(tbl)` to check whether a table is empty.<br/><br/>
The order in which the indices are enumerated is not specified, even for numeric indices (To traverse a table in numerical order, use a numerical for).<br/><br/>
You should not assign any value to a non-existent field in a table during its traversal. You may however modify existing fields. In particular, you may set existing fields to nil.
Examples:
```lua
local myTable = {5, 12, true, 'key', 'value'}

for i,v in next, myTable do
    print(i,v)
end

--[[
    output:
    1 5
    2 12
    3 true
    4 key
    5 value
]]
```

<hr/><br/>

- `pairs(tbl)`<br/><br/>
If `tbl` has a metamethod `__pairs`, calls it with `tbl` as argument and returns the first three results from the call.<br/>
Otherwise, returns three values:
    - the next function
    - the table `tbl`
    - nil<br/>
    
    so that the construction will iterate over all key–value pairs of table `tbl`:
```lua
for k,v in pairs(tbl) do --[[ code ]] end
```
See function next for the caveats of modifying the table during its traversal.

<hr/><br/><a name='error_handling'></a>

- `pcall(func [, arg1, ...])`<br/><br/>
Calls the function `func` with the given arguments in protected mode. This means that any error inside `func` is not propagated; instead, `pcall` catches the error and returns a status code. Its first result is the status code (a boolean), which is true if the call succeeds without errors. In such case, pcall also returns all results from the call, after this first result. In case of any error, pcall returns false plus the error object. Note that errors caught by pcall do not call a message handler.
Examples:
```lua
function errorFunc(param)
    if not param then error('Parameter not provided!') end
    return 3.14, true, 'myText', {'empty', 'table'}
end

errorFunc() -- ERROR

local status, data1, data2, data3, data4 = pcall(errorFunc) -- ✔
if status then -- if error wasn't thrown
    print(data1) -- output: 3.14
    print(data2) -- output: true
    print(data3) -- output: myText
    print(data4) -- output: table
else
    print(data1) -- output: Parameter not provided!
    print(data2) -- output: nil
end
```

<hr/><br/>

- `print(...)`<br/><br/>
Receives any number of arguments and prints their values to stdout, converting each argument to a string following the same rules of `tostring`.<br/>
The function print is not intended for formatted output, but only as a quick way to show a value, for instance for debugging. For complete control over the output, use `string.format` and `io.write`.

<hr/><br/>

- `rawequal(v1, v2)`<br/><br/>
Checks whether v1 is equal to v2, without invoking the `__eq` metamethod.<br/>
Returns a boolean.

- `rawget(tbl, index)`<br/><br/>
Gets the real value of `tbl[index]`, without using the `__index` metavalue. `tbl` must be a table; index may be any value.

<hr/><br/>

- `rawlen(v)`<br/><br/>
Returns the length of the object `v`, which must be a table or a string, without invoking the `__len` metamethod.<br/>
Returns an integer.

<hr/><br/>

- `rawset(tbl, index, value)`<br/><br/>
Sets the real value of `tbl[index]` to `value`, without using the `__newindex` metavalue. table must be a table, index any value different from nil and NaN, and value any Lua value.<br/>
This function returns table.

<hr/><br/>

- `select(index, ...)`<br/><br/>
If `index` is a number, returns all arguments after argument number index; a negative number indexes from the end (-1 is the last argument). Otherwise, index must be the string "`#`", and select returns the total number of extra arguments it received.

<hr/><br/>

- `setmetatable(tbl, metatable)`<br/><br/>
Sets the metatable for the given table. If metatable is nil, removes the metatable of the given table. If the original metatable has a `__metatable` field, raises an error.<br/>
This function returns table.<br/>
To change the metatable of other types from Lua code, you must use the debug library.

<hr/><br/>

- `tonumber(num [, base])`<br/><br/>
When called with no base, `tonumber` tries to convert its argument to a number. If the argument is already a number or a string convertible to a number, then tonumber returns this number; otherwise, it returns fail.<br/><br/>
The conversion of strings can result in integers or floats, according to the lexical conventions of Lua. The string may have leading and trailing spaces and a sign.<br/><br/>
When called with base, then `num` must be a string to be interpreted as an integer numeral in that base.<br/>
The base may be any integer between 2 and 36, inclusive. In bases above 10, the letter 'A' (in either upper or lower case) represents 10, 'B' represents 11, and so forth, with 'Z' representing 35.<br/>
If the string `num` is not a valid numeral in the given base, the function returns fail.<br/><br/>
Examples:
```lua
local numberAsString = '5.89'
local number = tonumber(numberAsString)
print(number, type(number)) -- output: 5.89 number
```

<hr/><br/>

- `tostring(v)`<br/><br/>
Receives a value of any type and converts it to a string in a human-readable format.<br/><br/>
If the metatable of `v` has a `__tostring` field, then `tostring` calls the corresponding value with `v` as argument, and uses the result of the call as its result. Otherwise, if the metatable of `v` has a `__name` field with a string value, `tostring` may use that string in its final result.<br/><br/>
For complete control of how numbers are converted, use `string.format.`<br/><br/>
Examples:
```lua
local myNumber = 892
local myString = tostring(myNumber)
print(myString, type(myString)) -- output: 892 string
```

<hr/><br/>

- `type(v)`<br/><br/>
Returns the type of its only argument, coded as a string. The possible results of this function are "nil" (a string, not the value nil), "number", "string", "boolean", "table", "function", "thread", and "userdata".<br/><br/>
Examples:
```lua
local myVar1 = 'this is a string'
local myVar2 = 3
local myVar3 = false
local myVar4 = {3.14}
local myVar5 = nil

print(type(myVar1)) -- output: string
print(type(myVar2)) -- output: number
print(type(myVar3)) -- output: boolean
print(type(myVar4)) -- output: table
print(type(myVar5)) -- output: nil
```

<hr/><br/>

- `_VERSION`<br/><br/>
A global variable (not a function) that holds a string containing the running Lua version.

<hr/><br/>

- `warn (msg1, ...)`<br/><br/>
Emits a warning with a message composed by the concatenation of all its arguments (which should be strings).<br/><br/>
By convention, a one-piece message starting with '`@`' is intended to be a control message, which is a message to the warning system itself.
In particular, the standard warning function in Lua recognizes the control messages "`@off`", to stop the emission of warnings, and "`@on`", to (re)start the emission; it ignores unknown control messages.

<hr/><br/>

- `xpcall (func, msgh [, arg1, ...])`<br/><br/>
This function is similar to `pcall`, except that it sets a new message handler `msgh`.

<br/><hr/><a name='garbage_collector'></a>

## Garbage Collector

"Lua performs automatic memory management. This means that you do not have to worry about allocating memory for new objects or freeing it when the objects are no longer needed. Lua manages memory automatically by running a <b>garbage collector</b> to collect all <b>dead</b> objects. All memory used by Lua is subject to automatic management: strings, tables, userdata, functions, threads, internal structures, etc."

An object is considered dead as soon as the collector can be sure the object will not be accessed again in the normal execution of the program

The garbage collector (GC) in Lua can work in two modes: incremental and generational.

You can change the GC mode and parameters by calling `collectgarbage`. You can also use this function to control the collector directly (e.g., to stop and restart it).

### <b>Incremental mode</b>

In incremental mode, each GC cycle performs a mark-and-sweep collection in small steps interleaved with the program's execution. In this mode, the collector uses three numbers to control its garbage-collection cycles: the garbage-collector pause, the garbage-collector step multiplier, and the garbage-collector step size.


### <b>Generational mode</b>

In generational mode, the collector does frequent minor collections, which traverses only objects recently created. If after a minor collection the use of memory is still above a limit, the collector does a stop-the-world major collection, which traverses all objects. The generational mode uses two parameters: the minor multiplier and the the major multiplier.

<br/><hr/><a name='coroutines'></a>

## Coroutines

Lua supports coroutines, also called collaborative multithreading. A coroutine in Lua represents an independent thread of execution. Unlike threads in multithread systems, however, a coroutine only suspends its execution by explicitly calling a yield function.

You create a coroutine by calling `coroutine.create`. Its sole argument is a function that is the main function of the coroutine. The `create` function only creates a new coroutine and returns a handle to it (an object of type thread); it does not start the coroutine.

You execute a coroutine by calling `coroutine.resume`. When you first call `coroutine.resume`, passing as its first argument a thread returned by `coroutine.create`, the coroutine starts its execution by calling its main function. Extra arguments passed to `coroutine.resume` are passed as arguments to that function. After the coroutine starts running, it runs until it terminates or yields.

A coroutine can terminate its execution in two ways: normally, when its main function returns (explicitly or implicitly, after the last instruction); and abnormally, if there is an unprotected error. In case of normal termination, coroutine.resume returns <b>true</b>, plus any values returned by the coroutine main function. In case of errors, `coroutine.resume` returns <b>false</b> plus the error object. In this case, the coroutine does not unwind its stack, so that it is possible to inspect it after the error with the debug API.

A coroutine yields by calling `coroutine.yield`. When a coroutine yields, the corresponding coroutine.resume returns immediately, even if the yield happens inside nested function calls (that is, not in the main function, but in a function directly or indirectly called by the main function). In the case of a yield, `coroutine.resume` also returns true, plus any values passed to `coroutine.yield`. The next time you resume the same coroutine, it continues its execution from the point where it yielded, with the call to `coroutine.yield` returning any extra arguments passed to `coroutine.resume`.

Like `coroutine.create`, the coroutine.wrap function also creates a coroutine, but instead of returning the coroutine itself, it returns a function that, when called, resumes the coroutine. Any arguments passed to this function go as extra arguments to `coroutine.resume`.<br/>
`coroutine.wrap` returns all the values returned by `coroutine.resume`, except the first one (the boolean error code). Unlike `coroutine.resume`, the function created by `coroutine.wrap` propagates any error to the caller.

As an example of how coroutines work, consider the following code:
```lua
function foo(a)
    print('foo', a)
    return coroutine.yield(2 * a)
end

local co = coroutine.create(function(a, b)
    print('co-body', a, b)
    local res1 = foo(a + 1)
    print('co-body', res1)
    local res2, res3 = coroutine.yield(a + b, a - b)
    print('co-body', res2, res3)
    return b, 'end'
end)

print('main', coroutine.resume(co, 1, 10))
print('main', coroutine.resume(co, 'r'))
print('main', coroutine.resume(co, 'x', 'y'))
print('main', coroutine.resume(co, 'x', 'y'))
```
When you run it, it produces the following output:
```
co-body     1       10
foo         2
main        true    4
co-body     r
main        true    11      -9
co-body     x       y
main        true    10      end
main        false   cannot resume dead coroutine
```

<br/><hr/><a name='keywords'></a>

## Keywords

Lua is a free-form language. It ignores spaces and comments between lexical elements (tokens), except as delimiters between two tokens. In source code, Lua recognizes as spaces the standard ASCII whitespace characters space, form feed, newline, carriage return, horizontal tab, and vertical tab.

Names (also called identifiers) in Lua can be any string of Latin letters, Arabic-Indic digits, and underscores, not beginning with a digit and not being a reserved word. Identifiers are used to name variables, table fields, and labels.

### <b>Reserved keywords:</b>
```lua
if      elseif  else    then        end
local   true    false   nil
not     and     or
for     while   do      function
goto    in      repeat  return      until
```

Lua is a case-sensitive language: `and` is a reserved word, but `And` and `AND` are two different, valid names.
As a convention, programs should avoid creating names that start with an underscore followed by one or more uppercase letters (such as `_VERSION`).

### <b>Reserved tokens:</b>
```lua
+     -     *     /     %     ^     #
&     ~     |     <<    >>    //
==    ~=    <=    >=    <     >     =
(     )     {     }     [     ]     ::
;     :     ,     .     ..    ...
```


<br/><hr/><a name='operators'></a>

## Operators
<br/>

### <b>Arithmetic Operators:</b>
- <b>+:</b> addition
- <b>-:</b> subtraction
- <b>*:</b> multiplication
- <b>/:</b> float division
- <b>//:</b> floor division
- <b>%:</b> modulo
- <b>^:</b> exponentiation
- <b>-:</b> unary minus

### <b>Bitwise Operators:</b>
- <b>&:</b> bitwise AND
- <b>|:</b> bitwise OR
- <b>~:</b> bitwise exclusive OR
- <b>>>:</b> right shift
- <b><<:</b> left shift
- <b>~:</b> unary bitwise NOT

### <b>Relational Operators:</b>
- <b>==:</b> equality
- <b>~=:</b> inequality
- <b><:</b> less than
- <b>>:</b> greater than
- <b><=:</b> less or equal
- <b>>=:</b> greater or equal

These operators <b>always</b> result in `false` or `true`.

### <b>Logical Operators:</b>
- <b>and</b>
- <b>or</b>
- <b>not</b>

All logical operators consider both false and nil as false and anything else as true.

<hr/>

- ## [Part 1](1%20-%20Basic%20concepts.md)
- ## [Part 3](3%20-%20String%20library.md)