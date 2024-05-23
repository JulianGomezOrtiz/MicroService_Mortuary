import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Messages", "MessagesController.find");
  Route.post("/Messages", "MessagesController.create");
  Route.get("/Messages/:id", "MessagesController.find");
  Route.put("/Messages/:id", "MessagesController.update");
  Route.delete("/Messages/:id", "MessagesController.delete");
}); //.middleware...
