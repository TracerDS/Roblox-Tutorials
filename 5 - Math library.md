# Lesson 5 - Math library

## Table of contents
- [Functions](#functions)

<br/><hr/><br/><a name='functions'></a>

## Functions

- `math.abs(x)`<br/><br/>
Returns the maximum value between x and -x. (integer/float)

<hr/><br/>

- `math.acos(x)`<br/><br/>
Returns the arc cosine of x (in radians).

<hr/><br/>

- `math.asin(x)`<br/><br/>
Returns the arc sine of x (in radians).

<hr/><br/>

- `math.atan(y [, x])`<br/><br/>
Returns the arc tangent of y/x (in radians), but uses the signs of both arguments to find the quadrant of the result. It also handles correctly the case of x being zero.

The default value for x is 1, so that the call math.atan(y) returns the arc tangent of y.

<hr/><br/>

- `math.ceil(x)`<br/><br/>
Returns the smallest integral value greater than or equal to x.

<hr/><br/>

- `math.cos(x)`<br/><br/>
Returns the cosine of x (assumed to be in radians).

<hr/><br/>

- `math.deg(x)`<br/><br/>
Converts the angle x from radians to degrees.

<hr/><br/>

- `math.exp(x)`<br/><br/>
Returns the value ex (where e is the base of natural logarithms).

<hr/><br/>

- `math.floor(x)`<br/><br/>
Returns the largest integral value less than or equal to x.

<hr/><br/>

- `math.fmod(x, y)`<br/><br/>
Returns the remainder of the division of x by y that rounds the quotient towards zero. (integer/float)

<hr/><br/>

- `math.huge`<br/><br/>
The float value HUGE_VAL, a value greater than any other numeric value.

<hr/><br/>

- `math.log(x [, base])`<br/><br/>
Returns the logarithm of x in the given base. The default for base is e (so that the function returns the natural logarithm of x).

<hr/><br/>

- `math.max(x, ...)`<br/><br/>
Returns the argument with the maximum value, according to the Lua operator <.

<hr/><br/>

- `math.maxinteger`<br/><br/>
An integer with the maximum value for an integer.
<hr/><br/>

- `math.min(x, ...)`<br/><br/>
Returns the argument with the minimum value, according to the Lua operator <.

<hr/><br/>

- `math.mininteger`<br/><br/>
An integer with the minimum value for an integer.
<hr/><br/>

- `math.modf(x)`<br/><br/>
Returns the integral part of x and the fractional part of x. Its second result is always a float.

<hr/><br/>

- `math.pi`<br/><br/>
The value of `π`.

<hr/><br/>

- `math.rad(x)`<br/><br/>
Converts the angle x from degrees to radians.

<hr/><br/>

- `math.random([m [, n]])`<br/><br/>
When called without arguments, returns a pseudo-random float with uniform distribution in the range [0,1). When called with two integers m and n, math.random returns a pseudo-random integer with uniform distribution in the range [m, n]. The call math.random(n), for a positive n, is equivalent to math.random(1,n). The call math.random(0) produces an integer with all bits (pseudo)random.<br/><br/>
This function uses the xoshiro256** algorithm to produce pseudo-random 64-bit integers, which are the results of calls with argument 0. Other results (ranges and floats) are unbiased extracted from these integers.<br/><br/>
Lua initializes its pseudo-random generator with the equivalent of a call to math.randomseed with no arguments, so that math.random should generate different sequences of results each time the program runs.

<hr/><br/>

- `math.randomseed([x [, y]])`<br/><br/>
When called with at least one argument, the integer parameters x and y are joined into a 128-bit seed that is used to reinitialize the pseudo-random generator; equal seeds produce equal sequences of numbers. The default for y is zero.<br/><br/>
When called with no arguments, Lua generates a seed with a weak attempt for randomness.<br/><br/>
This function returns the two seed components that were effectively used, so that setting them again repeats the sequence.<br/><br/>
To ensure a required level of randomness to the initial state (or contrarily, to have a deterministic sequence, for instance when debugging a program), you should call math.randomseed with explicit arguments.

<hr/><br/>

- `math.sin(x)`<br/><br/>
Returns the sine of x (assumed to be in radians).

<hr/><br/>

- `math.sqrt(x)`<br/><br/>
Returns the square root of x. (You can also use the expression x^0.5 to compute this value.)

<hr/><br/>

- `math.tan(x)`<br/><br/>
Returns the tangent of x (assumed to be in radians).

<hr/><br/>

- `math.tointeger(x)`<br/><br/>
If the value x is convertible to an integer, returns that integer. Otherwise, returns fail.

<hr/><br/>

- `math.type(x)`<br/><br/>
Returns "integer" if x is an integer, "float" if it is a float, or fail if x is not a number.

<hr/><br/>

- `math.ult(m, n)`<br/><br/>
Returns a boolean, true if and only if integer m is below integer n when they are compared as unsigned integers.

<hr/>

- ## [Part 4](4%20-%20Table%20library.md)
- ## [Part 6](6%20-%20OS%20library.md)