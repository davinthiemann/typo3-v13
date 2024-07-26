/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
export class TreeNode{constructor(e,t){this.childNodes={},this.extPath="",this.parent=null,this.name=e,this.childNodes={},this.extPath="",this.value="",this.isExternal=!1,this.tsParser=t}getChildNodes(){const e=this.getExtNode();if(null!==e&&"object"==typeof e.c)for(const t of Object.keys(e.c)){const s=new TreeNode(t,this.tsParser);s.global=!0,s.value=e.c[t].v?e.c[t].v:"",s.isExternal=!0,this.childNodes[t]=s}return this.childNodes}getValue(){if(this.value)return this.value;const e=this.getExtNode();if(e&&e.v)return e.v;const t=this.getNodeTypeFromTsref();return t||""}getNodeTypeFromTsref(){const e=this.extPath.split(".").pop(),t=this.parent.getValue();if(t&&this.tsParser.tsRef.typeHasProperty(t,e)){return this.tsParser.tsRef.getType(t).properties[e].value}return""}getExtNode(){let e=this.tsParser.extTsObjTree;if(""===this.extPath)return e;const t=this.extPath.split(".");for(let s=0;s<t.length;s++){const l=t[s];if(void 0===e.c||void 0===e.c[l])return null;e=e.c[l]}return e}}class Stack extends Array{lastElementEquals(e){return this.length>0&&this[this.length-1]===e}popIfLastElementEquals(e){return!!this.lastElementEquals(e)&&(this.pop(),!0)}}export class TsParser{constructor(e,t){this.tsRef=e,this.extTsObjTree=t,this.tsTree=new TreeNode("_L_",this)}getOperator(e){const t=[":=","=<","<",">","="];for(let s=0;s<t.length;s++){const l=t[s];if(-1!==e.indexOf(l))return("=<"===l||"<"===l)&&e.indexOf(">")>-1?"=":l}return-1}buildTsObjTree(e){this.tsTree=new TreeNode("",this),this.tsTree.value="TLO";let t=1,s="",l=!1,r=!1;const n=new Stack,i=[];let a;for(;t<=e.currentLineNumber;){s="";const h=e.lineTokens[t-1];for(let e=0;e<=h.length;++e)if(e<h.length&&h[e].string.length>0){const t=h[e].string;if(t.startsWith("#")?n.push("#"):"("===t?n.push("("):t.startsWith("/*")?n.push("/*"):"{"===t&&-1===this.getOperator(s)&&(n.push("{"),i.push(s.trim()),l=!0),-1===t.search(/^\s*\[.*\]/)||-1!==s.search(/\S/)||-1!==t.search(/^\s*\[(global|end|GLOBAL|END)\]/)||n.lastElementEquals("#")||n.lastElementEquals("/*")||n.lastElementEquals("{")||n.lastElementEquals("(")||(r=!0,l=!0),-1!==s.search(/\S/)||n.lastElementEquals("#")||n.lastElementEquals("/*")||n.lastElementEquals("(")||(-1===t.search(/^\s*\[(global|end|GLOBAL|END)\]/)||n.lastElementEquals("{"))&&-1===t.search(/^\s*\[(global|GLOBAL)\]/)||(r=!1,l=!0),")"===t&&n.popIfLastElementEquals("("),t.startsWith("*/")&&(n.popIfLastElementEquals("/*"),l=!0),"}"===t){""===s.replace(/\s/g,"")&&(n.popIfLastElementEquals("{"),i.length>0&&i.pop(),l=!0)}n.lastElementEquals("#")||(s+=t)}else{if(!(n.lastElementEquals("/*")||n.lastElementEquals("(")||l||r)){s=s.trim();const e=this.getOperator(s);if(-1!==e){const t=s.indexOf(e);a=s.substring(0,t),i.length>0&&(a=i.join(".")+"."+a);let l=s.substring(t+e.length,s.length).trim();switch(a=a.trim(),e){case"=":-1===a.search(/\s/g)&&a.length>0&&this.setTreeNodeValue(a,l);break;case"=<":i.length>0&&"."===l.substr(0,1)&&(l=i.join(".")+l),-1===a.search(/\s/g)&&a.length>0&&-1===l.search(/\s/g)&&l.length>0&&this.setReference(a,l);break;case"<":i.length>0&&"."===l.substr(0,1)&&(l=i.join(".")+l),-1===a.search(/\s/g)&&a.length>0&&-1===l.search(/\s/g)&&l.length>0&&this.setCopy(a,l);break;case">":this.deleteTreeNodeValue(a)}}}n.popIfLastElementEquals("#"),l=!1}t++}if(!n.lastElementEquals("/*")&&!n.lastElementEquals("(")&&!l){const e=s.indexOf("<");-1!==e?(a=s.substring(e+1,s.length).trim(),i.length>0&&"."===a.substr(0,1)&&(a=i.join(".")+a)):(a=s,i.length>0&&(a=i.join(".")+"."+a,a=a.replace(/\s/g,"")));const t=a.lastIndexOf(".");a=a.substring(0,t)}return this.getTreeNode(a)}getTreeNode(e){if(0===(e=e.trim()).length)return this.tsTree;const t=e.split(".");let s,l=this.tsTree.childNodes,r=this.tsTree;for(let e=0;e<t.length;e++){if(s=t[e],void 0===l[s]||void 0===l[s].childNodes){l[s]=new TreeNode(s,this),l[s].parent=r;let e=r.extPath;e&&(e+="."),e+=s,l[s].extPath=e}if(e===t.length-1)return l[s];r=l[s],l=l[s].childNodes}}setTreeNodeValue(e,t){const s=this.getTreeNode(e);null!==s.parent&&"GIFBUILDER"===s.parent.value&&"TEXT"===t&&(t="GB_TEXT"),null!==s.parent&&"GIFBUILDER"===s.parent.value&&"IMAGE"===t&&(t="GB_IMAGE"),this.tsRef.isType(t)&&(s.value=t)}deleteTreeNodeValue(e){const t=this.getTreeNode(e);t.value=null,t.childNodes={}}setReference(e,t){const s=e.split("."),l=s[s.length-1],r=this.getTreeNode(e),n=this.getTreeNode(t);null!==r.parent?r.parent.childNodes[l]=n:this.tsTree.childNodes[l]=n}setCopy(e,t){this.clone=e=>{if("object"!=typeof e)return e;const t={};for(const s in e)"tsParser"!==s&&("parent"!==s?"object"==typeof e[s]?t[s]=this.clone(e[s]):t[s]=e[s]:"parent"in e&&(t.parent=e.parent));return t};const s=e.split("."),l=s[s.length-1],r=this.getTreeNode(e),n=this.getTreeNode(t);null!==r.parent?r.parent.childNodes[l]=this.clone(n):this.tsTree.childNodes[l]=this.clone(n)}}