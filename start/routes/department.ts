import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Departments", "DepartmentsController.find");
  Route.post("/Departments", "DepartmentsController.create");
  Route.get("/Departments/:id", "DepartmentsController.find");
  Route.put("/Departments/:id", "DepartmentsController.update");
  Route.delete("/Departments/:id", "DepartmentsController.delete");
}); 
