export enum Locale_Language {
    zh = 0,
    en = 1,

}

export class Locale {
    public static nowLanguage: number = Locale_Language.zh;

    public static config: Map<string, Array<string>> = new Map<string, Array<string>>()
        .set("title1", ["在线图片转换webp", "Convert to Webp"])
        .set("logo1", ["jpg,png,gif转换为webp", "jpg,png,gif convert to webp"])
        .set("tips1", ["从您的设备中选择最多", "max picture num is "])
        .set("tips2", ["张jpg,jpeg,png或者gif图片拖动到上传区，等待压缩完成。", ", support jpg,jpeg,gif"])
        .set("tips3", ["将文件拖到此处，或", "drag file to here or "])
        .set("tips4", ["点击上传", "click and upload"])
        .set("tips5", ["只能上传jpg,png,gif文件,一次最多上传", "only support jpg,png,gif, once upload "])
        .set("tips6", ["个", ""])
        .set("tips7", ["清空列表", "clear all list"])
        .set("tips8", ["喜欢吗？赶紧分享一次", "if love and share it. Thanks"])
        .set("tips9", ["服务器资源有限,所有上传的数据将在一小时后将被删除。", "all filess will be deleting after one hour"])
        .set("tips10", ["原大小", "original size"])
        .set("tips11", ["压缩后大小", "now size"])
        .set("download", ["下载", "download"])


    public static getLocaleDesc(key: string = "title1") {
        let arr = this.config.get(key)
        if(arr){
            return arr[Locale.nowLanguage]
        }
    }

}