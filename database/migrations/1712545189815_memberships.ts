import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "memberships";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("name");
      table.string("plan_id").references("plan_id"); //duda respecto a las referencias de springboot
      table.string("customer_id").references("customer_id");
      table.date("Date");
      table.integer("status");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
