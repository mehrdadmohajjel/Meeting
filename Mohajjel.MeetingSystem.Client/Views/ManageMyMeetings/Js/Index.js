/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_LoadingModal.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.manageMyMeetings = (function () {

    var dom = {};
    var state = {
        lastWeek: 1,
        currentWeek: 2,
        nextWeek: 3,
        specialDate: 4,

        specialDateText: "SpecialDate",

        persianStartDate: null,
        persianEndDate: null,
        dateType: null,

        meetingId: null,

        meetingTranscriptId: null
    };

    var tools = motorsazanClient.tools;
    const controllerName = "/ManageMyMeetings/";


    function handleFilterFormGetDataTypeComboSelectedIndexChange() {
        tools.hideItem(dom.filterFormGetDataTypeComboError);
        tools.hideItem(dom.filterFormPeriodStartDatePickerError);
        tools.hideItem(dom.filterFormPeriodEndDatePickerError);

        const selectedDateId = dom.filterFormGetDataTypeCombo.GetValue();
        if (selectedDateId === state.specialDateText) {
            tools.showItem(dom.filterFormPeriodCustomDatePickerParent);
        } else {
            tools.hideItem(dom.filterFormPeriodCustomDatePickerParent);
            dom.filterFormPeriodStartDatePicker.val("");
            dom.filterFormPeriodEndDatePicker.val("");
        }
    }

    function handleFilterFormPeriodStartDatePickerSelectionChange() {
        tools.hideItem(dom.filterFormPeriodStartDatePickerError);
    }

    function handleFilterFormPeriodEndDatePickerSelectionChange() {
        tools.hideItem(dom.filterFormPeriodEndDatePickerError);
    }

    function showMeetingListBtnClick() {
        setDom();
        if (!isFilterFormValid()) return;

        state.persianStartDate = dom.filterFormPeriodStartDatePicker.val();
        state.persianEndDate = dom.filterFormPeriodEndDatePicker.val();
        state.dateType = dom.filterFormGetDataTypeCombo.GetValue();

        fillGrid();
    }

    function isFilterFormValid() {
        var isValid = true;

        tools.hideItem(dom.filterFormGetDataTypeComboError);
        const selectedDateId = dom.filterFormGetDataTypeCombo.GetValue();
        const selectedDateIdHasValue = !tools.isNullOrEmpty(selectedDateId);
        if (!selectedDateIdHasValue) {
            isValid = false;
            tools.showItem(dom.filterFormGetDataTypeComboError);
        }

        if (selectedDateId === state.specialDateText) {

            tools.hideItem(dom.filterFormPeriodStartDatePickerError);
            const startDate = dom.filterFormPeriodStartDatePicker.val();
            const isStartDateValid = tools.isValidPersianDate(startDate);
            if (!isStartDateValid) {
                isValid = false;
                tools.showItem(dom.filterFormPeriodStartDatePickerError);
            }

            tools.hideItem(dom.filterFormPeriodEndDatePickerError);
            const endDate = dom.filterFormPeriodEndDatePicker.val();
            const isEndDateValid = tools.isValidPersianDate(endDate);
            if (!isEndDateValid) {
                isValid = false;
                tools.showItem(dom.filterFormPeriodEndDatePickerError);
            }
        }

        return isValid;
    }

    async function fillGrid() {
        setDom();

        const url = controllerName + "FillManageMyMeetingsGrid";

        const apiParam = {
            persianStartDate: state.persianStartDate,
            persianEndDate: state.persianEndDate,
            dateType: state.dateType
        };

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.manageMyMeetingsGridParent.html(gridHtml);

        setDom();
    }

    function handleManageMyMeetingsGridBeginCallback(command) {
        setDom();

        command.callbackUrl =
            `${controllerName}FillManageMyMeetingsGrid?persianStartDate=${state.persianStartDate}&persianEndDate=
            ${state.persianEndDate}&dateType=${state.dateType}`;
    }

    function handleManageMyMeetingsGridCustomBtnClick(source, event) {
        const activeIndex = event.visibleIndex;
        state.meetingId = dom.manageMyMeetingsGrid.GetRowKey(activeIndex);

        const buttonId = event.buttonID;
        if (buttonId === "showSendTranscriptPopupForMeetingCustomBtn") return showSendTranscriptPopupForMeeting(state.meetingId);
        if (buttonId === "showViewerPopupCustomBtn") return showViewerPopupForMeeting(state.meetingId);
        if (buttonId === "printCustomBtn") return window.open(`/print/Print?meetingId=${state.meetingId}`);
    }

    function showSendTranscriptPopupForMeeting(value) {
        const url = controllerName + "SendTranscriptModal";

        const apiParam = {
            meetingId: value
        };
        const title = "ارسال رونوشت";
        motorsazanClient.contentModal.ajaxShow(title, url, apiParam, initSendTranscriptModal, true, false);
    }

    function initSendTranscriptModal() {
        sendTranscriptModalSetDom();
    }

    function sendTranscriptModalSetDom() {
        dom.sendTranscriptReceiverListCombo = ASPxClientComboBox.Cast("sendTranscriptReceiverListCombo");
        dom.sendTranscriptReceiverListComboParent = $("#sendTranscriptReceiverListComboParent");
        dom.sendTranscriptReceiverListComboError = $("#sendTranscriptReceiverListComboError");

        dom.sendTranscriptDescriptionMemo = ASPxClientMemo.Cast("sendTranscriptDescriptionMemo");
        dom.sendTranscriptDescriptionMemoParent = $("#sendTranscriptDescriptionMemoParent");
        dom.sendTranscriptDescriptionMemoError = $("#sendTranscriptDescriptionMemoError");

        dom.sendTranscriptGrid = ASPxClientGridView.Cast("sendTranscriptGrid");
        dom.sendTranscriptGridParent = $("#sendTranscriptGridParent");
    }

    function handleSendTranscriptReceiverListComboChanged() {
        tools.hideItem(dom.sendTranscriptReceiverListComboError);
    }

    function handleSendTranscriptDescriptionMemoValueChanged() {
        tools.hideItem(dom.sendTranscriptDescriptionMemoError);
        const description = dom.sendTranscriptDescriptionMemo.GetValue();
        const isDescriptionValid = !tools.isNullOrEmpty(description);
        if (!isDescriptionValid) {
            tools.showItem(dom.sendTranscriptDescriptionMemoError);
        }
    }

    async function sendTranscriptBtnClick() {
        setDom();
        sendTranscriptModalSetDom();

        if (!isSendTranscriptFormValid()) return;

        const url = controllerName + "AddNewMeetingTranscript";

        const receiverUserId = dom.sendTranscriptReceiverListCombo.GetValue();
        const description = dom.sendTranscriptDescriptionMemo.GetValue();

        const apiParam = {
            reciverUserId: receiverUserId,
            meetingId: state.meetingId,
            description
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);
        setDom();
        sendTranscriptModalSetDom();

        motorsazanClient.messageModal.success(apiResult);

        fillSendTranscriptGrid();
        resetSendTranscriptForm();
    }

    function isSendTranscriptFormValid() {
        var isValid = true;

        tools.hideItem(dom.sendTranscriptReceiverListComboError);
        const receiverUserId = dom.sendTranscriptReceiverListCombo.GetValue();
        const receiverUserIdHasValue = !tools.isNullOrEmpty(receiverUserId);
        if (!receiverUserIdHasValue) {
            isValid = false;
            tools.showItem(dom.sendTranscriptReceiverListComboError);
        }

        tools.hideItem(dom.sendTranscriptDescriptionMemoError);
        const description = dom.sendTranscriptDescriptionMemo.GetValue();
        const isDescriptionValid = !tools.isNullOrEmpty(description);
        if (!isDescriptionValid) {
            isValid = false;
            tools.showItem(dom.sendTranscriptDescriptionMemoError);
        }

        return isValid;
    }

    async function fillSendTranscriptGrid() {
        setDom();

        const url = controllerName + "FillSendTranscriptGrid";

        const apiParam = {
            meetingId: state.meetingId
        }

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.sendTranscriptGridParent.html(gridHtml);

        setDom();
    }

    function handleSendTranscriptGridBeginCallback(command) {
        setDom();

        command.callbackUrl =
            `${controllerName}FillSendTranscriptGrid?meetingId=${state.meetingId}`;
    }

    function resetSendTranscriptForm() {
        tools.hideItem(dom.sendTranscriptReceiverListComboError);
        tools.hideItem(dom.sendTranscriptDescriptionMemoError);

        dom.sendTranscriptReceiverListCombo.SetSelectedIndex(-1);
        dom.sendTranscriptReceiverListCombo.SetSelectedIndex(-1);
        dom.sendTranscriptDescriptionMemo.SetText("");
    }

    function handleSendTranscriptGridCustomBtnClick(source, event) {
        sendTranscriptModalSetDom();
        const activeIndex = event.visibleIndex;
        state.meetingTranscriptId = dom.sendTranscriptGrid.GetRowKey(activeIndex);

        const buttonId = event.buttonID;
        if (buttonId === "removeTranscriptBtn")
            return showRemoveConfirmMessage(state.meetingTranscriptId);
    }

    function showRemoveConfirmMessage(value) {
        setDom();
        sendTranscriptModalSetDom();
        motorsazanClient.messageModal.confirm("آیا از حذف این ردیف مطمئن هستید؟", () => removeTranscriptPopup(value), "تاییدیه حذف");
    }

    async function removeTranscriptPopup(value) {
        const url = controllerName + "DeleteMeetingTranscript";

        const params = {
            meetingTranscriptId: value
        };

        const result = await motorsazanClient.connector.post(url, params);

        await fillSendTranscriptGrid();

        motorsazanClient.messageModal.success(result);
    }

    function showViewerPopupForMeeting(value) {
        const url = controllerName + "ShowViewerPopupForMeetingModal";

        const apiParam = {
            meetingId: value
        };
        const title = "مشاهده بازدیدکنندگان";
        motorsazanClient.contentModal.ajaxShow(title, url, apiParam, initShowViewerPopupForMeetingModal, true, false);
    }

    function initShowViewerPopupForMeetingModal() {
        showViewerPopupForMeetingModalSetDom();
    }

    function showViewerPopupForMeetingModalSetDom() {
        dom.showViewerGrid = ASPxClientGridView.Cast("showViewerGrid");
        dom.showViewerGridParent = $("#showViewerGridParent");
    }

    function handleShowViewerGridBeginCallback(command) {
        setDom();

        command.callbackUrl =
            `${controllerName}FillShowViewerGrid?meetingId=${state.meetingId}`;
    }

    function init() {
        setDom();
        setEvents();
    }

    function setDom() {
        dom.filterFormGetDataTypeCombo = ASPxClientComboBox.Cast("filterFormGetDataTypeCombo");
        dom.filterFormGetDataTypeComboError = $("#filterFormGetDataTypeComboError");
        dom.filterFormGetDataTypeComboParent = $("#filterFormGetDataTypeComboParent");

        dom.filterFormPeriodCustomDatePickerParent = $("#filterFormPeriodCustomDatePickerParent");

        dom.filterFormPeriodStartDatePicker = $("#filterFormPeriodStartDatePicker");
        dom.filterFormPeriodStartDatePickerParent = $("#filterFormPeriodStartDatePickerParent");
        dom.filterFormPeriodStartDatePickerError = $("#filterFormPeriodStartDatePickerError");

        dom.filterFormPeriodEndDatePicker = $("#filterFormPeriodEndDatePicker");
        dom.filterFormPeriodEndDatePickerParent = $("#filterFormPeriodEndDatePickerParent");
        dom.filterFormPeriodEndDatePickerError = $("#filterFormPeriodEndDatePickerError");

        ////-------------- Grid
        dom.manageMyMeetingsGridParent = $("#manageMyMeetingsGridParent");
        dom.manageMyMeetingsGrid = ASPxClientGridView.Cast("manageMyMeetingsGrid");
    }

    function setEvents() {
        dom.filterFormPeriodStartDatePicker.change(handleFilterFormPeriodStartDatePickerSelectionChange);
        dom.filterFormPeriodEndDatePicker.change(handleFilterFormPeriodEndDatePickerSelectionChange);
    }

    $(document).ready(init);

    return {
        handleFilterFormGetDataTypeComboSelectedIndexChange: handleFilterFormGetDataTypeComboSelectedIndexChange,
        showMeetingListBtnClick: showMeetingListBtnClick,
        handleManageMyMeetingsGridBeginCallback: handleManageMyMeetingsGridBeginCallback,
        handleManageMyMeetingsGridCustomBtnClick: handleManageMyMeetingsGridCustomBtnClick,
        handleShowViewerGridBeginCallback: handleShowViewerGridBeginCallback,
        handleSendTranscriptReceiverListComboChanged: handleSendTranscriptReceiverListComboChanged,
        handleSendTranscriptDescriptionMemoValueChanged: handleSendTranscriptDescriptionMemoValueChanged,
        sendTranscriptBtnClick: sendTranscriptBtnClick,
        handleSendTranscriptGridBeginCallback: handleSendTranscriptGridBeginCallback,
        handleSendTranscriptGridCustomBtnClick: handleSendTranscriptGridCustomBtnClick
    };
})();