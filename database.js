'use strict'

class SimpleCrudDB {
    // store your records here
    inMemoryDatabase = []

    // import this and begin to use it
    fs = require("fs")

    constructor(aFileName) {
        this.fileName = aFileName;
        // this is the filename you will save to add code below to create that file, or
        // open it when this class is instantiated, ie: your program start, it loads
        // the database from the file, into the this.inMemoryDatabase
    }

    Create(username, password) {
        // add code to store a record in your database
        // return true if success, false if not
    }

    Read(username) {
        // add code to read record from database
        // return undefined if no record exists, otherwise, return the record
    }

    Update(username, newRecordData) {
        // add code to update a record in the database
        // return true if success, false if not
    }

    Delete(username) {
        // add code to delete a user in the database
        // return true if success, false if not
    }

    flushDB() {
        // flush the inmemoryDatabase to disk (ie: save the database to disk)
    }

    reloadDB() {
        // reload the database from disk
    }
}

let db = new SimpleCrudDB('./db.json')