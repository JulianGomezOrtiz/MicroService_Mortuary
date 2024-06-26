/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

//import Route from "@ioc:Adonis/Core/Route"; // No se están creando rutas aquí
import "./routes/customer";
import "./routes/beneficiarie";
import "./routes/holder";
import "./routes/membership";
import "./routes/plan";
import "./routes/service_execution";
import "./routes/administrator";
import "./routes/bill";
import "./routes/burial";
import "./routes/chat_room";
import "./routes/city";
import "./routes/comment_and_rating";
import "./routes/cremation";
import "./routes/department";
import "./routes/drivers";
import "./routes/headquarters";
import "./routes/message";
import "./routes/plan_by_service";
import "./routes/relocation";
import "./routes/room";
import "./routes/service";






// Route.get("/Administrators", "AdministratorsController.find");
// Route.post("/Administrators", "AdministratorsController.create");
// Route.get("/Administrators/:id", "AdministratorsController.find");
// Route.put("/Administrators/:id", "AdministratorsController.update");
// Route.delete("/Administrators/:id", "AdministratorsController.delete");

// Route.get("/Bills", "BillsController.find");
// Route.post("/Bills", "BillsController.create");
// Route.get("/Bills/:id", "BillsController.find");
// Route.put("/Bills/:id", "BillsController.update");
// Route.delete("/Bills/:id", "BillsController.delete");

// Route.get("/Ceremonies", "CeremoniesController.find");
// Route.post("/Ceremonies", "CeremoniesController.create");
// Route.get("/Ceremonies/:id", "CeremoniesController.find");
// Route.put("/Ceremonies/:id", "CeremoniesController.update");
// Route.delete("/Ceremonies/:id", "CeremoniesController.delete");

// Route.get("/ChatRooms", "ChatRoomsController.find");
// Route.post("/ChatRooms", "ChatRoomsController.create");
// Route.get("/ChatRooms/:id", "ChatRoomsController.find");
// Route.put("/ChatRooms/:id", "ChatRoomsController.update");
// Route.delete("/ChatRooms/:id", "ChatRoomsController.delete");

// Route.get("/Cities", "CitiesController.find");
// Route.post("/Cities", "CitiesController.create");
// Route.get("/Cities/:id", "CitiesController.find");
// Route.put("/Cities/:id", "CitiesController.update");
// Route.delete("/Cities/:id", "CitiesController.delete");

// Route.get("/CommentsAndRatings", "CommentsAndRatingsController.find");
// Route.post("/CommentsAndRatings", "CommentsAndRatingsController.create");
// Route.get("/CommentsAndRatings/:id", "CommentsAndRatingsController.find");
// Route.put("/CommentsAndRatings/:id", "CommentsAndRatingsController.update");
// Route.delete("/CommentsAndRatings/:id", "CommentsAndRatingsController.delete");

// Route.get("/Departments", "DepartmentsController.find");
// Route.post("/Departments", "DepartmentsController.create");
// Route.get("/Departments/:id", "DepartmentsController.find");
// Route.put("/Departments/:id", "DepartmentsController.update");
// Route.delete("/Departments/:id", "DepartmentsController.delete");

// Route.get("/Drivers", "DriversController.find");
// Route.post("/Drivers", "DriversController.create");
// Route.get("/Drivers/:id", "DriversController.find");
// Route.put("/Drivers/:id", "DriversController.update");
// Route.delete("/Drivers/:id", "DriversController.delete");

// Route.get("/Headquarters", "HeadquartersController.find");
// Route.post("/Headquarters", "HeadquartersController.create");
// Route.get("/Headquarters/:id", "HeadquartersController.find");
// Route.put("/Headquarters/:id", "HeadquartersController.update");
// Route.delete("/Headquarters/:id", "HeadquartersController.delete");

// Route.get("/Messages", "MessagesController.find");
// Route.post("/Messages", "MessagesController.create");
// Route.get("/Messages/:id", "MessagesController.find");
// Route.put("/Messages/:id", "MessagesController.update");
// Route.delete("/Messages/:id", "MessagesController.delete");

// Route.get("/PlanByService", "PlanByServicesController.find");
// Route.post("/PlanByService", "PlanByServicesController.create");
// Route.get("/PlanByService/:id", "PlanByServicesController.find");
// Route.put("/PlanByService/:id", "PlanByServicesController.update");
// Route.delete("/PlanByService/:id", "PlanByServicesController.delete");

// Route.get("/Rooms", "RoomsController.find");
// Route.post("/Rooms", "RoomsController.create");
// Route.get("/Rooms/:id", "RoomsController.find");
// Route.put("/Rooms/:id", "RoomsController.update");
// Route.delete("/Rooms/:id", "RoomsController.delete");

// Route.get("/Conductores", "ConductorsController.find");
// Route.post("/Conductores", "ConductorsController.create");
// Route.get("/Conductores/:id", "ConductorsController.find");
// Route.put("/Conductores/:id", "ConductorsController.update");
// Route.delete("/Conductores/:id", "ConductorsController.delete");

// Route.get("/Feretros", "FeretrosController.find");
// Route.post("/Feretros", "FeretrosController.create");
// Route.get("/Feretros/:id", "FeretrosController.find");
// Route.put("/Feretros/:id", "FeretrosController.update");
// Route.delete("/Feretros/:id", "FeretrosController.delete");

// Route.get("/Desplazamientos", "DesplazamientosController.find");
// Route.post("/Desplazamientos", "DesplazamientosController.create");
// Route.get("/Desplazamientos/:id", "DesplazamientosController.find");
// Route.put("/Desplazamientos/:id", "DesplazamientosController.update");
// Route.delete("/Desplazamientos/:id", "DesplazamientosController.delete");

// Route.post("/Camaras", "CamarasController.create");
// Route.get("/Camaras/:id", "CamarasController.find");

// Route.post("/Transmisions", "TransmisionsController.create");
// Route.get("/Transmisions/:id", "TransmisionsController.find");

// Route.get("/Burials", "BurialsController.find");
// Route.post("/Burials", "BurialsController.create");
// Route.get("/Burials/:id", "BurialsController.find");
// Route.put("/Burials/:id", "BurialsController.update");
// Route.delete("/Burials/:id", "BurialsController.delete");

// Route.get("/Cremations", "CremationsController.find");
// Route.post("/Cremations", "CremationsController.create");
// Route.get("/Cremations/:id", "CremationsController.find");
// Route.put("/Cremations/:id", "CremationsController.update");
// Route.delete("/Cremations/:id", "CremationsController.delete");

// Route.get("/Relocations", "RelocationsController.find");
// Route.post("/Relocations", "RelocationsController.create");
// Route.get("/Relocations/:id", "RelocationsController.find");
// Route.put("/Relocations/:id", "RelocationsController.update");
// Route.delete("/Relocations/:id", "RelocationsController.delete");
