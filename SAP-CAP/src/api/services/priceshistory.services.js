//************* SERVICIO PARA MONGO DB */
const ztpriceshistorySchema = require('../models/mongoDB/ztpriceshistory');

async function GetAllPricesHistory(req) {
  try {
    let pricesHistory = await ztpriceshistorySchema.find().lean(); // <-- Agrega .lean()
    return pricesHistory;
  } catch (error) {
    return error;
  }
}
async function GetPriceHistoryById(req) {
  try {
    const { ID } = req.data;  // Asumiendo que el ID es un parámetro en el cuerpo de la solicitud

    // Asegurarse de que el ID es un número
    const numericId = Number(ID);
    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es un número válido');
    }

    // Buscar el registro en MongoDB
    const priceHistory = await ztpriceshistorySchema.findOne({ ID: numericId }).lean();

    if (!priceHistory) {
      throw new Error(`No se encontró un registro con el ID ${numericId}`);
    }

    return priceHistory;
  } catch (error) {
    throw new Error(`Error al obtener el registro de precios por ID: ${error.message}`);
  }
}

async function AddOnePricesHistory(req) {
  try {
    const newPrices = req.req.body.prices;
    const insertedRecords = await ztpriceshistorySchema.insertMany(newPrices, { ordered: true });
    return JSON.parse(JSON.stringify(insertedRecords));
  } catch (error) {
    throw new Error(`Error en AddOnePricesHistory: ${error.message}`);
  }
}

async function UpdatePricesHistory(ID, updatedPrices) {
  try {
    // Asegurarse de que el ID es un número
    const numericId = Number(ID);
    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es un número válido');
    }

    // Buscar el documento por el campo 'ID' y actualizarlo
    const updatedRecord = await ztpriceshistorySchema.findOneAndUpdate(
      { ID: numericId },  // Usamos el campo 'ID' que es un número
      { $set: updatedPrices },  // Usamos $set para actualizar los datos
      { new: true, runValidators: true }  // Retorna el documento actualizado
    ).lean();

    if (!updatedRecord) {
      throw new Error(`No se encontró un registro con el ID ${numericId}`);
    }

    return updatedRecord;  // Retornar el documento actualizado
  } catch (error) {
    throw new Error(`Error en UpdatePricesHistory: ${error.message}`);
  }
}

async function DeletePriceHistoryById(ID) {
  try {
    // Asegurarse de que el ID es un número
    const numericId = Number(ID);
    if (isNaN(numericId)) {
      throw new Error('El ID proporcionado no es un número válido');
    }

    // Eliminar el documento por el campo 'ID'
    const deletedRecord = await ztpriceshistorySchema.findOneAndDelete({ ID: numericId }).lean();

    if (!deletedRecord) {
      throw new Error(`No se encontró un registro con el ID ${numericId} para eliminar`);
    }

    return { message: `Registro con ID ${numericId} eliminado correctamente` };
  } catch (error) {
    throw new Error(`Error al eliminar el registro de precios por ID: ${error.message}`);
  }
}



module.exports = { GetAllPricesHistory, AddOnePricesHistory, UpdatePricesHistory, GetPriceHistoryById, DeletePriceHistoryById }; ;