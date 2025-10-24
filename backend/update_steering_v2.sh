#!/usr/bin/env bash
# Actualiza la carpeta .kiro/steering desde tu repo de guías Markdown
# Además sincroniza cambios propios hacia el repo de guías si existen

set -e  # detener si hay error
set -u  # error si hay variable no definida

# Ruta del repo con los .md
STYLE_GUIDE_DIR="$HOME/Documents/me/dev-style-guide"

# Ruta del proyecto actual
PROJECT_DIR="$(pwd)"
TARGET_DIR="$PROJECT_DIR/.kiro/steering"

echo "🔄 Comprobando cambios locales en $TARGET_DIR..."

# 1. Detectar cambios en .kiro/steering en el proyecto actual (sin usar git)
if [[ -d "$TARGET_DIR" ]]; then
    # Compara archivos .md entre proyecto y repo
    DIFF_OUTPUT=$(diff -qr "$TARGET_DIR" "$STYLE_GUIDE_DIR")
else
    DIFF_OUTPUT=""
fi

if [[ -n "$DIFF_OUTPUT" ]]; then
    echo "⚠️ Cambios locales detectados en $TARGET_DIR:"
    echo "$DIFF_OUTPUT"

    # Preguntar si se desea subir estos cambios al repo de guías
    read -p "¿Quieres subir estos cambios a $STYLE_GUIDE_DIR? (s/n): " RESP
    if [[ "$RESP" == "s" || "$RESP" == "S" ]]; then
        echo "➡️ Sincronizando cambios locales al repositorio de guías..."

        # Copiar cambios locales al repo de guías
        cp -r "$TARGET_DIR"/* "$STYLE_GUIDE_DIR"/

        # Entrar al repo de guías y hacer pull antes de subir
        cd "$STYLE_GUIDE_DIR"
        echo "⬇️ Actualizando repositorio con git pull --rebase..."
        git pull --rebase

        # Añadir y hacer commit de cambios
        git add .

        read -p "Escribe el mensaje para el commit: " COMMIT_MSG

        if [[ -z "$COMMIT_MSG" ]]; then
            echo "❌ Mensaje de commit vacío, abortando."
            exit 1
        fi

        git commit -m "$COMMIT_MSG"
        echo "⬆️ Haciendo push de los cambios..."
        git push
        echo "✅ Cambios subidos correctamente."
    else
        echo "⏭️ Se omite subir cambios locales."
    fi
else
    echo "✅ No se detectaron cambios locales en $TARGET_DIR."
fi

echo "🔄 Ahora actualizando $TARGET_DIR desde $STYLE_GUIDE_DIR..."

# 2. Eliminar carpeta anterior en el proyecto
echo "🗑️ Eliminando carpeta anterior: $TARGET_DIR"
rm -rf "$TARGET_DIR"

# 3. Actualizar repo con los .md
cd "$STYLE_GUIDE_DIR"
echo "⬇️ Actualizando repositorio en: $STYLE_GUIDE_DIR"
git pull --rebase

# 4. Recrear carpeta y copiar archivos .md
mkdir -p "$TARGET_DIR"
cp "$STYLE_GUIDE_DIR"/*.md "$TARGET_DIR"/

echo "✅ Actualización completada."
