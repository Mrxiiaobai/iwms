/**
 * 
 * @param {*数据库名} db {name:xx,version:xx}
 * @param {*数据表结构} tables [{name:xx,primIndex:xx,indexs:[{name:xx,unique:false(普通索引)},{name:xx|xx,unique:true(复合索引)}]}]
 */
function initDB(db, tables, cb) {
  let request = indexedDB.open(`$${db.name}`,
    db.version
  );
  let self = this
  request.onupgradeneeded = function (event) {
    let db = event.target.result;
    for (let i = 0; i < tables.length; i++) {
      let objectStore = db.createObjectStore(`${tables[i].name}`, {
        keyPath: `${tables[i].primIndex}`
      });
      let indexs = tables[i].indexs
      for (let j = 0; j < indexs.length; j++) {
        let index = indexs[j]
        objectStore.createIndex(`${index.name}`, `${index.name}`, {
          unique: index.unique
        });
      }
    }
  };
  request.onsuccess = function (event) {
    self.db = request.result;
    cb && cb(event)
  };
  request.onerror = function (event) {
    cb && cb(event)
  };
  return {
    install(Vue) {
      Vue.prototype.$indexDB = {
        cat(...arg) {
          return cat.apply(self, arg)
        },
        mod(...arg) {
          return mod.apply(self, arg)
        },
        del(...arg) {
          return del.apply(self, arg)
        },
        clear(...arg) {
          return clear.apply(self, arg)
        },
        add(...arg) {
          return add.apply(self, arg)
        }
      }
    }
  }
}


/**
 * 
 * @param {*表名} table 
 * @param {*插入的数据数组} data 
 * @param {*回掉函数} cb
 */
function add(table, data, cb) {
  console.log('保存')
  var transaction = this.db.transaction([`${table}`], "readwrite");
  let objectStore = transaction.objectStore(`${table}`);
  for (let item of data) {
    objectStore.add(item);
  }
  // 当所有的数据都被增加到数据库时执行一些操作
  transaction.oncomplete = function (event) {
    console.log('保存成功')
    cb && cb(event)
  };
  transaction.onerror = function (event) {
    cb && cb(event)
  };
}
/**
 * 
 * @param {*表名} table 
 * @param {*自定义sql语句} sql 
 * @param {*查询成功的回掉函数} cb 
 */
function cat(table, sql, cb) {
  let transaction = this.db.transaction([`${table}`], "readwrite");
  //通过index的搜索方式存在很多种，这里提供自定义的搜索方式
  if (sql) {
    sql(transaction)
    return
  }
  let store = transaction.objectStore(`${table}`);
  //默认搜索全部
  let request = store.openCursor()
  let result = []
  request.onsuccess = function (e) {
    let cursor = e.target.result;
    if (cursor) {
      var item = cursor.value;
      result.push(item)
      cursor.continue();
    }
  }
  transaction.oncomplete = function (event) {
    cb && cb(event, result)
  };
  transaction.onerror = function (event) {
    cb && cb(event)
  };
}
/**
 * 
 * @param {表名} table 
 * @param {主键} primIndexs 
 * @param {回掉函数} cb
 */
function del(table, primIndexs, cb) {
  let transaction = this.db.transaction([`${table}`], "readwrite");
  let objectStore = transaction.objectStore(`${table}`)
  for (let i = 0; i < primIndexs.length; i++) {
    objectStore.delete(primIndexs[i])
  }
  transaction.oncomplete = function (event) {
    cb && cb(event)
  };
  transaction.onerror = function (event) {
    cb && cb(event)
  };
}

/**
 * 
 * @param {表名} table 
 * @param {回掉函数} cb 
 */
function clear(table, cb) {
  let transaction = this.db.transaction([`${table}`], "readwrite");
  let objectStore = transaction.objectStore(`${table}`)
  objectStore.clear()
  transaction.oncomplete = function (event) {
    cb && cb(event)
  };
  transaction.onerror = function (event) {
    cb && cb(event)
  };
}
/**
 * 
 * @param {表名} table 
 * @param {修改的数据} data 
 * @param {成功的回掉} cb 
 */
function mod(table, data, cb) {
  let transaction = this.db.transaction(`${table}`, 'readwrite');
  let store = transaction.objectStore(`${table}`);
  store.put(data);
  transaction.oncomplete = function (event) {
    cb && cb(event)
  };
  transaction.onerror = function (event) {
    cb && cb(event)
  };
}

export default {
  db: null,
  initDB,
}
