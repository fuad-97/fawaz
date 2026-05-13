@echo off
setlocal

cd /d "%~dp0"

set "PORT=8080"
set "URL=http://localhost:%PORT%/index.html"

echo Starting local server for the website...
echo URL: %URL%
echo.
echo If you still see localhost:8000 in the browser, close that tab and use the URL above.
echo.

where python >nul 2>nul
if %errorlevel%==0 (
    start "" "%URL%"
    python -m http.server %PORT%
    goto :end
)

where py >nul 2>nul
if %errorlevel%==0 (
    start "" "%URL%"
    py -m http.server %PORT%
    goto :end
)

echo Python was not found. Opening index.html directly instead.
start "" "%~dp0index.html"

:end
endlocal
