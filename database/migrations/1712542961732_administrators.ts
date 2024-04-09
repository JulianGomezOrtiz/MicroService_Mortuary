import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "administrators";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("main_office");
      table.string("responsabilities");
      table.integer("status");
      table.integer("user_id").unsigned().references("user_id");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
