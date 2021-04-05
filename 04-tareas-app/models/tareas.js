
const Tarea = require('./tarea');


class Tareas {

    _listado = {};

    get listado() {

        const list = [];

        Object.keys(this._listado).forEach( key => {
            list.push(this._listado[key]);
        });

        return list;

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '' ) {

        if (this._listado[id]) {
            delete this._listado[id];
        }

    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listado.forEach( (item, i) => {
            const index = `${ i + 1 }.`;
            const estado = item.completadoEn ? 'Completada'.blue : 'Pendiente'.red;
            console.log(`${ index.green } ${ item.desc } :: ${ estado }`);
        });

    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let i = 0;
        this.listado.forEach( (item) => {
            if ((item.completadoEn !== null) === completadas) {
                const index = `${ ++i }.`;
                const estado = item.completadoEn ? item.completadoEn.blue : 'Pendiente'.red;
                console.log(`${ index.green } ${ item.desc } :: ${ estado }`);
            }
        });

    }

    toggleCompletadas(ids = []) {

        this.listado.forEach(tarea => {

            if (ids.includes(tarea.id)) {
                if (!tarea.completadoEn) {
                    tarea.completadoEn = new Date().toISOString();
                }
            } else {
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}



module.exports = Tareas;