import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { GetServerSideProps } from 'next'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
    theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
    const [currentTheme, setCurrentTheme] = useState('light');


    const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value;

        console.log({ selectedTheme })
        setCurrentTheme(selectedTheme);

        localStorage.setItem('theme', selectedTheme);
        Cookies.set('theme', selectedTheme);
    }

    const onClick = async () => {
        const { data } = await axios.get('/api/hello');

        console.log({ data });
    }

    useEffect(() => {


        console.log('LocalStorage:', localStorage.getItem('theme'));
        console.log('Cookies:', Cookies.get('theme'));


    }, [])

    return (
        <Layout>
            <Card>
                <CardContent>
                    <FormControl>
                        <FormLabel>Tema</FormLabel>
                        <RadioGroup
                            value={currentTheme}
                            onChange={onThemeChange}
                        >
                            <FormControlLabel value='light' control={<Radio />} label="Light" />
                            <FormControlLabel value='dark' control={<Radio />} label="Dark" />
                            <FormControlLabel value='custom' control={<Radio />} label="Custom" />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        onClick={onClick}
                    >
                        Solicitud
                    </Button>
                </CardContent>
            </Card>
        </Layout>
    )

}



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    //busco las cookies del contexto, la request, esto es para leer las cookies del cliente
    const { theme = 'light', name = 'No name' } = req.cookies;
    const validThemes = ['light', 'dark', 'custom'];



    return {
        props: {
            //validamos que el tema sea uno de los validos, si no es uno de los validos, le ponemos el tema por defecto
            theme: validThemes.includes(theme) ? theme : 'dark',
            name,
        }
    }
}


export default ThemeChangerPage;