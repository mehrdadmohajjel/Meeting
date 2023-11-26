/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.editMeeting = (function () {

    var dom = {};

    var step = {
        baseInfo: 1,
        usersList: 2,
        finalize: 3
    };

    var state = {
        meetingDetailModel: {
            MeetingId: null,
            MeetingNumber: null,
            MeetingCategoryId: null,
            Subject: null,
            Agenda: null,
            Type: null,
            MeetingDate: null,
            MeetingPlaceId: null,
            DepartmentId: null,
            CreationDateTime: null,
            IsDeleted: null,
            ShowName: null,
            MeetingStatusTypeId: null,
            UserId: null,
            FirstName: null,
            LastName: null,
            PeopleName: null,
            StartTime: null,
            EndTime: null,
            PersianMeetingDate: null,
            PersianCreationDateTime: null
        },

        activeStep: step.baseInfo,

        selectedUserType: null,

        managerUserTypeValue: 1,   // مدیران
        bossUserTypeValue: 2,      // روسا
        supervisorTypeValue: 3,    // سرپرستان
        departmentTypeValue: 4,    // پرسنل امور
        allUserTypeValue: 5,       // سایر پرسنل
        outsideUserTypeValue: 6,   // افراد خارج از سازمان

        minUserCount: 2,
        inviteesUserList: []
    };

    var tools = motorsazanClient.tools;
    var controllerName = "/EditMeeting/";


    async function handleGetDabirActiveMeetingComboSelectedIndexChanged() {
        tools.hideItem(dom.getDabirActiveMeetingComboError);

        const url = controllerName + "GetUserMeetingByMeetingId";

        const meetingId = dom.getDabirActiveMeetingCombo.GetValue();

        const apiParam = {
            meetingId: meetingId
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);

        state.meetingDetailModel.MeetingId = apiResult.MeetingId;
        state.meetingDetailModel.MeetingNumber = apiResult.MeetingNumber;
        state.meetingDetailModel.MeetingCategoryId = apiResult.MeetingCategoryId;
        state.meetingDetailModel.Subject = apiResult.Subject;
        state.meetingDetailModel.Agenda = apiResult.Agenda;
        state.meetingDetailModel.Type = apiResult.Type;
        state.meetingDetailModel.MeetingDate = apiResult.MeetingDate;
        state.meetingDetailModel.MeetingPlaceId = apiResult.MeetingPlaceId;
        state.meetingDetailModel.DepartmentId = apiResult.DepartmentId;
        state.meetingDetailModel.CreationDateTime = apiResult.CreationDateTime;
        state.meetingDetailModel.IsDeleted = apiResult.IsDeleted;
        state.meetingDetailModel.ShowName = apiResult.ShowName;
        state.meetingDetailModel.MeetingStatusTypeId = apiResult.MeetingStatusTypeId;
        state.meetingDetailModel.UserId = apiResult.UserId;
        state.meetingDetailModel.FirstName = apiResult.FirstName;
        state.meetingDetailModel.LastName = apiResult.LastName;
        state.meetingDetailModel.PeopleName = apiResult.PeopleName;
        state.meetingDetailModel.StartTime = apiResult.StartTime;
        state.meetingDetailModel.EndTime = apiResult.EndTime;
        state.meetingDetailModel.PersianMeetingDate = apiResult.PersianMeetingDate;
        state.meetingDetailModel.PersianCreationDateTime = apiResult.PersianCreationDateTime;

        setDom();

        dom.titleInputTextBox.SetText(apiResult.Subject);
        dom.areaCombo.SetValue(apiResult.Type);
        dom.getAllMainDepartmentCombo.SetValue(apiResult.DepartmentId);
        dom.getAllMeetingCategoryCombo.SetValue(apiResult.MeetingCategoryId);
        dom.getAllMeetingPlaceCombo.SetValue(apiResult.MeetingPlaceId);
        dom.persianMeetingDatePicker.val(apiResult.PersianMeetingDate);
        dom.startTimeInputTextBox.SetText(apiResult.StartTime);
        dom.endTimeInputTextBox.SetText(apiResult.EndTime);
        dom.descriptionMemo.SetText(apiResult.Agenda);

        isBaseInfoStepValid();
    }

    // ---- (Meeting info section) ----

    function handleTitleInputTextBoxKeyUp() {
        tools.hideItem(dom.titleInputTextBoxError);
        var titleInput = dom.titleInputTextBox.GetValue();
        var isTitleInputValid = !tools.isNullOrEmpty(titleInput);
        if (!isTitleInputValid) {
            tools.showItem(dom.titleInputTextBoxError);
        }
    }

    function handleAreaComboSelectedIndexChanged() {
        tools.hideItem(dom.areaComboError);
    }

    function handleGetAllMainDepartmentComboSelectedIndexChange() {
        tools.hideItem(dom.getAllMainDepartmentComboError);
    }

    function handleGetAllMeetingCategoryComboSelectedIndexChange() {
        tools.hideItem(dom.getAllMeetingCategoryComboError);
    }

    function handleGetAllMeetingPlaceComboSelectedIndexChange() {
        tools.hideItem(dom.getAllMeetingPlaceComboError);
    }

    function handlePersianMeetingDatePickerSelectionChange() {
        tools.hideItem(dom.persianMeetingDatePickerError);
    }

    function handleStartTimeInputTextBoxKeyUp() {
        tools.hideItem(dom.startTimeInputTextBoxError);
        tools.hideItem(dom.startTimeInputTextBoxFormatError);
        tools.hideItem(dom.startTimeInputTextBoxMiniuteFormatError);

        var startTime = dom.startTimeInputTextBox.GetValue();

        var isStartTimeValid = !tools.isNullOrEmpty(startTime);
        if (!isStartTimeValid) {
            tools.showItem(dom.startTimeInputTextBoxError);
        }

        var isStartTimeFormatValid = tools.isValidTime(startTime);
        if (!isStartTimeFormatValid) {
            tools.showItem(dom.startTimeInputTextBoxFormatError);
        }
        else {
            var minute = startTime.substr(2, 2);
            var isStartTimeMinuteValid = minute == "30" || minute == "00";
            if (!isStartTimeMinuteValid) {
                tools.showItem(dom.startTimeInputTextBoxMiniuteFormatError);
            }
        }
    }

    function handleEndTimeInputTextBoxKeyUp() {
        tools.hideItem(dom.endTimeInputTextBoxError);
        tools.hideItem(dom.endTimeInputTextBoxFormatError);
        tools.hideItem(dom.endTimeInputTextBoxMiniuteFormatError);
        tools.hideItem(dom.endTimeBigerThanStartTimeError);

        var endTime = dom.endTimeInputTextBox.GetValue();
        var startTime = dom.startTimeInputTextBox.GetValue();

        var isEndTimeValid = !tools.isNullOrEmpty(endTime);
        if (!isEndTimeValid) {
            tools.showItem(dom.endTimeInputTextBoxError);
        }

        var isEndTimeFormatValid = tools.isValidTime(endTime);
        if (!isEndTimeFormatValid) {
            tools.showItem(dom.endTimeInputTextBoxFormatError);
        }
        else {
            var minute = endTime.substr(2, 2);
            var isEndTimeMinuteValid = minute == "30" || minute == "00";
            if (!isEndTimeMinuteValid) {
                tools.showItem(dom.endTimeInputTextBoxMiniuteFormatError);
            }
        }

        var isStartTimeLittleThanEndTime = Number(startTime) < Number(endTime);
        if (!isStartTimeLittleThanEndTime) {
            tools.showItem(dom.endTimeBigerThanStartTimeError);
        }
    }

    function handleDescriptionMemoKeyUp() {
        tools.hideItem(dom.descriptionMemoError);
        var description = dom.descriptionMemo.GetValue();
        var isDescriptionValid = !tools.isNullOrEmpty(description);
        if (!isDescriptionValid) {
            tools.showItem(dom.descriptionMemoError);
        }
    }

    // ---- End of (Meeting info section) ----

    // ---- (Meeting users section) ----

    function handleUserTypeComboChange() {
        state.selectedUserType = dom.userTypeCombo.GetValue();

        if (state.selectedUserType == state.outsideUserTypeValue) {
            tools.showItem(dom.outsideUserForm);
            tools.hideItem(dom.userGridParent);
        }
        else {
            tools.hideItem(dom.outsideUserForm);
            tools.showItem(dom.userGridParent);
            refreshUserGrid();
        }
    }

    async function refreshUserGrid() {
        var url = controllerName + "UserGrid";

        setDom();
        var userType = dom.userTypeCombo.GetValue();
        var departmentId = dom.getAllMainDepartmentCombo.GetValue();

        var apiParam = {
            userType: userType,
            departmentId: departmentId,
            meetingId: state.meetingDetailModel.MeetingId
        };

        const userGridHtml = await motorsazanClient.connector.post(url, apiParam);
        dom.userGridParent.html(userGridHtml);

        setDom();

        updateUserGridSelectionStatus();
    }

    async function LoadInvitedUserGrid() {
        var url = controllerName + "LoadInvitedUser";

        var meetingId = dom.getDabirActiveMeetingCombo.GetValue();

        var apiParam = {
            meetingId: meetingId
        };

        const userGridHtml = await motorsazanClient.connector.post(url, apiParam);

        var result = [];
        for (var i = 0; i < userGridHtml.length; i++) {
            var tempItem = [
                userGridHtml[i].EId,
                userGridHtml[i].DepartmentName,
                userGridHtml[i].PeopleName,
                userGridHtml[i].DepartmentChartId,
                userGridHtml[i].UserId];

            result.push(tempItem);
        };
        state.inviteesUserList = result;

        setDom();
        await refreshUserGrid();
    }

    function updateUserGridSelectionStatus() {
        var userKeys = [];
        for (var i = 0; i < state.inviteesUserList.length; i++) {
            var key = state.inviteesUserList[i][0];
            userKeys.push(key);
        }
        dom.userGrid.SelectRowsByKey(userKeys);
    }

    function handleUserGridItemSelection(source, event) {
        var isSelected = event.isSelected;
        var isChangedOnServer = event.isChangedOnServer;
        if (!isChangedOnServer) {
            if (!isSelected) {
                var rowIndex = event.visibleIndex;
                var eId = dom.userGrid.GetRowKey(rowIndex);
                removeFromInviteesList(eId, true);
                return;
            } else {
                source.GetSelectedFieldValues("EId;DepartmentName;FullName;DepartmentChartId;UserId", function (values) {
                    updateInviteesUserList(values);
                });
            }
        }
    }

    function removeFromInviteesList(eId, isUserGridCheckboxCleared) {
        state.inviteesUserList = state.inviteesUserList.filter(function (user) {
            return user[0] != eId;
        });

        var selectedRow = eId;
        let divName = "user";
        let result = divName.concat(selectedRow);
        var x = document.getElementById(result);
        x.remove();

        generateInviteesUserListTable();
        if (!isUserGridCheckboxCleared) dom.userGrid.UnselectRowsByKey(eId);
    }

    function updateInviteesUserList(newList) {
        for (var i = 0; i < newList.length; i++) {
            var user = newList[i];
            var eId = user[0];
            var isAlreadyAdded = isUserAlreadyInvited(eId);
            if (!isAlreadyAdded) state.inviteesUserList.push(user)
        }
        generateInviteesUserListTable();
    }

    function generateInviteesUserListTable() {
        var tempWrapper = document.createElement("div");

        for (var i = 0; i < state.inviteesUserList.length; i++) {
            var user = state.inviteesUserList[i];

            var row = document.createElement("tr");
            row.setAttribute("id", "user" + user[0]);

            $(row).addClass("dxgvDataRow_MaterialCompact dxgvSelectedRow_MaterialCompact");

            var td1 = document.createElement("td");
            td1.innerText = user[2];
            $(td1).addClass("dxgv");
            row.appendChild(td1);
            var td2 = document.createElement("td");
            td2.innerText = user[1];
            $(td2).addClass("dxgv");
            row.appendChild(td2);

            var tdCommand = document.createElement("td");
            $(tdCommand).addClass("dxgv");
            var deleteBtn = document.createElement("button");
            deleteBtn.setAttribute("data-userid", user[0]);
            deleteBtn.innerText = "حذف";
            $(deleteBtn).addClass("dxbButton_MaterialCompact app__form-grid-mini-btn meeting__invitees-table__delete-btn");
            tdCommand.appendChild(deleteBtn);
            row.appendChild(tdCommand);

            tempWrapper.appendChild(row);
        }

        if (state.inviteesUserList.length === 0) {
            var row = document.createElement("tr");
            $(row).addClass("dxgvDataRow_MaterialCompact dxgvSelectedRow_MaterialCompact");

            var td1 = document.createElement("td");
            td1.innerText = "کاربری انتخاب نشده است";
            td1.setAttribute("colspan", 4);
            $(td1).addClass("dxgv meeting__invitees-table__empty-td");
            row.appendChild(td1);

            tempWrapper.appendChild(row);
        }

        dom.invitessUserTable.html(tempWrapper.innerHTML);
    }

    function isUserAlreadyInvited(eId) {
        var result = false;
        for (var i = 0; i < state.inviteesUserList.length; i++) {
            var tempUserKey = state.inviteesUserList[i][0];
            if (tempUserKey != eId) continue;
            result = true;
        }
        return result;
    }

    function handleOutsideUserFirstNameTextBoxKeyUp() {
        tools.hideItem(dom.outsideUserFirstNameTextBoxError);
        var outsideUserFirstName = dom.outsideUserFirstNameTextBox.GetValue();
        var isOutsideUserFirstNameValid = !tools.isNullOrEmpty(outsideUserFirstName);
        if (!isOutsideUserFirstNameValid) {
            tools.showItem(dom.outsideUserFirstNameTextBoxError);
        }
    }

    function handleOutsideUserLastNameTextBoxKeyUp() {
        tools.hideItem(dom.outsideUserLastNameTextBoxError);
        var outsideUserLastName = dom.outsideUserLastNameTextBox.GetValue();
        var isOutsideUserLastNameValid = !tools.isNullOrEmpty(outsideUserLastName);
        if (!isOutsideUserLastNameValid) {
            tools.showItem(dom.outsideUserLastNameTextBoxError);
        }
    }

    function handleOutsideUserTitleTextBoxKeyUp() {
        tools.hideItem(dom.outsideUserTitleTextBoxError);
        var outsideUserTitle = dom.outsideUserTitleTextBox.GetValue();
        var isOutsideUserTitleValid = !tools.isNullOrEmpty(outsideUserTitle);
        if (!isOutsideUserTitleValid) {
            tools.showItem(dom.outsideUserTitleTextBoxError);
        }
    }

    function handleOutsideUserOrganizationTextBoxKeyUp() {
        tools.hideItem(dom.outsideUserOrganizationTextBoxError);
        var outsideUserOrganization = dom.outsideUserOrganizationTextBox.GetValue();
        var isOutsideUserOrganizationValid = !tools.isNullOrEmpty(outsideUserOrganization);
        if (!isOutsideUserOrganizationValid) {
            tools.showItem(dom.outsideUserOrganizationTextBoxError);
        }
    }

    function handleAddOutsideUserInfoBtnClick() {
        var canAdd = isAddOutsideUserFormValid();
        if (!canAdd) return false;

        var userId = 0;
        var eid = 0;

        var newUser = [
            [eid],
            [dom.outsideUserTitleTextBox.GetValue()],
            [dom.outsideUserFirstNameTextBox.GetValue() + ' ' + dom.outsideUserLastNameTextBox.GetValue()],
            [dom.outsideUserOrganizationTextBox.GetValue()],
            [userId]
        ];

        state.inviteesUserList.push(newUser);
        generateInviteesUserListTable();

        outsideUserAddReset();
        setDom();
    }

    function outsideUserAddReset() {
        dom.outsideUserFirstNameTextBox.SetText("");
        dom.outsideUserLastNameTextBox.SetText("");
        dom.outsideUserTitleTextBox.SetText("");
        dom.outsideUserOrganizationTextBox.SetText("");
    }

    function isAddOutsideUserFormValid() {
        var result = true;

        tools.hideItem(dom.outsideUserFirstNameTextBoxError);
        tools.hideItem(dom.outsideUserLastNameTextBoxError);
        tools.hideItem(dom.outsideUserTitleTextBoxError);
        tools.hideItem(dom.outsideUserOrganizationTextBoxError);

        var firstName = dom.outsideUserFirstNameTextBox.GetValue();
        if (!firstName) {
            result = false;
            tools.showItem(dom.outsideUserFirstNameTextBoxError);
        }

        var lastName = dom.outsideUserLastNameTextBox.GetValue();
        if (!lastName) {
            result = false;
            tools.showItem(dom.outsideUserLastNameTextBoxError);
        }

        var title = dom.outsideUserTitleTextBox.GetValue();
        if (!title) {
            result = false;
            tools.showItem(dom.outsideUserTitleTextBoxError);
        }

        var organization = dom.outsideUserOrganizationTextBox.GetValue();
        if (!organization) {
            result = false;
            tools.showItem(dom.outsideUserOrganizationTextBoxError);
        }

        return result;
    }

    // ---- End of (Meeting users section) ----

    // ---- (Button part) ----

    function handleStepBackBtnClick() {
        switch (state.activeStep) {
            case step.baseInfo:
                changeStep(step.baseInfo);
                break;
            case step.usersList:
                changeStep(step.baseInfo);
                dom.getDabirActiveMeetingCombo.SetEnabled(true);
                break;
            case step.finalize:
                changeStep(step.usersList);
                break;
        }
    }

    function changeStep(newStep) {
        state.activeStep = newStep;
        updateFormsVisibility();
        updateWizard();
        updateActionBtnVisibility();
    }

    function updateFormsVisibility() {
        tools.hideItem(dom.baseInfoStep);
        tools.hideItem(dom.usersStep);
        tools.hideItem(dom.finalizeStep);

        if (state.activeStep === step.baseInfo) return tools.showItem(dom.baseInfoStep);
        if (state.activeStep === step.usersList) return tools.showItem(dom.usersStep);
        if (state.activeStep === step.finalize) return tools.showItem(dom.finalizeStep);
    }

    function updateWizard() {
        var wizard = $("#meetingWizard");
        wizard
            .removeClass("meeting__wizard--step1")
            .removeClass("meeting__wizard--step2")
            .removeClass("meeting__wizard--step3")
            .addClass("meeting__wizard--step" + state.activeStep);

        var wizardHelp1 = $("#wizardStep1Help");
        var wizardHelp2 = $("#wizardStep2Help");
        var wizardHelp3 = $("#wizardStep3Help");

        tools.hideItem(wizardHelp1);
        tools.hideItem(wizardHelp2);
        tools.hideItem(wizardHelp3);

        if (state.activeStep === step.baseInfo) return tools.showItem(wizardHelp1);
        if (state.activeStep === step.usersList) return tools.showItem(wizardHelp2);
        if (state.activeStep === step.finalize) return tools.showItem(wizardHelp3);
    }

    function updateActionBtnVisibility() {
        dom.stepBackBtn.SetClientVisible(false);
        dom.registerBtn.SetClientVisible(false);
        dom.stepNextBtn.SetClientVisible(true);

        if (state.activeStep !== step.baseInfo) {
            dom.stepBackBtn.SetClientVisible(true);
        }
        if (state.activeStep === step.finalize) {
            dom.registerBtn.SetClientVisible(true);
            dom.stepNextBtn.SetClientVisible(false);
        }
    }

    async function handleStepNextBtnClick() {
        var isStepValid = isActiveStepValid();
        if (!isStepValid) return false;

        var activeStep = state.activeStep;
        if (activeStep === step.baseInfo) {
            await LoadInvitedUserGrid();
            await changeStep(step.usersList);
            await dom.getDabirActiveMeetingCombo.SetEnabled(false);
            await generateInviteesUserListTable();
            return false;
        }
        if (activeStep === step.usersList) {
            await setSecretaryComboItems();
            await updateSummaryItems();
            changeStep(step.finalize);
            return false;
        }
    }

    function isActiveStepValid() {
        var activeStep = state.activeStep;
        if (activeStep === step.baseInfo) return isBaseInfoStepValid();
        if (activeStep === step.usersList) return isUserListStepValid();
        if (activeStep === step.finalize) return isFinalizeStepValid();
        return false;
    }

    function setSecretaryComboItems() {
        dom.secretaryCombo.ClearItems();
        var invitedUsers = state.inviteesUserList;
        for (var i = 0; i < invitedUsers.length; i++) {
            var user = invitedUsers[i];
            var userId = user[0];
            var userFullName = user[1] + " " + user[2];
            if (userId == 0) continue;

            dom.secretaryCombo.AddItem(userFullName, userId);
        }
    }

    function updateSummaryItems() {
        var title = dom.titleInputTextBox.GetValue();
        ASPxClientTextBox.Cast("titleSummaryInput").SetValue(title);

        var area = dom.areaCombo.GetText();
        ASPxClientTextBox.Cast("areaSummaryInput").SetValue(area);

        var department = dom.getAllMainDepartmentCombo.GetText();
        ASPxClientTextBox.Cast("departmentSummaryInput").SetValue(department);

        var category = dom.getAllMeetingCategoryCombo.GetText();
        ASPxClientTextBox.Cast("categorySummaryInput").SetValue(category);

        var place = dom.getAllMeetingPlaceCombo.GetText();
        ASPxClientTextBox.Cast("placeSummaryInput").SetValue(place);

        var persianMeetingDate = dom.persianMeetingDatePicker.val();
        ASPxClientTextBox.Cast("meetingDateSummaryInput").SetValue(persianMeetingDate);

        var startTime = dom.startTimeInputTextBox.GetValue();
        ASPxClientTextBox.Cast("startTimeSummaryInput").SetValue(startTime);

        var endTime = dom.endTimeInputTextBox.GetValue();
        ASPxClientTextBox.Cast("endTimeSummaryInput").SetValue(endTime);

        var invitedCount = state.inviteesUserList.length;
        var usersDescription = "تعداد " + invitedCount + " نفر در این جلسه حضور خواهند داشت";
        ASPxClientTextBox.Cast("usersSummaryInput").SetValue(usersDescription);

        var description = dom.descriptionMemo.GetValue();
        ASPxClientMemo.Cast("descriptionSummaryMemo").SetValue(description);
    }

    function isBaseInfoStepValid() {
        var result = true;

        tools.hideItem(dom.getDabirActiveMeetingComboError);
        var meetingId = dom.getDabirActiveMeetingCombo.GetValue();
        var isMeetingIdValid = !tools.isNullOrEmpty(meetingId);
        if (!isMeetingIdValid) {
            result = false;
            tools.showItem(dom.getDabirActiveMeetingComboError);
        }

        tools.hideItem(dom.titleInputTextBoxError);
        var title = dom.titleInputTextBox.GetValue();
        if (!title) {
            result = false;
            tools.showItem(dom.titleInputTextBoxError);
        }

        tools.hideItem(dom.areaComboError);
        var area = dom.areaCombo.GetValue();
        if (!area && area != 0) {
            result = false;
            tools.showItem(dom.areaComboError);
        }

        tools.hideItem(dom.getAllMainDepartmentComboError);
        var department = dom.getAllMainDepartmentCombo.GetValue();
        if (!department && department != 0) {
            result = false;
            tools.showItem(dom.getAllMainDepartmentComboError);
        }

        tools.hideItem(dom.getAllMeetingCategoryComboError);
        var category = dom.getAllMeetingCategoryCombo.GetValue();
        if (!category && category != 0) {
            result = false;
            tools.showItem(dom.getAllMeetingCategoryComboError);
        }

        tools.hideItem(dom.getAllMeetingPlaceComboError);
        var place = dom.getAllMeetingPlaceCombo.GetValue();
        if (!place && place != 0) {
            result = false;
            tools.showItem(dom.getAllMeetingPlaceComboError);
        }

        tools.hideItem(dom.persianMeetingDatePickerError);
        var persianDate = dom.persianMeetingDatePicker.val().trim();
        var isPersianDateValid = tools.isValidPersianDate(persianDate);
        if (!isPersianDateValid) {
            result = false;
            tools.showItem(dom.persianMeetingDatePickerError);
        }

        tools.hideItem(dom.startTimeInputTextBoxError);
        tools.hideItem(dom.startTimeInputTextBoxFormatError);
        tools.hideItem(dom.startTimeInputTextBoxMiniuteFormatError);

        var startTime = dom.startTimeInputTextBox.GetValue();

        var isStartTimeValid = !tools.isNullOrEmpty(startTime);
        if (!isStartTimeValid) {
            result = false;
            tools.showItem(dom.startTimeInputTextBoxError);
        }

        var isStartTimeFormatValid = tools.isValidTime(startTime);
        if (!isStartTimeFormatValid) {
            result = false;
            tools.showItem(dom.startTimeInputTextBoxFormatError);
        }
        else {
            var startTimeMinute = startTime.substr(2, 2);
            var isStartTimeMinuteValid = startTimeMinute == "30" || startTimeMinute == "00";
            if (!isStartTimeMinuteValid) {
                result = false;
                tools.showItem(dom.startTimeInputTextBoxMiniuteFormatError);
            }
        }

        tools.hideItem(dom.endTimeInputTextBoxError);
        tools.hideItem(dom.endTimeInputTextBoxFormatError);
        tools.hideItem(dom.endTimeInputTextBoxMiniuteFormatError);

        var endTime = dom.endTimeInputTextBox.GetValue();

        var isEndTimeValid = !tools.isNullOrEmpty(endTime);
        if (!isEndTimeValid) {
            result = false;
            tools.showItem(dom.endTimeInputTextBoxError);
        }

        var isEndTimeFormatValid = tools.isValidTime(endTime);
        if (!isEndTimeFormatValid) {
            result = false;
            tools.showItem(dom.endTimeInputTextBoxFormatError);
        } else {
            var endTimeMinute = endTime.substr(2, 2);
            var isEndTimeMinuteValid = endTimeMinute == "30" || endTimeMinute == "00";
            if (!isEndTimeMinuteValid) {
                result = false;
                tools.showItem(dom.endTimeInputTextBoxMiniuteFormatError);
            }
        }

        tools.hideItem(dom.endTimeBigerThanStartTimeError);
        var isStartTimeLittleThanEndTime = Number(startTime) < Number(endTime);
        if (!isStartTimeLittleThanEndTime) {
            result = false;
            tools.showItem(dom.endTimeBigerThanStartTimeError);
            result = false;
        }

        tools.hideItem(dom.descriptionMemoError);
        var description = dom.descriptionMemo.GetValue();
        if (!description) {
            result = false;
            tools.showItem(dom.descriptionMemoError);
        }


        return result;
    }

    function isUserListStepValid() {
        var inviteesListCount = state.inviteesUserList.length;

        if (inviteesListCount >= state.minUserCount) return true;

        var errorMessage = "برای ادامه بایستی حداقل " + state.minUserCount + " نفر به لیست شرکت کنندگان افزوده شوند";
        motorsazanClient.messageModal.error(errorMessage);
        return false;
    }

    function isFinalizeStepValid() {
        var result = true;

        tools.hideItem(dom.secretaryComboError);
        var secretary = dom.secretaryCombo.GetValue();
        if (!secretary) {
            result = false;
            tools.showItem(dom.secretaryComboError);
        }

        return result;
    }

    async function editMeeting() {
        var url = controllerName + "EditMeeting";

        var canRegister = isFinalizeStepValid();
        if (!canRegister) return false;

        var apiParam = {
            meetingItem: generateMeetingInfoApiParam(),
            invitedUsers: generateMeetingInvitedApiParam(),
            persianMeetingDate: dom.persianMeetingDatePicker.val()
        };

        const isSuccessful = await motorsazanClient.connector.post(url, apiParam);

        if (isSuccessful) {
            var successmessage = "جلسه با موفقیت ویرایش یافت";
            motorsazanClient.messageModal.success(successmessage);
            setDom();
            location.href = "";
        }
        else {
            var message = "امکان ثبت جلسه میسر نشد، برای رفع مشکل با تیم نرم افزاری تماس حاصل فرمایید";
            motorsazanClient.messageModal.error(message);
        }
    }

    function generateMeetingInfoApiParam() {
        return {
            MeetingId: dom.getDabirActiveMeetingCombo.GetValue(),
            MeetingCategoryId: dom.getAllMeetingCategoryCombo.GetValue(),
            Subject: dom.titleInputTextBox.GetValue(),
            Agenda: dom.descriptionMemo.GetValue(),
            Type: dom.areaCombo.GetValue(),
            MeetingPlaceId: dom.getAllMeetingPlaceCombo.GetValue(),
            DepartmentId: dom.getAllMainDepartmentCombo.GetValue(),
            StartTime: dom.startTimeInputTextBox.GetText(),
            EndTime: dom.endTimeInputTextBox.GetText(),
            RealEndTime: dom.endTimeInputTextBox.GetText(),
            RealStartTime: dom.startTimeInputTextBox.GetText()
        };
    }

    function generateMeetingInvitedApiParam() {
        var inviteedList = [];
        for (var i = 0; i < state.inviteesUserList.length; i++) {
            var tempItem = state.inviteesUserList[i];
            var eId = tempItem[0];

            var invitedItem = {
                departmentName: tempItem[1],
                fullName: tempItem[2],
                departmentChartId: tempItem[3] || "",
                eId: tempItem[0] || "",
                dabir: isUserSelectedAsSecretary(eId),
                userId: tempItem[4]
            }
            inviteedList.push(invitedItem);
        }
        return inviteedList
    }

    function isUserSelectedAsSecretary(userId) {
        return userId == dom.secretaryCombo.GetValue();
    }

    function handleInviteesTableRemoveBtnClick(event) {
        var target = $(event.target);
        var isBtn = target.hasClass("meeting__invitees-table__delete-btn");
        if (!isBtn) return false;

        var eId = target.data("userid");
        removeFromInviteesList(eId);
        event.preventDefault();
    }

    // ---- End of(Button part) ----

    function init() {
        setDom();
        changeStep(step.baseInfo);
        setEvent();
    }

    function setDom() {
        dom.baseInfoStep = $("#baseInfoStep");
        dom.usersStep = $("#usersStep");
        dom.finalizeStep = $("#finalizeStep");

        dom.getDabirActiveMeetingComboParent = $("#getDabirActiveMeetingComboParent");
        dom.getDabirActiveMeetingComboError = $("#getDabirActiveMeetingComboError");
        dom.getDabirActiveMeetingCombo = ASPxClientComboBox.Cast("getDabirActiveMeetingCombo");

        dom.titleInputTextBox = ASPxClientTextBox.Cast("titleInputTextBox");
        dom.titleInputTextBoxError = $("#titleInputTextBoxError");

        dom.areaComboParent = $("#areaComboParent");
        dom.areaComboError = $("#areaComboError");
        dom.areaCombo = ASPxClientComboBox.Cast("areaCombo");

        dom.getAllMainDepartmentComboParent = $("#getAllMainDepartmentComboParent");
        dom.getAllMainDepartmentComboError = $("#getAllMainDepartmentComboError");
        dom.getAllMainDepartmentCombo = ASPxClientComboBox.Cast("getAllMainDepartmentCombo");

        dom.getAllMeetingCategoryComboParent = $("#getAllMeetingCategoryComboParent");
        dom.getAllMeetingCategoryComboError = $("#getAllMeetingCategoryComboError");
        dom.getAllMeetingCategoryCombo = ASPxClientComboBox.Cast("getAllMeetingCategoryCombo");

        dom.getAllMeetingPlaceComboParent = $("#getAllMeetingPlaceComboParent");
        dom.getAllMeetingPlaceComboError = $("#getAllMeetingPlaceComboError");
        dom.getAllMeetingPlaceCombo = ASPxClientComboBox.Cast("getAllMeetingPlaceCombo");

        dom.persianMeetingDatePicker = $("#persianMeetingDatePicker");
        dom.persianMeetingDatePickerError = $("#persianMeetingDatePickerError");

        dom.startTimeInputTextBox = ASPxClientTextBox.Cast("startTimeInputTextBox");
        dom.startTimeInputTextBoxError = $("#startTimeInputTextBoxError");
        dom.startTimeInputTextBoxFormatError = $("#startTimeInputTextBoxFormatError");
        dom.startTimeInputTextBoxMiniuteFormatError = $("#startTimeInputTextBoxMiniuteFormatError");

        dom.endTimeInputTextBox = ASPxClientTextBox.Cast("endTimeInputTextBox");
        dom.endTimeInputTextBoxError = $("#endTimeInputTextBoxError");
        dom.endTimeInputTextBoxFormatError = $("#endTimeInputTextBoxFormatError");
        dom.endTimeInputTextBoxMiniuteFormatError = $("#endTimeInputTextBoxMiniuteFormatError");
        dom.endTimeBigerThanStartTimeError = $("#endTimeBigerThanStartTimeError");

        dom.descriptionMemo = ASPxClientMemo.Cast("descriptionMemo");
        dom.descriptionMemoError = $("#descriptionMemoError");

        dom.userTypeCombo = ASPxClientComboBox.Cast("userTypeCombo");

        dom.userGrid = ASPxClientGridView.Cast("userGrid");
        dom.userGridParent = $("#userGridParent");

        dom.invitessUserTable = $("#inviteesUserTable");

        dom.outsideUserForm = $("#outsideUserForm");

        dom.outsideUserFirstNameTextBox = ASPxClientTextBox.Cast("outsideUserFirstNameTextBox");
        dom.outsideUserFirstNameTextBoxError = $("#outsideUserFirstNameTextBoxError");

        dom.outsideUserLastNameTextBox = ASPxClientTextBox.Cast("outsideUserLastNameTextBox");
        dom.outsideUserLastNameTextBoxError = $("#outsideUserLastNameTextBoxError");

        dom.outsideUserTitleTextBox = ASPxClientTextBox.Cast("outsideUserTitleTextBox");
        dom.outsideUserTitleTextBoxError = $("#outsideUserTitleTextBoxError");

        dom.outsideUserOrganizationTextBox = ASPxClientTextBox.Cast("outsideUserOrganizationTextBox");
        dom.outsideUserOrganizationTextBoxError = $("#outsideUserOrganizationTextBoxError");

        dom.secretaryCombo = ASPxClientComboBox.Cast("secretaryCombo");
        dom.secretaryComboError = $("#secretaryComboError");

        dom.stepBackBtn = ASPxClientButton.Cast("stepBackBtn");
        dom.stepNextBtn = ASPxClientButton.Cast("stepNextBtn");
        dom.registerBtn = ASPxClientButton.Cast("registerMeetingBtn");
    }

    function setEvent() {
        dom.persianMeetingDatePicker.change(handlePersianMeetingDatePickerSelectionChange);

        dom.invitessUserTable.on("click", handleInviteesTableRemoveBtnClick);
    }

    $(document).ready(init);

    return {
        handleGetDabirActiveMeetingComboSelectedIndexChanged: handleGetDabirActiveMeetingComboSelectedIndexChanged,
        handleTitleInputTextBoxKeyUp: handleTitleInputTextBoxKeyUp,
        handleAreaComboSelectedIndexChanged: handleAreaComboSelectedIndexChanged,
        handleGetAllMainDepartmentComboSelectedIndexChange: handleGetAllMainDepartmentComboSelectedIndexChange,
        handleGetAllMeetingCategoryComboSelectedIndexChange: handleGetAllMeetingCategoryComboSelectedIndexChange,
        handleGetAllMeetingPlaceComboSelectedIndexChange: handleGetAllMeetingPlaceComboSelectedIndexChange,
        handleStartTimeInputTextBoxKeyUp: handleStartTimeInputTextBoxKeyUp,
        handleEndTimeInputTextBoxKeyUp: handleEndTimeInputTextBoxKeyUp,
        handleDescriptionMemoKeyUp: handleDescriptionMemoKeyUp,
        handleUserTypeComboChange: handleUserTypeComboChange,
        handleUserGridItemSelection: handleUserGridItemSelection,
        handleOutsideUserFirstNameTextBoxKeyUp: handleOutsideUserFirstNameTextBoxKeyUp,
        handleOutsideUserLastNameTextBoxKeyUp: handleOutsideUserLastNameTextBoxKeyUp,
        handleOutsideUserTitleTextBoxKeyUp: handleOutsideUserTitleTextBoxKeyUp,
        handleOutsideUserOrganizationTextBoxKeyUp: handleOutsideUserOrganizationTextBoxKeyUp,
        handleAddOutsideUserInfoBtnClick: handleAddOutsideUserInfoBtnClick,
        handleStepBackBtnClick: handleStepBackBtnClick,
        handleStepNextBtnClick: handleStepNextBtnClick,
        editMeeting: editMeeting,
        dom
    };

})();