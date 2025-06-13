#!/bin/bash

# Iniciar SQL Server en segundo plano
/opt/mssql/bin/sqlservr &

# Esperar a que SQL Server esté listo
echo "Esperando a que SQL Server inicie..."
until /opt/mssql-tools/bin/sqlcmd -S localhost,1433 -U sa -P "$SA_PASSWORD" -C -Q "SELECT 1" > /dev/null 2>&1
do
  echo "SQL Server aún no está listo, esperando..."
  sleep 5
done

echo "SQL Server está listo!"

# Ejecutar scripts de inicialización si existen
if [ -d "/scripts" ]; then
    echo "Ejecutando scripts de inicialización..."
    for script in /scripts/*.sql; do
        if [ -f "$script" ]; then
            echo "Ejecutando $script..."
            /opt/mssql-tools/bin/sqlcmd -S localhost,1433 -U sa -P "$SA_PASSWORD" -C -i "$script"
        fi
    done
fi

# Mantener el contenedor corriendo
wait