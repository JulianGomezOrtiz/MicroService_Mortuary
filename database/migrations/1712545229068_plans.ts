import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "plans";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
      table.string("name");
      table.string("description");
      table.integer("number_of_beneficiaries");
      table.double("price");
      table.integer("discount");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
