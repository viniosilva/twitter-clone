import { mongodbConfig } from '../../AppConfig';
import MongoDB from './MongoDB';

export default new MongoDB(mongodbConfig.url, mongodbConfig.dbName);
