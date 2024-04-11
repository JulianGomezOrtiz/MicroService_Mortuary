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

Route.get("/Administrators", "AdministratorsController.index");
Route.post("/Administrators", "AdministratorsController.create");
Route.get("/Administrators/:id", "AdministratorsController.find");
Route.put("/Administrators/:id", "AdministratorsController.update");
Route.delete("/Administrators/:id", "AdministratorsController.delete");

Route.get("/Bills", "BillsController.index");
Route.post("/Bills", "BillsController.create");
Route.get("/Bills/:id", "BillsController.find");
Route.put("/Bills/:id", "BillsController.update");
Route.delete("/Bills/:id", "BillsController.delete");

Route.get("/Beneficiarie", "BeneficiarieController.index");
Route.post("/Beneficiarie", "BeneficiarieController.create");
Route.get("/Beneficiarie/:id", "BeneficiarieController.find");
Route.put("/Beneficiarie/:id", "BeneficiarieController.update");
Route.delete("/Beneficiarie/:id", "BeneficiarieController.delete");

Route.get("/Ceremonies", "CeremoniesController.index");
Route.post("/Ceremonies", "CeremoniesController.create");
Route.get("/Ceremonies/:id", "CeremoniesController.find");
Route.put("/Ceremonies/:id", "CeremoniesController.update");
Route.delete("/Ceremonies/:id", "CeremoniesController.delete");

Route.get("/ChatRooms", "ChatRoomsController.index");
Route.post("/ChatRooms", "ChatRoomsController.create");
Route.get("/ChatRooms/:id", "ChatRoomsController.find");
Route.put("/ChatRooms/:id", "ChatRoomsController.update");
Route.delete("/ChatRooms/:id", "ChatRoomsController.delete");

Route.get("/Cities", "CitiesController.index");
Route.post("/Cities", "CitiesController.create");
Route.get("/Cities/:id", "CitiesController.find");
Route.put("/Cities/:id", "CitiesController.update");
Route.delete("/Cities/:id", "CeremoniesController.delete");

Route.get("/CommentsAndRatings", "CommentsAndRatingsController.index");
Route.post("/CommentsAndRatings", "CommentsAndRatingsController.create");
Route.get("/CommentsAndRatings/:id", "CommentsAndRatingsController.find");
Route.put("/CommentsAndRatings/:id", "CommentsAndRatingsController.update");
Route.delete("/CommentsAndRatings/:id", "CommentsAndRatingsController.delete");

Route.get("/Customers", "CustomersController.index");
Route.post("/Customers", "CustomersController.create");
Route.get("/Customers/:id", "CustomersController.find");
Route.put("/Customers/:id", "CustomersController.update");
Route.delete("/Customers/:id", "CustomersController.delete");

Route.get("/Departments", "DepartmentsController.index");
Route.post("/Departments", "DepartmentsController.create");
Route.get("/Departments/:id", "DepartmentsController.find");
Route.put("/Departments/:id", "DepartmentsController.update");
Route.delete("/Departments/:id", "DepartmentsController.delete");

Route.get("/Drivers", "DriversController.index");
Route.post("/Drivers", "DriversController.create");
Route.get("/Drivers/:id", "DriversController.find");
Route.put("/Drivers/:id", "DriversController.update");
Route.delete("/Drivers/:id", "DriversController.delete");

Route.get("/Headquarters", "HeadquartersController.index");
Route.post("/Headquarters", "HeadquartersController.create");
Route.get("/Headquarters/:id", "HeadquartersController.find");
Route.put("/Headquarters/:id", "HeadquartersController.update");
Route.delete("/Headquarters/:id", "HeadquartersController.delete");

Route.get("/Holders", "HoldersController.index");
Route.post("/Holders", "HoldersController.create");
Route.get("/Holders/:id", "HoldersController.find");
Route.put("/Holders/:id", "HoldersController.update");
Route.delete("/Holders/:id", "HoldersController.delete");

Route.get("/Memberships", "MembershipsController.index");
Route.post("/Memberships", "MembershipsController.create");
Route.get("/Memberships/:id", "MembershipsController.find");
Route.put("/Memberships/:id", "MembershipsController.update");
Route.delete("/Memberships/:id", "MembershipsController.delete");

Route.get("/Messages", "MessagesController.index");
Route.post("/Messages", "MessagesController.create");
Route.get("/Messages/:id", "MessagesController.find");
Route.put("/Messages/:id", "MessagesController.update");
Route.delete("/Messages/:id", "MessagesController.delete");

Route.get("/PlanByService", "PlanByServiceController.index");
Route.post("/PlanByService", "PlanByServiceController.create");
Route.get("/PlanByService/:id", "PlanByServiceController.find");
Route.put("/PlanByService/:id", "PlanByServiceController.update");
Route.delete("/PlanByService/:id", "PlanByServiceController.delete");

Route.get("/Plans", "PlansController.index");
Route.post("/Plans", "PlansController.create");
Route.get("/Plans/:id", "PlansController.find");
Route.put("/Plans/:id", "PlansController.update");
Route.delete("/Plans/:id", "PlansController.delete");

Route.get("/Rooms", "RoomsController.index");
Route.post("/Rooms", "RoomsController.create");
Route.get("/Rooms/:id", "RoomsController.find");
Route.put("/Rooms/:id", "RoomsController.update");
Route.delete("/Rooms/:id", "RoomsController.delete");

Route.get("/Services", "ServicesController.index");
Route.post("/Services", "ServicesController.create");
Route.get("/Services/:id", "ServicesController.find");
Route.put("/Services/:id", "ServicesController.update");
Route.delete("/Services/:id", "ServicesController.delete");

Route.get("/ServiceExecutions", "ServiceExecutionsController.index");
Route.post("/ServiceExecutions", "ServiceExecutionsController.create");
Route.get("/ServiceExecutions/:id", "ServiceExecutionsController.find");
Route.put("/ServiceExecutions/:id", "ServiceExecutionsController.update");
Route.delete("/ServiceExecutions/:id", "ServiceExecutionsController.delete");
