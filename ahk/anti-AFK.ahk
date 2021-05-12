#MaxThreadsPerHotkey 3
#z::  ; Win+Z hotkey (change this hotkey to suit your preferences).
#MaxThreadsPerHotkey 1
if KeepWinZRunning  ; This means an underlying thread is already running the loop below.
{
    KeepWinZRunning := false  ; Signal that thread's loop to stop.
    return  ; End this thread so that the one underneath will resume and see the change made by the line above.
}
; Otherwise:
KeepWinZRunning := true
Loop
{
    ; The next four lines are the action you want to repeat (update them to suit your preferences):
    SendInput {w Down}
	sleep, 50
	SendInput {w Up}
	sleep 1000
	SendInput {a Down}
	sleep, 50
	SendInput {a Up}
	sleep 1000
	SendInput {s Down}
	sleep, 50
	SendInput {s Up}
	sleep 1000
	SendInput {d Down}
	sleep, 50
	SendInput {d Up}
	sleep, 1000
    ; But leave the rest below unchanged.
    if not KeepWinZRunning  ; The user signaled the loop to stop by pressing Win-Z again.
        break  ; Break out of this loop.
}
KeepWinZRunning := false  ; Reset in preparation for the next press of this hotkey.
return