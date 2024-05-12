import Route from "@ioc:Adonis/Core/Route";
Route.group(() => {
  Route.get("/Beneficiaries", "BeneficiariesController.find");
  Route.post("/Beneficiaries", "BeneficiariesController.create");
  Route.get("/Beneficiaries/:id", "BeneficiariesController.find");
  Route.put("/Beneficiaries/:id", "BeneficiariesController.update");
  Route.delete("/Beneficiaries/:id", "BeneficiariesController.delete");
}); //.middleware(["security"])
