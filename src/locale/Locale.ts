export enum Locale_Language {
    zh = 0,
    en = 1,

}

export class Locale {
    public static nowLanguage: number = Locale_Language.zh;

    public static config: Map<string, Array<string>> = new Map<string, Array<string>>()
        .set("title1", ["在线图片压缩", "online picture compress"])
        .set("logo1", ["jpg,png,gif转换为webp", "jpg,png,gif convert to webp"])

    public static getLocaleDesc(key: string = "title1") {
        let arr = this.config.get(key)
        if(arr){
            return arr[Locale.nowLanguage]
        }
    }

}