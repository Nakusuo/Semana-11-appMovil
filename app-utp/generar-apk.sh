
#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT_DIR"

echo "1) Instalando dependencias (npm)..."
if [ -f package-lock.json ]; then
	npm ci
else
	npm install
fi

echo "2) Construyendo la app (ng build)..."
npm run build --if-present

echo "3) Sincronizando con Capacitor (npx cap sync android)..."
npx cap sync android

if [ -d "android" ]; then
	echo "4) Ejecutando Gradle para generar APK..."
	cd android
	if [ -f ./gradlew ]; then
		./gradlew assembleRelease
	else
		echo "No se encontró ./gradlew. Intenta ejecutar desde Android Studio o crea el wrapper gradle."
		exit 1
	fi

	echo "APK generada (si el build fue exitoso). Busca los artefactos en: android/app/build/outputs/apk/release/"
else
	echo "La plataforma Android no está añadida. Para añadirla ejecuta: npx cap add android" >&2
	exit 1
fi

