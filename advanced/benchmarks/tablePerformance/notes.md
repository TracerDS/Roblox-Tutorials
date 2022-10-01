# Tables benchmark

These are the results I got from benchmarking [this code](./main.lua):
```
Iterations: 67108864
Pairs: 0.5413813999984995 ms
IPairs: 0.5538925000000745 ms
Next: 0.5388469000026817 ms
#tbl: 0.681233199997223 ms
{}: 0.5392649000059464 ms
---------------
Slowest: #tbl (0.681233199997223 ms)
Fastest: Next (0.5388469000026817 ms)
---------------
Pairs: 0.4693% slower
IPairs: 2.7537% slower
Next: 0% slower
#tbl: 23.3405% slower
{}: 0.0775% slower
```
As you can see the slowest one is `#tbl`, but it doesn't matter.<br/>
Its about milliseconds even on the most iterations possible.
