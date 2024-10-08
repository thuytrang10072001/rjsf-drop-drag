const UrlHelper = {
    encodeHTML: (str) =>{
        return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    },
    decodeHTML: (str) => {
        return str.replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&");
    },
    bindString: (str) =>{
        return str.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/\s+/g, '-');
    },
    bindUrlKey: (title, url_key) => {
        let url = '';
        if(url_key){
            url = UrlHelper.encodeHTML(url_key)
            url = UrlHelper.bindString(url);
        }else{
            url = UrlHelper.encodeHTML(title)
            url = UrlHelper.bindString(url);
        }
        return url;
    }
}

export default  UrlHelper