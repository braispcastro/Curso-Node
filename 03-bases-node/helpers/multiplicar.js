const fs = require('fs');
const colors = require('colors');


const crearArchivo = async (base, listar) => {

    try {
        let salida = '';

        for (let i = 1; i <= 10; i++) {
            const result = base * i;
            salida += `${base.toString().red} x ${i.toString().green} = ${result.toString().blue}\n`;
        }

        if (listar) {
            console.log('============='.rainbow);
            console.log(` TABLA DEL ${base.toString().yellow}`);
            console.log('============='.rainbow);
            console.log(salida)
        }

        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return `tabla-${base}.txt`;
    }
    catch (err) {
        throw err;
    }
};



module.exports = {
    crearArchivo
}