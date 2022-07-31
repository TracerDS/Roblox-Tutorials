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

The most common and widely used function is the `print` function. Generally speaking it "prints" the value of whatever you put in it.
```lua
print(5) -- output: 5
print('Test') -- output: Test
print(print) -- output: function
print(true, false) -- output: true  false
print({1,2,3},{4,5,6},{7,8,9}) -- output: table   table   table
```

Another very useful functions are: `pairs` and `ipairs`. Both don't do anything itself but if you use them in `for` loop you can iterate over tables.
```lua
local myTable = {5,4,3,2,1}

for key,value in pairs(myTable) do
    print(key, value)
end

--[[
    outputs:
    1 5
    2 4
    3 3
    4 2
    5 1
]]

for key,value in ipairs(myTable) do
    print(key, value)
end

--[[
    outputs:
    1 5
    2 4
    3 3
    4 2
    5 1
]]
```

There are also 2 more methods to iterate through tables: by using `next` and by using "iterators":
```lua
local myTable = {
    18,3.14,true,false,'test',
    myKey = 'myValue'
}

for k,v in next, myTable do
    print(k,v)
end

--[[
    output:
    1 18
    2 3.14
    3 true
    4 false
    5 test
    myKey myValue
]]

for k=1, #myTable do
    print(k,myTable[k])
end

--[[
    output:
    1 18
    2 3.14
    3 true
    4 false
    5 test
]]
```
Keep in mind that the second method (iterators) only supports index based tables (arrays). <br/>
You can also use this method to make a basic "for range" loop:
```lua
for i=1,5 do
    print(i)
end

--[[
    output:
    1
    2
    3
    4
    5
]]

for i=3,0,-1 do
    print(i)
end

--[[
    output:
    3
    2
    1
    0
]]

for i=0,6,2 do
    print(i)
end

--[[
    output:
    0
    2
    4
    6
]]
```
<b>Q:</b> What is the difference between `pairs` and `ipairs`?
<br/>
<b>A:</b> `ipairs` doesn't loop through dictionaries while `pairs` loops through everything (both arrays and dictionaries). But it comes at a cost. `ipairs` is faster than `pairs` in looping through arrays.

To get variable's type use `type` function:
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

To convert string to an integer use `tonumber` function:
```lua
local numberAsString = '5.89'
local number = tonumber(numberAsString)
print(number, type(number)) -- output: 5.89 number
```

To convert number to string use `tostring` function:
```lua
local myNumber = 892
local myString = tostring(myNumber)
print(myString, type(myString)) -- output: 892 string
```

<br/><hr/><a name='error_handling'></a>

## Error Handling

Sometimes you have a bad day. An error is thrown. We need to figure out why and what we can do about it. We need to <b>catch</b> errors. <br/>
And to do that we will use `pcall` function.
What is a `pcall`? it is a <b>protected call</b>. Its first result is the status code (a boolean), which is <b>true</b> if the call succeeds without errors.
In such case, pcall also returns all results from the call, after this first result. In case of any error, pcall returns <b>false</b> plus the error object:
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