# Lesson 1 - Basic concepts

## Table of contents
- [Declaring a variable](#declaring_variables)
- [Data Types](#data_types)
- [Comments](#comments)
- [Scopes](#scopes)

<a name='declaring_variables'></a>

## Declaring a variable

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
<i>Don't worry if functions are confusing.
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

<br/>

To create a nil variable (variable with no value), use this format:
```lua
myVariable = nil
local myOtherVariable
```
Both variables return nil, but the first one is global while the second one is local. More on that later.

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
In this tutorials we will only use `local` variables. `global` variables are slooow.


## [Part 2](2%20-%20Basic%20concepts%202.md)