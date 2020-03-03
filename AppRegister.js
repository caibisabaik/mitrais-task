var PgAPI = require('./PgRegister');

class AppRegister {
    constructor(config) {
        this.config = config;
        this.pgApi = null;
    }

    async init(config){
        this.destroy();
        this.pgApi = await PgAPI.create(config.sql);
        if(this.pgApi !== null && this.pgApi !== undefined) {
            return(this);
        } else {
            return(null);
        }
    }

    destroy(){
        if(this.pgApi !== null) {
            this.pgApi.destroy();
            this.pgApi = null;
        }
    }

    static create(config){
        let instance = new AppRegister(config);
        return instance.init(config);
    }

    registerUser(arg) {
        return new Promise (resolve => {
            this.pgApi.registerUser(arg).then(res => {
                resolve(res);
            }).catch(e => {
                resolve(e);
            });
        });
    }

    validPhoneNumber(arg) {
        return new Promise (resolve => {
            this.pgApi.validPhoneNumber(arg).then(res => {
                resolve(res);
            }).catch(e => {
                resolve(e);
            });
        });
    }

    validEmail(arg) {
        return new Promise (resolve => {
            this.pgApi.validEmail(arg).then(res => {
                resolve(res);
            }).catch(e => {
                resolve(e);
            });
        });
    }
}

module.exports = AppRegister;