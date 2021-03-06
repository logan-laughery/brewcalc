const xmlToJson = xml => {
  var result = {}
  if (xml.childNodes == null || xml.childNodes.length === 0) {
    result = ''
  } else if (
    xml.childNodes.length === 1 &&
    xml.childNodes.item(0).nodeType === 3
  ) {
    result = xml.childNodes.item(0).textContent
  } else {
    xml.childNodes.forEach(item => {
      if (item.nodeType !== 3) {
        if (result[item.nodeName] === undefined) {
          result[item.nodeName] = xmlToJson(item)
        } else {
          if (!Array.isArray(result[item.nodeName])) {
            const value = result[item.nodeName]
            result[item.nodeName] = [value]
          }
          result[item.nodeName].push(xmlToJson(item))
        }
      }
    })
  }
  return result
}

module.exports = xmlToJson
