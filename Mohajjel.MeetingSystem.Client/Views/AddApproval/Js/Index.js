/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.addApproval = (function () {

    var dom = {};
    var state = {
        meetingId: null,
        departmentId: 0,
        selectedUserType: 4,// سایر پرسنل
        userType: 0,
        inviteesUserList: [],
        step: 0
    };

    var tools = motorsazanClient.tools;
    const controllerName = "/AddApproval/";


    // ---- (add form) ----
    async function handleUserMeetingListComboSelectedIndexChanged() {
        tools.hideItem(dom.userMeetingListComboError);

        setDom();

        tools.showItem(dom.detailDiv);

        var meetingNumber = dom.userMeetingListCombo.GetSelectedItem().GetColumnText('MeetingNumber');
        dom.meetingNumberLbl.SetText(meetingNumber);

        var meetingSubject = dom.userMeetingListCombo.GetSelectedItem().GetColumnText('Subject');
        dom.meetingSubjectLbl.SetText(meetingSubject);

        var aqneda = dom.userMeetingListCombo.cpHiddenMeetingAgenda[dom.userMeetingListCombo.GetSelectedIndex()];
        dom.aqnedaLbl.SetText(aqneda);

        var date = dom.userMeetingListCombo.cpHiddenPersianMeetingDate[dom.userMeetingListCombo.GetSelectedIndex()];
        dom.dateLbl.SetText(date);

        state.meetingId = dom.userMeetingListCombo.GetValue();

        var url = controllerName + "ApprovalMeetingAttendListCombo";
        var apiParam = {
            meetingId: state.meetingId
        };

        const meetingPeopleComboHtml = await motorsazanClient.connector.post(url, apiParam);

        dom.meetingPeopleComboParent.html(meetingPeopleComboHtml);

        var gridurl = controllerName + "MeetingApprovalGrid";
        var ShowApiParam = {
            meetingId: state.meetingId
        };

        const approvalGridHtml = await motorsazanClient.connector.post(gridurl, ShowApiParam);

        dom.meetingApprovalGridParent.html(approvalGridHtml);
        setDom();

        
    }

    function handleMeetingPeopleComboSelectedIndexChanged() {
        tools.hideItem(dom.meetingPeopleComboError);
    }

    function showApprovalType() {
        var item = dom.operationTypeRadioButton.GetValue();

        if (item == 1) {
            tools.showItem(dom.approvalDiv);
            tools.hideItem(dom.descriptionDiv);
        } else if (item == 2) {
            tools.showItem(dom.descriptionDiv);
            tools.hideItem(dom.approvalDiv);
        }
    }

    function approvalTypeInit() {
        tools.showItem(dom.approvalDiv);
        tools.hideItem(dom.descriptionDiv);
    }

    function handleDescriptionTxtKeyUp() {
        tools.hideItem(dom.descriptionTxtError);
        var description = dom.descriptionTxt.GetText();
        if (!description) {
            tools.showItem(dom.descriptionTxtError);
        }
    }

    function showUserType() {
        var value = dom.userType.GetValue();
        if (value == 0) {
            tools.hideItem(dom.internalUserDiv);
            tools.showItem(dom.externalUserDiv);
            dom.messageType.SetSelectedIndex(0);
            dom.messageType.SetEnabled(false);
        }
        else {
            tools.showItem(dom.internalUserDiv);
            tools.hideItem(dom.externalUserDiv);
            dom.messageType.SetEnabled(true);
            dom.messageType.SetSelectedIndex(-1);
        }
    }

    function showUserTypeInit() {
        tools.showItem(dom.internalUserDiv);
        tools.hideItem(dom.externalUserDiv);
    }

    function handleMeetingExternalUserNameTxtKeyUp() {
        tools.hideItem(dom.meetingExternalUserNameTxtError);
        var userName = dom.meetingExternalUserNameTxt.GetValue();
        var isUserNameValid = !tools.isNullOrEmpty(userName);
        if (!isUserNameValid) {
            tools.showItem(dom.meetingExternalUserNameTxtError);
        }
    }

    function handleMeetingExternalUserFamilyTxtKeyUp() {
        tools.hideItem(dom.meetingExternalUserFamilyTxtError);
        var userFamily = dom.meetingExternalUserFamilyTxt.GetValue();
        var isUserFamilyValid = !tools.isNullOrEmpty(userFamily);
        if (!isUserFamilyValid) {
            tools.showItem(dom.meetingExternalUserFamilyTxtError);
        }
    }

    function handleMeetingSematTxtKeyUp() {
        tools.hideItem(dom.meetingSematTxtError);
        var semat = dom.meetingSematTxt.GetValue();
        var isSematValid = !tools.isNullOrEmpty(semat);
        if (!isSematValid) {
            tools.showItem(dom.meetingSematTxtError);
        }
    }

    function handleMeetingSazmanNameTxtKeyUp() {
        tools.hideItem(dom.meetingSazmanNameTxtError);
        var semat = dom.meetingSazmanNameTxt.GetValue();
        var isSematValid = !tools.isNullOrEmpty(semat);
        if (!isSematValid) {
            tools.showItem(dom.meetingSazmanNameTxtError);
        }
    }

    function handleDeadLineDatePickerSelectionChange() {
        tools.hideItem(dom.deadLineDateError);
    }

    function handleMessageTypeComboSelectedIndexChanged() {
        tools.hideItem(dom.messageTypeError);
    }

    function onClickAddToApproval() {
        state.userType = dom.userType.GetValue();
        if (state.userType != 0) {
            addInternalUserApproval();
        }
        else {
            addExternalUserApproval();
        }
    }

    async function addInternalUserApproval() {
        var canAddApproval = isInternalUserApprovalValid();
        if (!canAddApproval) return false;

        var url = controllerName + "AddNewApprovals";

        var firstname = dom.meetingPeopleCombo.GetSelectedItem().GetColumnText('FName');
        var lastName = dom.meetingPeopleCombo.GetSelectedItem().GetColumnText('LName');

        var apiParam = {
            meetingId: dom.userMeetingListCombo.GetValue(),
            description: dom.descriptionTxt.GetText(),
            responsiblePeopleName: firstname + " " + lastName,
            messageType: dom.messageType.GetValue(),
            persianDeadLineDate: dom.deadLineDate.val(),
            attendUserId: dom.meetingPeopleCombo.GetValue()
        };

        const isSuccessful = await motorsazanClient.connector.post(url, apiParam);

        if (isSuccessful) {
            state.step = state.step + 1;
            motorsazanClient.messageModal.success(isSuccessful);
            await refreshGrid();
            setDom();
        }
        else {
            var message = "امکان ثبت مصوبه جلسه میسر نشد، برای رفع مشکل با تیم نرم افزاری تماس حاصل فرمایید";
            motorsazanClient.messageModal.error(message);
        }
    }

    function isInternalUserApprovalValid() {
        var result = true;

        tools.hideItem(dom.meetingPeopleComboError);
        var Peoplearea = dom.meetingPeopleCombo.GetValue();
        if (Peoplearea == null && !Peoplearea && Peoplearea != 0) {
            result = false;
            tools.showItem(dom.meetingPeopleComboError);
        }

        tools.hideItem(dom.messageTypeError);
        var messageTypearea = dom.messageType.GetValue();
        if (messageTypearea == null && !messageTypearea && messageTypearea != 0) {
            result = false;
            tools.showItem(dom.messageTypeError);
        }

        tools.hideItem(dom.deadLineDateError);
        var persianDate = dom.deadLineDate.val().trim();
        var isPersianDateValid = tools.isValidPersianDate(persianDate);
        if (!isPersianDateValid) {
            result = false;
            tools.showItem(dom.deadLineDateError);
        }

        tools.hideItem(dom.userMeetingListComboError);
        var userMeetingarea = dom.userMeetingListCombo.GetValue();
        if (userMeetingarea == null && !userMeetingarea && userMeetingarea != 0) {
            result = false;
            tools.showItem(dom.userMeetingListComboError);
        }

        tools.hideItem(dom.descriptionTxtError);
        var description = dom.descriptionTxt.GetText();
        var isDescriptionValid = !tools.isNullOrEmpty(description);
        if (!isDescriptionValid) {
            result = false;
            tools.showItem(dom.descriptionTxtError);
        }

        return result;
    }

    async function addExternalUserApproval() {
        var canAddApproval = isExternalUserApprovalValid();

        if (!canAddApproval) return false;

        var url = controllerName + "AddNewApprovals";

        var firstname = dom.meetingExternalUserNameTxt.GetValue();
        var lastName = dom.meetingExternalUserFamilyTxt.GetValue();
        var sazmanName = dom.meetingSazmanNameTxt.GetValue();

        var apiParam = {
            meetingId: dom.userMeetingListCombo.GetValue(),
            description: dom.descriptionTxt.GetText(),
            responsiblePeopleName: firstname + " " + lastName + "(" + sazmanName + ")",
            messageType: dom.messageType.GetValue(),
            persianDeadLineDate: dom.deadLineDate.val(),
            attendUserId: 0,
        };

        const isSuccessful = await motorsazanClient.connector.post(url, apiParam);

        if (isSuccessful) {
            state.step = state.step + 1;
            motorsazanClient.messageModal.success(isSuccessful);
            await refreshGrid();
            setDom();
        }
        else {
            var message = "امکان ثبت مصوبه جلسه میسر نشد، برای رفع مشکل با تیم نرم افزاری تماس حاصل فرمایید";
            motorsazanClient.messageModal.error(message);
        }
    }

    function isExternalUserApprovalValid() {
        var result = true;

        tools.hideItem(dom.meetingExternalUserNameTxtError);
        var userName = dom.meetingExternalUserNameTxt.GetValue();
        var isUserNameValid = !tools.isNullOrEmpty(userName);
        if (!isUserNameValid) {
            result = false;
            tools.showItem(dom.meetingExternalUserNameTxtError);
        }

        tools.hideItem(dom.meetingExternalUserFamilyTxtError);
        var userFamily = dom.meetingExternalUserFamilyTxt.GetValue();
        var isUserFamilyValid = !tools.isNullOrEmpty(userFamily);
        if (!isUserFamilyValid) {
            result = false;
            tools.showItem(dom.meetingExternalUserFamilyTxtError);
        }

        tools.hideItem(dom.meetingSematTxtError);
        var UserSemat = dom.meetingSematTxt.GetValue();
        if (!UserSemat) {
            result = false;
            tools.showItem(dom.meetingSematTxtError);
        }

        tools.hideItem(dom.meetingSazmanNameTxtError);
        var UserSazman = dom.meetingSazmanNameTxt.GetValue();
        if (!UserSazman) {
            result = false;
            tools.showItem(dom.meetingSazmanNameTxtError);
        }

        tools.hideItem(dom.deadLineDateError);
        var persianDate = dom.deadLineDate.val().trim();
        var isPersianDateValid = tools.isValidPersianDate(persianDate);
        if (!isPersianDateValid) {
            result = false;
            tools.showItem(dom.deadLineDateError);
        }
        tools.hideItem(dom.messageTypeError);
        var messageTypearea = dom.messageType.GetValue();
        if (messageTypearea == null && !messageTypearea && messageTypearea != 0) {
            result = false;
            tools.showItem(dom.messageTypeError);
        }

        tools.hideItem(dom.userMeetingListComboError);
        var userMeetingarea = dom.userMeetingListCombo.GetValue();
        if (userMeetingarea == null && !userMeetingarea && userMeetingarea != 0) {
            result = false;
            tools.showItem(dom.userMeetingListComboError);
        }

        tools.hideItem(dom.descriptionTxtError);
        var description = dom.descriptionTxt.GetText();
        var isDescriptionValid = !tools.isNullOrEmpty(description);
        if (!isDescriptionValid) {
            result = false;
            tools.showItem(dom.descriptionTxtError);
        }

        return result;
    }

    function handleApprovalExtraDescriptionTxtKeyUp() {
        tools.hideItem(dom.approvalExtraDescriptionTxtError);
        var approvalExtraDescription = dom.approvalExtraDescriptionTxt.GetValue();
        var isApprovalExtraDescriptionValid = !tools.isNullOrEmpty(approvalExtraDescription);
        if (!isApprovalExtraDescriptionValid) {
            tools.showItem(dom.approvalExtraDescriptionTxtError);
        }
    }

    async function onClickAddDescriptionsToMeeting() {
        var canExtraDescription = isExtraDescriptionValid();
        if (!canExtraDescription) return false;

        var url = controllerName + "AddDescriptionToMeeting";

        var apiParam = {
            meetingId: dom.userMeetingListCombo.GetValue(),
            description: dom.approvalExtraDescriptionTxt.GetText()
        };

        const isSuccessful = await motorsazanClient.connector.post(url, apiParam);
        if (isSuccessful) {
            state.step = state.step + 1;
            motorsazanClient.messageModal.success(isSuccessful);
            await refreshGrid();
            setDom();
        }
        else {
            var message = "امکان ثبت مصوبه جلسه میسر نشد، برای رفع مشکل با تیم نرم افزاری تماس حاصل فرمایید";
            motorsazanClient.messageModal.error(message);
        }
    }

    function isExtraDescriptionValid() {
        var result = true;

        tools.hideItem(dom.approvalExtraDescriptionTxtError);
        var extraDescriptionarea = dom.approvalExtraDescriptionTxt.GetText();
        var isExtraDescriptionareaValid = !tools.isNullOrEmpty(extraDescriptionarea);
        if (!isExtraDescriptionareaValid) {
            result = false;
            tools.showItem(dom.approvalExtraDescriptionTxtError);
        }

        tools.hideItem(dom.userMeetingListComboError);
        var userMeetingarea = dom.userMeetingListCombo.GetValue();
        if (userMeetingarea == null && !userMeetingarea && userMeetingarea != 0) {
            result = false;
            tools.showItem(dom.userMeetingListComboError);
        }

        return result;
    }

    // ---- End of (add form) ----


    // ---- (grid form) ----
    async function refreshGrid() {
        var gridurl = controllerName + "MeetingApprovalGrid";

        var apiParam = {
            meetingId: state.meetingId
        };

        const approvalGridHtml = await motorsazanClient.connector.post(gridurl, apiParam);

        dom.meetingApprovalGridParent.html(approvalGridHtml);
        setDom();
    }

    function prepareDelete(s, e) {
        var confirmMessage = "آیا از حذف این مصوبه مطمئن هستید؟";
        var confirmTitle = "اخطار حذف مصوبه"
        motorsazanClient.messageModal.confirm(confirmMessage, () => deleteApproval(s, e), confirmTitle)
    }

    async function deleteApproval(s, e) {
        if (e.buttonID === "deleteBtn") {
            var grid = MVCxClientGridView.Cast(s);
            var key = grid.GetRowKey(e.visibleIndex);
            var meetingId = dom.userMeetingListCombo.GetValue();

            var url = controllerName + "DeleteFromApprovals";
            var apiParam = {
                gridKeys: key,
                meetingId: meetingId
            };

            const isSuccessful = await motorsazanClient.connector.post(url, apiParam);

            motorsazanClient.messageModal.success(isSuccessful);

            state.step = state.step - 1;
            await refreshGrid();
        }
    }

    function handleMeetingApprovalGridBeginCallback(command) {
        const url = controllerName + "MeetingApprovalGrid";

        command.callbackUrl = url + "?meetingId=" + state.meetingId;
    }

    async function onClickFinilizeApproval() {

        var url = controllerName + "SetStatusAndSendMessage";

        var apiParam = {
            meetingId: dom.userMeetingListCombo.GetValue()
        };

        const isSuccessful = await motorsazanClient.connector.post(url, apiParam);

        if (isSuccessful) {
            var successmessage = "مصوبات  شما با موفقیت ثبت  و پیام های مرتبط ارسال گردیدند";
            motorsazanClient.messageModal.success(successmessage);
            await refreshGrid();
            setDom();
        }
        else {
            var message = "امکان ثبت مصوبه جلسه میسر نشد، برای رفع مشکل با تیم نرم افزاری تماس حاصل فرمایید";
            motorsazanClient.messageModal.error(message);
        }
    }

    // ---- End of (grid form) ----

    function init() {
        setDom();
        setEvents();
    }

    function setDom() {
        dom.userMeetingListCombo = ASPxClientComboBox.Cast("userMeetingListCombo");
        dom.userMeetingListComboError = $("#userMeetingListComboError");
        dom.userMeetingListComboParent = $("#userMeetingListComboParent");

        dom.meetingPeopleCombo = ASPxClientComboBox.Cast("meetingPeopleCombo");
        dom.meetingPeopleComboError = $("#meetingPeopleComboError");
        dom.meetingPeopleComboParent = $("#meetingPeopleComboParent");

        dom.meetingNumberLbl = ASPxClientLabel.Cast("meetingNumberLbl");
        dom.dateLbl = ASPxClientLabel.Cast("dateLbl");
        dom.meetingSubjectLbl = ASPxClientLabel.Cast("meetingSubjectLbl");
        dom.aqnedaLbl = ASPxClientLabel.Cast("aqnedaLbl");

        dom.detailDiv = $("#detailDiv");

        dom.operationTypeRadioButton = ASPxClientRadioButtonList.Cast("operationTypeRadioButton");
        dom.operationTypeRadioButtonError = $("#operationTypeRadioButtonError");

        dom.approvalDiv = $("#approvalDiv");
        dom.descriptionDiv = $("#descriptionDiv");

        dom.descriptionTxt = ASPxClientMemo.Cast("descriptionTxt")
        dom.descriptionTxtError = $("#descriptionTxtError");

        dom.userType = ASPxClientRadioButtonList.Cast("userType");
        dom.userTypeError = $("#userTypeError");

        dom.internalUserDiv = $("#internalUserDiv");
        dom.externalUserDiv = $("#externalUserDiv");

        dom.meetingExternalUserNameTxt = ASPxClientTextBox.Cast("meetingExternalUserNameTxt")
        dom.meetingExternalUserNameTxtError = $("#meetingExternalUserNameTxtError");

        dom.meetingExternalUserFamilyTxt = ASPxClientTextBox.Cast("meetingExternalUserFamilyTxt")
        dom.meetingExternalUserFamilyTxtError = $("#meetingExternalUserFamilyTxtError"); 

        dom.meetingSematTxt = ASPxClientTextBox.Cast("meetingSematTxt")
        dom.meetingSematTxtError = $("#meetingSematTxtError");

        dom.meetingSazmanNameTxt = ASPxClientTextBox.Cast("meetingSazmanNameTxt")
        dom.meetingSazmanNameTxtError = $("#meetingSazmanNameTxtError");

        dom.deadLineDate = $("#deadLineDate");
        dom.deadLineDateError = $("#deadLineDateError");

        dom.messageType = ASPxClientComboBox.Cast("messageType");
        dom.messageTypeError = $("#messageTypeError");

        dom.approvalExtraDescriptionTxt = ASPxClientMemo.Cast("approvalExtraDescriptionTxt")
        dom.approvalExtraDescriptionTxtError = $("#approvalExtraDescriptionTxtError");

        ////-------------- Grid
        dom.meetingApprovalGridParent = $("#meetingApprovalGridParent");
        dom.meetingApprovalGrid = ASPxClientGridView.Cast("meetingApprovalGrid");
    }

    async function setEvents() {
        dom.deadLineDate.change(handleDeadLineDatePickerSelectionChange);

        var meetingId = await getSession("MeetingId");

        state.meetingId = (meetingId == null || meetingId == 0) ? -1 : meetingId;

        if (state.meetingId == -1) {
            dom.userMeetingListCombo.SetSelectedIndex(state.meetingId);
        } else {
            dom.userMeetingListCombo.SetValue(state.meetingId);
        }
        await refreshGrid();
    }

    async function getSession(session) {
        var url = controllerName + "GetSession";

        var apiParam = {
            sessionName: session
        };

        const value = await motorsazanClient.connector.post(url, apiParam);

        return value;
    }

    $(document).ready(init);

    return {
        handleUserMeetingListComboSelectedIndexChanged: handleUserMeetingListComboSelectedIndexChanged,
        handleMeetingPeopleComboSelectedIndexChanged: handleMeetingPeopleComboSelectedIndexChanged,
        showApprovalType: showApprovalType,
        approvalTypeInit: approvalTypeInit,
        handleDescriptionTxtKeyUp: handleDescriptionTxtKeyUp,
        showUserType: showUserType,
        showUserTypeInit: showUserTypeInit,
        handleMeetingExternalUserNameTxtKeyUp: handleMeetingExternalUserNameTxtKeyUp,
        handleMeetingExternalUserFamilyTxtKeyUp: handleMeetingExternalUserFamilyTxtKeyUp,
        handleMeetingSematTxtKeyUp: handleMeetingSematTxtKeyUp,
        handleMeetingSazmanNameTxtKeyUp: handleMeetingSazmanNameTxtKeyUp,
        handleMessageTypeComboSelectedIndexChanged: handleMessageTypeComboSelectedIndexChanged,
        onClickAddToApproval: onClickAddToApproval,
        handleApprovalExtraDescriptionTxtKeyUp: handleApprovalExtraDescriptionTxtKeyUp,
        onClickAddDescriptionsToMeeting: onClickAddDescriptionsToMeeting,
        prepareDelete: prepareDelete,
        handleMeetingApprovalGridBeginCallback: handleMeetingApprovalGridBeginCallback,
        onClickFinilizeApproval: onClickFinilizeApproval,
        dom
    };
})();