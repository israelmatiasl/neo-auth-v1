#!/bin/bash
set -e

# Función para logging con timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

log "🚀 Iniciando SQL Server 2022..."

# Iniciar SQL Server en segundo plano
/opt/mssql/bin/sqlservr &
SQL_PID=$!

# Función para verificar si SQL Server está listo
check_sql_server() {
    # Usar sqlcmd 18 que es el que viene con SQL Server 2022
    /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -N -l 1 -Q "SELECT 1" > /dev/null 2>&1
    return $?
}

# Verificar que el proceso de SQL Server sigue corriendo
check_sql_process() {
    if ! kill -0 $SQL_PID 2>/dev/null; then
        log "❌ El proceso de SQL Server ha terminado inesperadamente"
        exit 1
    fi
}

log "⏳ Esperando a que SQL Server esté disponible..."
MAX_RETRIES=60
RETRY_COUNT=0

# Esperar un poco antes del primer chequeo
sleep 15

while ! check_sql_server; do
    check_sql_process
    
    RETRY_COUNT=$((RETRY_COUNT+1))
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        log "❌ SQL Server no inició tras $MAX_RETRIES intentos"
        log "🔍 Últimas líneas del log de errores:"
        if [ -f "/var/opt/mssql/log/errorlog" ]; then
            tail -20 /var/opt/mssql/log/errorlog
        fi
        exit 1
    fi
    
    log "🚧 SQL Server aún no está listo, esperando... (intento $RETRY_COUNT/$MAX_RETRIES)"
    sleep 3
done

log "✅ SQL Server está listo!"

# Verificación adicional: probar operaciones básicas
log "🔍 Verificando operaciones básicas..."
if /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -N -Q "SELECT name FROM sys.databases WHERE name = 'master'" > /dev/null 2>&1; then
    log "✅ Verificación de operaciones básicas exitosa"
else
    log "⚠️ Advertencia: SQL Server responde pero puede tener problemas"
fi

# Ejecutar scripts de inicialización si existen
if [ -d "/scripts" ] && [ "$(ls -A /scripts/*.sql 2>/dev/null)" ]; then
    log "📂 Ejecutando scripts de inicialización..."
    
    for script in /scripts/*.sql; do
        if [ -f "$script" ]; then
            log "📄 Ejecutando $(basename "$script")..."
            
            if /opt/mssql-tools18/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -C -N -i "$script"; then
                log "✅ $(basename "$script") ejecutado exitosamente"
            else
                log "❌ Error ejecutando $(basename "$script")"
                exit 1
            fi
        fi
    done
    
    log "✅ Todos los scripts de inicialización completados"
else
    log "📁 No se encontraron scripts de inicialización en /scripts/"
fi

log "🎉 Contenedor SQL Server listo para conexiones externas"

# Función para manejar señales de terminación
cleanup() {
    log "🛑 Recibida señal de terminación, cerrando SQL Server..."
    kill $SQL_PID 2>/dev/null || true
    wait $SQL_PID 2>/dev/null || true
    log "👋 SQL Server cerrado correctamente"
    exit 0
}

# Configurar manejo de señales
trap cleanup SIGTERM SIGINT

# Mantener el contenedor corriendo
log "👂 Manteniendo contenedor activo..."
wait $SQL_PID