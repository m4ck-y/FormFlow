#!/usr/bin/env bash
# Sube los cambios locales de .kiro/steering al repo de guías Markdown

set -e
set -u

STYLE_GUIDE_DIR="$HOME/Documents/me/dev-style-guide"
PROJECT_DIR="$(pwd)"
TARGET_DIR="$PROJECT_DIR/.kiro/steering"

echo "🔍 Verificando cambios locales en $TARGET_DIR..."

# Verificar si la carpeta existe
if [[ ! -d "$TARGET_DIR" ]]; then
    echo "❌ No existe la carpeta $TARGET_DIR. Abortando."
    exit 1
fi

# Comprobar diferencias entre proyecto y repo de guías, ignorando .git
DIFF_OUTPUT=$(diff -qr --exclude='.git' "$TARGET_DIR" "$STYLE_GUIDE_DIR" || true)


if [[ -z "$DIFF_OUTPUT" ]]; then
    echo "✅ No hay cambios para subir."
    exit 0
fi

echo "⚠️ Cambios detectados:"
echo "$DIFF_OUTPUT"

read -p "¿Quieres subir estos cambios al repositorio de guías? (s/n): " RESP
if [[ "$RESP" != "s" && "$RESP" != "S" ]]; then
    echo "⏭️ Operación cancelada por el usuario."
    exit 0
fi

echo "➡️ Sincronizando cambios al repositorio de guías..."

# Copiar cambios al repo
cp -r "$TARGET_DIR"/* "$STYLE_GUIDE_DIR"/

cd "$STYLE_GUIDE_DIR"

echo "⬇️ Actualizando repo remoto antes de subir cambios..."
git pull --rebase

git add .

read -p "Introduce el mensaje para el commit: " COMMIT_MSG

if [[ -z "$COMMIT_MSG" ]]; then
    echo "❌ Mensaje vacío. Abortando."
    exit 1
fi

git commit -m "$COMMIT_MSG"

echo "⬆️ Haciendo push de los cambios..."
git push

echo "✅ Cambios subidos correctamente."
