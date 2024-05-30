import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Administrators", "AdministratorsController.find");
  Route.post("/Administrators", "AdministratorsController.create");
  Route.get("/Administrators/:id", "AdministratorsController.findOne");
  Route.put("/Administrators/:id", "AdministratorsController.update");
  Route.delete("/Administrators/:id", "AdministratorsController.delete");
}); //.middleware(["security"])
