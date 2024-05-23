import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Rooms", "RoomsController.find");
  Route.post("/Rooms", "RoomsController.create");
  Route.get("/Rooms/:id", "RoomsController.find");
  Route.put("/Rooms/:id", "RoomsController.update");
  Route.delete("/Rooms/:id", "RoomsController.delete");
}); 
