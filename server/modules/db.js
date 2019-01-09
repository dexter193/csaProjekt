/**
 * sqlite db handler
 */
const sqlite = require('sqlite3').verbose();

/**
 * promise-based DB wrapper class
 */
class DB {

    /**
     * open db connection
     * @param db_file
     */
    constructor(db_file = './db.sqlite3') {
        this.db = new sqlite.Database(db_file);
        this.db.exec('PRAGMA foreign_keys = ON');
    }

    /**
     * creates new default tables, if they don't already exist
     *
     * @returns {Promise<any>}
     */
    create() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(`CREATE TABLE IF NOT EXISTS questions
          (
            id integer PRIMARY KEY,
            question_content VARCHAR NOT NULL,
            a varchar NOT NULL,
            b varchar NOT NULL,
            c varchar NOT NULL,
            d varchar NOT NULL,
            category VARCHAR NOT NULL
          ) WITHOUT ROWID`, err => {
                    if (err !== null) reject(err);
                });
                this.db.run(`CREATE TABLE IF NOT EXISTS answers
          (
          id integer PRIMARY KEY,
          correct_answer VARCHAR NOT NULL,
          FOREIGN KEY (id) REFERENCES questions(id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
          ) WITHOUT ROWID`, err => {
                    if (err !== null) reject(err);
                });

                this.db.run(`CREATE TABLE IF NOT EXISTS users
          (
          name VARCHAR PRIMARY KEY,
          password VARCHAR NOT NULL
          ) WITHOUT ROWID`, err => {
                    if(err !== null) reject(err);
                });

                this.db.run(`CREATE TABLE IF NOT EXISTS statistics
                (
                username VARCHAR PRIMARY KEY,
                correct_answers INTEGER,
                category VARCHAR,
                games_played INTEGER,
                FOREIGN KEY (username) REFERENCES users(name)
                ON UPDATE CASCADE
                ON DELETE CASCADE
                ) WITHOUT ROWID`, err => {
                    if(err!== null) reject(err);
                });

                resolve();
            });
        });
    }

    /**
     * remove tables
     * @returns {Promise<any>}
     */
    cleanup() {
        return new Promise((resolve, reject) => {
            this.db.serialize(() => {
                this.db.run(`DROP TABLE IF EXISTS users`);
                this.db.run(`DROP TABLE IF EXISTS questions`);
                this.db.run(`DROP TABLE IF EXISTS answers`);
                this.db.run(`DROP TABLE IF EXISTS statistics`);
                this.create().then(() => resolve());
            });
        });
    }


    /**
     * run sql command
     * @param sql
     * @param params
     * @returns {Promise<any>}
     */
    cmd(sql = '', params) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err !== null) reject(err);
                if (this !== undefined) resolve(this);
            });
        });
    }


    /**
     * gets an object by SQL statement
     * @param sql
     * @param params
     * @returns {Promise<any>}
     */
    get_row(sql = '', params) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }


    /**
     * gets an array of objects by SQL statement
     * @param sql
     * @param params
     * @returns {Promise<any>}
     */
    get_rows(sql = '', params) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err !== null) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }


    /**
     * creates random initial data
     * @returns {Promise<any>}
     */
    skeleton() {
        return new Promise((resolve, reject) => {
            this.cleanup().then(() => {
                this.db.serialize(() => {
                    console.log('Create skeleton');
                    this.db.run('INSERT INTO questions (id, question_content, a, b, c, d, category) VALUES (1, "was ergibt 1+1?","fünfundzwanzig","30","2","3","mathematik")');
                    this.db.run('INSERT INTO questions (id, question_content, a, b, c, d, category) VALUES (2, "wie alt ist david?","fünfundzwanzig","zu alt","23","18","dummes wissen")');
                    this.db.run('INSERT INTO questions (id, question_content, a, b, c, d, category) VALUES (3, "wie viel baeume gibt es auf der welt?","echt viele","keine mehr wenn wir so weitermachen","keine ahnung","42","natur")');

                    this.db.run('INSERT INTO answers(id, correct_answer) VALUES(1, "c")');
                    this.db.run('INSERT INTO answers(id, correct_answer) VALUES(2, "a")');
                    this.db.run('INSERT INTO answers(id, correct_answer) VALUES(3, "b")');

                    this.db.run('INSERT INTO users(name, password) VALUES("Peter Pan", "nimmerland")');

                    this.db.run('INSERT INTO statistics(username, correct_answers,category,games_played) VALUES ("Peter Pan", 2, "","")');

                    // const stmt = this.db.prepare('INSERT INTO users (id, groups_id, name) VALUES (?, ?, ?)');
                    //
                    // for (let i = 1; i < 10; i++) {
                    //     stmt.run(i, Math.floor((Math.random() * 3) + 1), 'Foo' + (i * i));
                    // }

                    //stmt.finalize();
                    resolve();
                });
            }).catch(err => reject(err));
        });
    }
}

/**
 * exports DB class
 * @type {DB}
 */
module.exports = DB;
