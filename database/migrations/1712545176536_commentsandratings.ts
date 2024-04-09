import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "commentsandratings";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("id_service");
      table.string("sender_id"); //duda dos ID para el mismo elemento?
      table.string("description");
      table.integer("rating");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
