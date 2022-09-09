local function round(x, n)
    n = math.pow(10, n or 0)
    x = x * n
    if x >= 0 then x = math.floor(x + 0.5) else x = math.ceil(x - 0.5) end
    return x / n
end
local function diff(num1, num2)
	return (math.abs(num1-num2) / ((num1+num2)/2)) * 100
end

local maxi = 2^26 -- max table size
local tbl = {}
local res = {}

for i=1,maxi do tbl[i] = i end

local start1 = os.clock() for k,v in pairs(tbl) do tbl[k] = v + 1 end
local start2 = os.clock() for k,v in ipairs(tbl) do tbl[k] = v + 1 end
local start3 = os.clock() for k,v in next, tbl do tbl[k] = v + 1 end
local start4 = os.clock() for k=1, #tbl do tbl[k] = tbl[k] + 1 end
local start5 = os.clock() for k,v in tbl do tbl[k] = v + 1 end

local clockEnd = os.clock()

res.pairs = start2-start1
res.ipairs = start3-start2
res.next = start4-start3
res.tbl = start5-start4
res.empty = clockEnd-start5

print('Iterations: '..tostring(maxi))
print(('Pairs: %s ms'):format(res.pairs))
print(('IPairs: %s ms'):format(res.ipairs))
print(('Next: %s ms'):format(res.next))
print(('#tbl: %s ms'):format(res.tbl))
print(('{}: %s ms'):format(res.empty))

print(('-'):rep(15))

local lowest = math.max(res.pairs,res.ipairs,res.next,res.tbl,res.empty)
local lowestText = lowest==res.pairs and 'Pairs' or lowest==res.ipairs
	and 'IPairs' or lowest==res.next and 'Next' or lowest==res.tbl and '#tbl' or lowest==res.empty and '{}'
	
local highest = math.min(res.pairs,res.ipairs,res.next,res.tbl,res.empty)
local highestText = highest==res.pairs and 'Pairs' or highest==res.ipairs
	and 'IPairs' or highest==res.next and 'Next' or highest==res.tbl and '#tbl' or highest==res.empty and '{}'

print(('Slowest: %s (%s ms)'):format(lowestText,lowest))
print(('Fastest: %s (%s ms)'):format(highestText,highest))

print(('-'):rep(15))

print(('Pairs: %s%% slower'):format(round(diff(res.pairs, highest), 4)))
print(('IPairs: %s%% slower'):format(round(diff(res.ipairs, highest), 4)))
print(('Next: %s%% slower'):format(round(diff(res.next, highest), 4)))
print(('#tbl: %s%% slower'):format(round(diff(res.tbl, highest), 4)))
print(('{}: %s%% slower'):format(round(diff(res.empty, highest), 4)))