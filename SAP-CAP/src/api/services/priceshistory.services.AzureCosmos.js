// //************* SERVICIO PARA COSMOS DB */
// const { conectionAzureCosmosDB } = require('../../config/conectionToAzureCosmosDB'); // Asegúrate de que esté correctamente importado

// // Función para obtener todos los datos
// async function GetAllPricesHistoryCosmos(req) {
//   try {
//     const container = conectionAzureCosmosDB('ztpriceshistory'); // Conectar al contenedor
    
//     // Realizar la consulta
//     const { resources: pricesHistory } = await container.items.query('SELECT * FROM c').fetchAll();
    
//     if (pricesHistory && pricesHistory.length > 0) {
//       return { value: pricesHistory };  // Devolver los resultados obtenidos
//     } else {
//       return { value: [] };  // Si no hay registros, devolver un array vacío
//     }
//   } catch (error) {
//     console.error('Error al obtener datos de Azure Cosmos DB:', error);
//     return { error: 'No se pudieron obtener los datos de Cosmos DB' };
//   }
// }

// // Función para agregar un dato
// async function AddOnePricesHistoryCosmos(req) {
//   try {
//       const container = conectionAzureCosmosDB('ztpriceshistory');
//       const newPrice = req.data.prices;
      
//       // Validación de campos requeridos
//       const requiredFields = ['ID', 'DATE', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME'];
//       const missingFields = requiredFields.filter(field => !newPrice[field]);
      
//       if (missingFields.length > 0) {
//           throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
//       }

//       // Convertir DATE a formato ISO si es necesario
//       if (typeof newPrice.DATE == 'string') {
//           newPrice.DATE = new Date(newPrice.DATE).toISOString();
//       }

//       // Insertar en Cosmos DB
//       const { resource: createdItem } = await container.items.create(newPrice);
      
//       // Limpiar metadatos de Cosmos
//       const { _rid, _self, _etag, _attachments, _ts, ...cleanItem } = createdItem;
      
//       return [cleanItem];
      
//   } catch (error) {
//       console.error('Error en AddOnePricesHistoryCosmos:', error);
//       throw new Error(`Error Cosmos DB: ${error.message}`);
//   }
// }

// // Función para obtener un dato por ID
// async function GetByIdPricesHistoryCosmos(req) {
//   try {
//     const { id } = req.data; // Obtener el ID desde la solicitud
//     if (id === undefined || id === null) {
//       return { error: 'ID es requerido' };
//     }

//     const numericId = parseInt(id, 10); // Convertir el ID a número

//     if (isNaN(numericId)) {
//       return { error: 'ID debe ser un número válido' };
//     }

//     const container = conectionAzureCosmosDB('ztpriceshistory'); // Conectar al contenedor

//     const query = {
//       query: "SELECT * FROM c WHERE c.ID = @id", // Filtrando por "ID" (número)
//       parameters: [{ name: "@id", value: numericId }]
//     };
    
//     const { resources: results } = await container.items.query(query).fetchAll();
    
//     if (results.length > 0) {
//       return results[0];  // Devuelve el primer resultado encontrado
//     } else {
//       return { error: "Registro no encontrado" };
//     }
    
//   } catch (error) {
//     console.error('Error al obtener el dato de Cosmos DB:', error);
//     return { error: 'No se pudo obtener el dato de Cosmos DB' };
//   }
// }

// //Función para actualizar un dato
// async function UpdateByIdPricesHistoryCosmos(req) {
//   try {
//       const { ID, DATE, OPEN, HIGH, LOW, CLOSE, VOLUME } = req.data;

//       if (!ID) {
//           return { error: 'El campo ID es requerido' };
//       }

//       const numericId = parseInt(ID, 10); // Convertir ID a número
//       if (isNaN(numericId)) {
//           return { error: 'ID debe ser un número válido' };
//       }

//       const container = conectionAzureCosmosDB('ztpriceshistory'); // Conectar a Cosmos DB

//       // Buscar el documento en Cosmos DB usando `ID`
//       const query = {
//           query: "SELECT * FROM c WHERE c.ID = @id",
//           parameters: [{ name: "@id", value: numericId }]
//       };

//       const { resources: results } = await container.items.query(query).fetchAll();

//       if (results.length === 0) {
//           return { error: "Registro no encontrado" };
//       }

//       let itemToUpdate = results[0]; // Primer resultado encontrado

