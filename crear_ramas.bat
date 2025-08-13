@echo off
cls
title Creador de Ramas por Carpeta

:: ==================================================================
:: 1. VERIFICAR SI ESTAMOS EN UN REPOSITORIO GIT
:: ==================================================================
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo.
    echo  [!] ERROR: No se detecto un repositorio de Git.
    echo.
    echo      Asegurate de ejecutar este script en la carpeta raiz
    echo      de un proyecto que ya haya sido inicializado con 'git init'.
    echo.
    pause
    goto :EOF
)


:: ==================================================================
:: 2. CREAR UNA RAMA POR CADA CARPETA
:: ==================================================================
echo.
echo  Creando una rama de Git para cada carpeta de ejercicio...
echo  ----------------------------------------------------
echo.

:: El comando 'for /d' itera unicamente sobre los directorios (carpetas).
for /d %%d in (*) do (
    echo  [+] Creando rama para la carpeta '%%d'...
    git branch %%d
)

echo.
echo  ----------------------------------------------------
echo  ¡Proceso completado!
echo.
echo  Puedes verificar todas las ramas creadas con el comando: git branch
echo.
pause