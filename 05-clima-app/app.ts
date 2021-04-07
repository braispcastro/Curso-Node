import dotenv from 'dotenv';
import { inquirerMenu, pausa, leerInput, listarLugares } from './helpers/inquirer';
import { Busquedas } from './models/busquedas';


dotenv.config();

const main = async () => {
    
    //console.clear();

    const busquedas = new Busquedas();
    let opt = 0;

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');

                // Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                // Seleccionar el lugar
                const id = await listarLugares(lugares);

                if (id === 0) continue;

                const lugarSeleccionado = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(lugarSeleccionado!.nombre);

                // Datos del clima
                const weather = await busquedas.climaLugar(lugarSeleccionado!.latitude, lugarSeleccionado!.longitude);

                // Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:'.green, lugarSeleccionado?.nombre);
                console.log('Latitud:'.green, lugarSeleccionado?.latitude);
                console.log('Longitud:'.green, lugarSeleccionado?.longitude);
                console.log('Temperatura:'.green, weather.temp);
                console.log('Mínima:'.green, weather.minTemp);
                console.log('Máxima:'.green, weather.maxTemp);
                console.log('Descripción:'.green, weather.desc);
                break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const index = `${i + 1}.`.green;
                    console.log(index, lugar);
                });
                break;
        }

        if (opt !== 0) {
            await pausa();
        }

    } while (opt !== 0)
    
};


main();