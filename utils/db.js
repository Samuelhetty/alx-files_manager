import mongodb from 'mongodb';
const dotenv = require('dotenv');

dotenv.config();

/**
 * Represents a MongoDB client.
 */
class DBClient {
    /**
   * Creates a new DBClient instance.
    */
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const uri = `mongodb://${host}:${port}/${database}`;

        this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        this.client.connect();
        this.db = this.client.db(database);
    }

     /**
   * Checks if this client's connection to the MongoDB server is active.
   * @returns {boolean}
   */
    async isAlive() {
        try {
            await this.client.connect();
            await this.client.db().admin().ping();
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
   * Retrieves the number of users in the database.
   * @returns {Promise<Number>}
   */
    async nbUsers() {
        const usersCollection = this.db.collection('users');
        const count = await usersCollection.countDocuments();
        return count;
    }

    /**
   * Retrieves the number of files in the database.
   * @returns {Promise<Number>}
   */
    async nbFiles() {
        const filesCollection = this.db.collection('files');
        const count = await filesCollection.countDocuments();
        return count;
    }
}

const dbClient = new DBClient();

export default dbClient;