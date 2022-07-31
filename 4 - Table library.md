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

<br/><hr/><a name='metatables'></a>

## Metatables

Every value in Lua can have a metatable. This metatable is an ordinary Lua table that defines the behavior of the original value under certain events. You can change several aspects of the behavior of a value by setting specific fields in its metatable. For instance, when a non-numeric value is the operand of an addition, Lua checks for a function in the field `__add` of the value's metatable. If it finds one, Lua calls this function to perform the addition.

You can query the metatable of any value using the `getmetatable` function. Lua queries metamethods in metatables using a raw access (`rawget`).

You can replace the metatable of tables using the `setmetatable` function. You cannot change the metatable of other types from Lua code, except by using the debug library.


### <b>Metamethods list:</b>

- <b>__add:</b> the addition (`+`) operation. If any operand for an addition is not a number, Lua will try to call a metamethod. It starts by checking the first operand (even if it is a number); if that operand does not define a metamethod for `__add`, then Lua will check the second operand. If Lua can find a metamethod, it calls the metamethod with the two operands as arguments, and the result of the call (adjusted to one value) is the result of the operation. Otherwise, if no metamethod is found, Lua raises an error.
- <b>__sub:</b> the subtraction (`-`) operation. Behavior similar to the addition operation.
- <b>__mul:</b> the multiplication (`*`) operation. Behavior similar to the addition operation.
- <b>__div:</b> the division (`/`) operation. Behavior similar to the addition operation.
- <b>__mod:</b> the modulo (`%`) operation. Behavior similar to the addition operation.
- <b>__pow:</b> the exponentiation (`^`) operation. Behavior similar to the addition operation.
- <b>__unm:</b> the negation (unary `-`) operation. Behavior similar to the addition operation.
- <b>__idiv:</b> the floor division (`//`) operation. Behavior similar to the addition operation.
- <b>__band:</b> the bitwise AND (`&`) operation. Behavior similar to the addition operation, except that Lua will try a metamethod if any operand is neither an integer nor a float coercible to an integer.
- <b>__bor:</b> the bitwise OR (`|`) operation. Behavior similar to the bitwise AND operation.
- <b>__bxor:</b> the bitwise exclusive OR (binary `~`) operation. Behavior similar to the bitwise AND operation.
- <b>__bnot:</b> the bitwise NOT (unary `~`) operation. Behavior similar to the bitwise AND operation.
- <b>__shl:</b> the bitwise left shift (`<<`) operation. Behavior similar to the bitwise AND operation.
- <b>__shr:</b> the bitwise right shift (`>>`) operation. Behavior similar to the bitwise AND operation.
- <b>__concat:</b> the concatenation (`..`) operation. Behavior similar to the addition operation, except that Lua will try a metamethod if any operand is neither a string nor a number (which is always coercible to a string).
- <b>__len:</b> the length (`#`) operation. If the object is not a string, Lua will try its metamethod. If there is a metamethod, Lua calls it with the object as argument, and the result of the call (always adjusted to one value) is the result of the operation. If there is no metamethod but the object is a table, then Lua uses the table length operation. Otherwise, Lua raises an error.
- <b>__eq:</b> the equal (`==`) operation. Behavior similar to the addition operation, except that Lua will try a metamethod only when the values being compared are either both tables or both full userdata and they are not primitively equal. The result of the call is always converted to a boolean.
- <b>__lt:</b> the less than (`<`) operation. Behavior similar to the addition operation, except that Lua will try a metamethod only when the values being compared are neither both numbers nor both strings. Moreover, the result of the call is always converted to a boolean.
- <b>__le:</b> the less equal (`<=`) operation. Behavior similar to the less than operation.
- <b>__index:</b> The indexing access operation `table[key]`. This event happens when table is not a table or when key is not present in table. The metavalue is looked up in the metatable of table.<br/>
The metavalue for this event can be either a function, a table, or any value with an `__index` metavalue. If it is a function, it is called with table and key as arguments, and the result of the call (adjusted to one value) is the result of the operation. Otherwise, the final result is the result of indexing this metavalue with key. This indexing is regular, not raw, and therefore can trigger another `__index` metavalue.
- <b>__newindex:</b> The indexing assignment `table[key] = value`. Like the `__index` event, this event happens when table is not a table or when key is not present in table. The metavalue is looked up in the metatable of table.<br/>
Like with indexing, the metavalue for this event can be either a function, a table, or any value with an `__newindex` metavalue. If it is a function, it is called with table, key, and value as arguments. Otherwise, Lua repeats the indexing assignment over this metavalue with the same key and value. This assignment is regular, not raw, and therefore can trigger another `__newindex` metavalue.<br/><br/>
Whenever a `__newindex` metavalue is invoked, Lua does not perform the primitive assignment. If needed, the metamethod itself can call `rawset` to do the assignment.
- <b>__call:</b> The call operation `func(args)`. This event happens when Lua tries to call a non-function value (that is, func is not a function). The metamethod is looked up in func. If present, the metamethod is called with func as its first argument, followed by the arguments of the original call (args). All results of the call are the results of the operation. This is the only metamethod that allows multiple results.

In addition to the previous list, the interpreter also respects the following keys in metatables: `__gc`, `__close`, `__mode` and `__name`. (The entry `__name`, when it contains a string, may be used by `tostring` and in error messages.)

### <b>Examples:</b>

```lua
local myTable = { someField = 'someValue' }
setmetatable(myTable, {
    __call = function(tbl, ...)
        local args = table.concat({...}, ' ')
        print('Arguments: ',args)
    end
})
myTable(56,'hello', 'world') -- output: Arguments: 56 hello world
```
```lua
local otherTable = setmetatable({},{
    __newindex = function(tbl, index, value)
        print('Trying to set new index: ',index, value)
        error('Table is read only!')
        return nil
    end
})

for k,v in pairs(getmetatable(otherTable)) do
    print(k,v)
end

for k,v in pairs(otherTable) do print(k,v) end -- Doesn't print anything

otherTable['someKey'] = 'someValue'

--[[
    output:
    __newindex function
    Trying to set new index: someKey someValue
    Table is read only!
]]
```
```lua
local myTbl = setmetatable({}, {
    __index = function(tbl, index)
        print(('Returning value %s at index %s...'):format(rawget(tbl, index),index))
        return rawget(tbl, index)
    end,
    __newindex = function(tbl, index, value)
        print(('Creating value %s at index %s...'):format(value,index))
        return rawset(tbl, index, value)
    end
})
myTbl['myKey'] = 'test'
myTbl['someOtherKey'] = nil
print(myTbl['myKey'])

--[[
    output:
    Creating value test at index myKey...
    Creating value nil at index someOtherKey...
    test
]]
```
<hr/>

- ## [Part 3](3%20-%20String%20library.md)
- ## [Part 5](5%20-%20Math%20library.md)