/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.calendar = (function () {

    var dom = {};
    var state = {
        year: null,
        month: null,
        dayId: 0
    };

    var tools = motorsazanClient.tools;
    const controllerName = "/Calendar/";


    function handleFilterFormGetAllYearsComboSelectedIndexChange() {
        tools.hideItem(dom.filterFormGetAllYearsComboError);
    }

    function handleFilterFormMonthComboSelectedIndexChange() {
        tools.hideItem(dom.filterFormMonthComboError);
    }

    async function showCalendarBtnClick() {
        const canGetCalendar = isFilterFormValid();
        if (!canGetCalendar) return false;

        const url = controllerName + "DayList";

        state.year = dom.filterFormGetAllYearsCombo.GetValue();
        state.month = dom.filterFormMonthCombo.GetValue();

        const apiParams = {
            year: state.year,
            month: state.month
        };

        const daysHtmlResponse = await motorsazanClient.connector.post(url, apiParams);

        dom.daysWrapper.html(daysHtmlResponse);
        setDom();
    }

    function isFilterFormValid() {
        var isValid = true;

        tools.hideItem(dom.filterFormGetAllYearsComboError);
        const year = dom.filterFormGetAllYearsCombo.GetValue();
        const yearHasValue = !tools.isNullOrEmpty(year);
        if (!yearHasValue) {
            isValid = false;
            tools.showItem(dom.filterFormGetAllYearsComboError);
        }

        tools.hideItem(dom.filterFormMonthComboError);
        const month = dom.filterFormMonthCombo.GetValue();
        const monthHasValue = !tools.isNullOrEmpty(month);
        if (!monthHasValue) {
            isValid = false;
            tools.showItem(dom.filterFormMonthComboError);
        }

        return isValid;
    }

    function handleDayItemClick(event) {
        const target = $(event.target);

        const dayCell = target.closest(".calendar__body-cell");
        if (!dayCell) return;

        const dayId = dayCell.data("id");
        if (!dayId) return;

        $(".calendar__body-cell--active").removeClass("calendar__body-cell--active");
        dayCell.addClass("calendar__body-cell--active");

        refreshMeetingGrid(dayId);
    }

    async function refreshMeetingGrid(dayId) {
        state.dayId = dayId || 0;

        const url = controllerName + "FillMeetingsGrid";

        const apiParam = {
            dayId: state.dayId
        };

        const gridHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.meetingGridParent.html(gridHtml);
        setDom();
    }

    function handleMeetingGridBeginCallback(command) {
        command.callbackUrl =
            controllerName +
            "FillMeetingsGrid" +
            "?dayId=" + state.dayId;
    }

    function init() {
        setDom();
        setEvents();
    }

    function setDom() {
        dom.filterFormGetAllYearsCombo = ASPxClientComboBox.Cast("filterFormGetAllYearsCombo");
        dom.filterFormGetAllYearsComboError = $("#filterFormGetAllYearsComboError");
        dom.filterFormGetAllYearsComboParent = $("#filterFormGetAllYearsComboParent");
        dom.filterFormGetAllYearsComboDesign = $("#filterFormGetAllYearsComboDesign");

        dom.filterFormMonthCombo = ASPxClientComboBox.Cast("filterFormMonthCombo");
        dom.filterFormMonthComboError = $("#filterFormMonthComboError");
        dom.filterFormMonthComboParent = $("#filterFormMonthComboParent");
        dom.filterFormMonthComboDesign = $("#filterFormMonthComboDesign");

        dom.daysWrapper = $("#DaysWrapper");

        ////-------------- Grid
        dom.meetingGridParent = $("#meetingGridParent");
        dom.meetingGrid = ASPxClientGridView.Cast("meetingGrid");
    }

    function setEvents() {
        dom.daysWrapper.click(handleDayItemClick);
    }

    $(document).ready(init);

    return {
        handleFilterFormGetAllYearsComboSelectedIndexChange: handleFilterFormGetAllYearsComboSelectedIndexChange,
        handleFilterFormMonthComboSelectedIndexChange: handleFilterFormMonthComboSelectedIndexChange,
        showCalendarBtnClick: showCalendarBtnClick,
        handleMeetingGridBeginCallback: handleMeetingGridBeginCallback
    };
})();