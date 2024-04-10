import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "service_executions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("service_id").unsigned().references("services.id").onDelete('CASCADE');
      table.integer("customer_id").unsigned().references("customers.id").onDelete('CASCADE');
      table.integer("driver_id").unsigned().references("drivers.id").onDelete('CASCADE');
      table.integer("room_id").unsigned().references("rooms.id").onDelete('CASCADE');
      table.string("main_office");
      table.string("location");
      table.integer("status");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
