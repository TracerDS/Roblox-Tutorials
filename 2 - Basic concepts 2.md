# Lesson 2 - Basic concepts 2

## Table of contents
- [Basic Functions](#basic_functions)

<a href='#basic_functions'></a>

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
<b>Q:</b> What is the difference between `pairs` and `ipairs`?
<br/>
<b>A:</b> `ipairs` doesn't loop through dictionaries while `pairs` loops through everything (both arrays and dictionaries). But it comes at a cost. `ipairs` is faster than `pairs` in looping through arrays.

