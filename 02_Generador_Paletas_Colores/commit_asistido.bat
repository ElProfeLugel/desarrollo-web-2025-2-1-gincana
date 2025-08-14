@echo off
setlocal
Title Asistente de Commits - Gincana de Codigo

rem Asegurar que el directorio de trabajo sea el del propio script
pushd "%~dp0"

:: ================================================================
:: 1. DEFINIR CONSTANTE DE NOMBRE DE CARPETA/ RAMA
:: ================================================================
:: Definir manualmente el nombre de la carpeta/ rama objetivo
set "FolderName=02_Generador_Paletas_Colores"


:: ================================================================
:: 2. VALIDAR QUE EXISTE REPOSITORIO GIT Y RAMA CORRECTA
:: ================================================================
rem Verificar que estemos en un repo git
Git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
	echo  [!] No es un repositorio Git aqui.
	popd
	endlocal
	exit /b 1
)

echo  Verificando la rama de Git...
for /f "delims=" %%g in ('git branch --show-current 2^>nul') do set "CurrentBranch=%%g"

if /I "%CurrentBranch%"=="%FolderName%" (
	echo  [OK] Estas en la rama correcta: %CurrentBranch%
) else (
	echo  [i] Cambiando a la rama "%FolderName%"...
	git checkout "%FolderName%" >nul 2>&1
	if errorlevel 1 (
		echo  [i] La rama no existe. Creandola...
		git checkout -b "%FolderName%"
		if errorlevel 1 (
			echo  [!] No se pudo cambiar o crear la rama.
			popd
			endlocal
			exit /b 1
		)
	)
)

:: ================================================================
:: 3. PEDIR DATOS PARA EL COMMIT
:: ================================================================
echo(
echo  --------------------------------------------------
echo         Introduce los datos para el commit
echo  --------------------------------------------------
echo(
set /p StudentName="  > Escribe tu nombre completo: "
set /p CommitDesc="   > Describe tu trabajo en una linea: "

if "%StudentName%"=="" (
	echo(
	echo  [!] ERROR: El nombre no puede estar vacio.
	popd
	endlocal
	exit /b 1
)
if "%CommitDesc%"=="" (
	echo(
	echo  [!] ERROR: La descripcion no puede estar vacia.
	popd
	endlocal
	exit /b 1
)

:: ================================================================
:: 4. STAGE, COMMIT Y PUSH
:: ================================================================
echo(
echo  Preparando y enviando tu trabajo al repositorio...
echo(

echo    [1/4] Preparando archivos (git add -A)...
echo Git add .
if errorlevel 1 (
	echo  [!] Error al preparar archivos.
	popd
	endlocal
	exit /b 1
)

echo    [2/4] Verificando cambios para commit...
Git diff --cached --quiet
if not errorlevel 1 (
	echo  [i] No hay cambios para commitear.
	popd
	endlocal
	exit /b 0
)

echo    [3/4] Creando commit...
Git commit -m "%StudentName% - %CommitDesc%"
if errorlevel 1 (
	echo  [!] Error al crear el commit.
	popd
	endlocal
	exit /b 1
)

echo    [4/4] Haciendo push...
Git push -u origin "%FolderName%"
if errorlevel 1 (
	echo  [!] Error al hacer push.
	popd
	endlocal
	exit /b 1
)

echo(
echo  --------------------------------------------------
echo    ¡Listo! Tu trabajo ha sido enviado con exito.
echo  --------------------------------------------------
echo(

popd
endlocal
exit /b 0