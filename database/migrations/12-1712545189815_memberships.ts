import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "memberships";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("name");
      table.integer("plan_id").unsigned().references("plans.id").onDelete('CASCADE'); //duda respecto a las referencias de springboot
      table.integer("customer_id").unsigned().references("customers.id").onDelete('CASCADE');
      table.date("date");
      table.integer("status");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
