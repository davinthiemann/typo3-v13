import{Command as e,Plugin as t,icons as n}from"@ckeditor/ckeditor5-core";import{Paragraph as o}from"@ckeditor/ckeditor5-paragraph";import{first as i,priorities as a,Collection as r}from"@ckeditor/ckeditor5-utils";import{ViewModel as s,createDropdown as d,addListToDropdown as c,MenuBarMenuView as l,MenuBarMenuListView as m,MenuBarMenuListItemView as h,MenuBarMenuListItemButtonView as g,ButtonView as u}from"@ckeditor/ckeditor5-ui";import{DowncastWriter as p,enablePlaceholder as f,hidePlaceholder as w,needsPlaceholder as b,showPlaceholder as v}from"@ckeditor/ckeditor5-engine";
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class k extends e{constructor(e,t){super(e),this.modelElements=t}refresh(){const e=i(this.editor.model.document.selection.getSelectedBlocks());this.value=!!e&&this.modelElements.includes(e.name)&&e.name,this.isEnabled=!!e&&this.modelElements.some((t=>x(e,t,this.editor.model.schema)))}execute(e){const t=this.editor.model,n=t.document,o=e.value;t.change((e=>{const i=Array.from(n.selection.getSelectedBlocks()).filter((e=>x(e,o,t.schema)));for(const t of i)t.is("element",o)||e.rename(t,o)}))}}function x(e,t,n){return n.checkChild(e.parent,t)&&!n.isObject(e)}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */const y="paragraph";class _ extends t{static get pluginName(){return"HeadingEditing"}constructor(e){super(e),e.config.define("heading",{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h2",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h3",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h4",title:"Heading 3",class:"ck-heading_heading3"}]})}static get requires(){return[o]}init(){const e=this.editor,t=e.config.get("heading.options"),n=[];for(const o of t)"paragraph"!==o.model&&(e.model.schema.register(o.model,{inheritAllFrom:"$block"}),e.conversion.elementToElement(o),n.push(o.model));this._addDefaultH1Conversion(e),e.commands.add("heading",new k(e,n))}afterInit(){const e=this.editor,t=e.commands.get("enter"),n=e.config.get("heading.options");t&&this.listenTo(t,"afterExecute",((t,o)=>{const i=e.model.document.selection.getFirstPosition().parent;n.some((e=>i.is("element",e.model)))&&!i.is("element",y)&&0===i.childCount&&o.writer.rename(i,y)}))}_addDefaultH1Conversion(e){e.conversion.for("upcast").elementToElement({model:"heading1",view:"h1",converterPriority:a.low+1})}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */function C(e){const t=e.t,n={Paragraph:t("Paragraph"),"Heading 1":t("Heading 1"),"Heading 2":t("Heading 2"),"Heading 3":t("Heading 3"),"Heading 4":t("Heading 4"),"Heading 5":t("Heading 5"),"Heading 6":t("Heading 6")};return e.config.get("heading.options").map((e=>{const t=n[e.title];return t&&t!=e.title&&(e.title=t),e}))}!function(e,{insertAt:t}={}){if("undefined"==typeof document)return;const n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("style");o.type="text/css",window.litNonce&&o.setAttribute("nonce",window.litNonce),"top"===t&&n.firstChild?n.insertBefore(o,n.firstChild):n.appendChild(o),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(document.createTextNode(e))}(".ck.ck-heading_heading1{font-size:20px}.ck.ck-heading_heading2{font-size:17px}.ck.ck-heading_heading3{font-size:14px}.ck[class*=ck-heading_heading]{font-weight:700}.ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__button .ck-button__label{width:8em}.ck.ck-dropdown.ck-heading-dropdown .ck-dropdown__panel .ck-list__item{min-width:18em}");
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class E extends t{static get pluginName(){return"HeadingUI"}init(){const e=this.editor,t=e.t,n=C(e),o=t("Choose heading"),i=t("Heading");e.ui.componentFactory.add("heading",(t=>{const a={},l=new r,m=e.commands.get("heading"),h=e.commands.get("paragraph"),g=[m];for(const e of n){const t={type:"button",model:new s({label:e.title,class:e.class,role:"menuitemradio",withText:!0})};"paragraph"===e.model?(t.model.bind("isOn").to(h,"value"),t.model.set("commandName","paragraph"),g.push(h)):(t.model.bind("isOn").to(m,"value",(t=>t===e.model)),t.model.set({commandName:"heading",commandValue:e.model})),l.add(t),a[e.model]=e.title}const u=d(t);return c(u,l,{ariaLabel:i,role:"menu"}),u.buttonView.set({ariaLabel:i,ariaLabelledBy:void 0,isOn:!1,withText:!0,tooltip:i}),u.extendTemplate({attributes:{class:["ck-heading-dropdown"]}}),u.bind("isEnabled").toMany(g,"isEnabled",((...e)=>e.some((e=>e)))),u.buttonView.bind("label").to(m,"value",h,"value",((e,t)=>{const n=t?"paragraph":e;return"boolean"==typeof n?o:a[n]?a[n]:o})),u.buttonView.bind("ariaLabel").to(m,"value",h,"value",((e,t)=>{const n=t?"paragraph":e;return"boolean"==typeof n?i:a[n]?`${a[n]}, ${i}`:i})),this.listenTo(u,"execute",(t=>{const{commandName:n,commandValue:o}=t.source;e.execute(n,o?{value:o}:void 0),e.editing.view.focus()})),u})),e.ui.componentFactory.add("menuBar:heading",(o=>{const i=new l(o),a=e.commands.get("heading"),r=e.commands.get("paragraph"),s=[a],d=new m(o);i.set({class:"ck-heading-dropdown"}),d.set({ariaLabel:t("Heading"),role:"menu"}),i.buttonView.set({label:t("Heading")}),i.panelView.children.add(d);for(const t of n){const n=new h(o,i),c=new g(o);n.children.add(c),d.items.add(n),c.set({label:t.title,role:"menuitemradio",class:t.class}),c.bind("ariaChecked").to(c,"isOn"),c.delegate("execute").to(i),c.on("execute",(()=>{const n="paragraph"===t.model?"paragraph":"heading";e.execute(n,{value:t.model}),e.editing.view.focus()})),"paragraph"===t.model?(c.bind("isOn").to(r,"value"),s.push(r)):c.bind("isOn").to(a,"value",(e=>e===t.model))}return i.bind("isEnabled").toMany(s,"isEnabled",((...e)=>e.some((e=>e)))),i}))}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class P extends t{static get requires(){return[_,E]}static get pluginName(){return"Heading"}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */const T={heading1:n.heading1,heading2:n.heading2,heading3:n.heading3,heading4:n.heading4,heading5:n.heading5,heading6:n.heading6};class H extends t{init(){C(this.editor).filter((e=>"paragraph"!==e.model)).map((e=>this._createButton(e)))}_createButton(e){const t=this.editor;t.ui.componentFactory.add(e.model,(n=>{const o=new u(n),i=t.commands.get("heading");return o.label=e.title,o.icon=e.icon||T[e.model],o.tooltip=!0,o.isToggleable=!0,o.bind("isEnabled").to(i),o.bind("isOn").to(i,"value",(t=>t==e.model)),o.on("execute",(()=>{t.execute("heading",{value:e.model}),t.editing.view.focus()})),o}))}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */const N=new Set(["paragraph","heading1","heading2","heading3","heading4","heading5","heading6"]);class A extends t{constructor(){super(...arguments),this._bodyPlaceholder=new Map}static get pluginName(){return"Title"}static get requires(){return["Paragraph"]}init(){const e=this.editor,t=e.model;t.schema.register("title",{isBlock:!0,allowIn:"$root"}),t.schema.register("title-content",{isBlock:!0,allowIn:"title",allowAttributes:["alignment"]}),t.schema.extend("$text",{allowIn:"title-content"}),t.schema.addAttributeCheck((e=>{if(e.endsWith("title-content $text"))return!1})),e.editing.mapper.on("modelToViewPosition",R(e.editing.view)),e.data.mapper.on("modelToViewPosition",R(e.editing.view)),e.conversion.for("downcast").elementToElement({model:"title-content",view:"h1"}),e.conversion.for("downcast").add((e=>e.on("insert:title",((e,t,n)=>{n.consumable.consume(t.item,e.name)})))),e.data.upcastDispatcher.on("element:h1",B,{priority:"high"}),e.data.upcastDispatcher.on("element:h2",B,{priority:"high"}),e.data.upcastDispatcher.on("element:h3",B,{priority:"high"}),t.document.registerPostFixer((e=>this._fixTitleContent(e))),t.document.registerPostFixer((e=>this._fixTitleElement(e))),t.document.registerPostFixer((e=>this._fixBodyElement(e))),t.document.registerPostFixer((e=>this._fixExtraParagraph(e))),this._attachPlaceholders(),this._attachTabPressHandling()}getTitle(e={}){const t=e.rootName?e.rootName:void 0,n=this._getTitleElement(t).getChild(0);return this.editor.data.stringify(n,e)}getBody(e={}){const t=this.editor,n=t.data,o=t.model,i=e.rootName?e.rootName:void 0,a=t.model.document.getRoot(i),r=t.editing.view,s=new p(r.document),d=o.createRangeIn(a),c=s.createDocumentFragment(),l=o.createPositionAfter(a.getChild(0)),m=o.createRange(l,o.createPositionAt(a,"end")),h=new Map;for(const e of o.markers){const t=m.getIntersection(e.getRange());t&&h.set(e.name,t)}return n.mapper.clearBindings(),n.mapper.bindElements(a,c),n.downcastDispatcher.convert(d,h,s,e),s.remove(s.createRangeOn(c.getChild(0))),t.data.processor.toData(c)}_getTitleElement(e){const t=this.editor.model.document.getRoot(e);for(const e of t.getChildren())if(F(e))return e}_fixTitleContent(e){let t=!1;for(const n of this.editor.model.document.getRootNames()){const o=this._getTitleElement(n);if(!o||1===o.maxOffset)continue;const i=Array.from(o.getChildren());i.shift();for(const t of i)e.move(e.createRangeOn(t),o,"after"),e.rename(t,"paragraph");t=!0}return t}_fixTitleElement(e){let t=!1;const n=this.editor.model;for(const o of this.editor.model.document.getRoots()){const i=Array.from(o.getChildren()).filter(F),a=i[0],r=o.getChild(0);if(r.is("element","title"))i.length>1&&(S(i,e,n),t=!0);else if(a||N.has(r.name))N.has(r.name)?O(r,e,n):e.move(e.createRangeOn(a),o,0),S(i,e,n),t=!0;else{const n=e.createElement("title");e.insert(n,o),e.insertElement("title-content",n),t=!0}}return t}_fixBodyElement(e){let t=!1;for(const n of this.editor.model.document.getRootNames()){const o=this.editor.model.document.getRoot(n);if(o.childCount<2){const i=e.createElement("paragraph");e.insert(i,o,1),this._bodyPlaceholder.set(n,i),t=!0}}return t}_fixExtraParagraph(e){let t=!1;for(const n of this.editor.model.document.getRootNames()){const o=this.editor.model.document.getRoot(n),i=this._bodyPlaceholder.get(n);V(i,o)&&(this._bodyPlaceholder.delete(n),e.remove(i),t=!0)}return t}_attachPlaceholders(){const e=this.editor,t=e.t,n=e.editing.view,o=e.sourceElement,i=e.config.get("title.placeholder")||t("Type your title"),a=e.config.get("placeholder")||o&&"textarea"===o.tagName.toLowerCase()&&o.getAttribute("placeholder")||t("Type or paste your content here.");e.editing.downcastDispatcher.on("insert:title-content",((e,t,o)=>{const a=o.mapper.toViewElement(t.item);a.placeholder=i,f({view:n,element:a,keepOnFocus:!0})}));const r=new Map;n.document.registerPostFixer((e=>{let t=!1;for(const o of n.document.roots){if(o.isEmpty)continue;const n=o.getChild(1),i=r.get(o.rootName);n!==i&&(i&&(w(e,i),e.removeAttribute("data-placeholder",i)),e.setAttribute("data-placeholder",a,n),r.set(o.rootName,n),t=!0),t=b(n,!0)&&2===o.childCount&&"p"===n.name?!!v(e,n)||t:!!w(e,n)||t}return t}))}_attachTabPressHandling(){const e=this.editor,t=e.model;e.keystrokes.set("TAB",((e,n)=>{t.change((e=>{const o=t.document.selection,i=Array.from(o.getSelectedBlocks());if(1===i.length&&i[0].is("element","title-content")){const t=o.getFirstPosition().root.getChild(1);e.setSelection(t,0),n()}}))})),e.keystrokes.set("SHIFT + TAB",((n,o)=>{t.change((n=>{const a=t.document.selection;if(!a.isCollapsed)return;const r=i(a.getSelectedBlocks()),s=a.getFirstPosition(),d=e.model.document.getRoot(s.root.rootName),c=d.getChild(0);r===d.getChild(1)&&s.isAtStart&&(n.setSelection(c.getChild(0),0),o())}))}))}}function B(e,t,n){const o=t.modelCursor,i=t.viewItem;if(!o.isAtStart||!o.parent.is("element","$root"))return;if(!n.consumable.consume(i,{name:!0}))return;const a=n.writer,r=a.createElement("title"),s=a.createElement("title-content");a.append(s,r),a.insert(r,o),n.convertChildren(i,s),n.updateConversionResult(r,t)}function R(e){return(t,n)=>{const o=n.modelPosition.parent;if(!o.is("element","title"))return;const i=o.parent,a=n.mapper.toViewElement(i);n.viewPosition=e.createPositionAt(a,0),t.stop()}}function F(e){return e.is("element","title")}function O(e,t,n){const o=t.createElement("title");t.insert(o,e,"before"),t.insert(e,o,0),t.rename(e,"title-content"),n.schema.removeDisallowedAttributes([e],t)}function S(e,t,n){let o=!1;for(const i of e)0!==i.index&&(D(i,t,n),o=!0);return o}function D(e,t,n){const o=e.getChild(0);o.isEmpty?t.remove(e):(t.move(t.createRangeOn(o),e,"before"),t.rename(o,"paragraph"),t.remove(e),n.schema.removeDisallowedAttributes([o],t))}function V(e,t){return!(!e||!e.is("element","paragraph")||e.childCount)&&!(t.childCount<=2||t.getChild(t.childCount-1)!==e)}export{P as Heading,H as HeadingButtonsUI,_ as HeadingEditing,E as HeadingUI,A as Title};