@echo off
echo Building Context7 for Windows...
call npx tsc
if %errorlevel% neq 0 (
    echo TypeScript compilation failed!
    exit /b 1
)
echo Context7 build complete!
