# 🧩 Comandos SSH y screen

## 🔑 Generar clave SSH
```ssh-keygen -o -t rsa -C username```

*Genera una clave SSH RSA.*

## 📋 Ver clave pública
```cat ~/.ssh/id_rsa.pub```

*Muestra la clave pública (para copiar al servidor remoto).*

## 🔗 Conectarse al servidor
```ssh username@34.42.52.77```

*Accede al servidor como username.*

## 🔓 Cambiar a superusuario
```sudo su```

*Eleva permisos a root.*

## 🖥️ Manejo de sesiones screen
- Listar sesiones:

    ```screen -ls```

- Reanudar sesión "registro":

    ```screen -r registro```


- Salir sin cerrar sesión:

    ```Ctrl + A, luego D```