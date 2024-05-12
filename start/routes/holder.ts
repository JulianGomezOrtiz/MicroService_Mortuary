import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Holders", "HoldersController.find");
  Route.post("/Holders", "HoldersController.create");
  Route.get("/Holders/:id", "HoldersController.find");
  Route.put("/Holders/:id", "HoldersController.update");
  Route.delete("/Holders/:id", "HoldersController.delete");
}); //.middleware(["security"])
