from pydantic import EmailStr
import httpx
from fastapi import HTTPException, status
from app.config.env import settings

async def verify_email_availability(email: EmailStr):
    """
    Verifica si un email está disponible para registro.
    
    Args:
        email (EmailStr): Email a verificar
        
    Raises:
        HTTPException: 
            - 409 si el email ya está registrado
            - 500 si hay un error al contactar el servicio de usuarios
            
    Returns:
        None: Si el email está disponible
    """
    # Verificar si el email ya está en uso como nombre de usuario
    url = f"{settings.USER_SERVICE_URL}{settings.USER_API_BASIC_INFO}"

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params={"username": email})

        r_json = response.json()

        if r_json is not None and response.status_code == 200:
            print("Email already registered: ", r_json)
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email ya registrado")
        if response.status_code != 200:
            print("Error al llamar al microservicio de user/basic_info", r_json)
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Error al llamar al microservicio de user/basic_info")        
        
        print("........ response. json", r_json)
    #search email already exists