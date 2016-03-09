'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bemModifierClassName = bemModifierClassName;
exports.bemElement = bemElement;
// TODO: which className to add modifier to? for now just add it to the first
// one
function bemModifierClassName(className, modifierName, isModified) {
  var delim = className ? '--' : '';

  var retStr = className || '';

  var nameToAppend = className && className.split(' ')[0];

  if (isModified) {
    retStr += ' ' + (nameToAppend || '') + delim + modifierName;
  }
  return retStr.trim();
}

function bemElement(blockName, elementName) {
  var delim = blockName ? '__' : '';

  var retStr = blockName || '';

  var nameToAppend = blockName && blockName.split(' ')[0];
  retStr += ' ' + (nameToAppend || '') + delim + elementName;
  return retStr.trim();
}