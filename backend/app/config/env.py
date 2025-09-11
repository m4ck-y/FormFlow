from pydantic_settings import SettingsConfigDict, BaseSettings

class Settings(BaseSettings):
    # Debug Configuration
    DEBUG: bool = False

    # Database Configuration
    SQLALCHEMY_DB_URL: str = "sqlite:///dev.db"
    
    # PostgreSQL Configuration (for when using PostgreSQL)
    DB_POSTGRES_HOST: str = ""
    DB_POSTGRES_PORT: int = 5432
    DB_POSTGRES_NAME: str = ""
    DB_POSTGRES_USER: str = ""
    DB_POSTGRES_PASS: str = ""

    # Microservices Base URLs
    ACCOUNT_SERVICE_URL: str = "http://localhost:8000"

    # API Account Endpoints
    API_USER_LOGIN: str = "/user/login"
    API_USER_REGISTER: str = "/person/register"
    API_USER_EXISTS: str = "/person/email/exists"
    API_USER_BASIC_INFO: str = "/person/basic_info"

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()