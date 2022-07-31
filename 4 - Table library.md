# Lesson 4 - Table library

## Table of contents
- [Functions](#functions)
- [Metatables](#metatables)

<br/><hr/><br/><a name='functions'></a>

## Functions

- `table.concat(list [, sep [, index [, endIndex]]])`<br/><br/>
Given a list where all elements are strings or numbers, returns the string `list[index]..sep..list[index+1] ... sep..list[endIndex]`.<br/>
The default value for `sep` is the empty string, the default for `index` is 1, and the default for `endIndex` is `#list`. If `index` is greater than `endIndex`, returns the empty string.<br/><br/>
Examples:
```lua
local myTable = {'testKey', 'testKey2', 3.14}

print(table.concat(myTable)) -- output: testKeytestKey23.14
print(table.concat(myTable, ' ')) -- output: testKey testKey2 3.14
```
<hr/><br/>

- `table.insert(list, [pos,] value)`<br/><br/>
Inserts element value at position pos in list, shifting up the elements `list[pos]`, `list[pos+1]`, `...`, `list[#list]`. The default value for `pos` is `#list+1`, so that a call `table.insert(t,x)` inserts `x` at the end of the list `t`.<br/><br/>
Examples:
```lua
local myTable = {'testKey', 'testKey2', 3.14}

table.insert(myTable, 'someValue')
for k,v in ipairs(myTable) do
    print(k,v)
end

--[[
    output:
    1 testKey
    2 testKey2
    3 3.14
    4 someValue
]]

table.insert(myTable, 1, 'firstKey')
for k,v in ipairs(myTable) do
    print(k,v)
end

--[[
    output:
    1 firstKey
    2 testKey
    3 testKey2
    4 3.14
    5 someValue
]]
```
<hr/><br/>

- `table.remove(list [, pos])`<br/><br/>
Removes from `list` the element at position `pos`, returning the value of the removed element. When `pos` is an integer between 1 and `#list`, it shifts down the elements `list[pos+1], list[pos+2], ..., list[#list]` and erases element `list[#list]`; The index `pos` can also be 0 when `#list` is 0, or `#list + 1`.<br/>
The default value for `pos` is `#list`, so that a call `table.remove(l)` removes the last element of the list `l`.<br/><br/>
Examples:
```lua
local myTable = {'testKey', 'testKey2', 3.14}

table.remove(myTable, 2)
for k,v in ipairs(myTable) do
    print(k,v)
end

--[[
    output:
    1 testKey
    2 3.14
]]
```
<hr/><br/>

- `table.move(tbl1, startIndex, endIndex, putIndex [, tbl2])`<br/><br/>
Moves elements from the table `tbl1` to the table `tbl2`.<br/>
The <b>first</b> argument is the table you want to move.<br/>
The <b>second</b> argument is the minimum index you want to move.<br/>
The <b>third</b> argument is the maximum index to you want to move.<br/>
The <b>fourth</b> argument defines where within the second table to start overriding.<br/>
The <b>fifth</b> argument is the table you want it to move to.<br/>
The destination range can overlap with the source range. The number of elements to be moved must fit in a Lua integer.<br/><b>
Returns the destination table `tbl2`.</b><br/><br/>
Examples:
```lua
local table1 = { 3.14, 'testKey', 'testValue', 8, false }
local table2 = table.move(table1, 2, #table1 - 1, 1, {})

for k,v in ipairs(table2) do
    print(k,v)
end

--[[
    output:
    1 testKey
    2 testValue
    3 8
]]
```
<hr/><br/>

- `table.pack(...)`<br/><br/>
Returns a new table with all arguments stored into keys 1, 2, etc. and with a field `n` with the total number of arguments. Note that the resulting table may not be a sequence, if some arguments are nil.<br/><br/>
Examples:
```lua
local tbl = table.pack(10,20,30)
for k,v in pairs(tbl) do
    print(k,v)
end
--[[
    output:
    1 10
    2 20
    3 30
    n 3
]]
```
<hr/><br/>

- `table.unpack(list [, index [, endIndex]])`<br/><br/>
Returns the elements from the given list. This function is equivalent to `return list[index], list[index+1], ..., list[endIndex]`<br/>
By default, `index` is 1 and `endIndex` is `#list`.<br/><br/>
Examples:
```lua
local tbl = table.pack(568,'hello','world',false)
print(table.unpack(tbl)) -- output: 568 hello world false
```
<hr/><br/>

- `table.sort(list [, comp])`<br/><br/>
Sorts the list elements in a given order, in-place, from `list[1]` to `list[#list]`. If `comp` is given, then it must be a function that receives two list elements and returns <b>true</b> when the first element must come before the second in the final order, so that, after the sort, `index <= endIndex` implies `not comp(list[endIndex], list[index])`. If `comp` is not given, then the standard Lua operator `<` is used instead.<br/><br/>
The `comp` function must define a consistent order; more formally, the function must define a strict weak order. (A weak order is similar to a total order, but it can equate different elements for comparison purposes.)<br/><br/>
The sort algorithm is not stable: Different elements considered equal by the given order may have their relative positions changed by the sort.<br/><br/>
Examples:
```lua
local tbl = {3, 12, 1, 94, 56}
table.sort(tbl)
for k,v in pairs(tbl) do
    print(k,v)
end
--[[
    output:
    1 1
    2 3
    3 12
    4 56
    5 94
]]
```

- ## [Part 3](3%20-%20String%20library.md)
- ## [Part 5]()