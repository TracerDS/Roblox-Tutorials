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
If the pattern has captures, then in a successful match the captured values are also returned, after the two indices.
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
Examples:
```lua
local text = 'Where is my brother?'

print(string.match(text,'brother')) -- output: brother
print(text:match('my')) -- output: my
print(text:match('WHERE')) -- output: nil
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