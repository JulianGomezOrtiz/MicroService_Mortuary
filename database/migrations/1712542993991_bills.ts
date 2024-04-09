import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "bills";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("user_id").unsigned().references("user_id");
      table
        .string("payment_method_id")
        .unsigned()
        .references("payment_method_id");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
