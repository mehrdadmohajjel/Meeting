/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.myAction = (function () {

    var dom = {};
    var state = {
        dateType: null,
        persianStartDate: null,
        persianEndDate: null,
        customPeriodId: "CustomPeriod"
    };

    var tools = motorsazanClient.tools;
    const controllerName = "/MyAction/";


    function handleFilterFormDateComboSelectedIndexChange() {
        tools.hideItem(dom.filterFormDateComboError);

        const selectedDateId = dom.filterFormDateCombo.GetValue();

        if (selectedDateId === state.customPeriodId) {
            tools.showItem(dom.filterFormDateComboSpecialDateDesign);

        } else {
            tools.hideItem(dom.filterFormDateComboSpecialDateDesign);

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

    function showUsersActionsListBtnClick() {
        fillGrid();
    }

    async function fillGrid() {
        if (!isFilterFormValid())
            return;

        const url = controllerName + "FillActionGrid";

        state.dateType = dom.filterFormDateCombo.GetValue();
        state.persianStartDate = dom.filterFormPeriodStartDatePicker.val();
        state.persianEndDate = dom.filterFormPeriodEndDatePicker.val();

        const apiParam = {
            persianStartDate: state.persianStartDate,
            persianEndDate: state.persianEndDate,
            datePeriodType: state.dateType
        };

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.myActionGridParent.html(gridHtml);
        setDom();
    }

    function isFilterFormValid(shouldDisplayValidationErrors = true) {
        var isValid = true;

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

    function handleMyActionGridBeginCallback(command) {
        command.callbackUrl =
            controllerName +
            "FillActionGrid" +
            "?persianStartDate=" +
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
        dom.filterFormDateCombo = ASPxClientComboBox.Cast("filterFormDateCombo");
        dom.filterFormDateComboError = $("#filterFormDateComboError");
        dom.filterFormDateComboParent = $("#filterFormDateComboParent");

        dom.filterFormDateComboSpecialDateDesign = $("#filterFormDateComboSpecialDateDesign");

        dom.filterFormPeriodStartDatePicker = ASPxClientComboBox.Cast("filterFormPeriodStartDatePicker");
        dom.filterFormPeriodStartDatePickerError = $("#filterFormPeriodStartDatePickerError");
        dom.filterFormPeriodStartDatePickerParent = $("#filterFormPeriodStartDatePickerParent");

        dom.filterFormPeriodStartDatePicker = $("#filterFormPeriodStartDatePicker");
        dom.filterFormPeriodStartDatePickerParent = $("#filterFormPeriodStartDatePickerParent");
        dom.filterFormPeriodStartDatePickerError = $("#filterFormPeriodStartDatePickerError");

        dom.filterFormPeriodEndDatePicker = $("#filterFormPeriodEndDatePicker");
        dom.filterFormPeriodEndDatePickerParent = $("#filterFormPeriodEndDatePickerParent");
        dom.filterFormPeriodEndDatePickerError = $("#filterFormPeriodEndDatePickerError");

        ////-------------- Grid
        dom.myActionGridParent = $("#myActionGridParent");
        dom.myActionGrid = ASPxClientGridView.Cast("myActionGrid");
    }

    function setEvents() {
        dom.filterFormPeriodStartDatePicker.change(handleFilterFormPeriodStartDatePickerSelectionChange);
        dom.filterFormPeriodEndDatePicker.change(handleFilterFormPeriodEndDatePickerSelectionChange);
    }

    $(document).ready(init);

    return {
        handleFilterFormDateComboSelectedIndexChange: handleFilterFormDateComboSelectedIndexChange,
        showUsersActionsListBtnClick: showUsersActionsListBtnClick,
        handleMyActionGridBeginCallback: handleMyActionGridBeginCallback
    };
})();