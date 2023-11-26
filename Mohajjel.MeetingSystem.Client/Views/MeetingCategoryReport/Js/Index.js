/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_LoadingModal.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.meetingCategoryReport = (function () {

    var dom = {};
    var state = {
        meetingCategoryId: null,

        customPeriodId: "CustomPeriod",
        persianStartDate: null,
        persianEndDate: null,
        datePeriodType: null,

        meetingId: null

    };

    var tools = motorsazanClient.tools;
    const controllerName = "/MeetingCategoryReport/";


    function handleFilterFormGetAllMeetingCategoryComboSelectedIndexChanged() {
        tools.hideItem(dom.filterFormGetAllMeetingCategoryComboError);
    }

    function handleFilterFormGetDataTypeComboSelectedIndexChange() {
        tools.hideItem(dom.filterFormGetDataTypeComboError);

        const selectedDateId = dom.filterFormGetDataTypeCombo.GetValue();

        if (selectedDateId === state.customPeriodId) {
            tools.showItem(dom.filterFormDateComboSpecialDateDesign);
            dom.filterFormGetDataTypeComboDesign.removeClass("col-xs-12 col-md-12 col-lg-12").addClass("col-xs-12 col-md-6 col-lg-6");

        } else {
            tools.hideItem(dom.filterFormDateComboSpecialDateDesign);
            dom.filterFormGetDataTypeComboDesign.removeClass("col-xs-12 col-md-6 col-lg-6").addClass("col-xs-12 col-md-12 col-lg-12");

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

    function showMeetingCategoryReportListBtnClick() {
        setDom();
        if (!isFilterFormValid()) return;

        state.persianStartDate = dom.filterFormPeriodStartDatePicker.val();
        state.persianEndDate = dom.filterFormPeriodEndDatePicker.val();
        state.datePeriodType = dom.filterFormGetDataTypeCombo.GetValue();

        fillGrid();
    }

    function isFilterFormValid() {
        var isValid = true;

        tools.hideItem(dom.filterFormGetAllMeetingCategoryComboError);
        const meetingCategoryId = dom.filterFormGetAllMeetingCategoryCombo.GetValue();
        const meetingCategoryIdHasValue = !tools.isNullOrEmpty(meetingCategoryId);
        if (!meetingCategoryIdHasValue) {
            isValid = false;
            tools.showItem(dom.filterFormGetAllMeetingCategoryComboError);
        }

        tools.hideItem(dom.filterFormGetDataTypeComboError);
        const selectedDateId = dom.filterFormGetDataTypeCombo.GetValue();
        const selectedDateIdHasValue = !tools.isNullOrEmpty(selectedDateId);
        if (!selectedDateIdHasValue) {
            isValid = false;
            tools.showItem(dom.filterFormGetDataTypeComboError);
        }

        if (selectedDateId === state.customPeriodId) {

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

        const url = controllerName + "FillMeetingCategoryReportGrid";

        state.meetingCategoryId = dom.filterFormGetAllMeetingCategoryCombo.GetValue();
        state.persianStartDate = dom.filterFormPeriodStartDatePicker.val();
        state.persianEndDate = dom.filterFormPeriodEndDatePicker.val();
        state.datePeriodType = dom.filterFormGetDataTypeCombo.GetValue();

        const apiParam = {
            meetingCategoryId: state.meetingCategoryId,
            persianStartDate: state.persianStartDate,
            persianEndDate: state.persianEndDate,
            datePeriodType: state.datePeriodType
        };

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.meetingCategoryReportGridParent.html(gridHtml);

        setDom();
    }

    function handleMeetingCategoryReportGridBeginCallback(command) {
        setDom();

        command.callbackUrl =
            `${controllerName}FillMeetingCategoryReportGrid?meetingCategoryId=${state.meetingCategoryId}&persianStartDate=${state.persianStartDate}&persianEndDate=
            ${state.persianEndDate}&datePeriodType=${state.datePeriodType}`;
    }

    function handleMeetingCategoryReportGridCustomBtnClick(source, event) {
        const activeIndex = event.visibleIndex;
        state.meetingId = dom.meetingCategoryReportGrid.GetRowKey(activeIndex);

        const buttonId = event.buttonID;
        if (buttonId === "showViewerPopupCustomBtn") return showViewerPopupForMeeting(state.meetingId);
        if (buttonId === "printCustomBtn") return window.open(`/print/Print?meetingId=${state.meetingId}`);
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
        dom.filterFormGetAllMeetingCategoryCombo = ASPxClientComboBox.Cast("filterFormGetAllMeetingCategoryCombo");
        dom.filterFormGetAllMeetingCategoryComboError = $("#filterFormGetAllMeetingCategoryComboError");
        dom.filterFormGetAllMeetingCategoryComboParent = $("#filterFormGetAllMeetingCategoryComboParent");

        dom.filterFormDateComboSpecialDateDesign = $("#filterFormDateComboSpecialDateDesign");

        dom.filterFormGetDataTypeCombo = ASPxClientComboBox.Cast("filterFormGetDataTypeCombo");
        dom.filterFormGetDataTypeComboError = $("#filterFormGetDataTypeComboError");
        dom.filterFormGetDataTypeComboParent = $("#filterFormGetDataTypeComboParent");
        dom.filterFormGetDataTypeComboDesign = $("#filterFormGetDataTypeComboDesign");

        dom.filterFormPeriodStartDatePicker = $("#filterFormPeriodStartDatePicker");
        dom.filterFormPeriodStartDatePickerParent = $("#filterFormPeriodStartDatePickerParent");
        dom.filterFormPeriodStartDatePickerError = $("#filterFormPeriodStartDatePickerError");

        dom.filterFormPeriodEndDatePicker = $("#filterFormPeriodEndDatePicker");
        dom.filterFormPeriodEndDatePickerParent = $("#filterFormPeriodEndDatePickerParent");
        dom.filterFormPeriodEndDatePickerError = $("#filterFormPeriodEndDatePickerError");

        ////-------------- Grid
        dom.meetingCategoryReportGridParent = $("#meetingCategoryReportGridParent");
        dom.meetingCategoryReportGrid = ASPxClientGridView.Cast("meetingCategoryReportGrid");
    }

    function setEvents() {
        dom.filterFormPeriodStartDatePicker.change(handleFilterFormPeriodStartDatePickerSelectionChange);
        dom.filterFormPeriodEndDatePicker.change(handleFilterFormPeriodEndDatePickerSelectionChange);
    }

    $(document).ready(init);

    return {
        handleFilterFormGetAllMeetingCategoryComboSelectedIndexChanged: handleFilterFormGetAllMeetingCategoryComboSelectedIndexChanged,
        handleFilterFormGetDataTypeComboSelectedIndexChange: handleFilterFormGetDataTypeComboSelectedIndexChange,
        showMeetingCategoryReportListBtnClick: showMeetingCategoryReportListBtnClick,
        handleMeetingCategoryReportGridBeginCallback: handleMeetingCategoryReportGridBeginCallback,
        handleMeetingCategoryReportGridCustomBtnClick: handleMeetingCategoryReportGridCustomBtnClick,
        handleShowViewerGridBeginCallback: handleShowViewerGridBeginCallback
    };
})();