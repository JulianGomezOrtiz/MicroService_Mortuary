import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Customers", "CustomersController.find");
  Route.post("/Customers", "CustomersController.create");
  Route.get("/Customers/:id", "CustomersController.findOne");
  Route.put("/Customers/:id", "CustomersController.update");
  Route.delete("/Customers/:id", "CustomersController.delete");
}); //.middleware(["security"])
