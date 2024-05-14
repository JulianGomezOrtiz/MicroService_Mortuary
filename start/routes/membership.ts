import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Memberships", "MembershipsController.find");
  Route.post("/Memberships", "MembershipsController.create");
  Route.get("/Memberships/:id", "MembershipsController.find");
  Route.put("/Memberships/:id", "MembershipsController.update");
  Route.delete("/Memberships/:id", "MembershipsController.delete");
}); //.middleware(["security"])
