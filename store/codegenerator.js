// actions
export const actions = {
  // insert your actions here
   encrypt({},text,){
    const key = "referreeeed"
    return [...text].map((x, i) => 
    (x.codePointAt() ^ key.charCodeAt(i % key.length) % 255)
     .toString(16)
     .padStart(2,"0")
   ).join('')
},
 decrypt({},text){
    const key = "referreeeed"
    return String.fromCharCode(...text.match(/.{1,2}/g)
     .map((e,i) => 
       parseInt(e, 16) ^ key.charCodeAt(i % key.length) % 255)
     )
}
}

