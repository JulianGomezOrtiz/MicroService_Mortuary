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

import Route from "@ioc:Adonis/Core/Route";
import "./routes/customer";
import "./routes/beneficiarie";
import "./routes/holder";
import "./routes/membership";
import "./routes/plan";
import "./routes/service_execution";
import "./routes/service";

Route.get("/Administrators", "AdministratorsController.find");
Route.post("/Administrators", "AdministratorsController.create");
Route.get("/Administrators/:id", "AdministratorsController.find");
Route.put("/Administrators/:id", "AdministratorsController.update");
Route.delete("/Administrators/:id", "AdministratorsController.delete");

Route.get("/Bills", "BillsController.find");
Route.post("/Bills", "BillsController.create");
Route.get("/Bills/:id", "BillsController.find");
Route.put("/Bills/:id", "BillsController.update");
Route.delete("/Bills/:id", "BillsController.delete");

Route.get("/Ceremonies", "CeremoniesController.find");
Route.post("/Ceremonies", "CeremoniesController.create");
Route.get("/Ceremonies/:id", "CeremoniesController.find");
Route.put("/Ceremonies/:id", "CeremoniesController.update");
Route.delete("/Ceremonies/:id", "CeremoniesController.delete");

Route.get("/ChatRooms", "ChatRoomsController.find");
Route.post("/ChatRooms", "ChatRoomsController.create");
Route.get("/ChatRooms/:id", "ChatRoomsController.find");
Route.put("/ChatRooms/:id", "ChatRoomsController.update");
Route.delete("/ChatRooms/:id", "ChatRoomsController.delete");

Route.get("/Cities", "CitiesController.find");
Route.post("/Cities", "CitiesController.create");
Route.get("/Cities/:id", "CitiesController.find");
Route.put("/Cities/:id", "CitiesController.update");
Route.delete("/Cities/:id", "CitiesController.delete");

Route.get("/CommentsAndRatings", "CommentsAndRatingsController.find");
Route.post("/CommentsAndRatings", "CommentsAndRatingsController.create");
Route.get("/CommentsAndRatings/:id", "CommentsAndRatingsController.find");
Route.put("/CommentsAndRatings/:id", "CommentsAndRatingsController.update");
Route.delete("/CommentsAndRatings/:id", "CommentsAndRatingsController.delete");

Route.get("/Departments", "DepartmentsController.find");
Route.post("/Departments", "DepartmentsController.create");
Route.get("/Departments/:id", "DepartmentsController.find");
Route.put("/Departments/:id", "DepartmentsController.update");
Route.delete("/Departments/:id", "DepartmentsController.delete");

Route.get("/Drivers", "DriversController.find");
Route.post("/Drivers", "DriversController.create");
Route.get("/Drivers/:id", "DriversController.find");
Route.put("/Drivers/:id", "DriversController.update");
Route.delete("/Drivers/:id", "DriversController.delete");

Route.get("/Headquarters", "HeadquartersController.find");
Route.post("/Headquarters", "HeadquartersController.create");
Route.get("/Headquarters/:id", "HeadquartersController.find");
Route.put("/Headquarters/:id", "HeadquartersController.update");
Route.delete("/Headquarters/:id", "HeadquartersController.delete");

Route.get("/Messages", "MessagesController.find");
Route.post("/Messages", "MessagesController.create");
Route.get("/Messages/:id", "MessagesController.find");
Route.put("/Messages/:id", "MessagesController.update");
Route.delete("/Messages/:id", "MessagesController.delete");

Route.get("/PlanByService", "PlanByServicesController.find");
Route.post("/PlanByService", "PlanByServicesController.create");
Route.get("/PlanByService/:id", "PlanByServicesController.find");
Route.put("/PlanByService/:id", "PlanByServicesController.update");
Route.delete("/PlanByService/:id", "PlanByServicesController.delete");

Route.get("/Rooms", "RoomsController.find");
Route.post("/Rooms", "RoomsController.create");
Route.get("/Rooms/:id", "RoomsController.find");
Route.put("/Rooms/:id", "RoomsController.update");
Route.delete("/Rooms/:id", "RoomsController.delete");
