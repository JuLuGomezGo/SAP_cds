//para el get all de las dos archivos csv que tenemos de manera local
const cds = require('@sap/cds');

class InversionsClass extends cds.ApplicationService {
    async init() {
        this.on('getall', async (req) => {
            return await this.GetAllInversions(req);
        });

        return await super.init();
    }

async GetAllInversions(req) {
        const db = cds.db; // Obtiene la conexión a la base de datos
        const { strategies, priceshistory } = cds.entities('inv'); 

        try {
            const strategiesData = await db.run(SELECT.from(strategies)); // Consulta estrategias
            const pricesHistoryData = await db.run(SELECT.from(priceshistory)); // Consulta historial de precios

        return { strategies: strategiesData, pricesHistory: pricesHistoryData }; // Devuelve ambas listas
        } catch (error) {
            req.error(500, `Error obteniendo inversiones: ${error.message}`);
        }
    }
}

module.exports = InversionsClass;
