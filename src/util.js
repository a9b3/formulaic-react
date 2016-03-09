// TODO: which className to add modifier to? for now just add it to the first
// one
export function bemModifierClassName(className, modifierName, isModified) {
  const delim = (className) ? '--' : ''

  let retStr = className || ''

  const nameToAppend = className && className.split(' ')[0]

  if (isModified) {
    retStr += ' ' + (nameToAppend || '') + delim + modifierName
  }
  return retStr.trim()
}

export function bemElement(blockName, elementName) {
  const delim = (blockName) ? '__' : ''

  let retStr = blockName || ''

  const nameToAppend = blockName && blockName.split(' ')[0]
  retStr += ' ' + (nameToAppend || '') + delim + elementName
  return retStr.trim()
}
