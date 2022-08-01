# Lesson 5 - Math library

## Table of contents
- [Functions](#functions)

<br/><hr/><br/><a name='functions'></a>

## Functions

- `math.abs(x)`<br/><br/>
Returns the maximum value between x and -x. (integer/float)<br/><br/>
Examples:
    ```lua
    print(math.abs(5)) -- output: 5
    print(math.abs(3.14)) -- output: 3.14
    print(math.abs(-96)) -- output: 96
    ```

<hr/><br/>

- `math.acos(x)`<br/><br/>
Returns the arc cosine of x (in radians).<br/><br/>
Examples:
    ```lua
    print(math.acos(1)) -- output: 0
    print(math.acos(0)) -- output: 1.5707963267949
    print(math.asin(0)) -- output: 0
    print(math.asin(1)) -- output: 1.5707963267949
    ```

<hr/><br/>

- `math.asin(x)`<br/><br/>
Returns the arc sine of x (in radians).<br/><br/>
Examples:
    ```lua
    print(math.acos(1)) -- output: 0
    print(math.acos(0)) -- output: 1.5707963267949
    print(math.asin(0)) -- output: 0
    print(math.asin(1)) -- output: 1.5707963267949
    ```

<hr/><br/>

- `math.atan(y [, x])`<br/><br/>
Returns the arc tangent of `y/x` (in radians), but uses the signs of both arguments to find the quadrant of the result. It also handles correctly the case of `x` being zero.<br/><br/>
The default value for `x` is 1, so that the call `math.atan(y)` returns the arc tangent of `y`.<br/><br/>
Examples:
    ```lua
    local cos = math.cos(0.8)
    local sin = math.sin(0.8)

    print(cos, sin) -- output: 0.69670670934717 0.71735609089952
    print(math.atan(sin / cos)) -- output: 0.8
    print(math.atan(sin, cos)) -- output: 0.8
    ```

<hr/><br/>

- `math.ceil(x)`<br/><br/>
Returns the smallest integral value greater than or equal to x.<br/><br/>
Examples:
    ```lua
    print(math.ceil(87))    -- output: 87
    print(math.ceil(3.14))  -- output: 4
    print(math.ceil(4.5))  -- output: 5
    print(math.ceil(12.8))  -- output: 13
    print(math.ceil(-1.2))  -- output: -1
    ```
<hr/><br/>

- `math.cos(x)`<br/><br/>
Returns the cosine of x (assumed to be in radians).<br/><br/>
Examples:
    ```lua
    local cos = math.cos(0.8)
    local sin = math.sin(0.8)

    print(cos, sin) -- output: 0.69670670934717 0.71735609089952
    print(math.atan(sin / cos)) -- output: 0.8
    print(math.atan(sin, cos)) -- output: 0.8
    ```
<hr/><br/>

- `math.deg(x)`<br/><br/>
Converts the angle x from radians to degrees.<br/><br/>
Examples:
    ```lua
    print(math.deg(math.pi)) -- output: 180
    print(math.deg(math.pi / 2)) -- output: 90
    print(math.rad(180)) -- output: 3.1415926535898
    print(math.rad(1)) -- output: 0.017453292519943
    ```
<hr/><br/>

- `math.exp(x)`<br/><br/>
Returns the value ex (where e is the base of natural logarithms).<br/><br/>
Examples:
    ```lua
    print(math.exp(0)) -- output: 1
    print(math.exp(1)) -- output: 2.718281828459
    print(math.exp(27)) -- output: 532048240601.8
    print(math.log(532048240601.8)) -- output: 27
    print(math.log(3)) -- output: 1.0986122886681
    ```

<hr/><br/>

- `math.floor(x)`<br/><br/>
Returns the largest integral value less than or equal to x.<br/><br/>
Examples:
    ```lua
    print(math.floor(87))    -- output: 87
    print(math.floor(3.14))  -- output: 3
    print(math.floor(4.5))  -- output: 4
    print(math.floor(12.8))  -- output: 12
    print(math.floor(-1.2))  -- output: -2
    ```

<hr/><br/>

- `math.fmod(x, y)`<br/><br/>
Returns the remainder of the division of x by y that rounds the quotient towards zero. This is equivalent to `x % y`.<br/><br/>
Examples:
    ```lua
    print(math.fmod(100, 22)) -- output: 12
    print(math.fmod(50, 4)) -- output: 2
    ```
<hr/><br/>

- `math.huge`<br/><br/>
The float value `HUGE_VAL`, a value greater than any other numeric value.<br/><br/>
Examples:
    ```lua
    print(math.huge) -- output: inf
    print(math.huge-1 == math.huge) -- output: true
    print(10^10 == math.huge) -- output: false
    ```

<hr/><br/>

- `math.log(x [, base])`<br/><br/>
Returns the logarithm of x in the given base. The default for base is e (so that the function returns the natural logarithm of x).<br/><br/>
Examples:
    ```lua
    print(math.exp(0)) -- output: 1
    print(math.exp(1)) -- output: 2.718281828459
    print(math.exp(27)) -- output: 532048240601.8
    print(math.log(532048240601.8)) -- output: 27
    print(math.log(3)) -- output: 1.0986122886681
    ```

<hr/><br/>

- `math.max(x, ...)`<br/><br/>
Returns the argument with the maximum value, according to the Lua operator <.<br/><br/>
Examples:
    ```lua
    print(math.max(1,2)) -- output: 2
    print(math.max(-5,5)) -- output: 5
    print(math.max(3.141, 3.1401)) -- output: 3.141
    ```

<hr/><br/>

- `math.maxinteger`<br/><br/>
An integer with the maximum value for an integer.<br/><br/>
Examples:
    ```lua
    print(math.maxinteger) -- output: 9223372036854775807
    print(('%x'):format(math.maxinteger)) -- output: 7fffffffffffffff
    ```

<hr/><br/>

- `math.min(x, ...)`<br/><br/>
Returns the argument with the minimum value, according to the Lua operator <.<br/><br/>
Examples:
    ```lua
    print(math.min(1,2)) -- output: 1
    print(math.min(-5,5)) -- output: -5
    print(math.min(3.141, 3.1401)) -- output: 3.1401
    ```

<hr/><br/>

- `math.mininteger`<br/><br/>
An integer with the minimum value for an integer.<br/><br/>
Examples:
    ```lua
    print(math.mininteger) -- output: -9223372036854775808
    print(('%x'):format(math.mininteger)) -- output: 8000000000000000
    ```
<hr/><br/>

- `math.modf(x)`<br/><br/>
Returns the integral part of x and the fractional part of x. Its second result is always a float.<br/><br/>
Examples:
    ```lua
    print(math.modf(5)) -- output: 5 0
    print(math.modf(5.3)) -- output: 5 0.3
    print(math.modf(-5.3)) -- output: -5 -0.3
    ```

<hr/><br/>

- `math.pi`<br/><br/>
The value of `π`.<br/><br/>
Examples:
    ```lua
    print(math.pi) -- output: 3.1415926535898
    ```
<hr/><br/>

- `math.rad(x)`<br/><br/>
Converts the angle x from degrees to radians.<br/><br/>
Examples:
    ```lua
    print(math.deg(math.pi)) -- output: 180
    print(math.deg(math.pi / 2)) -- output: 90
    print(math.rad(180)) -- output: 3.1415926535898
    print(math.rad(1)) -- output: 0.017453292519943
    ```
<hr/><br/>

- `math.random([from [, to]])`<br/><br/>
When called without arguments, returns a pseudo-random float with uniform distribution in the range `0-1`. When called with two integers `from` and `to`, `math.random` returns a pseudo-random integer with uniform distribution in the range `from - to`. The call `math.random(to)`, for a positive `to`, is equivalent to `math.random(1,to)`. The call `math.random(0)` produces an integer with all bits (pseudo)random.<br/><br/>
This function uses the xoshiro256** algorithm to produce pseudo-random 64-bit integers, which are the results of calls with argument 0. Other results (ranges and floats) are unbiased extracted from these integers.<br/><br/>
Lua initializes its pseudo-random generator with the equivalent of a call to math.randomseed with no arguments, so that math.random should generate different sequences of results each time the program runs.

<hr/><br/>

- `math.randomseed([x [, y]])`<br/><br/>
When called with at least one argument, the integer parameters `x` and `y` are joined into a 128-bit seed that is used to reinitialize the pseudo-random generator; equal seeds produce equal sequences of numbers. The default for `y` is zero.<br/><br/>
When called with no arguments, Lua generates a seed with a weak attempt for randomness.<br/><br/>
This function returns the two seed components that were effectively used, so that setting them again repeats the sequence.<br/><br/>
To ensure a required level of randomness to the initial state (or contrarily, to have a deterministic sequence, for instance when debugging a program), you should call `math.randomseed` with explicit arguments.

<hr/><br/>

- `math.sin(x)`<br/><br/>
Returns the sine of x (assumed to be in radians).<br/><br/>
Examples:
    ```lua
    print(math.cos(math.pi / 4)) -- output: 0.70710678118655
    print(math.sin(0.123)) -- output: 0.12269009002432
    print(math.tan(5/4)) -- output: 3.0095696738628
    print(math.tan(0.77)) -- output: 0.96966832796149
    ```
<hr/><br/>

- `math.sqrt(x)`<br/><br/>
Returns the square root of x. (You can also use the expression x^0.5 to compute this value.)<br/><br/>
Examples:
    ```lua
    print(math.sqrt(9)) -- output: 3.0
    print(math.sqrt(25)) -- output: 5.0
    print(math.sqrt(-36)) -- output: -nan
    print(math.sqrt(3.14)) -- output: 1.7720045146669
    print(math.sqrt(2)) -- output: 1.4142135623731
    print(9^0.5) -- output: 3.0
    ```
<hr/><br/>

- `math.tan(x)`<br/><br/>
Returns the tangent of x (assumed to be in radians).<br/><br/>
Examples:
    ```lua
    print(math.cos(math.pi / 4)) -- output: 0.70710678118655
    print(math.sin(0.123)) -- output: 0.12269009002432
    print(math.tan(5/4)) -- output: 3.0095696738628
    print(math.tan(0.77)) -- output: 0.96966832796149
    ```

<hr/><br/>

- `math.tointeger(x)`<br/><br/>
If the value x is convertible to an integer, returns that integer. Otherwise, returns fail.<br/><br/>
Examples:
    ```lua
    print(math.tointeger(3)) -- output: 3
    print(math.tointeger(3.14)) -- output: nil
    print(math.tointeger('3')) -- output: 3
    print(math.tointeger('3.14')) -- output: nil
    print(math.tointeger('text')) -- output: nil
    ```

<hr/><br/>

- `math.type(x)`<br/><br/>
Returns "integer" if x is an integer, "float" if it is a float, or fail if x is not a number.<br/><br/>
Examples:
    ```lua
    print(math.type(3)) -- output: integer
    print(math.type(3.14)) -- output: float
    print(math.type('text')) -- output: nil
    print(math.type('3')) -- output: nil
    ```

<hr/><br/>

- `math.ult(num1, num2)`<br/><br/>
Returns a boolean, true if and only if integer `num1` is below integer `num2` when they are compared as unsigned integers.<br/><br/>
Examples:
    ```lua
    print(math.ult(1,2)) -- output: true
    print(math.ult(2,2)) -- output: false
    print(math.ult(3,2)) -- output: false
    ```

<hr/>

- ## [Part 4](4%20-%20Table%20library.md)
- ## [Part 6](6%20-%20OS%20library.md)