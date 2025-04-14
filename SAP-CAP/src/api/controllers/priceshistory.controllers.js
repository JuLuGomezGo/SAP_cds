const cds = require('@sap/cds');
const { GetAllPricesHistory, AddOnePricesHistory,
        UpdatePricesHistory, GetPriceHistoryById, DeletePriceHistoryById } = require('../services/priceshistory.services');
const { GetAllPricesHistoryCosmos, AddOnePricesHistoryCosmos,
        GetByIdPricesHistoryCosmos, UpdateByIdPricesHistoryCosmos,
        DeleteByIdPricesHistoryCosmos, AddManyPricesHistoryCosmos } = require('../services/priceshistory.services.AzureCosmos');


module.exports = class InversionsClass extends cds.ApplicationService {
    async init() {
      //****************** PARA MONGODB ***********************/
        // Evento para obtener todos los datos de MongoDB
        this.on('getallMongoDB', async (req) => {
            return await GetAllPricesHistory(req);
        });
        // Evento para obtener un dato en particular de los datos de MongoDB
        this.on('getByIdMongoDB', async (req) => {
            return await GetPriceHistoryById(req);
        });

        // Evento para agregar un dato
        this.on("addOne", async (req) => {
          return AddOnePricesHistory(req);
        });

        // Evento para actualizar un dato en MongoDB (PUT)
        this.on("updateByIdMongoDB", async (req) => {
          try {
              // Obtener los datos del cuerpo de la solicitud
              const { ID, DATE, OPEN, HIGH, LOW, CLOSE, VOLUME } = req.data.prices;  // Asegúrate que el cuerpo tiene una propiedad 'prices'

              // Crear un objeto con los nuevos datos
              const updatedPrices = {
                  DATE,
                  OPEN,
                  HIGH,
                  LOW,
                  CLOSE,
                  VOLUME
              };

              // Llamar a la función del servicio para actualizar el registro
              return await UpdatePricesHistory(ID, updatedPrices);
          } catch (error) {
              req.error({ code: 500, message: error.message });
          }
        });

        // Evento para eliminar un dato en MongoDB
        this.on("deleteByIdMongoDB", async (req) => {
          try {
            const { ID } = req.data; // Obtenemos el ID del cuerpo de la solicitud
            return await DeletePriceHistoryById(ID); // Llamamos a la función para eliminar el registro
          } catch (error) {
            req.error({ code: 500, message: error.message });
          }
        });

      // //****************** PARA COSMOS DB *************************/
      //   //GET ALL COSMOS
      //   this.on('getallCosmos', async (req) => {
      //       try {
      //         const pricesHistory = await GetAllPricesHistoryCosmos(req);
      //         return pricesHistory;  // Devolver la respuesta obtenida del servicio
      //       } catch (error) {
      //         console.error('Error al procesar la solicitud:', error);
      //         return { error: 'Hubo un error al obtener los datos.' };
      //       }
      //   });

      //   //GET BY ID COSMOS
      //   this.on('getByIdCosmos', async (req) => {
      //     try {
      //       return await GetByIdPricesHistoryCosmos(req);
      //     } catch (error) {
      //       console.error('Error al procesar la solicitud:', error);
      //       return { error: 'Hubo un error al obtener el dato.' };
      //     }
      //   });

      //   //POST COSMOS
      //   this.on('addOneCosmos', async (req) => {  
      //     try {  
      //         return await AddOnePricesHistoryCosmos(req);  
      //     } catch (error) {  
      //         req.error({ code: 500, message: error.message });  
      //     }  
      //   });  

      //   //PUT COSMOS
      //   this.on('updateByIdCosmos', async (req) => {  
      //     try {  
      //         return await UpdateByIdPricesHistoryCosmos(req);  
      //     } catch (error) {  
      //         req.error({ code: 500, message: error.message });  
      //     }  
      //   });

      //   //DELETE COSMOS
      //   this.on('deleteByIdCosmos', async (req) => {  
      //     try {  
      //         return await DeleteByIdPricesHistoryCosmos(req);  
      //     } catch (error) {  
      //         req.error({ code: 500, message: error.message });  
      //     }  
      //   });

      //   //POST MASIVO
      //   this.on('addManyCosmos', async (req) => {  
      //     try {  
      //         return await AddManyPricesHistoryCosmos(req);  
      //     } catch (error) {  
      //         req.error({ code: 500, message: error.message });  
      //     }  
      //   });
      

        // Llamada al método init del servicio base de CAP
        return await super.init();
    }

};

