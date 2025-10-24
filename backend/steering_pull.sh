#!/usr/bin/env bash
# Script para actualizar la carpeta .kiro/steering en el proyecto actual
# a partir del repositorio local de guías Markdown.

set -e  # detener si hay error
set -u  # error si hay variable no definida

# Ruta del repo con los .md
STYLE_GUIDE_DIR="$HOME/Documents/me/dev-style-guide"

# Ruta del proyecto actual
PROJECT_DIR="$(pwd)"
TARGET_DIR="$PROJECT_DIR/.kiro/steering"

echo "🔄 Actualizando carpetas de steering en: $PROJECT_DIR"
echo "📁 Usando repositorio: $STYLE_GUIDE_DIR"

# 1. Eliminar carpeta anterior
echo "🗑️ Eliminando carpeta anterior: $TARGET_DIR"
rm -rf "$TARGET_DIR"

# 2. Actualizar repo con los .md
echo "⬇️ Actualizando repositorio en: $STYLE_GUIDE_DIR"
cd "$STYLE_GUIDE_DIR"
git pull --rebase

# 3. Recrear carpeta
echo "📂 Recreando carpeta: $TARGET_DIR"
mkdir -p "$TARGET_DIR"

# 4. Volver al proyecto y copiar los .md
echo "📄 Copiando archivos Markdown al directorio destino..."
cd "$PROJECT_DIR"
cp "$STYLE_GUIDE_DIR"/*.md "$TARGET_DIR"/

echo "✅ Actualización completada."
