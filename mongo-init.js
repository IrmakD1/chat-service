/* eslint-disable */
db.auth('admin', 'pass')

db = db.getSiblingDB('chat-data')

db.createUser({
  user: 'admin',
  pwd: 'pass',
  roles: [
    {
      role: 'root',
      db: 'admin',
    },
  ],
});