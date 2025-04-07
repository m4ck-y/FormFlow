from dataclasses import dataclass, asdict
from typing import List

# Definición de la clase para los datos del token
@dataclass
class TokenPayload:
    sub: str
    username: str
    name: str

    # Método para convertir la instancia a un diccionario
    def to_dict(self) -> dict[str, str]:
        return asdict(self)