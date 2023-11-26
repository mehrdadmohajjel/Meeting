/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.approvalActionReport = (function () {

    var dom = {};
    var state = {
        userId: null,
        dateType: null,
        persianStartDate: null,
        persianEndDate: null,
        customPeriodId: "CustomPeriod"
    };

    var tools = motorsazanClient.tools;
    const controllerName = "/ApprovalActionReport/";

    function handleGetAllUserListComboChanged() {
        tools.hideItem(dom.getAllUserListComboError);
    }

    function handleFilterFormDateComboSelectedIndexChange() {
        tools.hideItem(dom.filterFormDateComboError);

        const selectedDateId = dom.filterFormDateCombo.GetValue();

        if (selectedDateId === state.customPeriodId) {
            tools.showItem(dom.filterFormDateComboSpecialDateDesign);
            dom.filterFormDateComboDesign.removeClass("col-xs-12 col-md-12 col-lg-12").addClass("col-xs-12 col-md-6 col-lg-6");

        } else {
            tools.hideItem(dom.filterFormDateComboSpecialDateDesign);
            dom.filterFormDateComboDesign.removeClass("col-xs-12 col-md-6 col-lg-6").addClass("col-xs-12 col-md-12 col-lg-12");

            dom.filterFormPeriodStartDatePicker.val("");
            dom.filterFormPeriodEndDatePicker.val("");
        }
    }

    function handleFilterFormPeriodEndDatePickerSelectionChange() {
        tools.hideItem(dom.filterFormPeriodEndDatePickerError);
    }

    function handleFilterFormPeriodStartDatePickerSelectionChange() {
        tools.hideItem(dom.filterFormPeriodStartDatePickerError);
    }

    function showApprovalActionReportListBtnClick() {
        fillGrid();
    }

    async function fillGrid() {
        if (!isFilterFormValid())
            return;

        const url = controllerName + "FillApprovalActionReportGrid";

        state.dateType = dom.filterFormDateCombo.GetValue();
        state.persianStartDate = dom.filterFormPeriodStartDatePicker.val();
        state.persianEndDate = dom.filterFormPeriodEndDatePicker.val();
        state.userId = dom.getAllUserListCombo.GetValue();

        const apiParam = {
            userId: state.userId,
            persianStartDate: state.persianStartDate,
            persianEndDate: state.persianEndDate,
            datePeriodType: state.dateType
        };

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.approvalActionReportGridParent.html(gridHtml);
        setDom();
    }

    function isFilterFormValid(shouldDisplayValidationErrors = true) {
        var isValid = true;

        tools.hideItem(dom.getAllUserListComboError);
        const userId = dom.getAllUserListCombo.GetValue();
        const isUserIdSelected = !tools.isNullOrEmpty(userId);
        if (!isUserIdSelected) {
            isValid = false;
            shouldDisplayValidationErrors && tools.showItem(dom.getAllUserListComboError);
        }

        tools.hideItem(dom.filterFormDateComboError);
        const dateId = dom.filterFormDateCombo.GetValue();
        const isDateSelected = !tools.isNullOrEmpty(dateId);
        if (!isDateSelected) {
            isValid = false;
            shouldDisplayValidationErrors && tools.showItem(dom.filterFormDateComboError);
        }

        tools.hideItem(dom.filterFormPeriodStartDatePickerError);
        tools.hideItem(dom.filterFormPeriodEndDatePickerError);

        if (dateId === state.customPeriodId) {
            const periodStart = dom.filterFormPeriodStartDatePicker.val();
            const isPeriodStartSelected = !tools.isNullOrEmpty(periodStart);
            if (!isPeriodStartSelected) {
                isValid = false;
                shouldDisplayValidationErrors && tools.showItem(dom.filterFormPeriodStartDatePickerError);
            }

            const periodEnd = dom.filterFormPeriodEndDatePicker.val();
            const isPeriodEndSelected = !tools.isNullOrEmpty(periodEnd);
            if (!isPeriodEndSelected) {
                isValid = false;
                shouldDisplayValidationErrors && tools.showItem(dom.filterFormPeriodEndDatePickerError);
            };
        }

        return isValid;
    }

    function handleApprovalActionReportGridBeginCallback(command) {
        command.callbackUrl =
            controllerName +
            "FillApprovalActionReportGrid" +
            "?userId=" +
            state.userId +
            "&persianStartDate=" +
            state.persianStartDate +
            "&persianEndDate=" +
            state.persianEndDate +
            "&datePeriodType=" +
            state.dateType;
    }

    function init() {
        setDom();
        setEvents();
    }

    function setDom() {
        dom.getAllUserListCombo = ASPxClientComboBox.Cast("getAllUserListCombo");
        dom.getAllUserListComboParent = $("#getAllUserListComboParent");
        dom.getAllUserListComboError = $("#getAllUserListComboError");

        dom.filterFormDateCombo = ASPxClientComboBox.Cast("filterFormDateCombo");
        dom.filterFormDateComboError = $("#filterFormDateComboError");
        dom.filterFormDateComboParent = $("#filterFormDateComboParent");
        dom.filterFormDateComboDesign = $("#filterFormDateComboDesign");

        dom.filterFormDateComboSpecialDateDesign = $("#filterFormDateComboSpecialDateDesign");

        dom.filterFormPeriodStartDatePicker = $("#filterFormPeriodStartDatePicker");
        dom.filterFormPeriodStartDatePickerParent = $("#filterFormPeriodStartDatePickerParent");
        dom.filterFormPeriodStartDatePickerError = $("#filterFormPeriodStartDatePickerError");

        dom.filterFormPeriodEndDatePicker = $("#filterFormPeriodEndDatePicker");
        dom.filterFormPeriodEndDatePickerParent = $("#filterFormPeriodEndDatePickerParent");
        dom.filterFormPeriodEndDatePickerError = $("#filterFormPeriodEndDatePickerError");

        ////-------------- Grid
        dom.approvalActionReportGridParent = $("#approvalActionReportGridParent");
        dom.approvalActionReportGrid = ASPxClientGridView.Cast("approvalActionReportGrid");
    }

    function setEvents() {
        dom.filterFormPeriodStartDatePicker.change(handleFilterFormPeriodStartDatePickerSelectionChange);
        dom.filterFormPeriodEndDatePicker.change(handleFilterFormPeriodEndDatePickerSelectionChange);
    }

    $(document).ready(init);

    return {
        handleGetAllUserListComboChanged: handleGetAllUserListComboChanged,
        handleFilterFormDateComboSelectedIndexChange: handleFilterFormDateComboSelectedIndexChange,
        showApprovalActionReportListBtnClick: showApprovalActionReportListBtnClick,
        handleApprovalActionReportGridBeginCallback: handleApprovalActionReportGridBeginCallback
    };
})();