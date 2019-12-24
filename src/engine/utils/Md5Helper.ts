

const md5 = require('md5');

export class Md5Helper {


    public static getMd5Str(str:string){
        return md5(str)
    }

    public static 
    getSimpleEncryptStr(str:string, key:string="jhao666"){
        return md5("{"+str+":"+key+"}")

    }

}
