#!/bin/bash

echo "Esperando a que SQL Server esté listo..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -Q "SELECT 1" &> /dev/null
do
  sleep 2
done

echo "SQL Server está listo. Ejecutando scripts SQL..."

for script in /scripts/*.sql; do
  echo "▶ Ejecutando $script..."
  /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong!Passw0rd -i "$script"
done

echo "Scripts ejecutados. Iniciando SQL Server..."
exec /opt/mssql/bin/sqlservr