//       // Actualizar los valores si fueron enviados en la solicitud
//       itemToUpdate.DATE = DATE || itemToUpdate.DATE;
//       itemToUpdate.OPEN = OPEN || itemToUpdate.OPEN;
//       itemToUpdate.HIGH = HIGH || itemToUpdate.HIGH;
//       itemToUpdate.LOW = LOW || itemToUpdate.LOW;
//       itemToUpdate.CLOSE = CLOSE || itemToUpdate.CLOSE;
//       itemToUpdate.VOLUME = VOLUME || itemToUpdate.VOLUME;

//       // Actualizar en Cosmos DB usando `id`
//       const { resource: updatedItem } = await container.item(itemToUpdate.id).replace(itemToUpdate);

//       // Limpiar los metadatos antes de devolver la respuesta
//       const { _rid, _self, _etag, _attachments, _ts, ...cleanItem } = updatedItem;

//       return [cleanItem];

//   } catch (error) {
//       console.error('Error al actualizar en Cosmos DB:', error);
//       return { error: 'No se pudo actualizar el dato en Cosmos DB' };
//   }
// }

// //Funcion para eliminar dato
// async function DeleteByIdPricesHistoryCosmos(req) {
//   try {
//       const { ID } = req.data; // Obtener el ID desde la solicitud
//       if (!ID) {
//           return { error: 'ID es requerido' };
//       }

//       const numericId = parseInt(ID, 10); // Convertir ID a número
//       if (isNaN(numericId)) {
//           return { error: 'ID debe ser un número válido' };
//       }

//       const container = conectionAzureCosmosDB('ztpriceshistory'); // Conectar al contenedor

//       // Buscar el item con el ID
//       const query = {
//           query: "SELECT * FROM c WHERE c.ID = @id",
//           parameters: [{ name: "@id", value: numericId }]
//       };

//       const { resources: results } = await container.items.query(query).fetchAll();

//       if (results.length > 0) {
//         const itemToDelete = results[0];

//        // Eliminar con `id` y `PartitionKey` correcto
//           await container.item(itemToDelete.id, itemToDelete.partitionKey).delete();

//         return { success: true, message: "Registro eliminado correctamente" };
//     } else {
//         return { error: "Registro no encontrado" };
//     }
//   } catch (error) {
//       console.error('Error al eliminar el dato de Cosmos DB:', error);
//       return { error: 'No se pudo eliminar el dato de Cosmos DB' };
//   }
// }

// //Funcion para agregar multiples datos
// async function AddManyPricesHistoryCosmos(req) {
//   try {
//       const container = conectionAzureCosmosDB('ztpriceshistory');
//       const prices = req.data.prices;

//       if (!Array.isArray(prices) || prices.length === 0) {
//           req.error(400, 'El array de precios es requerido y no puede estar vacío.');
//           return;
//       }

//       const requiredFields = ['ID', 'DATE', 'OPEN', 'HIGH', 'LOW', 'CLOSE', 'VOLUME'];

//       // Validar y transformar los datos
//       const formattedPrices = prices.map(price => {
//           const missingFields = requiredFields.filter(field => !price[field]);

//           if (missingFields.length > 0) {
//               throw new Error(`Campos requeridos faltantes en un registro: ${missingFields.join(', ')}`);
//           }

//           return {
//               ...price,
//               DATE: typeof price.DATE === 'string' ? new Date(price.DATE).toISOString() : price.DATE
//           };
//       });

//       // Inserción masiva con la API de Cosmos DB
//       const createOperations = formattedPrices.map(price => ({
//           operationType: 'Create',
//           resourceBody: price
//       }));

//       const response = await container.items.bulk(createOperations);

//       // Filtrar errores y obtener los elementos insertados correctamente
//       const successfulItems = response.filter(res => res.statusCode === 201).map(res => {
//           const { _rid, _self, _etag, _attachments, _ts, ...cleanItem } = res.resourceBody;
//           return cleanItem;
//       });

//       return successfulItems;

//   } catch (error) {
//       console.error('Error en AddManyPricesHistoryCosmos:', error);
//       req.error(500, `Error Cosmos DB: ${error.message}`);
//   }
// }

// module.exports = { GetAllPricesHistoryCosmos, AddOnePricesHistoryCosmos , GetByIdPricesHistoryCosmos , UpdateByIdPricesHistoryCosmos, DeleteByIdPricesHistoryCosmos, AddManyPricesHistoryCosmos };
