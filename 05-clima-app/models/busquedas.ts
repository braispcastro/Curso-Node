import fs from 'fs';
import axios from 'axios';
import { Place } from '../interfaces/mapbox-places.interface';
import { Weather } from '../interfaces/open-weather.interface';
import { Ciudad } from '../interfaces/ciudad.interface';
import { DescriptionWeather } from '../interfaces/weather.interface';



export class Busquedas {

    historial: string[] = [];
    dbPath: string = './db/database.json';

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    };

    // get historialEnMayus() {
    //     return this.historial.map(lugar => {
    //         return lugar.toLocaleUpperCase();
    //     });
    // }

    constructor() {
        this.leerDB();
    }

    async ciudad(lugar: string): Promise<Ciudad[]> {

        try {

            // Petición HTTP
            const instance = axios.create({
                baseURL: 'https://api.mapbox.com/geocoding/v5',
                params: this.paramsMapbox
            });

            const { data } = await instance.get<Place>(`/mapbox.places/${lugar}.json`);
            return data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitude: lugar.center[0],
                latitude: lugar.center[1]
            }));

        } catch (error) {
            // console.log(error);
            return [];
        }

    }

    async climaLugar(lat: number, lon: number): Promise<DescriptionWeather | any> {
        
        try {
            
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5',
                params: {
                    'lat': lat,
                    'lon': lon,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es'
                }
            });

            const { data } = await instance.get<Weather>(`/weather`);
            return {
                desc: data.weather[0].description,
                temp: data.main.temp,
                maxTemp: data.main.temp_max,
                minTemp: data.main.temp_min,
            };

        } catch (error) {
            // console.log(error);
            return null;
        }

    }

    agregarHistorial(lugar: string) {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar.toLocaleLowerCase());
        this.guardarDB();

    }

    guardarDB() {

        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB() {

        console.log('hola');
        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const data = JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8' }));
        console.log(data);
        this.historial = data.historial;

    }

}