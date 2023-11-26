/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.addAction = (function () {

    var dom = {};
    var state = {
        meetingId: null,
        approvalId: null,
        meetingApprovalActionId: null,

        uploadedFileNames: null,
        uploaderReference: null,
        documentFileName: null,
        multipleFileSelectionNewNameModes: {
            disabled: 0,
            requiredForAll: 1,
            optional: 2
        },

        meetingApprovalActionDocumentId: null
    };

    var tools = motorsazanClient.tools;
    const controllerName = "/AddAction/";


    async function handleAddFormGetUserActiveMeetingComboSelectedIndexChanged() {
        const url = controllerName + "GetUserMeetingApprovalListByMeetingIdAndUserIdCombo";

        tools.hideItem(dom.addFormGetUserActiveMeetingComboError);

        const meetingId = dom.addFormGetUserActiveMeetingCombo.GetValue();

        state.meetingId = meetingId;

        const apiParam = {
            meetingId
        };

        const userMeetingApprovalList = await motorsazanClient.connector.post(url, apiParam);
        dom.addFormGetUserMeetingApprovalListComboParent.html(userMeetingApprovalList);

        setDom();
        dom.addFormGetUserMeetingApprovalListCombo.SetEnabled(true);
    }

    function handleAddFormGetUserMeetingApprovalListComboSelectedIndexChanged() {
        tools.hideItem(dom.addFormGetUserMeetingApprovalListComboError);

        state.approvalId = dom.addFormGetUserMeetingApprovalListCombo.GetValue();

        fillGrid();
    }

    function handelAddFormNewActionDescriptionHtmlEditorLostFocus() {
        tools.hideItem(dom.addFormNewActionDescriptionHtmlEditorError);

        const description = dom.addFormNewActionDescriptionHtmlEditor.GetHtml();
        const descriptionHasValue = !tools.isNullOrEmpty(description);
        if (!descriptionHasValue) {
            tools.showItem(dom.addFormNewActionDescriptionHtmlEditorError);
        }
    }

    async function addNewActionSaveBtnClick() {
        setDom();
        if (!isAddFormValid()) return;

        const url = controllerName + "AddNewActionToApproval";

        const meetingApprovalId = dom.addFormGetUserMeetingApprovalListCombo.GetValue();

        var description = '<div style="text-align: right;">';
        description += dom.addFormNewActionDescriptionHtmlEditor.GetHtml();
        description += "</div>";

        const apiParam = {
            approvalId: meetingApprovalId,
            description
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);
        setDom();

        motorsazanClient.messageModal.success(apiResult);

        fillGrid();
        resetAddForm();
    }

    function isAddFormValid() {
        var isValid = true;

        const meetingId = dom.addFormGetUserActiveMeetingCombo.GetValue();
        const meetingIdHasValue = !tools.isNullOrEmpty(meetingId);
        if (!meetingIdHasValue) {
            isValid = false;
            tools.showItem(dom.addFormGetUserActiveMeetingComboError);
        }

        const meetingApprovalId = dom.addFormGetUserMeetingApprovalListCombo.GetValue();
        const meetingApprovalIdHasValue = !tools.isNullOrEmpty(meetingApprovalId);
        if (!meetingApprovalIdHasValue) {
            isValid = false;
            tools.showItem(dom.addFormGetUserMeetingApprovalListComboError);
        }

        const description = dom.addFormNewActionDescriptionHtmlEditor.GetHtml();
        const descriptionHasValue = !tools.isNullOrEmpty(description);
        if (!descriptionHasValue) {
            isValid = false;
            tools.showItem(dom.addFormNewActionDescriptionHtmlEditorError);
        }

        return isValid;
    }

    async function fillGrid() {
        setDom();

        const url = controllerName + "FillActionGrid";

        const approvalId = !tools.isNullOrEmpty(state.approvalId) ? state.approvalId : -1;

        const apiParam = {
            approvalId
        }

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.actionGridParent.html(gridHtml);

        setDom();
    }

    function resetAddForm() {
        tools.hideItem(dom.addFormGetUserActiveMeetingComboError);
        tools.hideItem(dom.addFormGetUserMeetingApprovalListComboError);
        tools.hideItem(dom.addFormNewActionDescriptionHtmlEditorError);

        dom.addFormGetUserActiveMeetingCombo.SetSelectedIndex(-1);
        dom.addFormGetUserMeetingApprovalListCombo.SetSelectedIndex(-1);
        dom.addFormNewActionDescriptionHtmlEditor.SetHtml();

        dom.addFormGetUserMeetingApprovalListCombo.SetEnabled(false);
    }

    function handleActionGridBeginCallback(command) {
        setDom();

        var approvalId = dom.addFormGetUserMeetingApprovalListCombo.GetValue();
        approvalId = !tools.isNullOrEmpty(approvalId) ? approvalId : -1;

        command.callbackUrl = `${controllerName}FillActionGrid?approvalId=${approvalId}`;
    }

    function handleActionGridCustomBtnClick(source, event) {
        const activeIndex = event.visibleIndex;
        state.meetingApprovalActionId = dom.actionGrid.GetRowKey(activeIndex);

        const buttonId = event.buttonID;
        if (buttonId === "deleteActionGridRowCustomBtn") return showRemoveConfirmMessage(state.meetingApprovalActionId);
        if (buttonId === "addDocumentToActionGridCustomBtn") return addDocumentToActionModal(state.meetingApprovalActionId);
    }

    function showRemoveConfirmMessage(value) {
        setDom();

        motorsazanClient.messageModal.confirm("آیا از حذف این ردیف مطمئن هستید؟",
            () => removeActionPopup(value),
            "تاییدیه حذف");
    }

    async function removeActionPopup(values) {
        const url = controllerName + "DeleteApprovalAction";
        const params = {
            approvalActionId: values
        };

        const result = await motorsazanClient.connector.post(url, params);

        await fillGrid();

        motorsazanClient.messageModal.success(result);
    }

    function addDocumentToActionModal(value) {
        const url = controllerName + "MeetingApprovalActionAttachmentModal";

        const apiParam = {
            meetingApprovalActionId: value
        };
        const title = "افزودن و مشاهده مستندات";
        motorsazanClient.contentModal.ajaxShow(title, url, apiParam, initMainStockPackageDetailModal, true, false);
    }

    function initMainStockPackageDetailModal() {
        mainStockPackageDetailModalSetDom();

        state.uploaderReference.enable();
    }

    function mainStockPackageDetailModalSetDom() {
        ////-------------- Uploader
        state.uploaderReference = null;
        state.uploadedFileNames = null;

        initUploader();
        dom.meetingApprovalActionAttachmentUploaderError = $("#meetingApprovalActionAttachmentUploaderError");

        ////-------------- MeetingApprovalActionAttachmentGrid
        dom.meetingApprovalActionAttachmentGrid = ASPxClientGridView.Cast("meetingApprovalActionAttachmentGrid");
        dom.meetingApprovalActionAttachmentGridParent = $("#meetingApprovalActionAttachmentGridParent");
    }

    function initUploader() {
        state.uploaderReference = new motorsazanClient.uploader().create({
            accept: "image/*,compress/*,excel/*,document/*,powerpoint/*,.cdr,.pdf,.PDF,.Pdf,.cdr,.sldprt,.sldasm ,.slddrw,.psd",
            id: "meetingApprovalActionAttachmentUploader",
            uploadCallback: uploadAttachment,
            deleteUploadedFilesCallback: removeUploadedAttachments,
            maxSize: 3 * 1024, // 500 MB
            isMultipleSelection: false,
            multipleSelectionConfig: {
                numberOfMinimumFileCanBeSelected: 1,
                numberOfMaximumFileCanBeSelected: 1,
                newNameForSelectedFilesMode: state.multipleFileSelectionNewNameModes.optional,
                newNameInputPlaceHolderWhenNewNameIsRequired: "توضیحات را وارد کنید"
            },
            isLargeFileUploader: false,
            showDemoLinksAfterUpload: false
        });
    }

    async function uploadAttachment(base64Values, fileNames) {
        const url = controllerName + "AddUploadAttachments";
        state.documentFileName = fileNames;
        if (!isUploadValid()) {
            tools.hideItem($("#avatarUploaderDemoLinks"));
            return;
        }
        const extensions = fileNames.split(".").slice(-1).map(ex => `.${ex}`);

        //const fileDetails = fileNames.map(fileName => ({ fileName }));

        const apiParam = {
            meetingApprovalActionId: state.meetingApprovalActionId,
            base64Values: base64Values,
            fileExtensions: extensions
        };

        const uploadedFileNames = await motorsazanClient.connector.post(url, apiParam);
        const fileTitles = fileNames.split(".").slice(0).map(ex => `.${ex}`);

        state.uploaderReference.saveNameOfUploadedFiles(state.documentFileName);
        await fillMeetingApprovalActionAttachmentGrid();
    }

    function isUploadValid() {
        const fileName = state.documentFileName;

        let isValid = true;

        tools.hideItem(dom.meetingApprovalActionAttachmentUploaderError);

        if (tools.isNullOrEmpty(fileName)) {
            isValid = false;
            tools.showItem(dom.meetingApprovalActionAttachmentUploaderError);
        }

        return isValid;
    }

    async function removeUploadedAttachments(fileName) {
        state.documentFileName = null;

        state.uploadedFileNames = null;
        state.userFileTitle = null;
        tools.hideItem(dom.meetingApprovalActionAttachmentUploaderError);
    }

    async function fillMeetingApprovalActionAttachmentGrid() {
        mainStockPackageDetailModalSetDom();

        const url = controllerName + "FillMeetingApprovalActionAttachmentGrid";

        const meetingApprovalActionId = !tools.isNullOrEmpty(state.meetingApprovalActionId) ? state.meetingApprovalActionId : -1;

        const apiParam = {
            meetingApprovalActionId
        }

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.meetingApprovalActionAttachmentGridParent.html(gridHtml);

        mainStockPackageDetailModalSetDom();
        setDom();
    }

    function handleMeetingApprovalActionAttachmentGridBeginCallback(command) {
        mainStockPackageDetailModalSetDom();

        command.callbackUrl = `${controllerName}FillMeetingApprovalActionAttachmentGrid?meetingApprovalActionId=${state.meetingApprovalActionId}`;
    }

    function handleMeetingApprovalActionAttachmentGridCustomBtnClick(source, event) {
        setDom();
        mainStockPackageDetailModalSetDom();

        state.meetingApprovalActionDocumentId = dom.meetingApprovalActionAttachmentGrid.GetRowKey(event.visibleIndex);
        const customBtnId = event.buttonID;

        if (customBtnId === "getUploadedMemberBtn") return showUploadedDocumentFile(state.meetingApprovalActionDocumentId);
        if (customBtnId === "removeUploadedMemberBtn") return showRemoveDocumentConfirmation(state.meetingApprovalActionDocumentId);
    }

    function showRemoveDocumentConfirmation(meetingApprovalActionDocumentId) {
        motorsazanClient.messageModal.confirm("آیا از حذف این فایل مطمئن هستید؟",
            () => removeMeetingApprovalActionDocumentPopup(meetingApprovalActionDocumentId),
            "تاییدیه حذف");
    }

    async function removeMeetingApprovalActionDocumentPopup(meetingApprovalActionDocumentId) {
        const url = controllerName + "RemoveMeetingApprovalActionDocument";

        const params = {
            meetingApprovalActionDocumentId
        };

        const result = await motorsazanClient.connector.post(url, params);

        await fillMeetingApprovalActionAttachmentGrid();
        motorsazanClient.messageModal.success(result);
    }

    function showUploadedDocumentFile(meetingApprovalActionDocumentId) {
        const downloadAddresses = (`${controllerName}GetMeetingApprovalActionAttachmentFileById?meetingApprovalActionDocumentId=${meetingApprovalActionDocumentId}`);

        window.open(downloadAddresses, "_blank");
    }

    function init() {
        setDom();
        setEvents();
    }

    function setDom() {
        dom.addFormGetUserActiveMeetingCombo = ASPxClientComboBox.Cast("addFormGetUserActiveMeetingCombo");
        dom.addFormGetUserActiveMeetingComboError = $("#addFormGetUserActiveMeetingComboError");
        dom.addFormGetUserActiveMeetingComboParent = $("#addFormGetUserActiveMeetingComboParent");

        dom.addFormGetUserMeetingApprovalListCombo = ASPxClientComboBox.Cast("addFormGetUserMeetingApprovalListCombo");
        dom.addFormGetUserMeetingApprovalListComboError = $("#addFormGetUserMeetingApprovalListComboError");
        dom.addFormGetUserMeetingApprovalListComboParent = $("#addFormGetUserMeetingApprovalListComboParent");

        dom.addFormNewActionDescriptionHtmlEditor = ASPxClientHtmlEditor.Cast("addFormNewActionDescriptionHtmlEditor");
        dom.addFormNewActionDescriptionHtmlEditorError = $("#addFormNewActionDescriptionHtmlEditorError");
        dom.addFormNewActionDescriptionHtmlEditorParent = $("#addFormNewActionDescriptionHtmlEditorParent");

        ////-------------- Grid
        dom.actionGridParent = $("#actionGridParent");
        dom.actionGrid = ASPxClientGridView.Cast("actionGrid");
    }

    function setEvents() {
        dom.addFormGetUserMeetingApprovalListCombo.SetEnabled(false);
    }

    $(document).ready(init);

    return {
        handleAddFormGetUserActiveMeetingComboSelectedIndexChanged: handleAddFormGetUserActiveMeetingComboSelectedIndexChanged,
        handleAddFormGetUserMeetingApprovalListComboSelectedIndexChanged: handleAddFormGetUserMeetingApprovalListComboSelectedIndexChanged,
        handelAddFormNewActionDescriptionHtmlEditorLostFocus: handelAddFormNewActionDescriptionHtmlEditorLostFocus,
        addNewActionSaveBtnClick: addNewActionSaveBtnClick,
        handleActionGridBeginCallback: handleActionGridBeginCallback,
        handleActionGridCustomBtnClick: handleActionGridCustomBtnClick,
        handleMeetingApprovalActionAttachmentGridBeginCallback: handleMeetingApprovalActionAttachmentGridBeginCallback,
        handleMeetingApprovalActionAttachmentGridCustomBtnClick: handleMeetingApprovalActionAttachmentGridCustomBtnClick
    };
})();