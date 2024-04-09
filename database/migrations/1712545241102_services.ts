import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "services";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("id_customer").references("id_customer");
      table.string("id_room").references("id_room");
      table.string("id_driver").references("id_driver");
      table.string("body_ubication");
      table.boolean("need_trip");
      table.integer("status");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
