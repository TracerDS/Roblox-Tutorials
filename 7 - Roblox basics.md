# Lesson 7 - Roblox basics

## Table of contents
- [Introduction](#introduction)
- [What have changed?](#changes)
- [Roblox globals](#roblox_globals)
    - [Functions](#roblox_globals-functions)
    - [Variables](#roblox_globals-variables)

<br/><hr/><br/><a name='introduction'></a>

## Introduction

"Roblox Lua" is different than our Lua. Roblox doesn't use Lua 5.4 nor 5.1. Roblox uses modifed version of Lua called: <b>Luau</b>. Luau is based on Lua 5.1 <b>but</b> a lot of things have changed. Luau runtime features new bytecode, interpreter and compiler that are heavily tuned for performance which means it's faster than Lua. <b>A LOT FASTER</b>.

For full Luau documentation head over <a href='https://luau-lang.org' target='_blank'><b>here</b></a>.<br/>
For full Roblox documentation head over <a href='https://developer.roblox.com/en-us/api-reference' target='_blank'><b>here</b></a>.

<hr/><br/><a name='changes'></a>

## What have changed?

✔️ - Present in Luau<br/>
⭕ - Some features were removed<br/>
❌ - Removed in Luau

| Feature | Status |
| - | - |
| `io` library                                  | ❌ |
| `package` library                             | ❌ |
| `os` library                                  | ⭕ |
| `debug` library                               | ⭕ |
| `loadfile`                                    | ❌ |
| `dofile`                                      | ❌ |
| `loadstring` bytecode                         | ❌ |
| `string.dump`                                 | ❌ |
| `newproxy` (deprecated function)              | ⭕ |
| yieldable `pcall`/`xpcall`                    | ✔️ |
| yieldable `metamethods`                       | ❌ |
| "ephemeron" tables                            | ❌ |
| `goto` statement                              | ❌ |
| finalizers for tables                         | ❌ |
| `goto` statement                              | ❌ |
| no fenv for functions or threads              | ❌ |
| tables honor the `__len` metamethod           | ✔️ |
| hex and `\z` escapes in strings               | ✔️ |
| order metamethods work for different types    | ❌ |
| optional base in `math.log`                   | ✔️ |
| new metamethods `__pairs` and `__ipairs`      | ❌ |
| frontier patterns                             | ✔️ |
| %g in patterns                                | ✔️ |
| \0 in patterns                                | ✔️ |
| `bit32` library                               | ✔️ |
| stricter `string.gsub`                        | ✔️ |

<hr/><br/><a name='roblox_globals'></a>

## Roblox Globals

<a name='roblox_globals-functions'></a>

### <b>Functions:</b>
<br/>

- `void delay(number delayTime, function callback)`<br/><br/>
Schedules a function to be executed after `delayTime` seconds have passed, without yielding the current thread. This function allows multiple Lua threads to be executed in parallel from the same stack.<br/>
The delay will have a minimum duration of 29 milliseconds, but this minimum may be higher depending on the target framerate and various throttling conditions. If the `delayTime` parameter is not specified, the minimum duration will be used.

<hr/><br/>

- `DebuggerManager DebuggerManager()`<br/><br/>
Returns the DebuggerManager class, which acts as an interface for Roblox's Lua debugger feature.

<hr/><br/>

- `number elapsedTime()`<br/><br/>
Returns how much time has elapsed since the current instance of Roblox was started.<br/>
In Roblox Studio, this begins counting up from the moment Roblox Studio starts running, not just when opening a place.

<hr/><br/>

- `void printidentity(string prefix='Current identity is ')`<br/><br/>
Prints `Current identity is [ID]` to the output, where `[ID]` corresponds to the current thread's security context level.

<hr/><br/>

- `Variant require(ModuleScript module)`<br/><br/>
Runs the supplied `ModuleScript` if it has not been run already, and returns what the `ModuleScript` returned (in both cases).<br/><br/>
If the `ModuleScript` the user wants to use has been uploaded to Roblox (with the instance's name being "`MainModule`"), it can be loaded by using the `require` function on the asset ID of the `ModuleScript`, though only on the server.

<hr/><br/>

- `GlobalSettings settings()`<br/><br/>
Returns the `GlobalSettings` object, which can be used to access the settings objects that are used in Roblox Studio's settings menu.

<hr/><br/>

- `void spawn(function callback)`<br/><br/>
Runs the specified callback function in a separate thread, without yielding the current thread.<br/>
The function will be executed the next time Roblox's Task Scheduler runs an update cycle. This delay will take at least 29 milliseconds but can arbitrarily take longer, depending on the target framerate and various throttling conditions.
The callback function is invoked with two arguments:
    - The first being the amount of time which elapsed from when spawn was called to when the function was invoked
    - The second being equivalent to elapsedTime() or roughly how long the engine has been running
    ```lua
    spawn(print) -- 0.0079617658390703 451.55683163643
    ```
    <b>USE [`task.spawn()`](#task_library-spawn) INSTEAD!!!!!</b>

<hr/><br/>

- `Stats stats()`<br/><br/>
Returns the Stats service.<br/>
It is preferred that developers use ServiceProvider:GetService to retrieve it instead.

<hr/><br/>

- `number tick()`<br/><br/>
Returns how much time has elapsed, in seconds, since the UNIX epoch, on the current local session's computer.<br/>
The UNIX epoch is represented by the date January 1st, 1970.<br/>
<b>USE `os.time()` INSTEAD!</b>

<hr/><br/>

- `number time()`<br/><br/>
Returns the amount of time, in seconds, that has elapsed since the current game instance started running.<br/>
If the current game instance is not running, this will be `0`.

<hr/><br/>

- `string typeof(Variant object)`<br/><br/>
Returns the type of the object specified, as a string.<br/>
This function is more accurate than Lua's native type function, as it does not denote Roblox-specific types as userdata.

<hr/><br/>

- `UserSettings UserSettings()`<br/><br/>
Returns the UserSettings object, which is used to read information from the current user's game menu settings.

<hr/><br/>

- `string version()`<br/><br/>
Returns the current version of Roblox as a string. The integers in the version string are separated by periods, and each integers represent the following, in order:<br/>
    - <b>Generation</b> - The current generation of the application shell that is hosting the client.
    - <b>Version</b> - The current release version of Roblox.
    - <b>Patch</b> - The current patch number for this version of Roblox.
    - <b>Commit</b> - The ID of the last internal commit that was accepted into this version of the client.

<hr/><br/>

- `number, number wait(number seconds=0.03)`<br/><br/>
Yields the current thread until the specified amount of seconds have elapsed.<br/>
The delay will have a minimum duration of 29 milliseconds, but this minimum may be higher depending on the target framerate and various throttling conditions. If the seconds parameter is not specified, the minimum duration will be used.<br/>
This function returns:
    - Actual time yielded (in seconds)
    - Total time since the software was initialized (in seconds)
    
    <b>USE [`task.wait()`](#task_library-wait) INSTEAD!!!!!</b>

<hr/><br/>

- `void warn(Tuple params)`<br/><br/>
Behaves identically to Lua's print function, except the output is styled as a warning, with yellow text and a timestamp.<br/>
This function accepts any number of arguments, and will attempt to convert them into strings which will then be joined together with spaces between them.

<hr/><br/><a name='roblox_globals-variables'></a>

### <b>Variables:</b>

- `Enums Enum`<br/><br/>
A reference to the Enums datatype, which stores all of the available enums that can be used on Roblox.

<hr/><br/>

- `DataModel game`<br/><br/>
A reference to the DataModel, which is the root Instance of Roblox’s parent/child hierarchy.

<hr/><br/>

- `Plugin plugin`<br/><br/>
A reference to the Plugin object that represents the plugin being ran from this Script.<br/>
This reference only exists in the context where a script is executed as a plugin.

<hr/><br/>

- `array shared`<br/><br/>
A table that is shared across all scripts that share the same execution context level.<br/>
This serves the exact same purpose as _G.

<hr/><br/>

- `LuaSourceContainer script`<br/><br/>
A reference to the script object that is executing the code you are writing.
It can be either a Script, a LocalScript, or a ModuleScript (and sometimes a CoreScript)<br/>
This variable is not available when executing code from Roblox Studio’s command bar.

<hr/><br/>

- `Workspace workspace`<br/><br/>
A reference to the Workspace service, which contains all of the physical components of a Roblox world.

<hr/><br/><a name='task_library'></a>

## Task library
<br/>

<a name='task_library-spawn'></a>
- `void task.spawn(function functionOrThread, Variant ...)`<br/><br/>
Accepts a function or a thread (as returned by `coroutine.create`) and calls/resumes it immediately through the engine’s scheduler. Arguments after the first are sent to the function/thread. This function does not return any value, even if the provided function returns one immediately.<br/><br/>
This function is based on the fastSpawn pattern rather than being a replacement for the global spawn function. It is recommended that this function be used in place of fastSpawn.

<hr/><br/>

- `void task.defer(function functionOrThread, Variant ...)`<br/><br/>
Accepts a function or a thread (as returned by `coroutine.create`) and defers it until the next resumption cycle, at which point it is resumed with the engine’s scheduler like with task.spawn. Arguments after the first are sent to the function/thread. This function does not return any value, even if the provided function returns one immediately.<br/><br/>
This function should be used when a similar behavior to task.spawn is desirable, but the thread does not need to run immediately.

<hr/><br/>

- `void task.delay(number duration, function functionOrThread, Variant ...)`<br/><br/>
Accepts a function or a thread (as returned by `coroutine.create`) and schedules it to be called/resumed on the next Heartbeat after the given amount of time in seconds has elapsed. Arguments after the second are sent to the function/thread.<br/><br/>
This function differs from the global delay function in that no throttling occurs: on the very same Heartbeat step in which enough time has passed, the function is guaranteed to be called/resumed. Providing a duration of 0 will guarantee that the function is called on the very next Heartbeat.<br/><br/>
You can calculate the actual time passed by calling os.clock upon scheduling and in the scheduled function.

<hr/><br/>

<a name='task_library-wait'></a>

- `number task.wait(number duration=0)`<br/><br/>
Yields the current thread until the given duration (in seconds) has elapsed, then resumes the thread on the next Heartbeat step. The actual amount of time elapsed is returned.<br/><br/>
If no duration is given, it will default to 0. This means the thread resumes on the very next step, which is equivalent in behavior to `RunService.Heartbeat:Wait()`<br/><br/>
Unlike the global wait, this function does not throttle and guarantees the resumption of the thread on the first Heartbeat that occurs when it is due. This function also only returns the elapsed time and nothing else.

<hr/><br/>
