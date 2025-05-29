from app.base.infrastructure.database.schema import SchemaGenerator

SCHEMA_NAME = "form"

def SchemaForm(table_name: str) -> str:
    """
    Genera el nombre completo de una tabla con el esquema correspondiente.

    Esta función utiliza un generador base para construir el nombre de la tabla 
    en el formato adecuado, teniendo en cuenta el motor de base de datos en uso 
    (PostgreSQL o SQLite, por ejemplo) y aplicando el esquema especificado.

    Args:
        table_name (str): El nombre de la tabla que se desea formatear.

    Returns:
        str: El nombre completo de la tabla con el esquema aplicado.
    """
    return SchemaGenerator(SCHEMA_NAME, table_name)