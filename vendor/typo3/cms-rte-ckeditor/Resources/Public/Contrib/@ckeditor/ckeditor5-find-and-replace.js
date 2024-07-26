import{icons as e,Plugin as t,Command as i}from"@ckeditor/ckeditor5-core";import{View as s,ViewCollection as n,FocusCycler as r,submitHandler as a,CollapsibleView as c,SwitchButtonView as o,ButtonView as l,LabeledFieldView as d,createLabeledInputText as h,Dialog as f,DropdownView as u,createDropdown as p,FormHeaderView as k,MenuBarMenuListItemButtonView as m,DialogViewPosition as g,CssTransitionDisablerMixin as _}from"@ckeditor/ckeditor5-ui";import{FocusTracker as w,KeystrokeHandler as b,isVisible as x,Rect as v,Collection as y,ObservableMixin as R,uid as V,scrollViewportToShowTarget as T}from"@ckeditor/ckeditor5-utils";import{escapeRegExp as C,debounce as F}from"lodash-es";function B(e,{insertAt:t}={}){if(!e||"undefined"==typeof document)return;const i=document.head||document.getElementsByTagName("head")[0],s=document.createElement("style");s.type="text/css",window.litNonce&&s.setAttribute("nonce",window.litNonce),"top"===t&&i.firstChild?i.insertBefore(s,i.firstChild):i.appendChild(s),s.styleSheet?s.styleSheet.cssText=e:s.appendChild(document.createTextNode(e))}B('.ck-vertical-form .ck-button:after{bottom:-1px;content:"";position:absolute;right:-1px;top:-1px;width:0;z-index:1}.ck-vertical-form .ck-button:focus:after{display:none}@media screen and (max-width:600px){.ck.ck-responsive-form .ck-button:after{bottom:-1px;content:"";position:absolute;right:-1px;top:-1px;width:0;z-index:1}.ck.ck-responsive-form .ck-button:focus:after{display:none}}.ck-vertical-form>.ck-button:nth-last-child(2):after{border-right:1px solid var(--ck-color-base-border)}.ck.ck-responsive-form{padding:var(--ck-spacing-large)}.ck.ck-responsive-form:focus{outline:none}[dir=ltr] .ck.ck-responsive-form>:not(:first-child),[dir=rtl] .ck.ck-responsive-form>:not(:last-child){margin-left:var(--ck-spacing-standard)}@media screen and (max-width:600px){.ck.ck-responsive-form{padding:0;width:calc(var(--ck-input-width)*.8)}.ck.ck-responsive-form .ck-labeled-field-view{margin:var(--ck-spacing-large) var(--ck-spacing-large) 0}.ck.ck-responsive-form .ck-labeled-field-view .ck-input-number,.ck.ck-responsive-form .ck-labeled-field-view .ck-input-text{min-width:0;width:100%}.ck.ck-responsive-form .ck-labeled-field-view .ck-labeled-field-view__error{white-space:normal}.ck.ck-responsive-form>.ck-button:nth-last-child(2):after{border-right:1px solid var(--ck-color-base-border)}.ck.ck-responsive-form>.ck-button:last-child,.ck.ck-responsive-form>.ck-button:nth-last-child(2){border-radius:0;margin-top:var(--ck-spacing-large);padding:var(--ck-spacing-standard)}.ck.ck-responsive-form>.ck-button:last-child:not(:focus),.ck.ck-responsive-form>.ck-button:nth-last-child(2):not(:focus){border-top:1px solid var(--ck-color-base-border)}[dir=ltr] .ck.ck-responsive-form>.ck-button:last-child,[dir=ltr] .ck.ck-responsive-form>.ck-button:nth-last-child(2),[dir=rtl] .ck.ck-responsive-form>.ck-button:last-child,[dir=rtl] .ck.ck-responsive-form>.ck-button:nth-last-child(2){margin-left:0}[dir=rtl] .ck.ck-responsive-form>.ck-button:last-child:last-of-type,[dir=rtl] .ck.ck-responsive-form>.ck-button:nth-last-child(2):last-of-type{border-right:1px solid var(--ck-color-base-border)}}');B(".ck.ck-find-and-replace-form{max-width:100%;& .ck-find-and-replace-form__inputs,.ck-find-and-replace-form__actions{display:flex}& .ck-find-and-replace-form__inputs.ck-find-and-replace-form__inputs .ck-results-counter,.ck-find-and-replace-form__actions.ck-find-and-replace-form__inputs .ck-results-counter{position:absolute}}.ck.ck-find-and-replace-form{width:400px}.ck.ck-find-and-replace-form:focus{outline:none}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions,.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs{align-content:stretch;align-items:center;flex:1 1 auto;flex-direction:row;flex-wrap:wrap;margin:0;padding:var(--ck-spacing-large)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions>.ck-button,.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>.ck-button{flex:0 0 auto}[dir=ltr] .ck.ck-find-and-replace-form .ck-find-and-replace-form__actions>*+*,[dir=ltr] .ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>*+*{margin-left:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-find-and-replace-form .ck-find-and-replace-form__actions>*+*,[dir=rtl] .ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>*+*{margin-right:var(--ck-spacing-standard)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions .ck-labeled-field-view,.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs .ck-labeled-field-view{flex:1 1 auto}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions .ck-labeled-field-view .ck-input,.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs .ck-labeled-field-view .ck-input{min-width:50px;width:100%}.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs{align-items:flex-start}.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>.ck-button-prev>.ck-icon{transform:rotate(90deg)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>.ck-button-next>.ck-icon{transform:rotate(-90deg)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs .ck-results-counter{top:50%;transform:translateY(-50%)}[dir=ltr] .ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs .ck-results-counter{right:var(--ck-spacing-standard)}[dir=rtl] .ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs .ck-results-counter{left:var(--ck-spacing-standard)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs .ck-results-counter{color:var(--ck-color-base-border)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>.ck-labeled-field-replace{flex:0 0 100%;padding-top:var(--ck-spacing-standard)}[dir=ltr] .ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>.ck-labeled-field-replace{margin-left:0}[dir=rtl] .ck.ck-find-and-replace-form .ck-find-and-replace-form__inputs>.ck-labeled-field-replace{margin-right:0}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions{flex-wrap:wrap;justify-content:flex-end;margin-top:calc(var(--ck-spacing-large)*-1)}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions>.ck-button-find{font-weight:700}.ck.ck-find-and-replace-form .ck-find-and-replace-form__actions>.ck-button-find .ck-button__label{padding-left:var(--ck-spacing-large);padding-right:var(--ck-spacing-large)}.ck.ck-find-and-replace-form .ck-switchbutton{align-items:center;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;width:100%}@media screen and (max-width:600px){.ck.ck-find-and-replace-form{max-width:100%;width:300px}.ck.ck-find-and-replace-form.ck-find-and-replace-form__input{flex-wrap:wrap}.ck.ck-find-and-replace-form.ck-find-and-replace-form__input .ck-labeled-field-view{flex:1 0 auto;margin-bottom:var(--ck-spacing-standard);width:100%}.ck.ck-find-and-replace-form.ck-find-and-replace-form__input>.ck-button{text-align:center}.ck.ck-find-and-replace-form.ck-find-and-replace-form__input>.ck-button:first-of-type{flex:1 1 auto}[dir=ltr] .ck.ck-find-and-replace-form.ck-find-and-replace-form__input>.ck-button:first-of-type{margin-left:0}[dir=rtl] .ck.ck-find-and-replace-form.ck-find-and-replace-form__input>.ck-button:first-of-type{margin-right:0}.ck.ck-find-and-replace-form.ck-find-and-replace-form__input>.ck-button:first-of-type .ck-button__label{text-align:center;width:100%}.ck.ck-find-and-replace-form.ck-find-and-replace-form__actions>:not(.ck-labeled-field-view){flex:1 1 auto;flex-wrap:wrap}.ck.ck-find-and-replace-form.ck-find-and-replace-form__actions>:not(.ck-labeled-field-view)>.ck-button{text-align:center}.ck.ck-find-and-replace-form.ck-find-and-replace-form__actions>:not(.ck-labeled-field-view)>.ck-button:first-of-type{flex:1 1 auto}[dir=ltr] .ck.ck-find-and-replace-form.ck-find-and-replace-form__actions>:not(.ck-labeled-field-view)>.ck-button:first-of-type{margin-left:0}[dir=rtl] .ck.ck-find-and-replace-form.ck-find-and-replace-form__actions>:not(.ck-labeled-field-view)>.ck-button:first-of-type{margin-right:0}.ck.ck-find-and-replace-form.ck-find-and-replace-form__actions>:not(.ck-labeled-field-view)>.ck-button .ck-button__label{text-align:center;width:100%}}");
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class A extends s{constructor(t){super(t);const i=t.t;this.children=this.createCollection(),this.set("matchCount",0),this.set("highlightOffset",0),this.set("isDirty",!1),this.set("_areCommandsEnabled",{}),this.set("_resultsCounterText",""),this.set("_matchCase",!1),this.set("_wholeWordsOnly",!1),this.bind("_searchResultsFound").to(this,"matchCount",this,"isDirty",((e,t)=>e>0&&!t)),this._findInputView=this._createInputField(i("Find in text…")),this._findPrevButtonView=this._createButton({label:i("Previous result"),class:"ck-button-prev",icon:e.previousArrow,keystroke:"Shift+F3",tooltip:!0}),this._findNextButtonView=this._createButton({label:i("Next result"),class:"ck-button-next",icon:e.previousArrow,keystroke:"F3",tooltip:!0}),this._replaceInputView=this._createInputField(i("Replace with…"),"ck-labeled-field-replace"),this._inputsDivView=this._createInputsDiv(),this._matchCaseSwitchView=this._createMatchCaseSwitch(),this._wholeWordsOnlySwitchView=this._createWholeWordsOnlySwitch(),this._advancedOptionsCollapsibleView=this._createAdvancedOptionsCollapsible(),this._replaceAllButtonView=this._createButton({label:i("Replace all"),class:"ck-button-replaceall",withText:!0}),this._replaceButtonView=this._createButton({label:i("Replace"),class:"ck-button-replace",withText:!0}),this._findButtonView=this._createButton({label:i("Find"),class:"ck-button-find ck-button-action",withText:!0}),this._actionButtonsDivView=this._createActionButtonsDiv(),this._focusTracker=new w,this._keystrokes=new b,this._focusables=new n,this.focusCycler=new r({focusables:this._focusables,focusTracker:this._focusTracker,keystrokeHandler:this._keystrokes,actions:{focusPrevious:"shift + tab",focusNext:"tab"}}),this.children.addMany([this._inputsDivView,this._advancedOptionsCollapsibleView,this._actionButtonsDivView]),this.setTemplate({tag:"form",attributes:{class:["ck","ck-find-and-replace-form"],tabindex:"-1"},children:this.children})}render(){super.render(),a({view:this}),this._initFocusCycling(),this._initKeystrokeHandling()}destroy(){super.destroy(),this._focusTracker.destroy(),this._keystrokes.destroy()}focus(e){-1===e?this.focusCycler.focusLast():this.focusCycler.focusFirst()}reset(){this._findInputView.errorText=null,this.isDirty=!0}get _textToFind(){return this._findInputView.fieldView.element.value}get _textToReplace(){return this._replaceInputView.fieldView.element.value}_createInputsDiv(){const e=this.locale,t=e.t,i=new s(e);return this._findInputView.fieldView.on("input",(()=>{this.isDirty=!0})),this._findPrevButtonView.delegate("execute").to(this,"findPrevious"),this._findNextButtonView.delegate("execute").to(this,"findNext"),this._findPrevButtonView.bind("isEnabled").to(this,"_areCommandsEnabled",(({findPrevious:e})=>e)),this._findNextButtonView.bind("isEnabled").to(this,"_areCommandsEnabled",(({findNext:e})=>e)),this._injectFindResultsCounter(),this._replaceInputView.bind("isEnabled").to(this,"_areCommandsEnabled",this,"_searchResultsFound",(({replace:e},t)=>e&&t)),this._replaceInputView.bind("infoText").to(this._replaceInputView,"isEnabled",this._replaceInputView,"isFocused",((e,i)=>e||!i?"":t("Tip: Find some text first in order to replace it."))),i.setTemplate({tag:"div",attributes:{class:["ck","ck-find-and-replace-form__inputs"]},children:[this._findInputView,this._findPrevButtonView,this._findNextButtonView,this._replaceInputView]}),i}_onFindButtonExecute(){if(this._textToFind)this.isDirty=!1,this.fire("findNext",{searchText:this._textToFind,matchCase:this._matchCase,wholeWords:this._wholeWordsOnly});else{const e=this.t;this._findInputView.errorText=e("Text to find must not be empty.")}}_injectFindResultsCounter(){const e=this.locale,t=e.t,i=this.bindTemplate,n=new s(this.locale);this.bind("_resultsCounterText").to(this,"highlightOffset",this,"matchCount",((e,i)=>t("%0 of %1",[e,i]))),n.setTemplate({tag:"span",attributes:{class:["ck","ck-results-counter",i.if("isDirty","ck-hidden")]},children:[{text:i.to("_resultsCounterText")}]});const r=()=>{const t=this._findInputView.fieldView.element;if(!t||!x(t))return;const i=new v(n.element).width,s="ltr"===e.uiLanguageDirection?"paddingRight":"paddingLeft";t.style[s]=i?`calc( 2 * var(--ck-spacing-standard) + ${i}px )`:""};this.on("change:_resultsCounterText",r,{priority:"low"}),this.on("change:isDirty",r,{priority:"low"}),this._findInputView.template.children[0].children.push(n)}_createAdvancedOptionsCollapsible(){const e=this.locale.t,t=new c(this.locale,[this._matchCaseSwitchView,this._wholeWordsOnlySwitchView]);return t.set({label:e("Advanced options"),isCollapsed:!0}),t}_createActionButtonsDiv(){const e=new s(this.locale);return this._replaceButtonView.bind("isEnabled").to(this,"_areCommandsEnabled",this,"_searchResultsFound",(({replace:e},t)=>e&&t)),this._replaceAllButtonView.bind("isEnabled").to(this,"_areCommandsEnabled",this,"_searchResultsFound",(({replaceAll:e},t)=>e&&t)),this._replaceButtonView.on("execute",(()=>{this.fire("replace",{searchText:this._textToFind,replaceText:this._textToReplace})})),this._replaceAllButtonView.on("execute",(()=>{this.fire("replaceAll",{searchText:this._textToFind,replaceText:this._textToReplace}),this.focus()})),this._findButtonView.on("execute",this._onFindButtonExecute.bind(this)),e.setTemplate({tag:"div",attributes:{class:["ck","ck-find-and-replace-form__actions"]},children:[this._replaceAllButtonView,this._replaceButtonView,this._findButtonView]}),e}_createMatchCaseSwitch(){const e=this.locale.t,t=new o(this.locale);return t.set({label:e("Match case"),withText:!0}),t.bind("isOn").to(this,"_matchCase"),t.on("execute",(()=>{this._matchCase=!this._matchCase,this.isDirty=!0})),t}_createWholeWordsOnlySwitch(){const e=this.locale.t,t=new o(this.locale);return t.set({label:e("Whole words only"),withText:!0}),t.bind("isOn").to(this,"_wholeWordsOnly"),t.on("execute",(()=>{this._wholeWordsOnly=!this._wholeWordsOnly,this.isDirty=!0})),t}_initFocusCycling(){[this._findInputView,this._findPrevButtonView,this._findNextButtonView,this._replaceInputView,this._advancedOptionsCollapsibleView.buttonView,this._matchCaseSwitchView,this._wholeWordsOnlySwitchView,this._replaceAllButtonView,this._replaceButtonView,this._findButtonView].forEach((e=>{this._focusables.add(e),this._focusTracker.add(e.element)}))}_initKeystrokeHandling(){const e=e=>e.stopPropagation(),t=e=>{e.stopPropagation(),e.preventDefault()};this._keystrokes.listenTo(this.element),this._keystrokes.set("f3",(e=>{t(e),this._findNextButtonView.fire("execute")})),this._keystrokes.set("shift+f3",(e=>{t(e),this._findPrevButtonView.fire("execute")})),this._keystrokes.set("enter",(e=>{const i=e.target;i===this._findInputView.fieldView.element?(this._areCommandsEnabled.findNext?this._findNextButtonView.fire("execute"):this._findButtonView.fire("execute"),t(e)):i!==this._replaceInputView.fieldView.element||this.isDirty||(this._replaceButtonView.fire("execute"),t(e))})),this._keystrokes.set("shift+enter",(e=>{e.target===this._findInputView.fieldView.element&&(this._areCommandsEnabled.findPrevious?this._findPrevButtonView.fire("execute"):this._findButtonView.fire("execute"),t(e))})),this._keystrokes.set("arrowright",e),this._keystrokes.set("arrowleft",e),this._keystrokes.set("arrowup",e),this._keystrokes.set("arrowdown",e)}_createButton(e){const t=new l(this.locale);return t.set(e),t}_createInputField(e,t){const i=new d(this.locale,h);return i.label=e,i.class=t,i}}var E='<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="m12.87 13.786 1.532-1.286 3.857 4.596a1 1 0 1 1-1.532 1.286l-3.857-4.596z"/><path d="M16.004 8.5a6.5 6.5 0 0 1-9.216 5.905c-1.154-.53-.863-1.415-.663-1.615.194-.194.564-.592 1.635-.141a4.5 4.5 0 0 0 5.89-5.904l-.104-.227 1.332-1.331c.045-.046.196-.041.224.007a6.47 6.47 0 0 1 .902 3.306zm-3.4-5.715c.562.305.742 1.106.354 1.494-.388.388-.995.414-1.476.178a4.5 4.5 0 0 0-6.086 5.882l.114.236-1.348 1.349c-.038.037-.17.022-.198-.023a6.5 6.5 0 0 1 5.54-9.9 6.469 6.469 0 0 1 3.1.784z"/><path d="M4.001 11.93.948 8.877a.2.2 0 0 1 .141-.341h6.106a.2.2 0 0 1 .141.341L4.283 11.93a.2.2 0 0 1-.282 0zm11.083-6.789 3.053 3.053a.2.2 0 0 1-.14.342H11.89a.2.2 0 0 1-.14-.342l3.052-3.053a.2.2 0 0 1 .282 0z"/></svg>';
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class D extends t{static get requires(){return[f]}static get pluginName(){return"FindAndReplaceUI"}constructor(e){super(e),e.config.define("findAndReplace.uiType","dialog"),this.formView=null}init(){const e=this.editor,t="dropdown"===e.config.get("findAndReplace.uiType"),i=e.commands.get("find"),s=this.editor.t;e.ui.componentFactory.add("findAndReplace",(()=>{let s;return t?(s=this._createDropdown(),s.bind("isEnabled").to(i)):s=this._createDialogButtonForToolbar(),e.keystrokes.set("Ctrl+F",((t,n)=>{if(i.isEnabled){if(s instanceof u){const e=s.buttonView;e.isOn||e.fire("execute")}else s.isOn?e.plugins.get("Dialog").view.focus():s.fire("execute");n()}})),s})),t||e.ui.componentFactory.add("menuBar:findAndReplace",(()=>this._createDialogButtonForMenuBar())),e.accessibility.addKeystrokeInfos({keystrokes:[{label:s("Find in the document"),keystroke:"CTRL+F"}]})}_createDropdown(){const e=this.editor,t=e.locale.t,i=p(e.locale);return i.once("change:isOpen",(()=>{this.formView=this._createFormView(),this.formView.children.add(new k(e.locale,{label:t("Find and replace")}),0),i.panelView.children.add(this.formView)})),i.on("change:isOpen",((e,t,i)=>{i?this._setupFormView():this.fire("searchReseted")}),{priority:"low"}),i.buttonView.set({icon:E,label:t("Find and replace"),keystroke:"CTRL+F",tooltip:!0}),i}_createDialogButtonForToolbar(){const e=this.editor,t=this._createButton(l),i=e.plugins.get("Dialog");return t.set({tooltip:!0}),t.bind("isOn").to(i,"id",(e=>"findAndReplace"===e)),t.on("execute",(()=>{t.isOn?i.hide():this._showDialog()})),t}_createDialogButtonForMenuBar(){const e=this._createButton(m),t=this.editor.plugins.get("Dialog");return e.on("execute",(()=>{"findAndReplace"!==t.id?this._showDialog():t.hide()})),e}_createButton(e){const t=this.editor,i=t.commands.get("find"),s=new e(t.locale),n=t.locale.t;return s.bind("isEnabled").to(i),s.set({icon:E,label:n("Find and replace"),keystroke:"CTRL+F"}),s}_showDialog(){const e=this.editor,t=e.plugins.get("Dialog"),i=e.locale.t;this.formView||(this.formView=this._createFormView()),t.show({id:"findAndReplace",title:i("Find and replace"),content:this.formView,position:g.EDITOR_TOP_SIDE,onShow:()=>{this._setupFormView()},onHide:()=>{this.fire("searchReseted")}})}_createFormView(){const e=this.editor,t=new(_(A))(e.locale),i=e.commands,s=this.editor.plugins.get("FindAndReplaceEditing").state;t.bind("highlightOffset").to(s,"highlightedOffset"),t.listenTo(s.results,"change",(()=>{t.matchCount=s.results.length}));const n=i.get("findNext"),r=i.get("findPrevious"),a=i.get("replace"),c=i.get("replaceAll");return t.bind("_areCommandsEnabled").to(n,"isEnabled",r,"isEnabled",a,"isEnabled",c,"isEnabled",((e,t,i,s)=>({findNext:e,findPrevious:t,replace:i,replaceAll:s}))),t.delegate("findNext","findPrevious","replace","replaceAll").to(this),t.on("change:isDirty",((e,t,i)=>{i&&this.fire("searchReseted")})),t}_setupFormView(){this.formView.disableCssTransitions(),this.formView.reset(),this.formView._findInputView.fieldView.select(),this.formView.enableCssTransitions()}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class I extends i{constructor(e,t){super(e),this.isEnabled=!0,this.affectsData=!1,this._state=t}execute(e,{matchCase:t,wholeWords:i}={}){const{editor:s}=this,{model:n}=s,r=s.plugins.get("FindAndReplaceUtils");let a;"string"==typeof e?(a=r.findByTextCallback(e,{matchCase:t,wholeWords:i}),this._state.searchText=e):a=e;const c=n.document.getRootNames().reduce(((e,t)=>r.updateFindResultFromRange(n.createRangeIn(n.document.getRoot(t)),n,a,e)),null);return this._state.clear(n),this._state.results.addMany(c),this._state.highlightedResult=c.get(0),"string"==typeof e&&(this._state.searchText=e),a&&(this._state.lastSearchCallback=a),this._state.matchCase=!!t,this._state.matchWholeWords=!!i,{results:c,findCallback:a}}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class O extends i{constructor(e,t){super(e),this.isEnabled=!0,this._state=t,this._isEnabledBasedOnSelection=!1}_replace(e,t){const{model:i}=this.editor,s=t.marker.getRange();i.canEditAt(s)&&i.change((n=>{if("$graveyard"===s.root.rootName)return void this._state.results.remove(t);let r={};for(const e of s.getItems())if(e.is("$text")||e.is("$textProxy")){r=e.getAttributes();break}i.insertContent(n.createText(e,r),s),this._state.results.has(t)&&this._state.results.remove(t)}))}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class N extends O{execute(e,t){this._replace(e,t)}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class S extends O{execute(e,t){const{editor:i}=this,{model:s}=i,n=i.plugins.get("FindAndReplaceUtils"),r=t instanceof y?t:s.document.getRootNames().reduce(((e,i)=>n.updateFindResultFromRange(s.createRangeIn(s.document.getRoot(i)),s,n.findByTextCallback(t,this._state),e)),null);r.length&&s.change((()=>{[...r].forEach((t=>{this._replace(e,t)}))}))}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class P extends i{constructor(e,t){super(e),this.affectsData=!1,this._state=t,this.isEnabled=!1,this.listenTo(this._state.results,"change",(()=>{this.isEnabled=this._state.results.length>1}))}refresh(){this.isEnabled=this._state.results.length>1}execute(){const e=this._state.results,t=e.getIndex(this._state.highlightedResult),i=t+1>=e.length?0:t+1;this._state.highlightedResult=this._state.results.get(i)}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class W extends P{execute(){const e=this._state.results.getIndex(this._state.highlightedResult),t=e-1<0?this._state.results.length-1:e-1;this._state.highlightedResult=this._state.results.get(t)}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class $ extends(R()){constructor(e){super(),this.set("results",new y),this.set("highlightedResult",null),this.set("highlightedOffset",0),this.set("searchText",""),this.set("replaceText",""),this.set("lastSearchCallback",null),this.set("matchCase",!1),this.set("matchWholeWords",!1),this.results.on("change",((t,{removed:i,index:s})=>{if(Array.from(i).length){let t=!1;if(e.change((s=>{for(const n of i)this.highlightedResult===n&&(t=!0),e.markers.has(n.marker.name)&&s.removeMarker(n.marker)})),t){const e=s>=this.results.length?0:s;this.highlightedResult=this.results.get(e)}}})),this.on("change:highlightedResult",(()=>{this.refreshHighlightOffset()}))}clear(e){this.searchText="",e.change((t=>{if(this.highlightedResult){const i=this.highlightedResult.marker.name.split(":")[1],s=e.markers.get(`findResultHighlighted:${i}`);s&&t.removeMarker(s)}[...this.results].forEach((({marker:e})=>{t.removeMarker(e)}))})),this.results.clear()}refreshHighlightOffset(){const{highlightedResult:e,results:t}=this,i={before:-1,same:0,after:1,different:1};this.highlightedOffset=e?Array.from(t).sort(((e,t)=>i[e.marker.getStart().compareWith(t.marker.getStart())])).indexOf(e)+1:0}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class M extends t{static get pluginName(){return"FindAndReplaceUtils"}updateFindResultFromRange(e,t,i,s){const n=s||new y;return t.change((s=>{[...e].forEach((({type:e,item:r})=>{if("elementStart"===e&&t.schema.checkChild(r,"$text")){const e=i({item:r,text:this.rangeToText(t.createRangeIn(r))});if(!e)return;e.forEach((e=>{const t=`findResult:${V()}`,i=s.addMarker(t,{usingOperation:!1,affectsData:!1,range:s.createRange(s.createPositionAt(r,e.start),s.createPositionAt(r,e.end))}),a=function(e,t){const i=e.find((({marker:e})=>t.getStart().isBefore(e.getStart())));return i?e.getIndex(i):e.length}(n,i);(e=>n.find((t=>{const{marker:i}=t,s=i.getRange(),n=e.getRange();return s.isEqual(n)})))(i)||n.add({id:t,label:e.label,marker:i},a)}))}}))})),n}rangeToText(e){return Array.from(e.getItems()).reduce(((e,t)=>t.is("$text")||t.is("$textProxy")?e+t.data:`${e}\n`),"")}findByTextCallback(e,t){let i="gu";t.matchCase||(i+="i");let s=`(${C(e)})`;if(t.wholeWords){const t="[^a-zA-ZÀ-ɏḀ-ỿ]";new RegExp("^"+t).test(e)||(s=`(^|${t}|_)${s}`),new RegExp(t+"$").test(e)||(s=`${s}(?=_|${t}|$)`)}const n=new RegExp(s,i);return function({text:e}){return[...e.matchAll(n)].map(H)}}}function H(e){const t=e.length-1;let i=e.index;return 3===e.length&&(i+=e[1].length),{label:e[t],start:i,end:i+e[t].length}}B(".ck-find-result{background:var(--ck-color-highlight-background);color:var(--ck-color-text)}.ck-find-result_selected{background:#ff9633}");class z extends t{constructor(){super(...arguments),this._onDocumentChange=()=>{const e=new Set,t=new Set,i=this.editor.model,{results:s}=this.state,n=i.document.differ.getChanges(),r=i.document.differ.getChangedMarkers();n.forEach((s=>{s.position&&("$text"===s.name||s.position.nodeAfter&&i.schema.isInline(s.position.nodeAfter)?(e.add(s.position.parent),[...i.markers.getMarkersAtPosition(s.position)].forEach((e=>{t.add(e.name)}))):"insert"===s.type&&s.position.nodeAfter&&e.add(s.position.nodeAfter))})),r.forEach((({name:e,data:{newRange:i}})=>{i&&"$graveyard"===i.start.root.rootName&&t.add(e)})),e.forEach((e=>{[...i.markers.getMarkersIntersectingRange(i.createRangeIn(e))].forEach((e=>t.add(e.name)))})),t.forEach((e=>{s.has(e)&&(s.get(e)===this.state.highlightedResult&&(this.state.highlightedResult=null),s.remove(e))}));const a=[],c=this.editor.plugins.get("FindAndReplaceUtils");e.forEach((e=>{const t=c.updateFindResultFromRange(i.createRangeOn(e),i,this.state.lastSearchCallback,s);a.push(...t)})),r.forEach((e=>{if(e.data.newRange){const t=c.updateFindResultFromRange(e.data.newRange,i,this.state.lastSearchCallback,s);a.push(...t)}})),!this.state.highlightedResult&&a.length?this.state.highlightedResult=a[0]:this.state.refreshHighlightOffset()}}static get requires(){return[M]}static get pluginName(){return"FindAndReplaceEditing"}init(){this.state=new $(this.editor.model),this.set("_isSearchActive",!1),this._defineConverters(),this._defineCommands(),this.listenTo(this.state,"change:highlightedResult",((e,t,i,s)=>{const{model:n}=this.editor;n.change((e=>{if(s){const t=s.marker.name.split(":")[1],i=n.markers.get(`findResultHighlighted:${t}`);i&&e.removeMarker(i)}if(i){const t=i.marker.name.split(":")[1];e.addMarker(`findResultHighlighted:${t}`,{usingOperation:!1,affectsData:!1,range:i.marker.getRange()})}}))}));
/* istanbul ignore next -- @preserve */
const e=F(((e,t,i)=>{if(i){const e=this.editor.editing.view.domConverter,t=this.editor.editing.mapper.toViewRange(i.marker.getRange());T({target:e.viewRangeToDom(t),viewportOffset:40})}}).bind(this),32);this.listenTo(this.state,"change:highlightedResult",e,{priority:"low"}),this.listenTo(this.editor,"destroy",e.cancel),this.on("change:_isSearchActive",((e,t,i)=>{i?this.listenTo(this.editor.model.document,"change:data",this._onDocumentChange):this.stopListening(this.editor.model.document,"change:data",this._onDocumentChange)}))}find(e,t){return this._isSearchActive=!0,this.editor.execute("find",e,t),this.state.results}stop(){this.state.clear(this.editor.model),this._isSearchActive=!1}_defineCommands(){this.editor.commands.add("find",new I(this.editor,this.state)),this.editor.commands.add("findNext",new P(this.editor,this.state)),this.editor.commands.add("findPrevious",new W(this.editor,this.state)),this.editor.commands.add("replace",new N(this.editor,this.state)),this.editor.commands.add("replaceAll",new S(this.editor,this.state))}_defineConverters(){const{editor:e}=this;e.conversion.for("editingDowncast").markerToHighlight({model:"findResult",view:({markerName:e})=>{const[,t]=e.split(":");return{name:"span",classes:["ck-find-result"],attributes:{"data-find-result":t}}}}),e.conversion.for("editingDowncast").markerToHighlight({model:"findResultHighlighted",view:({markerName:e})=>{const[,t]=e.split(":");return{name:"span",classes:["ck-find-result_selected"],attributes:{"data-find-result":t}}}})}}
/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class L extends t{static get requires(){return[z,D]}static get pluginName(){return"FindAndReplace"}init(){const e=this.editor.plugins.get("FindAndReplaceUI"),t=this.editor.plugins.get("FindAndReplaceEditing"),i=t.state;e.on("findNext",((e,s)=>{s?(i.searchText=s.searchText,t.find(s.searchText,s)):this.editor.execute("findNext")})),e.on("findPrevious",((e,s)=>{s&&i.searchText!==s.searchText?t.find(s.searchText):this.editor.execute("findPrevious")})),e.on("replace",((e,s)=>{i.searchText!==s.searchText&&t.find(s.searchText);const n=i.highlightedResult;n&&this.editor.execute("replace",s.replaceText,n)})),e.on("replaceAll",((e,s)=>{i.searchText!==s.searchText&&t.find(s.searchText),this.editor.execute("replaceAll",s.replaceText,i.results)})),e.on("searchReseted",(()=>{i.clear(this.editor.model),t.stop()}))}}export{L as FindAndReplace,z as FindAndReplaceEditing,D as FindAndReplaceUI,M as FindAndReplaceUtils,I as FindCommand,P as FindNextCommand,W as FindPreviousCommand,S as ReplaceAllCommand,N as ReplaceCommand};