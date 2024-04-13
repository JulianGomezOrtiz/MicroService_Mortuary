import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "comment_and_ratings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("service_execution_id").unsigned().references("service_executions.id").onDelete('CASCADE');
      table.integer("customer_id").unsigned().references("customers.id").onDelete('CASCADE'); //duda dos ID para el mismo elemento?
      table.string("description");
      table.integer("rating");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
