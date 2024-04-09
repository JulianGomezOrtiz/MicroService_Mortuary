import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "service_executions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("id_service").references("id_service");
      table.string("id_customer").references("id_customer");
      table.string("id_room").references("id_room");
      table.string("main_office").references("main_office");
      table.string("location");
      table.integer("status");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
