export class FileSizeHelper {

    /**
     * 
     * @param value 单位字节
     */
    public static getPicSizeDesc(value: number):string {
        let nowKb:number = Math.floor(value/1024)
        if(nowKb >= 1024){
            return (nowKb/1024).toFixed(2)+"Mb"
        }else{

            return nowKb+"kb"
        }
    }


}
