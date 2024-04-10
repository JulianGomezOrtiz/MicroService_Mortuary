import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'beneficiaries'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("customer_id").unsigned().references("customers.id").onDelete('CASCADE');
      table.integer("holder_id").unsigned().references("holders.id").onDelete('CASCADE');
      table.boolean("isprincipal_beneficiarie");
      table.boolean("isEmergyContact");
      table.integer("status");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
