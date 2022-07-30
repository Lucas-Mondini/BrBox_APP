import psycopg2

class Database:
    host = '127.0.0.1'
    database = 'BRBOX'
    user = 'postgres'
    password = 'BBox@123'

    def __init__(self, host, database, user, password):
        self.host = host
        self.database = database
        self.user = user
        self.password = password

    def __init__(self):
        self.host = '127.0.0.1'
        self.database = 'BRBOX'
        self.user = 'postgres'
        self.password = 'BBox@123'

    def execute_sql(self, sql):
        connection = psycopg2.connect(host=self.host,
                                      database=self.database,
                                      user=self.user,
                                      password=self.password)
        cur = connection.cursor()
        cur.execute(sql)
        colnames = [desc[0] for desc in cur.description]
        colnames = tuple(colnames)
        result = cur.fetchall()
        cur.close()
        connection.close()
        return result, colnames