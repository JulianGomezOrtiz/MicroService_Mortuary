import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "transmisions";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("fecha_inicio");
      table.timestamp("fecha_fin");
      table.integer("camara_id").unsigned().references("camaras.id");
      table
        .integer("service_execution_id")
        .unsigned()
        .references("service_executions.id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
