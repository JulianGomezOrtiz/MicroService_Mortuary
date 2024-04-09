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

import Route from '@ioc:Adonis/Core/Route'

Route.get("/Administrators","AdministratorsController.index");
Route.post("/Administrators","AdministratorsController.store");
Route.get("/Administrators/:id","AdministratorsController.show");
Route.put("/Administrators/:id","AdministratorsController.update");
Route.delete("/Administrators/:id","AdministratorsController.destroy");

Route.get("/Bills","BillsController.index");
Route.post("/Bills","BillsController.store");
Route.get("/Bills/:id","BillsController.show");
Route.put("/Bills/:id","BillsController.update");
Route.delete("/Bills/:id","BillsController.destroy");

Route.get("/ChatRooms","ChatRoomsController.index");
Route.post("/ChatRooms","ChatRoomsController.store");
Route.get("/ChatRooms/:id","ChatRoomsController.show");
Route.put("/ChatRooms/:id","ChatRoomsController.update");
Route.delete("/ChatRooms/:id","ChatRoomsController.destroy");

Route.get("/CommentsAndRatings","CommentsAndRatingsController.index");
Route.post("/CommentsAndRatings","CommentsAndRatingsController.store");
Route.get("/CommentsAndRatings/:id","CommentsAndRatingsController.show");
Route.put("/CommentsAndRatings/:id","CommentsAndRatingsController.update");
Route.delete("/CommentsAndRatings/:id","CommentsAndRatingsController.destroy");

Route.get("/Customers","CustomersController.index");
Route.post("/Customers","CustomersController.store");
Route.get("/Customers/:id","CustomersController.show");
Route.put("/Customers/:id","CustomersController.update");
Route.delete("/Customers/:id","CustomersController.destroy");

Route.get("/Drivers","DriversController.index");
Route.post("/Drivers","DriversController.store");
Route.get("/Drivers/:id","DriversController.show");
Route.put("/Drivers/:id","DriversController.update");
Route.delete("/Drivers/:id","DriversController.destroy");

Route.get("/Memberships","MembershipsController.index");
Route.post("/Memberships","MembershipsController.store");
Route.get("/Memberships/:id","MembershipsController.show");
Route.put("/Memberships/:id","MembershipsController.update");
Route.delete("/Memberships/:id","MembershipsController.destroy");

Route.get("/Messages","MessagesController.index");
Route.post("/Messages","MessagesController.store");
Route.get("/Messages/:id","MessagesController.show");
Route.put("/Messages/:id","MessagesController.update");
Route.delete("/Messages/:id","MessagesController.destroy");

Route.get("/Plans","PlansController.index");
Route.post("/Plans","PlansController.store");
Route.get("/Plans/:id","PlansController.show");
Route.put("/Plans/:id","PlansController.update");
Route.delete("/Plans/:id","PlansController.destroy");

Route.get("/Services","ServicesController.index");
Route.post("/Services","ServicesController.store");
Route.get("/Services/:id","ServicesController.show");
Route.put("/Services/:id","ServicesController.update");
Route.delete("/Services/:id","ServicesController.destroy");

Route.get("/ServiceExecutions","ServiceExecutionsController.index");
Route.post("/ServiceExecutions","ServiceExecutionsController.store");
Route.get("/ServiceExecutions/:id","ServiceExecutionsController.show");
Route.put("/ServiceExecutions/:id","ServiceExecutionsController.update");
Route.delete("/ServiceExecutions/:id","ServiceExecutionsController.destroy");