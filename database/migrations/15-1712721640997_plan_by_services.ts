import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'plan_by_services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("plan_id").unsigned().references("plans.id").onDelete('CASCADE');
      table.integer("service_id").unsigned().references("services.id").onDelete('CASCADE');
      table.timestamp("date");
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
