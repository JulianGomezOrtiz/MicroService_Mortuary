import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Services", "ServicesController.find");
  Route.post("/Services", "ServicesController.create");
  Route.get("/Services/:id", "ServicesController.find");
  Route.put("/Services/:id", "ServicesController.update");
  Route.delete("/Services/:id", "ServicesController.delete");
}); //.middleware(["security"])
