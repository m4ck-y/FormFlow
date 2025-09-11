from lark import Lark, Transformer
from datetime import datetime
from typing import Any, Dict
import operator

from sqlalchemy import text
from app.form.infrastructure.database.model.dsl import DSLFieldMetadata, DataType

class DSLContext:
    """Contexto para evaluación de expresiones DSL"""
    def __init__(self, db_session, user_id: int):
        self.db = db_session
        self.user_id = user_id
        self._cache: Dict[str, Any] = {}

    async def get_value(self, field_alias: str) -> Any:
        """Obtiene valores desde DB usando metadatos"""
        if field_alias in self._cache:
            return self._cache[field_alias]

        # Consultar metadatos y luego valor real
        metadata = await self.db.get(DSLFieldMetadata, field_alias)
        if not metadata:
            raise ValueError(f"Campo no registrado: {field_alias}")

        query = f"SELECT {metadata.column_name} FROM {metadata.table_schema}.{metadata.table_name} WHERE user_id = :user_id"
        result = await self.db.execute(text(query), {"user_id": self.user_id})
        value = result.scalar()

        # Convertir tipo según metadatos
        self._cache[field_alias] = self._convert_type(value, metadata.data_type)
        return self._cache[field_alias]

    def _convert_type(self, value, data_type: DataType):
        """Conversión segura de tipos basada en metadatos"""
        if value is None:
            return None
        try:
            return data_type.python_type(value)
        except (TypeError, ValueError):
            raise ValueError(f"No se pudo convertir {value} a {data_type}")

# Gramática DSL (Lark)
dsl_grammar = """
    ?start: expr
    ?expr: expr "&&" expr -> and_op
         | expr "||" expr -> or_op
         | "!" expr -> not_op
         | "(" expr ")" -> parens
         | field comp_op value -> compare
         | function -> func_call
    field: CNAME ("." CNAME)* -> field_ref
    comp_op: "==" | "!=" | ">=" | "<=" | ">" | "<"
    value: NUMBER -> number
          | STRING -> string
          | "true" -> true
          | "false" -> false
    function: CNAME "(" [args] ")"
    args: expr ("," expr)*
    %import common.CNAME
    %import common.NUMBER
    %import common.STRING
    %import common.WS
    %ignore WS
"""

class DSLTransformer(Transformer):
    """Transforma árbol de sintaxis a código Python"""
    def __init__(self, context: DSLContext):
        self.ctx = context

    async def and_op(self, args):
        return await args[0] and await args[1]

    async def field_ref(self, args):
        alias = ".".join([str(t) for t in args])
        return await self.ctx.get_value(alias)

    # ... (otros métodos de transformación)