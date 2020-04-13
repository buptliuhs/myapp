const records = [
  {id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [{value: 'jack@example.com'}]},
  {id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [{value: 'jill@example.com'}]}
];

export function findByUsername(username: string, cb: (error: any, user?: any) => void) {
  process.nextTick(function () {
    for (const record of records) {
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
