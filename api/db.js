const { MongoClient, ObjectId } = require('mongodb');

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || 'cloud_storage';

let cachedClientPromise;
const localMemoryStore = {
  files: []
};

function createMemoryCollection(store, collectionName) {
  if (!store[collectionName]) {
    store[collectionName] = [];
  }

  const collectionData = store[collectionName];

  return {
    async insertOne(document) {
      const _id = new ObjectId();
      const storedDoc = { ...document, _id };
      collectionData.push(storedDoc);
      return { insertedId: _id };
    },

    async countDocuments() {
      return collectionData.length;
    },

    async deleteOne(filter) {
      const index = collectionData.findIndex(doc => String(doc._id) === String(filter._id));

      if (index === -1) {
        return { deletedCount: 0 };
      }

      collectionData.splice(index, 1);
      return { deletedCount: 1 };
    },

    find(_query = {}, options = {}) {
      let data = [...collectionData];

      if (options.projection) {
        data = data.map(doc => {
          const projected = {};
          Object.keys(options.projection).forEach(key => {
            if (options.projection[key]) {
              projected[key] = doc[key];
            }
          });

          projected._id = doc._id;
          return projected;
        });
      }

      return {
        sort(sortSpec = {}) {
          const sortEntries = Object.entries(sortSpec);
          if (!sortEntries.length) {
            return this;
          }

          data.sort((a, b) => {
            for (const [key, direction] of sortEntries) {
              const left = key === '_id' ? String(a[key]) : a[key];
              const right = key === '_id' ? String(b[key]) : b[key];

              if (left === right) {
                continue;
              }

              const result = left > right ? 1 : -1;
              return direction < 0 ? -result : result;
            }

            return 0;
          });

          return this;
        },

        async toArray() {
          return data;
        }
      };
    }
  };
}

function createMemoryDB(store) {
  return {
    collection(collectionName) {
      return createMemoryCollection(store, collectionName);
    }
  };
}

async function connectDB() {
  if (!uri) {
    return createMemoryDB(localMemoryStore);
  }

  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
  }

  const client = await cachedClientPromise;
  return client.db(dbName);
}

module.exports = {
  connectDB
};
