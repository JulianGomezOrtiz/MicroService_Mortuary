import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/ChatRooms", "ChatRoomsController.find");
  Route.post("/ChatRooms", "ChatRoomsController.create");
  Route.get("/ChatRooms/:id", "ChatRoomsController.find");
  Route.put("/ChatRooms/:id", "ChatRoomsController.update");
  Route.delete("/ChatRooms/:id", "ChatRoomsController.delete");
}); 
