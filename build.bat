echo running script...
@echo off
rem rmdir /Q /S "C:\Users\%USERNAME%\AppData\Local\Screeps\scripts\screeps.com\default"
rem mkdir "C:\Users\%USERNAME%\AppData\Local\Screeps\scripts\screeps.com\default\"
xcopy /I /Q /y /g "%1ScreepProject\default" "C:\Users\%USERNAME%\AppData\Local\Screeps\scripts\screeps.com\default" /s

