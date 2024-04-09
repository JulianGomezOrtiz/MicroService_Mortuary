import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "customers";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("user_id").references("user_id");
      table.string("plan_id").references("plan_id");
      table.integer("status");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
