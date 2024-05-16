import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Camaras", "CamarasController.find");
  Route.post("/Camaras", "CamarasController.create");
  Route.get("/Camaras/:id", "CamarasController.find");
  Route.put("/Camaras/:id", "CamarasController.update");
  Route.delete("/Camaras/:id", "CamarasController.delete");
}); //.middleware(["security"])
