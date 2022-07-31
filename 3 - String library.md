# Lesson 3 - String library

## Table of contents
- [Functions](#functions)
- [Patterns](#patterns)

<br/><hr/><br/>

In lua you can use `:` instead of `.` in string libraries:
```lua
string.byte(myString,3,7)
myString:byte(3,7)

string.len(myString)
myString:len()

string.lower(myString)
myString:lower()
```
<b>However</b> this rule don't apply to all functions.

<br/><hr/><a name='functions'></a>

## Functions

- `string.byte(text [, index [, endIndex]])`<br/><br/>
Returns the ASCII code of the characters.
Default value for `index` is `1`; the default value for `endIndex` is `i`.
These indices are corrected following the same rules of function `string.sub`.
Numeric codes are not necessarily portable across platforms.<br/><br/>
You can shorten it by using `:byte` instead.<br/>
Examples:
```lua
local str = 'My string'
print(string.byte(str)) -- output: 77
print(string.byte(str,1)) -- output: 77
print(string.byte(str,3)) -- output: 32
print(string.byte(str,3,6)) -- output: 32 115	116	114

print(str:byte(4,6)) -- output: 115 116 114
```
<hr/><br/>

- `string.char(...)`<br/><br/>
Receives zero or more integers. Returns a string with length equal to the number of arguments, in which each character has the internal numeric code equal to its corresponding argument.
Numeric codes are not necessarily portable across platforms.
Examples:
```lua
local numA = 97
local numABigger = 65
print(string.char(numA)) -- output: a
print(string.char(numABigger)) -- output: A
print(string.char(numA, numABigger)) -- output: aA
```
<hr/><br/>

- `string.dump(function [, strip])`<br/><br/>
Returns a string containing a binary representation (a binary chunk) of the given function, so that a later load on this string returns a copy of the function (but with new upvalues). If strip is a true value, the binary representation may not include all debug information about the function, to save space.<br/>
Functions with upvalues have only their number of upvalues saved. When (re)loaded, those upvalues receive fresh instances.
Examples:
```lua
local function foo()
    print('bar')
end
local dumped = string.dump(foo)
print(dumped) -- this will print binary data. Unreadable by human user

local f = load(dumped)
f() -- output: bar

load(dumped)() -- output: bar
```
<hr/><br/>

- `string.find(text, pattern [, init [, plain]])`<br/><br/>
Looks for the first match of pattern in the string `text`. If it finds a match, then find returns the indices of `text` where this occurrence starts and ends; otherwise, it returns fail.<br/>
A third, optional numeric argument `init` specifies where to start the search; its default value is `1` and <b>can</b> be negative. A true as a fourth, optional argument `plain` turns off the pattern matching facilities, so the function does a plain "find substring" operation, with no characters in pattern being considered magic.<br/>
If the pattern has captures, then in a successful match the captured values are also returned, after the two indices.<br/>
You can shorten it by using `:find` instead.<br/>
Examples:
```lua
local text = 'Hello, World!'
print(string.find(text, 'hello')) -- output: nil
print(string.find(text, 'Hello')) -- output: 1 5
print(string.find(text, 'world')) -- output: nil
print(string.find(text, 'World')) -- output: 7 11
print(text:find('l')) -- output: 3 3
print(text:find('lll')) -- output: nil
```
<hr/><br/>

- `string.format(text, ...)`<br/><br/>
Returns a formatted version of its variable number of arguments following the description given in its first argument, which must be a string. The format string follows the same rules as the ISO C function sprintf. The only differences are that the conversion specifiers and modifiers F, n, *, h, L, and l are not supported and that there is an extra specifier, q. Both width and precision, when present, are limited to two digits.<br/>
The conversion specifiers A, a, E, e, f, G, and g all expect a number as argument. The specifiers c, d, i, o, u, X, and x expect an integer.<br/>
The specifier `s` expects a string<br/>
You can shorten it by using `:format` instead.<br/>
Examples:
```lua
local formatString = 'Hello, %s!'

print(string.format(formatString, 'World')) -- output: Hello, World!
print(formatString:format('Steve')) -- output: Hello, Steve!
print(('I am %s. I am %d years old.'):format('Adam', 38)) -- output: I am Adam. I am 38 years old
```
<hr/><br/>

- `string.match(text, pattern [, init])`<br/><br/>
Looks for the first match of the pattern in the string `text`. If it finds one, then match returns the captures from the pattern; otherwise it returns fail. If pattern specifies no captures, then the whole match is returned. A third, optional numeric argument init specifies where to start the search; its default value is 1 and can be negative.<br/>
You can shorten it by using `:match` instead.<br/>
Examples:
```lua
local text = 'Where is my brother?'

print(string.match(text,'brother')) -- output: brother
print(text:match('my')) -- output: my
print(text:match('WHERE')) -- output: nil
```
<hr/><br/>

- `string.gmatch(text, pattern [, init])`<br/><br/>
Returns an iterator function that, each time it is called, returns the next captures from pattern over the string `text`. If `pattern` specifies no captures, then the whole match is produced in each call. A third, optional numeric argument `init` specifies where to start the search; its default value is `1` and <b>can</b> be negative.<br/>
You can shorten it by using `:gmatch` instead.<br/>
Examples:
```lua
local text = 'Hello world from Lua'
for word in string.gmatch(text, '%a+') do
    print(word)
end
--[[
    output:
    Hello
    world
    from
    Lua
]]

local myString = 'This is my string'
for str in myString:gmatch('(%a*is)') do
    print(str)
end
--[[
    output:
    This
    is
]]
```
<hr/><br/>

- `string.sub(text [, index [, endIndex]])`<br/><br/>
Returns the substring of `text` that starts at `index` and continues until `endIndex`; `index` and `endIndex` can be negative. If `endIndex` is absent, then it is assumed to be equal to `-1` (which is the same as the string length). In particular, the call `string.sub(text,1,endIndex)` returns a prefix of `text` with length `endIndex`, and `string.sub(text, -index)` (for a positive `index`) returns a suffix of `text` with length `index`.<br/><br/>
If, after the translation of negative indices, `index` is less than 1, it is corrected to 1. If `endIndex` is greater than the string length, it is corrected to that length. If, after these corrections, `index` is greater than `endIndex`, the function returns the empty string.<br/>
You can shorten it by using `:sub` instead.<br/>
Examples:
```lua
local str = 'Hello Lua user'
print(string.sub(str, 7)) -- output: Lua user
print(str:sub(7, 9)) -- output: Lua
print(str:sub(-8)) -- output: Lua user
print(str:sub(-8, 9)) -- output: Lua
print(str:sub(-8, -6)) -- output: Lua
```
<hr/><br/>

- `string.gsub(text, pattern, repl [, num])`<br/><br/>
Returns a copy of `text` in which all (or the first `num`, if given) occurrences of the pattern have been replaced by a replacement string specified by `repl`, which can be a string, a table, or a function. `:gsub` also returns, as its second value, the total number of matches that occurred. The name `gsub` comes from <b>Global SUB</b>stitution.<br/>
If `repl` is a string, then its value is used for replacement. The character `%` works as an escape character: any sequence in `repl` of the form %d, with d between 1 and 9, stands for the value of the d-th captured substring; the sequence `%0` stands for the whole match; the sequence `%%` stands for a single `%`.<br/>
If `repl` is a table, then the table is queried for every match, using the first capture as the key.<br/>
If `repl` is a function, then this function is called every time a match occurs, with all captured substrings passed as arguments, in order.<br/>
In any case, if the `pattern` specifies no captures, then it behaves as if the whole pattern was inside a capture.<br/>
If the value returned by the table query or by the function call is a string or a number, then it is used as the replacement string; otherwise, if it is false or nil, then there is no replacement (that is, the original match is kept in the string).<br/>
You can shorten it by using `:gsub` instead.<br/>
Examples:
```lua
local ex1 = 'hello world'
print(string.gsub(ex1, '(%w+)', '%1 %1')) -- output: hello hello world world
print(string.gsub(ex1, '%w+', '%0 %0', 1)) -- output: hello hello world

print(string.gsub(ex1..' from Lua', '(%w+)%s*(%w+)', '%2 %1') )-- output: world hello Lua from

local ex2 = ('home = $HOME, user = $USER', '%$(%w+)'):gsub('roberto')
print(ex2) -- output: home = roberto, user = roberto

local ex3 = string.gsub('4+5 = $return 4+5$', '%$(.-)%$', function(str) return load(str)() end)
print(ex3) -- output: 4+5 = 9

local ex4 = { name = 'lua', version = '5.4' }
local temp = ('$name-$version.tar.gz'):gsub('%$(%w+)', ex4)
print(temp) -- output: lua-5.4.tar.gz
```
<hr/><br/>

- `string.len(text)`<br/><br/>
Receives a string and returns its length. The empty string `""` has length 0. Embedded zeros are counted, so `"a\000bc\000"` has length 5.<br/>
You can shorten it by using `:len` instead.<br/>
Examples:
```lua
local str = 'Count this!'
print(string.len(str)) -- output: 11
print(str:len()) -- output: 11
print(#str) -- output: 11

print(('\n12\n34\n56\n78\n90'):len()) -- output: 15
print('\n12\n34\n56\n78\n90')
--[[
    output:

    12
    34
    56
    78
    90
]]
```
<hr/><br/>

- `string.lower(text)`<br/><br/>
Receives a string and returns a copy of this string with all uppercase letters changed to lowercase. All other characters are left unchanged. The definition of what an uppercase letter is depends on the current locale.<br/>
You can shorten it by using `:lower` instead.<br/>
Examples:
```lua
local str = 'ChAngE tHIS tO LOWERcaSE!'
print(str:lower()) -- output: change this to lowercase!
```
<hr/><br/>

- `string.upper(text)`<br/><br/>
Receives a string and returns a copy of this string with all lowercase letters changed to uppercase. All other characters are left unchanged. The definition of what a lowercase letter is depends on the current locale.<br/>
You can shorten it by using `:upper` instead.<br/>
Examples:
```lua
local str = 'chAnge tHIS tO upperCAse!'
print(str:upper()) -- output: CHANGE THIS TO UPPERCASE!
```
<hr/><br/>

- `string.reverse(text)`<br/><br/>
Returns a string that is the string s reversed.<br/>
You can shorten it by using `:reverse` instead.<br/>
Examples:
```lua
local str = 'Reverse this, please?'
print(str:reverse()) -- output: ?esaelp ,siht esreveR
```
<hr/><br/>

- `string.rep(text, num [, separator])`<br/><br/>
Returns a string that is the concatenation of `num` copies of the string `text` separated by the string `separator`. The default value for `separator` is the empty string (that is, no separator). Returns the empty string if `num` is not positive.<br/>
(Note that it is very easy to exhaust the memory of your machine with a single call to this function.)<br/>
You can shorten it by using `:rep` instead.<br/>
Examples:
```lua
print(('*'):rep(10)) -- output: **********
print(('-'):rep(5,'|')) -- output: -|-|-|-|-
```
<hr/><br/>

- `string.pack(fmt, v1, v2, ...)`<br/><br/>
Returns a binary string containing the values `v1`, `v2`, etc. serialized in binary form (packed) according to the format string `fmt`<br/>
You can shorten it by using `:pack` instead.<br/>
Examples:
```lua
-- pack 4 ints to binary data
local str = '>I4I4I4I4'
local packed = str:pack(0x000055AA, 2, 7, 121)
print(str:unpack(packed)) -- output: 21930 2 7 121 17
```
<hr/><br/>

- `string.unpack(fmt, str [, pos])`<br/><br/>
Returns the values packed in string `fmt` according to the format string `fmt`. An optional `pos` marks where to start reading in `str` (default is 1). After the read values, this function also returns the index of the first unread byte in `str`.<br/>
You can shorten it by using `:unpack` instead.<br/>
Examples:
```lua
-- pack 4 ints to binary data
local str = '>I4I4I4I4'
local packed = str:pack(0x000055AA, 2, 7, 121)
print(str:unpack(packed)) -- output: 21930 2 7 121 17
```

<br/><hr/><a name='patterns'></a>

## Patterns

Patterns in Lua are described by regular strings, which are interpreted as patterns by the pattern-matching functions `string.find`, `string.gmatch`, string.gsub, and `string.match`. This section describes the syntax and the meaning (that is, what they match) of these strings.

### <b>Character Class:</b>
A character class is used to represent a set of characters. The following combinations are allowed in describing a character class:

- <b>x:</b> (where x is not one of the magic characters ^$()%.[]*+-?) represents the character x itself.
- <b>.:</b> (a dot) represents all characters.
- <b>%a:</b> represents all letters.
- <b>%c:</b> represents all control characters.
- <b>%d:</b> represents all digits.
- <b>%g:</b> represents all printable characters except space.
- <b>%l</b>: represents all lowercase letters.
- <b>%p:</b> represents all punctuation characters.
- <b>%s:</b> represents all space characters.
- <b>%u:</b> represents all uppercase letters.
- <b>%w:</b> represents all alphanumeric characters.
- <b>%x:</b> represents all hexadecimal digits.
- <b>%x:</b> (where x is any non-alphanumeric character) represents the character x. This is the standard way to escape the magic characters. Any non-alphanumeric character (including all punctuation characters, even the non-magical) can be preceded by a '%' to represent itself in a pattern.
- <b>[set]:</b> represents the class which is the union of all characters in set. A range of characters can be specified by separating the end characters of the range, in ascending order, with a '-'. All classes `%x` described above can also be used as components in set. All other characters in set represent themselves. For example, `[%w_]` (or `[_%w]`) represents all alphanumeric characters plus the underscore, `[0-7]` represents the octal digits, and `[0-7%l%-]` represents the octal digits plus the lowercase letters plus the '-' character.
You can put a closing square bracket in a set by positioning it as the first character in the set. You can put a hyphen in a set by positioning it as the first or the last character in the set. (You can also use an escape for both cases.)<br/><br/>
The interaction between ranges and classes is not defined. Therefore, patterns like [%a-z] or [a-%%] have no meaning.

- <b>[^set]</b>: represents the complement of set, where set is interpreted as above.<br/><br/>
For all classes represented by single letters (`%a`, `%c`, etc.), the corresponding uppercase letter represents the complement of the class. For instance, `%S` represents all <b>non</b>-space characters.

<hr/>

- ## [Part 2](2%20-%20Basic%20concepts%202.md)
- ## [Part 4]()