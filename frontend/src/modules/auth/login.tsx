import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';

import { Space, Typography as Typography2 } from 'antd';



const Login: React.FC = () => {
    const { Link:Link2} = Typography2;
    return (

        <div style={{ padding: "20px", backgroundColor: "#f6fcff" }}>

            <Paper elevation={0} style={{padding:"20px"}} >
                <Stack spacing={2} direction="row">
                    <Stack>
                        <div>Logo</div>
                        <div>Inicia Session</div>
                        <div>Usa tu cuenta de formFLow</div>
                    </Stack>

                    <Stack spacing={2}>
                        <TextField id="outlined-basic" label="Correo electronico" variant="outlined" />
                        <Link href="#" underline="none">¿Olvidaste el correo electronico?</Link>
                        <Link2 href="https://ant.design" target="_blank">
      Ant Design (Link)
    </Link2>
                        <Typography variant="body1" gutterBottom>
                            ¿Esta no es tu computadora? Usa una ventana privada para acceder.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                        <Button variant="text" style={{textTransform: 'none', borderRadius:"20px"}}>Crear cuenta</Button>
                        <Button variant="contained" disableElevation style={{textTransform: 'none', borderRadius:"20px"}}>Siguiente</Button>
                        </Stack>
                    </Stack>

                </Stack>
            </Paper>
        </div>
    )
}

export default Login