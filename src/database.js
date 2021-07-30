import SQLite from "react-native-sqlite-storage";

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "Masscon.db";
const database_version = "1.0";
const database_displayname = "Masscon";
const database_size = 200000;
let db;

export const initDB = () => {
  return new Promise((resolve) => {
    SQLite.echoTest()
      .then(() => {
        SQLite.openDatabase(
          database_name,
          database_version,
          database_displayname,
          database_size
        )
          .then(DB => {
            db = DB;
            console.log("Database OPEN");
            resolve(db);
          })
          .catch(error => {
          });
      })
      .catch(error => {
        console.log(error)
      });
  });
};

export const closeDatabase = (db) => {
  if (db) {
    console.log("Closing DB");
    db.close()
      .then(status => {
        console.log("Database CLOSED");
      })
      .catch(error => {
        this.errorCB(error);
      });
  } else {
    console.log("Database was not OPENED");
  }
};

export const MasconSiteData = (response) => {
  console.log("responsedataa",response)
  return new Promise((resolve) => {
    // initDB().then((db) => {
    db.transaction(tx => {
      tx.executeSql('drop table if exists masscon_type',
        [],
        () => { },
        () => { }
      );
    });
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS masscon_type ( id integer primary key not null, isCompleted integer,  siteName VARCHAR,  description VARCHAR, siteV VARCHAR ,manager VARCHAR ,staff VARCHAR , auditformId VARCHAR , form VARCHAR , incidentform VARCHAR , training VARCHAR , induction VARCHAR, staffid VARCHAR )');
    }).then(() => {
      console.log("Table created successfully");
    }).catch(error => {
      console.log("table craeet err", error);
    });
    db.transaction((tx) => {
      for (let item of response) {
        tx.executeSql(`INSERT INTO masscon_type ( "isCompleted", "siteName", "description","siteV","manager","staff" , "auditformId","form","incidentform" , "training" ,"induction" ) VALUES (?, ?, ?, ?, ? , ?, ?, ?, ?, ?, ? , ?)`, 
        [item.isCompleted, item.siteName,item.description, item.__v , 
          JSON.stringify(item.manager), JSON.stringify(item.staff), 
          JSON.stringify(item.auditformId), JSON.stringify(item.form), JSON.stringify(item.incidentform), JSON.stringify(item.training), JSON.stringify(item.induction),]).then(([tx, results]) => {
          resolve(results);
        });
      }
    }).then((result) => {
       console.log('result',result)
    }).catch((err) => {
       console.log('result err', err);
    });
    // }).catch((err) => {
    //   // console.log('final err',err);
    // });
  }); 
}

export const massconSiteList = () => {
  return new Promise((resolve) => {
    const siteList = [];
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM masscon_type', []).then(([tx, results]) => {
        var len = results.rows.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            const { id,  } = row;
            siteList.push({
              id,
              
            });
          }
          resolve(siteList);
        }
      });
    }).then((result) => {
      // console.log('res',result)
    }).catch((err) => {
      // console.log('result err', err);
    });
  })
}

export const newSessionCreate = (item) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS new_session (id integer primary key not null, session_id VARCHAR, animal_type VARCHAR, company_name VARCHAR, complex_name VARCHAR, selected_observation_type VARCHAR, created_date VARCHAR, animal_type_id VARCHAR, company_id VARCHAR, farmId VARCHAR, prefer_metric VARCHAR, target_weight VARCHAR)');
    }).then(() => {
      // console.log("Table created successfully");
    }).catch(error => {
      console.log("table craeet err", error);
    });
    db.transaction((tx) => {
      tx.executeSql(`INSERT INTO new_session ("session_id", "animal_type", "company_name", "complex_name", "selected_observation_type", "created_date", "animal_type_id", "company_id", "farmId", "prefer_metric", "target_weight") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [item.session_id, item.animal_type, item.company_name, item.complex_name, item.selected_observation_type, item.created_date, item.animal_type_id, item.company_id, item.farmId, item.prefer_metric, item.target_weight]).then(([tx, results]) => {
        resolve(results);
      });
    }).then((result) => {
      resolve(result);
      // console.log('res',result)
    }).catch((err) => {
      // console.log('result err', err);
      resolve(err);
    });
  });
}

export const updateTreatment = (item) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('UPDATE new_treatment SET session_id = ?, farm_id = ?, house_id = ?, feed_phase_id = ?, treatment_type_id = ?, treatment_id = ?, begin_day = ?, end_day = ? WHERE treatment_application_id = ?', [item.session_id, item.farm_id, item.house_id, item.feed_phase_id, item.treatment_type_id, item.treatment_id, item.begin_day, item.end_day, item.treatment_application_id]).then(([tx, results]) => {
        resolve(results);
      });
    }).then((result) => {
      resolve(result);
      // console.log('res',result)
    }).catch((err) => {
      resolve(err);
      // console.log('result err', err);
    });
  });
}

export const deleteTreatment = (id) => {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM new_treatment WHERE treatment_application_id = ?', [id]).then(([tx, results]) => {
        resolve(results);
      });
    }).then((result) => {
      resolve(result);
      // console.log('res',result)
    }).catch((err) => {
      resolve(err);
      // console.log('result err', err);
    });
  });
}
