
const { option, boolean } = require('yargs');
const { crearArchivo } = require('./helpers/multiplicar')
const argv = require('./config/yargs');


console.clear();

console.log(argv);
console.log(argv.b);
console.log(argv.l);


crearArchivo(argv.b, argv.l)
    .then(archivo => console.log(archivo, 'creado'))
    .catch(err => console.log(err));
