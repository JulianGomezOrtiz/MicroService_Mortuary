import Env from '@ioc:Adonis/Core/Env'
import type { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: Env.get('MYSQL_HOST'),
        port: Env.get('MYSQL_PORT'),
        user: Env.get('MYSQL_USER'),
        password: Env.get('MYSQL_PASSWORD', ''),
        database: Env.get('MYSQL_DB_NAME'),
        ssl: {
          rejectUnauthorized: true,
          ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUKmIBsJg7HFnInel/XFUAA+AIe9kwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMDJjNzM3NzctYzM5OC00ODQ0LTk1YzQtNTU4OTBlNTJl
YTBmIFByb2plY3QgQ0EwHhcNMjQwNTA2MTYwNzQ0WhcNMzQwNTA0MTYwNzQ0WjA6
MTgwNgYDVQQDDC8wMmM3Mzc3Ny1jMzk4LTQ4NDQtOTVjNC01NTg5MGU1MmVhMGYg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOYINBVB
zr7YCn2QvKxvGq4mBSRZiCqNiJ/zxBjio9zyIGNEMcot1y/CZCTbMmsu1Segg/Ii
cSaisTj/pK45IO2k/ViaRst+NvLQ4viyrprXhMxCHfchxWQWCiHPeTk3/j6DkmC4
J30C+Igtg7Bu5WXGOtEP1hXs/FZ8ohJgCZqcllGij1exjfZbPzadrUXvxJGQva9/
ONZFsK9alsxsz+5D0sptns2nRfJXar7CWUk5Be5DlkCNXAM9SNTAFvjKJYEFo0zd
QCFgYmVuGY7QjdxbtT1CK1PVWSvZC2I04W2nuFkqKet/ew10A8kUQX1VJvHEM+D6
uTIySz9yICNMhCDSS0OH2wj5Ija4XpyioU9DqNubF0O+6etyDhEClN1Oytxzd9BU
S5+kqs88m9Gy5OrVaUtLwsiggq/FUZ8HXiA8yJ+W6ssOJTmlPSQz9XX6SjXVe4Pv
J4CKXfL7WZIn/0wRk7L2GwLqR/f0IuAhw2kg8SrcHONw/Y1VmgCJicRmtQIDAQAB
oz8wPTAdBgNVHQ4EFgQUw6UgEla6dYzDmi4Nvuxm0gkVw/AwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAEmgvHBE51IRLiLr
2xrkowJUav/ur0ehB/ooYPB0jvy8161vClyqEon2fbjJYKZ7KjKdaDuxf8dxukhm
XEP1CskpXuOTkfZSQB8/SpnaNcfLPm6xLFHMG49rCHm/87gKmvLYX6qOxGsew6zG
j4wgavcW5KScbtlmcecn8zs38MJxjWZ9TUiECMjVaZdkCMRBIfS8DZnQhFP44Yx2
zWT6zfc5bJTckRZ1tYdTML4EZt0jH7kC0Nyq9tcoIrbEo6WXChh1QZj64yH9vDmS
dJfIWfAymR/oRq11e1s2mGmK+KKpx6U1wa2jalIOTmtKs3QZE5rpayIPozJdLbux
fRZT2ak0RNznE+gfPD6pmJBW+K/RQbXW630A8Uee0NR9aoNBY0nlitLJWrvRgIoQ
HwJlB3glEnWJVa4bLu2p2VtgMgPX2T5VnUegX32JJx55/Lnrk1SKdbqb3Ewl5fFN
oPkaM/aTdiL9X0zXEtlOkjJgwFkkB2iu9SMkQRA5fVZK7pSIug==
-----END CERTIFICATE-----`,
        },
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  }
}

export default databaseConfig
