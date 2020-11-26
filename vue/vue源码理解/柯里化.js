let tags = 'div,li,ul,p,span,ol';

function ifTab(){
    let set = {};
    //这个循环只会执行一遍
    tags.split(",").forEach(t=> {set[t]=true})
    return function (tagName) {
        return !!set[tagName.toLowerCase()]
    }
}

let isHtmlTag = ifTab()
console.log(isHtmlTag("div"))
console.log(isHtmlTag("div1"))