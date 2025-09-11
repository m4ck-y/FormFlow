from app.config.db import is_db_postgres

def SchemaGenerator(schema_name: str, table_name: str) -> str:
    """
    Genera el nombre completo de una tabla con el esquema adecuado según el tipo de base de datos.

    Esta función aplica el formato necesario para construir el nombre de la tabla con el esquema dependiendo
    del motor de base de datos (PostgreSQL, SQLite).

    Args:
        schema_name (str): El nombre del esquema.
        table_name (str): El nombre de la tabla que se desea formatear.

    Returns:
        str: El nombre completo de la tabla con el esquema correspondiente.
    """
    if is_db_postgres():
        # En PostgreSQL, se utiliza un esquema con nombre en minúsculas y la tabla con minúsculas
        return f"{schema_name}.{table_name.lower()}"
    else:
        # En SQLite u otros motores, el esquema se representa con un guion bajo
        return f"{schema_name}_{table_name.lower()}"