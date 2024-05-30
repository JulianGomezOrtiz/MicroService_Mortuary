import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Transmisions", "TransmisionsController.find");
  Route.post("/Transmisions", "TransmisionsController.create");
  Route.get("/Transmisions/:id", "TransmisionsController.find");
  Route.put("/Transmisions/:id", "TransmisionsController.update");
  Route.delete("/Transmisions/:id", "TransmisionsController.delete");
}); //.middleware(["security"])
