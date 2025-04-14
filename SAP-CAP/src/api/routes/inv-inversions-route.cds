using {inv as myinv} from '../models/inv-inversions';
@impl: 'src/api/controllers/priceshistory.controllers.js'

//NOTA: SAP CAP solo puede manejar solicitudes GET y POST
//GET lo realiza por medio de function
//POST lo realiza por medio de action
//para utilizar los metodos PUT y DELETE se tiene que hacer 
//en algun manejador como Postman o Insomnia, pero por medio 
//del metodo POST, por lo anterior explicado de SAP 

service inversionsRoute @(path:'/api/inv'){
    entity priceshistory as projection on myinv.priceshistory;
    entity inversions as projection on myinv.strategies;
    
//******************* PARA MONGO DB ***********************************
    @Core.Description: 'get-all-prices-inversions'
    @path :'getallMongoDB'
    function getallMongoDB() returns array of inversions;

    @Core.Description: 'get-by-id-prices-inversions'
    @path :'getByIdMongoDB'
    function getByIdMongoDB(ID: Integer) returns inversions;

    @Core.Description: 'addOne-prices-history'
    @path :'addOne' 
    action addOne(prices : priceshistory) returns array of priceshistory;

    @Core.Description: 'updateByIdMongoDB-prices-history'
    @path : 'updateByIdMongoDB' 
    action updateByIdMongoDB(ID: Integer , prices: priceshistory) returns priceshistory;

    @Core.Description: 'deleteByIdMongoDB-prices-history'  // Nueva descripción para DELETE
    @path :'deleteByIdMongoDB'
    action deleteByIdMongoDB(ID: Integer) returns Boolean;


// //******************* PARA AZURE COSMOS DB ***********************************
//     @Core.Description: 'get-all-prices-inversions'
//     @path :'getallCosmos'
//     function getallCosmos() returns array of inversions;

//     @Core.Description: 'get-by-id-prices-inversions'
//     @path :'getByIdCosmos'
//     function getByIdCosmos(id: String) returns inversions;

//     @Core.Description: 'addOne-prices-history-cosmos'  
//     @path :'addOneCosmos'  
//     action addOneCosmos(prices : priceshistory) returns array of priceshistory;

//     @Core.Description: 'update-by-id-prices-inversions'
//     @path :'updateByIdCosmos'
//     action updateByIdCosmos(ID: Integer, DATE: String, OPEN: Decimal, HIGH: Decimal, LOW: Decimal, CLOSE: Decimal, VOLUME: Integer) returns priceshistory;

//     @Core.Description: 'delete-by-id-prices-inversions'
//     @path :'deleteByIdCosmos'
//     action deleteByIdCosmos(ID: Integer) returns Boolean;

//     @Core.Description: 'addManys-prices-history-cosmos'  
//     @path :'addManyCosmos'  
//     action addManyCosmos(prices : priceshistory) returns array of priceshistory;

}



