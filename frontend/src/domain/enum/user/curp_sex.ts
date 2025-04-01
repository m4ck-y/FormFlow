export enum CURPSex{

    /*
    Sexo del paciente registrado ante RENAPO.

    Si el valor registrado en la variable “curpPaciente” es diferente al valor genérico, se debe registrar uno de los siguientes valores, de acuerdo al caracter en la posición 11 registrado en dicha variable: 
    - Si es “M”, se debe registrar “2 – MUJER”. 
    - Si es “H”, se debe registrar “1 – HOMBRE”. 
    - Si es “X”, se debe registrar “3 – NO BINARIO”.

    En caso contrario, se deberá registrar una de las siguientes opciones: 
    - 1 – HOMBRE 
    - 2 – MUJER 
    - 3 – NO BINARIO

    GIIS-B015-04-11.DATOS DEL PACIENTE.sexoCURP
    */
    HOMBRE = 1,
    //"MALE"
    MUJER = 2,
    //"FEMALE"
    NO_BINARIO = 3,
    //"NON_BINARY"

}