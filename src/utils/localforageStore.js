import localforage from 'localforage'

const store = localforage.createInstance({
  // driver      : localforage.WEBSQL,
  // Force WebSQL; same as using setDriver()
  name: 'shop_v1',
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  // version: 1.0,
  // size        : 4980736,
  // Size of database, in bytes. WebSQL-only for now.
  storeName: 'key_value_pairs',
  // Should be alphanumeric, with underscores.
  description: 'shop_app'
})

store.getItemByArray = arr => {
  return store.getItem(arr.join('_'))
}

store.setItemByArray = (arr, data) => {
  return store.setItem(arr.join('_'), data)
}

store.removeItemByArray = arr => {
  return store.removeItem(arr.join('_'))
}

// localforage.config({
//   // driver      : localforage.WEBSQL,
//   // Force WebSQL; same as using setDriver()
//   name: 'fdApp',
//   version: 1.0,
//   // size        : 4980736,
//   // Size of database, in bytes. WebSQL-only for now.
//   storeName: 'keyvaluepairs',
//   // Should be alphanumeric, with underscores.
//   description: 'fdapp store'
// });

export default store
