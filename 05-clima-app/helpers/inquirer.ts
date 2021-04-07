import colors from 'colors';
import inquirer from 'inquirer';
import { Ciudad } from '../interfaces/ciudad.interface';

colors.enable();

const preguntas = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            { value: 1, name: `${'1.'.green} Buscar ciudad` },
            { value: 2, name: `${'2.'.green} Historial` },
            { value: 0, name: `${'0.'.green} Salir` },
        ]
    }
]

export const inquirerMenu = async () => {

    console.clear();

    console.log('==========================='.rainbow);
    console.log('   Seleccione una opción   '.green);
    console.log('==========================='.rainbow);
    console.log();

    const { option } = await inquirer.prompt(preguntas);
    return option;

}

export const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar...`
        }
    ]

    console.log();
    await inquirer.prompt(question);

}

export const leerInput = async (message: string) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value: string) {
                if (value.length === 0) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;

}

export const listarLugares = async (lugares: Ciudad[] = []) => {

    const choices = lugares.map((lugar, i) => {
        const index = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${ index } ${ lugar.nombre }`
        }
    })

    choices.push({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(pregunta);
    return id;
}

export const confirmar = async (message: string) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta);
    return ok;

}

// export const mostrarListadoChecklist = async (tareas = []) => {

//     const choices = tareas.map((tarea, i) => {
//         const index = `${i + 1}.`.green;
//         return {
//             value: tarea.id,
//             name: `${ index } ${ tarea.desc }`,
//             checked: tarea.completadoEn ? true : false
//         }
//     })

//     const pregunta = [
//         {
//             type: 'checkbox',
//             name: 'ids',
//             message: 'Seleccione',
//             choices
//         }
//     ]

//     const { ids } = await inquirer.prompt(pregunta);
//     return ids;
// }