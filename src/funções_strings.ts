export const capitalize = (text: string) => {
   const words = text.split(' ')
 
   for (let i = 0; i < words.length; i++) {
     words[i] =
       words[i].substr(0, 1).toUpperCase() +
       words[i].substr(1).toLowerCase()
   }
 
   return words.join(' ')
      .replace(/ e /gi, ' e ')
      .replace(/ da /gi, ' da ')
      .replace(/ do /gi, ' do ')
}

export const trimAll = (text: string) => 
   text.trim().replace(/\s+/g, ' ')