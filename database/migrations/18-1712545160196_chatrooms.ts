import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "chatrooms";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("service_execution_id")
        .unsigned()
        .references("service_executions.id");
      table.integer("holder_id").unsigned().references("holders.id");
      table.string("name");
      table.string("code");
      table.integer("status");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
