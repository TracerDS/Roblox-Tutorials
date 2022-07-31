# Lesson 1 - Basic concepts

## Table of contents
- [Declaring a variable](#declaring_variables)
- [Data Types](#data_types)
- [Comments](#comments)
- [Scopes](#scopes)
- [Concatenation](#concatenation)
- [Length Operator](#length_operator)

<br/><hr/><br/>

<a name='declaring_variables'></a>

## Declaring a variable

Variables are places that store values. There are three kinds of variables in Lua: global variables, local variables, and table fields.

To declare a variable you need to provide name and its value in following format:
```lua
name = value
```
Examples:
```lua
myBeautifulVariable = 5
PI = 3.14
another_simple_var = 'Simple key'
ShouldRun = true
function foo()
    return 'bar'
end
bar = function()
    return 'bar'
end
```
Before the first assignment to a variable, its value is nil.

<i>Don't worry if functions are confusing right now.
We will get to them later</i>


<hr/><a name='data_types'></a>

## Data Types

Lua has 7 simple data types:
- nil (aka null)
- number (ints, decimals)
- boolean (aka bool)
- string (aka texts)
- table
- function
- userdata
- thread

<br/>

To create a nil variable (variable with no value), use this format:
```lua
myVariable = nil
local myOtherVariable
```
Both variables return nil, but the first one is global while the second one is local. More on that later.
<br/>
<b>Q:</b> What does `nil` mean?<br/>
<b>A:</b> It represents the absence of a useful value. In short terms: `nil` = no value

<br/>

To create a text variable, use the following format:
```lua
local myName = 'Tommy'
local friend = "Steve"
myMom = "Karen"
```
As you can see you can use both `""` and `''` to create a string variable. Lua doesn't care which one you choose. It's entirely up to you.

<br/>

To create a table, use the following format:
```lua
local myAmazingTable = {
    1,2,3,4
}
local anotherTable = {
    false,true,3.14,'yes','Hello, World!'
}
dictionary = {
    someKey = 'someValue',
    [1] = 15,
    PI = 3.14,
    isTrue = true
}
arrayAsDictionary = {
    [1] = 1,
    [2] = 2,
    [3] = 3,
    [4] = 4
}
```
`arrayAsDictionary` is <b>the same</b> as `myAmazingTable`. The possibility to not write indexes is just a "syntatic sugar".<br/>
<b>IMPORTANT: </b> Lua starts index at `1` instead of `0`

<br/>

To create a function, use `function` and `end` keywords:
```lua
function foo()
    print('bar')
end
local function bar()
    print('foo')
end
fooBar = function()
    print('bar')
end
local barFoo = function()
    print('foo')
end
```
As you can see `function <functionName>` is also a syntatic sugar. `foo` and `fooBar` are the same functions as well as `bar` and `barFoo`.

<br/>

<b>Q:</b> What are `userdata`s?
<br/>
<b>A:</b> Quote:<br/>
"The type userdata is provided to allow arbitrary C data to be stored in Lua variables.<br/>
A userdata value represents a block of raw memory. There are two kinds of userdata:
- <b>full userdata</b>, which is an object with a block of memory managed by Lua
- <b>light userdata</b>, which is simply a C pointer value"

<b>Q:</b> What are `thread`s?
<br/>
<b>A:</b> Quote:<br/> "The type thread represents independent threads of execution and it is used to implement coroutines. Lua threads are not related to operating-system threads. Lua supports coroutines on all systems, even those that do not support threads natively."

<hr/><a name='comments'></a>

## Comments

In order to "disable" certain lines from executing you can use comments. Lua ignores both comments and whitelines:
```lua
-- this prints test
print('test')
local variable = --[[ which one will lua choose? ]] 'this one'


local PI = 3.14--1245678
```
To create a single-line comment use `--`<br/>
To create a multi--line comment use `--[[` and `]]`

<hr/><a name='scopes'></a>

## Scopes

Every variable exist within a certain "scope".
By default variables are global. To specify which scope should a variable use (global or local) use `local` keyword:
```lua
globalVariable = 'my global variable'
local localVariable = 'my local variable'
```
In this tutorials we will only use `local` variables. `global` variables are slooow. More on that later.

<hr/><a name='concatenation'></a>

## Concatenation

The string concatenation operator in Lua is denoted by two dots ("`..`").
If both operands are strings or numbers, then the numbers are converted to strings in a non-specified format.
Otherwise, the `__concat` metamethod is called.

<hr/><a name='length_operator'></a>

## Length Operator

The length operator is denoted by the unary prefix operator `#`.

The length of a string is its number of bytes. (That is the usual meaning of string length when each character is one byte.)

The length operator applied on a table returns a border in that table. A border in a table t is any non-negative integer that satisfies the following condition:
```lua
(border == 0 or t[border] ~= nil) and (t[border + 1] == nil or border == math.maxinteger)
```
In words, a border is any positive integer index present in the table that is followed by an absent index, plus two limit cases: zero, when index 1 is absent; and the maximum value for an integer, when that index is present. Note that keys that are not positive integers do not interfere with borders.

A table with exactly one border is called a `sequence`.<br/>
For instance, the table `{10, 20, 30, 40, 50}` is a sequence, as it has only one border (5).<br/>
The table `{10, 20, 30, nil, 50}` has two borders (3 and 5), and therefore it is not a sequence. (The nil at index 4 is called a `hole`).<br/>
The table `{nil, 20, 30, nil, nil, 60, nil}` has three borders (0, 3, and 6), so it is not a sequence, too. 

The table `{}` is a sequence with border 0.

<hr/><a name='visibility_rules'></a>

## Visibility Rules

Lua is a lexically scoped language. The scope of a local variable begins at the first statement after its declaration and lasts until the last non-void statement of the innermost block that includes the declaration. Consider the following example:
```lua
x = 10 -- global variable
do -- new block
    local x = x -- new 'x', with value 10
    print(x) -- output: 10
    x = x + 1
    do -- another block
        local x = x + 1 -- another 'x'
        print(x) -- output: 12
    end
    print(x) -- output: 11
end
print(x) -- output: 10
```
Notice that, in a declaration like `local x = x`, the new `x` being declared is not in scope yet, and so the second `x` refers to the outside variable.

Because of the lexical scoping rules, local variables can be freely accessed by functions defined inside their scope. A local variable used by an inner function is called an upvalue (or external local variable, or simply external variable) inside the inner function.

Notice that each execution of a local statement defines new local variables. Consider the following example:
```lua
a = {}
local x = 20
for i = 1, 10 do
    local y = 0
    a[i] = function()
        y = y + 1
        return x + y
    end
end
```
The loop creates ten closures (that is, ten instances of the anonymous function). Each of these closures uses a different y variable, while all of them share the same x.

<hr/>

- ## [Index](README.md)
- ## [Part 2](2%20-%20Basic%20concepts%202.md)