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
import DocumentService from"@typo3/core/document-service.js";import $ from"jquery";import"@typo3/backend/element/icon-element.js";import{SeverityEnum}from"@typo3/backend/enum/severity.js";import"@typo3/backend/input/clearable.js";import Workspaces from"@typo3/workspaces/workspaces.js";import{default as Modal}from"@typo3/backend/modal.js";import Persistent from"@typo3/backend/storage/persistent.js";import Utility from"@typo3/backend/utility.js";import Wizard from"@typo3/backend/wizard.js";import SecurityUtility from"@typo3/core/security-utility.js";import windowManager from"@typo3/backend/window-manager.js";import RegularEvent from"@typo3/core/event/regular-event.js";import{selector}from"@typo3/core/literals.js";var Identifiers;!function(e){e.searchForm="#workspace-settings-form",e.searchTextField='#workspace-settings-form input[name="search-text"]',e.searchSubmitBtn='#workspace-settings-form button[type="submit"]',e.depthSelector='#workspace-settings-form [name="depth"]',e.languageSelector='#workspace-settings-form select[name="languages"]',e.stagesSelector='#workspace-settings-form select[name="stages"]',e.workspaceActions=".workspace-actions",e.chooseStageAction='.workspace-actions [name="stage-action"]',e.chooseSelectionAction='.workspace-actions [name="selection-action"]',e.chooseMassAction='.workspace-actions [name="mass-action"]',e.container="#workspace-panel",e.contentsContainer="#workspace-contents",e.noContentsContainer="#workspace-contents-empty",e.previewLinksButton=".t3js-preview-link",e.pagination="#workspace-pagination"}(Identifiers||(Identifiers={}));class Backend extends Workspaces{constructor(){super(),this.elements={},this.settings={dir:"ASC",id:TYPO3.settings.Workspaces.id,depth:1,language:"all",limit:30,query:"",sort:"label_Live",start:0,filterTxt:""},this.paging={currentPage:1,totalPages:1,totalItems:0},this.latestPath="",this.markedRecordsForMassAction=[],this.indentationPadding=26,this.handleCheckboxStateChanged=e=>{const t=$(e.target),a=t.parents("tr"),s=t.prop("checked"),n=a.data("table")+":"+a.data("uid")+":"+a.data("t3ver_oid");if(s)this.markedRecordsForMassAction.push(n);else{const e=this.markedRecordsForMassAction.indexOf(n);e>-1&&this.markedRecordsForMassAction.splice(e,1)}a.data("collectionCurrent")?Backend.changeCollectionChildrenState(a.data("collectionCurrent"),s):a.data("collection")&&(Backend.changeCollectionChildrenState(a.data("collection"),s),Backend.changeCollectionParentState(a.data("collection"),s)),this.elements.$chooseMassAction.prop("disabled",this.markedRecordsForMassAction.length>0)},this.viewChanges=e=>{e.preventDefault();const t=$(e.currentTarget).closest("tr");this.sendRemoteRequest(this.generateRemotePayload("getRowDetails",{stage:t.data("stage"),t3ver_oid:t.data("t3ver_oid"),table:t.data("table"),uid:t.data("uid"),filterFields:!0})).then((async e=>{const a=(await e.resolve())[0].result.data[0],s=$("<div />"),n=$("<ul />",{class:"nav nav-tabs",role:"tablist"}),i=$("<div />",{class:"tab-content"}),o=[];s.append($("<p />").html(TYPO3.lang.path.replace("{0}",a.path_Live)),$("<p />").html(TYPO3.lang.current_step.replace("{0}",a.label_Stage).replace("{1}",a.stage_position).replace("{2}",a.stage_count))),a.diff.length>0&&(n.append($("<li />",{role:"presentation",class:"nav-item"}).append($("<a />",{class:"nav-link",href:"#workspace-changes","aria-controls":"workspace-changes",role:"tab","data-bs-toggle":"tab"}).text(TYPO3.lang["window.recordChanges.tabs.changeSummary"]))),i.append($("<div />",{role:"tabpanel",class:"tab-pane",id:"workspace-changes"}).append($("<div />",{class:"form-section"}).append(Backend.generateDiffView(a.diff))))),a.comments.length>0&&(n.append($("<li />",{role:"presentation",class:"nav-item"}).append($("<a />",{class:"nav-link",href:"#workspace-comments","aria-controls":"workspace-comments",role:"tab","data-bs-toggle":"tab"}).html(TYPO3.lang["window.recordChanges.tabs.comments"]+"&nbsp;").append($("<span />",{class:"badge"}).text(a.comments.length)))),i.append($("<div />",{role:"tabpanel",class:"tab-pane",id:"workspace-comments"}).append($("<div />",{class:"form-section"}).append(Backend.generateCommentView(a.comments))))),a.history.total>0&&(n.append($("<li />",{role:"presentation",class:"nav-item"}).append($("<a />",{class:"nav-link",href:"#workspace-history","aria-controls":"workspace-history",role:"tab","data-bs-toggle":"tab"}).text(TYPO3.lang["window.recordChanges.tabs.history"]))),i.append($("<div />",{role:"tabpanel",class:"tab-pane",id:"workspace-history"}).append($("<div />",{class:"form-section"}).append(Backend.generateHistoryView(a.history.data))))),n.find("li > a").first().addClass("active"),i.find(".tab-pane").first().addClass("active"),s.append($("<div />").append(n,i)),!1!==a.label_PrevStage&&t.data("stage")!==t.data("prevStage")&&o.push({text:a.label_PrevStage.title,active:!0,btnClass:"btn-default",name:"prevstage",trigger:(e,a)=>{a.hideModal(),this.sendToStage(t,"prev")}}),!1!==a.label_NextStage&&o.push({text:a.label_NextStage.title,active:!0,btnClass:"btn-default",name:"nextstage",trigger:(e,a)=>{a.hideModal(),this.sendToStage(t,"next")}}),o.push({text:TYPO3.lang.close,active:!0,btnClass:"btn-info",name:"cancel",trigger:(e,t)=>t.hideModal()}),Modal.advanced({type:Modal.types.default,title:TYPO3.lang["window.recordInformation"].replace("{0}",t.find(".t3js-title-live").text().trim()),content:s,severity:SeverityEnum.info,buttons:o,size:Modal.sizes.medium})}))},this.confirmDeleteRecordFromWorkspace=e=>{const t=$(e.target).closest("tr"),a=Modal.confirm(TYPO3.lang["window.discard.title"],TYPO3.lang["window.discard.message"],SeverityEnum.warning,[{text:TYPO3.lang.cancel,active:!0,btnClass:"btn-default",name:"cancel",trigger:()=>{a.hideModal()}},{text:TYPO3.lang.ok,btnClass:"btn-warning",name:"ok"}]);a.addEventListener("button.clicked",(e=>{"ok"===e.target.name&&this.sendRemoteRequest([this.generateRemoteActionsPayload("deleteSingleRecord",[t.data("table"),t.data("uid")])]).then((()=>{a.hideModal(),this.getWorkspaceInfos(),Backend.refreshPageTree()}))}))},this.runSelectionAction=e=>{const t=$(e.currentTarget).val(),a="discard"!==t;if(0===t.length)return;const s=[];for(let e=0;e<this.markedRecordsForMassAction.length;++e){const t=this.markedRecordsForMassAction[e].split(":");s.push({table:t[0],liveId:t[2],versionId:t[1]})}a?this.checkIntegrity({selection:s,type:"selection"}).then((async e=>{Wizard.setForceSelection(!1),"warning"===(await e.resolve())[0].result.result&&this.addIntegrityCheckWarningToWizard(),this.renderSelectionActionWizard(t,s)})):(Wizard.setForceSelection(!1),this.renderSelectionActionWizard(t,s))},this.addIntegrityCheckWarningToWizard=()=>{Wizard.addSlide("integrity-warning",TYPO3.lang["window.integrity_warning.title"],TYPO3.lang["integrity.hasIssuesDescription"]+"<br>"+TYPO3.lang["integrity.hasIssuesQuestion"],SeverityEnum.warning)},this.runMassAction=e=>{const t=$(e.currentTarget).val(),a="discard"!==t;0!==t.length&&(a?this.checkIntegrity({language:this.settings.language,type:t}).then((async e=>{Wizard.setForceSelection(!1),"warning"===(await e.resolve())[0].result.result&&this.addIntegrityCheckWarningToWizard(),this.renderMassActionWizard(t)})):(Wizard.setForceSelection(!1),this.renderMassActionWizard(t)))},this.sendToSpecificStageAction=e=>{const t=[],a=$(e.currentTarget).val();for(let e=0;e<this.markedRecordsForMassAction.length;++e){const a=this.markedRecordsForMassAction[e].split(":");t.push({table:a[0],uid:a[1],t3ver_oid:a[2]})}this.sendRemoteRequest(this.generateRemoteActionsPayload("sendToSpecificStageWindow",[a,t])).then((async e=>{const s=this.renderSendToStageWindow(await e.resolve());s.addEventListener("button.clicked",(e=>{if("ok"===e.target.name){const e=Utility.convertFormToObject(s.querySelector("form"));e.affects={elements:t,nextStage:a},this.sendRemoteRequest([this.generateRemoteActionsPayload("sendToSpecificStageExecute",[e]),this.generateRemotePayload("getWorkspaceInfos",this.settings)]).then((async e=>{const t=await e.resolve();s.hideModal(),this.renderWorkspaceInfos(t[1].result),Backend.refreshPageTree()}))}})),s.addEventListener("typo3-modal-hide",(()=>{this.elements.$chooseStageAction.val("")}))}))},this.generatePreviewLinks=()=>{this.sendRemoteRequest(this.generateRemoteActionsPayload("generateWorkspacePreviewLinksForAllLanguages",[this.settings.id])).then((async e=>{const t=(await e.resolve())[0].result,a=$("<dl />");for(const[e,s]of Object.entries(t))a.append($("<dt />").text(e),$("<dd />").append($("<a />",{href:s,target:"_blank"}).text(s)));Modal.show(TYPO3.lang.previewLink,a,SeverityEnum.info,[{text:TYPO3.lang.ok,active:!0,btnClass:"btn-info",name:"ok",trigger:(e,t)=>t.hideModal()}],["modal-inner-scroll"])}))},DocumentService.ready().then((()=>{this.getElements(),this.registerEvents(),this.notifyWorkspaceSwitchAction(),this.settings.depth=this.elements.$depthSelector.val(),this.settings.language=this.elements.$languageSelector.val(),this.settings.stage=this.elements.$stagesSelector.val(),this.elements.$container.length&&this.getWorkspaceInfos()}))}static refreshPageTree(){top.document.dispatchEvent(new CustomEvent("typo3:pagetree:refresh"))}static generateDiffView(e){const t=$("<div />",{class:"diff"});for(const a of e)t.append($("<div />",{class:"diff-item"}).append($("<div />",{class:"diff-item-title"}).text(a.label),$("<div />",{class:"diff-item-result"}).html(a.content)));return t}static generateCommentView(e){const t=$("<div />");for(const a of e){const e=$("<div />",{class:"panel panel-default"});a.user_comment.length>0&&e.append($("<div />",{class:"panel-body"}).html(a.user_comment)),e.append($("<div />",{class:"panel-footer"}).append($("<span />",{class:"badge badge-success me-2"}).text(a.previous_stage_title+" > "+a.stage_title),$("<span />",{class:"badge badge-info"}).text(a.tstamp))),t.append($("<div />",{class:"media"}).append($("<div />",{class:"media-left text-center"}).text(a.user_username).prepend($("<div />").html(a.user_avatar)),$("<div />",{class:"media-body"}).append(e)))}return t}static generateHistoryView(e){const t=$("<div />");for(const a of e){const e=$("<div />",{class:"panel panel-default"});let s;if("object"==typeof a.differences){if(0===a.differences.length)continue;s=$("<div />",{class:"diff"});for(let e=0;e<a.differences.length;++e)s.append($("<div />",{class:"diff-item"}).append($("<div />",{class:"diff-item-title"}).text(a.differences[e].label),$("<div />",{class:"diff-item-result"}).html(a.differences[e].html)));e.append($("<div />").append(s))}else e.append($("<div />",{class:"panel-body"}).text(a.differences));e.append($("<div />",{class:"panel-footer"}).append($("<span />",{class:"badge badge-info"}).text(a.datetime))),t.append($("<div />",{class:"media"}).append($("<div />",{class:"media-left text-center"}).text(a.user).prepend($("<div />").html(a.user_avatar)),$("<div />",{class:"media-body"}).append(e)))}return t}static changeCollectionParentState(e,t){const a=document.querySelector('tr[data-collection-current="'+e+'"] input[type=checkbox]');null!==a&&a.checked!==t&&(a.checked=t,a.dataset.manuallyChanged="true",a.dispatchEvent(new CustomEvent("multiRecordSelection:checkbox:state:changed",{bubbles:!0,cancelable:!1})))}static changeCollectionChildrenState(e,t){const a=document.querySelectorAll(selector`tr[data-collection="${e}"] input[type=checkbox]`);a.length&&a.forEach((e=>{e.checked!==t&&(e.checked=t,e.dataset.manuallyChanged="true",e.dispatchEvent(new CustomEvent("multiRecordSelection:checkbox:state:changed",{bubbles:!0,cancelable:!1})))}))}notifyWorkspaceSwitchAction(){const e=document.querySelector("main[data-workspace-switch-action]");if(e.dataset.workspaceSwitchAction){const t=JSON.parse(e.dataset.workspaceSwitchAction);top.TYPO3.WorkspacesMenu.performWorkspaceSwitch(t.id,t.title),top.document.dispatchEvent(new CustomEvent("typo3:pagetree:refresh")),top.TYPO3.ModuleMenu.App.refreshMenu()}}checkIntegrity(e){return this.sendRemoteRequest(this.generateRemotePayload("checkIntegrity",e))}getElements(){this.elements.$searchForm=$(Identifiers.searchForm),this.elements.$searchTextField=$(Identifiers.searchTextField),this.elements.$searchSubmitBtn=$(Identifiers.searchSubmitBtn),this.elements.$depthSelector=$(Identifiers.depthSelector),this.elements.$languageSelector=$(Identifiers.languageSelector),this.elements.$stagesSelector=$(Identifiers.stagesSelector),this.elements.$container=$(Identifiers.container),this.elements.$contentsContainer=$(Identifiers.contentsContainer),this.elements.$noContentsContainer=$(Identifiers.noContentsContainer),this.elements.$tableBody=this.elements.$contentsContainer.find("tbody"),this.elements.$workspaceActions=$(Identifiers.workspaceActions),this.elements.$chooseStageAction=$(Identifiers.chooseStageAction),this.elements.$chooseSelectionAction=$(Identifiers.chooseSelectionAction),this.elements.$chooseMassAction=$(Identifiers.chooseMassAction),this.elements.$previewLinksButton=$(Identifiers.previewLinksButton),this.elements.$pagination=$(Identifiers.pagination)}registerEvents(){$(document).on("click",'[data-action="publish"]',(e=>{const t=e.target.closest("tr");this.checkIntegrity({selection:[{liveId:t.dataset.uid,versionId:t.dataset.t3ver_oid,table:t.dataset.table}],type:"selection"}).then((async e=>{"warning"===(await e.resolve())[0].result.result&&this.addIntegrityCheckWarningToWizard(),Wizard.setForceSelection(!1),Wizard.addSlide("publish-confirm",TYPO3.lang["window.publish.title"],TYPO3.lang["window.publish.message"],SeverityEnum.info),Wizard.addFinalProcessingSlide((()=>{this.sendRemoteRequest(this.generateRemoteActionsPayload("publishSingleRecord",[t.dataset.table,t.dataset.t3ver_oid,t.dataset.uid])).then((()=>{Wizard.dismiss(),this.getWorkspaceInfos(),Backend.refreshPageTree()}))})).then((()=>{Wizard.show()}))}))})).on("click",'[data-action="prevstage"]',(e=>{this.sendToStage($(e.currentTarget).closest("tr"),"prev")})).on("click",'[data-action="nextstage"]',(e=>{this.sendToStage($(e.currentTarget).closest("tr"),"next")})).on("click",'[data-action="changes"]',this.viewChanges).on("click",'[data-action="preview"]',this.openPreview.bind(this)).on("click",'[data-action="open"]',(e=>{const t=e.currentTarget.closest("tr"),a=TYPO3.settings.FormEngine.moduleUrl+"&returnUrl="+encodeURIComponent(document.location.href)+"&id="+TYPO3.settings.Workspaces.id+"&edit["+t.dataset.table+"]["+t.dataset.uid+"]=edit";window.location.href=a})).on("click",'[data-action="version"]',(e=>{const t=e.currentTarget.closest("tr"),a="pages"===t.dataset.table?t.dataset.t3ver_oid:t.dataset.pid;window.location.href=TYPO3.settings.WebLayout.moduleUrl+"&id="+a})).on("click",'[data-action="remove"]',this.confirmDeleteRecordFromWorkspace).on("click",'[data-action="expand"]',(e=>{const t=$(e.currentTarget);let a;a="true"===t.first().attr("aria-expanded")?"actions-caret-down":"actions-caret-right",t.empty().append(this.getIcon(a))})),$(window.top.document).on("click",".t3js-workspace-recipients-selectall",(()=>{$(".t3js-workspace-recipient",window.top.document).not(":disabled").prop("checked",!0)})).on("click",".t3js-workspace-recipients-deselectall",(()=>{$(".t3js-workspace-recipient",window.top.document).not(":disabled").prop("checked",!1)})),this.elements.$searchForm.on("submit",(e=>{e.preventDefault(),this.settings.filterTxt=this.elements.$searchTextField.val(),this.getWorkspaceInfos()})),this.elements.$searchTextField.on("keyup",(e=>{""!==e.target.value?this.elements.$searchSubmitBtn.removeClass("disabled"):(this.elements.$searchSubmitBtn.addClass("disabled"),this.getWorkspaceInfos())}));const e=this.elements.$searchTextField.get(0);void 0!==e&&e.clearable({onClear:()=>{this.elements.$searchSubmitBtn.addClass("disabled"),this.settings.filterTxt="",this.getWorkspaceInfos()}}),new RegularEvent("multiRecordSelection:checkbox:state:changed",this.handleCheckboxStateChanged).bindTo(document),this.elements.$depthSelector.on("change",(e=>{const t=e.target.value;Persistent.set("moduleData.workspaces_admin.depth",t),this.settings.depth=t,this.getWorkspaceInfos()})),this.elements.$previewLinksButton.on("click",this.generatePreviewLinks),this.elements.$languageSelector.on("change",(e=>{const t=$(e.target);Persistent.set("moduleData.workspaces_admin.language",t.val()),this.settings.language=t.val(),this.sendRemoteRequest(this.generateRemotePayload("getWorkspaceInfos",this.settings)).then((async e=>{const a=await e.resolve();this.elements.$languageSelector.prev().html(t.find(":selected").data("icon")),this.renderWorkspaceInfos(a[0].result)}))})),this.elements.$stagesSelector.on("change",(e=>{const t=e.target.value;Persistent.set("moduleData.workspaces_admin.stage",t),this.settings.stage=t,this.getWorkspaceInfos()})),this.elements.$chooseStageAction.on("change",this.sendToSpecificStageAction),this.elements.$chooseSelectionAction.on("change",this.runSelectionAction),this.elements.$chooseMassAction.on("change",this.runMassAction),this.elements.$pagination.on("click","[data-action]",(e=>{e.preventDefault();const t=$(e.currentTarget);let a=!1;switch(t.data("action")){case"previous":this.paging.currentPage>1&&(this.paging.currentPage--,a=!0);break;case"next":this.paging.currentPage<this.paging.totalPages&&(this.paging.currentPage++,a=!0);break;case"page":this.paging.currentPage=parseInt(t.data("page"),10),a=!0;break;default:throw'Unknown action "'+t.data("action")+'"'}a&&(this.settings.start=parseInt(this.settings.limit.toString(),10)*(this.paging.currentPage-1),this.getWorkspaceInfos())}))}sendToStage(e,t){let a,s,n;if("next"===t)a=e.data("nextStage"),s="sendToNextStageWindow",n="sendToNextStageExecute";else{if("prev"!==t)throw"Invalid direction given.";a=e.data("prevStage"),s="sendToPrevStageWindow",n="sendToPrevStageExecute"}this.sendRemoteRequest(this.generateRemoteActionsPayload(s,[e.data("uid"),e.data("table"),e.data("t3ver_oid")])).then((async t=>{const s=this.renderSendToStageWindow(await t.resolve());s.addEventListener("button.clicked",(t=>{if("ok"===t.target.name){const t=Utility.convertFormToObject(s.querySelector("form"));t.affects={table:e.data("table"),nextStage:a,t3ver_oid:e.data("t3ver_oid"),uid:e.data("uid"),elements:[]},this.sendRemoteRequest([this.generateRemoteActionsPayload(n,[t]),this.generateRemotePayload("getWorkspaceInfos",this.settings)]).then((async e=>{const t=await e.resolve();s.hideModal(),this.renderWorkspaceInfos(t[1].result),Backend.refreshPageTree()}))}}))}))}getWorkspaceInfos(){this.sendRemoteRequest(this.generateRemotePayload("getWorkspaceInfos",this.settings)).then((async e=>{this.renderWorkspaceInfos((await e.resolve())[0].result)}))}renderWorkspaceInfos(e){this.elements.$tableBody.children().remove(),this.resetMassActionState(e.data.length),this.buildPagination(e.total),0===e.total?(this.elements.$contentsContainer.hide(),this.elements.$noContentsContainer.show()):(this.elements.$contentsContainer.show(),this.elements.$noContentsContainer.hide());for(let t=0;t<e.data.length;++t){const a=e.data[t],s=$("<div />",{class:"btn-group"});let n;const i=a.Workspaces_CollectionChildren>0&&""!==a.Workspaces_CollectionCurrent;s.append(this.getAction(i,"expand",a.expanded?"actions-caret-down":"actions-caret-right").attr("title",TYPO3.lang["tooltip.expand"]).attr("data-bs-target",'[data-collection="'+a.Workspaces_CollectionCurrent+'"]').attr("aria-expanded",!i||a.expanded?"true":"false").attr("data-bs-toggle","collapse"),this.getAction(a.hasChanges,"changes","actions-document-info").attr("title",TYPO3.lang["tooltip.showChanges"]),this.getAction(a.allowedAction_publish&&""===a.Workspaces_CollectionParent,"publish","actions-version-swap-version").attr("title",TYPO3.lang["tooltip.publish"]),this.getAction(a.allowedAction_view,"preview","actions-version-workspace-preview").attr("title",TYPO3.lang["tooltip.viewElementAction"]),this.getAction(a.allowedAction_edit,"open","actions-open").attr("title",TYPO3.lang["tooltip.editElementAction"]),this.getAction(a.allowedAction_versionPageOpen,"version","actions-version-page-open").attr("title",TYPO3.lang["tooltip.openPage"]),this.getAction(a.allowedAction_delete,"remove","actions-version-document-remove").attr("title",TYPO3.lang["tooltip.discardVersion"])),""!==a.integrity.messages&&(n=$("<span>"+this.getIcon(a.integrity.status)+"</span>"),n.attr("title",a.integrity.messages)),this.latestPath!==a.path_Workspace&&(this.latestPath=a.path_Workspace,this.elements.$tableBody.append($("<tr />").append($("<th />"),$("<th />",{colspan:7}).html('<span title="'+a.path_Workspace+'">'+a.path_Workspace_crop+"</span>"))));const o=$("<span />",{class:"form-check form-check-type-toggle"}).append($("<input />",{type:"checkbox",class:"form-check-input t3js-multi-record-selection-check"})),r={"data-uid":a.uid,"data-pid":a.livepid,"data-t3ver_oid":a.t3ver_oid,"data-t3ver_wsid":a.t3ver_wsid,"data-table":a.table,"data-next-stage":a.value_nextStage,"data-prev-stage":a.value_prevStage,"data-stage":a.stage,"data-multi-record-selection-element":"true"};if(""!==a.Workspaces_CollectionParent){const t=e.data.find((e=>e.Workspaces_CollectionCurrent===a.Workspaces_CollectionParent));r["data-collection"]=a.Workspaces_CollectionParent,r.class="collapse"+(t.expanded?" show":"")}else""!==a.Workspaces_CollectionCurrent&&(r["data-collection-current"]=a.Workspaces_CollectionCurrent);this.elements.$tableBody.append($("<tr />",r).append($("<td />",{class:"col-checkbox"}).empty().append(o),$("<td />",{class:"t3js-title-workspace",style:a.Workspaces_CollectionLevel>0?"padding-left: "+this.indentationPadding*a.Workspaces_CollectionLevel+"px":""}).html('<span class="icon icon-size-small">'+this.getIcon(a.icon_Workspace,a.icon_Workspace_Overlay)+'</span>&nbsp;<a href="#" data-action="changes"><span class="workspace-state-'+a.state_Workspace+'" title="'+a.label_Workspace+'">'+a.label_Workspace_crop+"</span></a>"),$("<td />",{class:"t3js-title-live"}).html('<span class="icon icon-size-small">'+this.getIcon(a.icon_Live,a.icon_Live_Overlay)+'</span>&nbsp;<span class"workspace-live-title title="'+a.label_Live+'">'+a.label_Live_crop+"</span>"),$("<td />").text(a.label_Stage),$("<td />").text(a.lastChangedFormatted),$("<td />").empty().append(n),$("<td />").html(this.getIcon(a.language.icon)),$("<td />",{class:"text-end nowrap"}).append(s)))}}buildPagination(e){if(0===e)return void this.elements.$pagination.contents().remove();if(this.paging.totalItems=e,this.paging.totalPages=Math.ceil(e/parseInt(this.settings.limit.toString(),10)),1===this.paging.totalPages)return void this.elements.$pagination.contents().remove();const t=$("<ul />",{class:"pagination"}),a=[],s=$("<li />",{class:"page-item"}).append($("<button />",{class:"page-link",type:"button","data-action":"previous"}).append($("<typo3-backend-icon />",{identifier:"actions-arrow-left-alt",size:"small"}))),n=$("<li />",{class:"page-item"}).append($("<button />",{class:"page-link",type:"button","data-action":"next"}).append($("<typo3-backend-icon />",{identifier:"actions-arrow-right-alt",size:"small"})));1===this.paging.currentPage&&s.addClass("disabled").find("button").prop("disabled",!0),this.paging.currentPage===this.paging.totalPages&&n.addClass("disabled").find("button").prop("disabled",!0);for(let e=1;e<=this.paging.totalPages;e++){const t=$("<li />",{class:"page-item"+(this.paging.currentPage===e?" active":"")});t.append($("<button />",{class:"page-link",type:"button","data-action":"page","data-page":e}).append($("<span />").text(e))),a.push(t)}t.append(s,a,n),this.elements.$pagination.empty().append(t)}openPreview(e){const t=$(e.currentTarget).closest("tr");this.sendRemoteRequest(this.generateRemoteActionsPayload("viewSingleRecord",[t.data("table"),t.data("uid")])).then((async e=>{const t=(await e.resolve())[0].result;windowManager.localOpen(t)}))}renderSelectionActionWizard(e,t){Wizard.addSlide("mass-action-confirmation",TYPO3.lang["window.selectionAction.title"],"<p>"+(new SecurityUtility).encodeHtml(TYPO3.lang["tooltip."+e+"Selected"])+"</p>",SeverityEnum.warning),Wizard.addFinalProcessingSlide((()=>{this.sendRemoteRequest(this.generateRemoteActionsPayload("executeSelectionAction",{action:e,selection:t})).then((()=>{this.markedRecordsForMassAction=[],this.getWorkspaceInfos(),Wizard.dismiss(),Backend.refreshPageTree()}))})).then((()=>{Wizard.show(),Wizard.getComponent().on("wizard-dismissed",(()=>{this.elements.$chooseSelectionAction.val("")}))}))}renderMassActionWizard(e){let t;switch(e){case"publish":t="publishWorkspace";break;case"discard":t="flushWorkspace";break;default:throw"Invalid mass action "+e+" called."}const a=new SecurityUtility;Wizard.setForceSelection(!1),Wizard.addSlide("mass-action-confirmation",TYPO3.lang["window.massAction.title"],"<p>"+a.encodeHtml(TYPO3.lang["tooltip."+e+"All"])+"<br><br>"+a.encodeHtml(TYPO3.lang["tooltip.affectWholeWorkspace"])+"</p>",SeverityEnum.warning);const s=async e=>{const a=(await e.resolve())[0].result;a.processed<a.total?this.sendRemoteRequest(this.generateRemoteMassActionsPayload(t,a)).then(s):(this.getWorkspaceInfos(),Wizard.dismiss())};Wizard.addFinalProcessingSlide((()=>{this.sendRemoteRequest(this.generateRemoteMassActionsPayload(t,{init:!0,total:0,processed:0,language:this.settings.language})).then(s)})).then((()=>{Wizard.show(),Wizard.getComponent().on("wizard-dismissed",(()=>{this.elements.$chooseMassAction.val("")}))}))}getAction(e,t,a){return e?$("<button />",{class:"btn btn-default","data-action":t}).append(this.getIcon(a)):$("<span />",{class:"btn btn-default disabled"}).append(this.getIcon("empty-empty"))}getIcon(e,t=""){switch(e){case"language":e="flags-multiple";break;case"integrity":case"info":e="status-dialog-information";break;case"success":e="status-dialog-ok";break;case"warning":e="status-dialog-warning";break;case"error":e="status-dialog-error"}return"<typo3-backend-icon "+Object.entries({identifier:e,overlay:t,size:"small"}).filter((([e,t])=>e&&""!==t)).map((([e,t])=>`${e}="${t}"`)).join(" ")+"></typo3-backend-icon>"}resetMassActionState(e){this.markedRecordsForMassAction=[],e&&(this.elements.$workspaceActions.removeClass("hidden"),this.elements.$chooseMassAction.prop("disabled",!1)),document.dispatchEvent(new CustomEvent("multiRecordSelection:actions:hide"))}}export default new Backend;