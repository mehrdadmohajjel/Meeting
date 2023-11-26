/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.addMeeting = (function () {

    var dom = {};
    var step = {
        baseInfo: 1,
        usersList: 2,
        finalize: 3
    };
    var state = {
        activeStep: step.baseInfo,
        departmentId: 0,
        unitCode: null,
        selectedUserType: 4, // پرسنل امور
        inviteesUserList: []
    };
    var tools = motorsazanClient.tools;
    var controllerName = "/AddMeeting/";

    // ---- (base info part) ----

    function handleTitleInputTextBoxKeyUp() {
        tools.hideItem(dom.titleInputError);
        var title = dom.titleInput.GetValue();
        var isTitleValid = !tools.isNullOrEmpty(title);
        if (!isTitleValid) {
            tools.showItem(dom.titleInputError);
        }
    }

    function handleAreaComboChange() {
        tools.hideItem(dom.areaComboError);
        var area = dom.areaCombo.GetValue();
        if (!area && area != 0) {
            tools.showItem(dom.areaComboError);
        }
    }

    function handleDepartmentComboChange() {
        tools.hideItem(dom.departmentComboError);
        state.departmentId = dom.departmentCombo.GetValue();
        if (!state.departmentId && state.departmentId != 0) {
            tools.showItem(dom.departmentComboError);
        }
        state.unitCode = dom.departmentCombo.GetSelectedItem().GetColumnText('UnitCode');
        refreshCategoryCombo();
    }

    async function refreshCategoryCombo() {

        var url = controllerName + "CategoryCombo";

        var apiParam = {
        };
        const groupGridSource = await motorsazanClient.connector.post(url, apiParam);
        dom.categoryComboParent.html(groupGridSource);
        setDom();
    }

    function handleCategoryComboChange() {
        tools.hideItem(dom.categoryComboError);
        var category = dom.categoryCombo.GetValue();
        if (!category && category != 0) {
            tools.showItem(dom.categoryComboError);
        }
    }

    function handlePlaceComboChange() {
        tools.hideItem(dom.placeComboError);
        var place = dom.placeCombo.GetValue();
        if (!place && place != 0) {
            tools.showItem(dom.placeComboError);
        }
    }

    function handlePersianMeetingDateSelectionChange() {
        tools.hideItem(dom.persianMeetingDateError);
        var persianDate = dom.persianMeetingDate.val().trim();
        var isPersianDateValid = tools.isValidPersianDate(persianDate);
        if (!isPersianDateValid) {
            tools.showItem(dom.persianMeetingDateError);
        }
    }

    function handleStartTimeInputTextBoxKeyUp() {
        tools.hideItem(dom.startTimeInputError);
        var startTime = dom.startTimeInput.GetValue();
        if (!startTime) {
            tools.showItem(dom.startTimeInputError);
            var startTimeExistError = "زمان شروع جلسه وارد نشده است";
            dom.startTimeInputError.text(startTimeExistError);
        }
        var isStartTimeFormatValid = tools.isValidTime(startTime);
        if (!isStartTimeFormatValid) {
            tools.showItem(dom.startTimeInputError);
            var startTimeFormatError = "فرمت زمان شروع جلسه صحیح نیست";
            dom.startTimeInputError.text(startTimeFormatError);
        }
        else {
            var isStartMinValid = isTimeMinuteValid(startTime);
            if (!isStartMinValid) {
                tools.showItem(dom.startTimeInputError);
                var startTimeMinuteError = "مقدار دقیقه بایستی 00 یا 30 باشد";
                dom.startTimeInputError.text(startTimeMinuteError);
            }
        }
    }

    function isTimeMinuteValid(time) {
        if (!time) return false;
        var min = time.substr(2, 2);
        return min == "30" || min == "00";
    }

    function handleEndTimeInputTextBoxKeyUp() {
        tools.hideItem(dom.endTimeInputError);
        var endTime = dom.endTimeInput.GetValue();
        var startTime = dom.startTimeInput.GetValue();
        if (!endTime) {
            tools.showItem(dom.endTimeInputError);
            var endTimeExistError = "زمان پایان جلسه وارد نشده است";
            dom.endTimeInputError.text(endTimeExistError);
        }
        var isEndTimeFormatValid = tools.isValidTime(endTime);
        if (!isEndTimeFormatValid) {
            tools.showItem(dom.endTimeInputError);
            var endTimeFormatError = "فرمت زمان پایان جلسه صحیح نیست";
            dom.endTimeInputError.text(endTimeFormatError);
        }
        else {
            var isEndMinValid = isTimeMinuteValid(endTime);
            if (!isEndMinValid) {
                tools.showItem(dom.endTimeInputError);
                var endTimeMinuteError = "مقدار دقیقه بایستی 00 یا 30 باشد";
                dom.endTimeInputError.text(endTimeMinuteError);
            }
        }

        var isStartTimeLittleThanEndTime = Number(startTime) < Number(endTime);
        if (!isStartTimeLittleThanEndTime) {
            tools.showItem(dom.endTimeInputError);
            dom.endTimeInputError.text("زمان پایان بایستی بزرگتر از زمان شروع تنظیم شود");
        }
    }

    function handleDescriptionMemoKeyUp() {
        tools.hideItem(dom.descriptionMemoError);
        var description = dom.descriptionMemo.GetValue();
        if (!description) {
            tools.showItem(dom.descriptionMemoError);
        }
    }

    // ---- End of (Base info part) ----

    // ---- (Meeting user info part)----

    function handleUserTypeComboChange() {
        state.selectedUserType = dom.userTypeCombo.GetValue();
        var outsideUserType = 6;
        if (state.selectedUserType == outsideUserType) {
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
        var departmentId = dom.departmentCombo.GetValue();

        var apiParam = {
            userType: userType,
            departmentId: departmentId
        };

        const userGridHtml = await motorsazanClient.connector.post(url, apiParam);
        dom.userGridParent.html(userGridHtml);
        setDom();
        updateUserGridSelectionStatus();
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

    function removeFromInviteesList(eId, isUserGridCheckboxCleared) {
        state.inviteesUserList = state.inviteesUserList.filter(function (user) {
            return user[0] != eId;
        });

        var selectedRow = eId;
        let divName = "user";
        let result = divName.concat(selectedRow);
        var x = document.getElementById(result);
        x.remove();

        /*  $("#" + rowId).remove();*/
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

    function handleUserGridBeginCallback(source) {
        var userType = dom.userTypeCombo.GetValue();
        var departmentId = dom.departmentCombo.GetValue();
        source.callbackUrl = controllerName + "UserGrid?userType=" +
            userType + "&departmentId=" + departmentId;
    }

    function handleOutsideUserFirstNameInputKeyUp() {
        tools.hideItem(dom.outsideUserFirstNameError);
        var firstName = dom.outsideUserFirstName.GetText();
        var isFirstNameValid = !tools.isNullOrEmpty(firstName);
        if (!isFirstNameValid) {
            tools.showItem(dom.outsideUserFirstNameError);
        }
    }

    function handleOutsideUserLastNameInputKeyUp() {
        tools.hideItem(dom.outsideUserLastNameError);
        var lastName = dom.outsideUserLastName.GetValue();
        var isLastNameValid = !tools.isNullOrEmpty(lastName);
        if (!isLastNameValid) {
            tools.showItem(dom.outsideUserLastNameError);
        }
    }

    function handleOutsideUserTitleInputKeyUp() {
        tools.hideItem(dom.outsideUserTitleError);
        var userTitle = dom.outsideUserTitle.GetValue();
        var isUserTitleValid = !tools.isNullOrEmpty(userTitle);
        if (!isUserTitleValid) {
            tools.showItem(dom.outsideUserTitleError);
        }
    }

    function handleOutsideUserOrganizationNameInputKeyUp() {
        tools.hideItem(dom.outsideUserOrganizationError);
        var organizationName = dom.outsideUserOrganization.GetValue();
        var isOrganizationNameValid = !tools.isNullOrEmpty(organizationName);
        if (!isOrganizationNameValid) {
            tools.showItem(dom.outsideUserOrganizationError);
        }
    }

    function handleAddOutsideUserInfoBtnClick() {
        var canAdd = isAddoutsideUserFormValid();
        if (!canAdd) return false;

        var userId = 0;
        var eid = 0;
        var userId = 0;
        var newUser = [
            [eid],
            [dom.outsideUserTitle.GetValue()],
            [dom.outsideUserFirstName.GetValue()] + ' ' + [dom.outsideUserLastName.GetValue()],
            [dom.outsideUserOrganization.GetValue()],
            userId,
        ];

        state.inviteesUserList.push(newUser);
        generateInviteesUserListTable();

        outsideUserAddReset();
        setDom();
    }

    function outsideUserAddReset() {
        dom.outsideUserFirstName.SetText("");
        dom.outsideUserLastName.SetText("");
        dom.outsideUserTitle.SetText("");
        dom.outsideUserOrganization.SetText("");
    }

    function isAddoutsideUserFormValid() {
        var result = true;
        tools.hideItem(dom.outsideUserFirstNameError);
        tools.hideItem(dom.outsideUserLastNameError);
        tools.hideItem(dom.outsideUserTitleError);
        tools.hideItem(dom.outsideUserOrganizationError);

        var firstName = dom.outsideUserFirstName.GetValue();
        if (!firstName) {
            result = false;
            tools.showItem(dom.outsideUserFirstNameError);
        }

        var lastName = dom.outsideUserLastName.GetValue();
        if (!lastName) {
            result = false;
            tools.showItem(dom.outsideUserLastNameError);
        }

        var title = dom.outsideUserTitle.GetValue();
        if (!title) {
            result = false;
            tools.showItem(dom.outsideUserTitleError);
        }

        var organization = dom.outsideUserOrganization.GetValue();
        if (!organization) {
            result = false;
            tools.showItem(dom.outsideUserOrganizationError);
        }

        return result;
    }

    // ---- End of (Meeting user info part) ----

    // ---- (Button part) ----

    function handleStepBackBtnClick() {
        switch (state.activeStep) {
            case step.baseInfo:
                changeStep(step.baseInfo);
                break;
            case step.usersList:
                changeStep(step.baseInfo);
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
        var wizard = $("#MeetingWizard");
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

    function handleStepNextBtnClick() {
        var isStepValid = isActiveStepValid();
        if (!isStepValid) return false;

        var activeStep = state.activeStep;
        if (activeStep === step.baseInfo) {
            refreshUserGrid();
            changeStep(step.usersList);
            return false;
        }
        if (activeStep === step.usersList) {
            setSecretaryComboItems();
            updateSummaryItems();
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
        var title = dom.titleInput.GetValue();
        ASPxClientTextBox.Cast("titleSummaryInput").SetValue(title);

        var area = dom.areaCombo.GetText();
        ASPxClientTextBox.Cast("areaSummaryInput").SetValue(area);

        var department = dom.departmentCombo.GetText();
        ASPxClientTextBox.Cast("departmentSummaryInput").SetValue(department);

        var category = dom.categoryCombo.GetText();
        ASPxClientTextBox.Cast("categorySummaryInput").SetValue(category);

        var place = dom.placeCombo.GetText();
        ASPxClientTextBox.Cast("placeSummaryInput").SetValue(place);

        var persianMeetingDate = dom.persianMeetingDate.val();
        ASPxClientTextBox.Cast("meetingDateSummaryInput").SetValue(persianMeetingDate);

        var startTime = dom.startTimeInput.GetValue();
        ASPxClientTextBox.Cast("startTimeSummaryInput").SetValue(startTime);

        var endTime = dom.endTimeInput.GetValue();
        ASPxClientTextBox.Cast("endTimeSummaryInput").SetValue(endTime);

        var invitedCount = state.inviteesUserList.length;
        var usersDescription = "تعداد " + invitedCount + " نفر در این جلسه حضور خواهند داشت";
        ASPxClientTextBox.Cast("usersSummaryInput").SetValue(usersDescription);

        var description = dom.descriptionMemo.GetValue();
        ASPxClientMemo.Cast("descriptionSummaryMemo").SetValue(description);
    }

    function isBaseInfoStepValid() {
        var result = true;

        tools.hideItem(dom.titleInputError);
        var title = dom.titleInput.GetValue();
        if (!title) {
            result = false;
            tools.showItem(dom.titleInputError);
        }

        tools.hideItem(dom.areaComboError);
        var area = dom.areaCombo.GetValue();
        if (!area && area != 0) {
            result = false;
            tools.showItem(dom.areaComboError);
        }

        tools.hideItem(dom.departmentComboError);
        var department = dom.departmentCombo.GetValue();
        if (!department && department != 0) {
            result = false;
            tools.showItem(dom.departmentComboError);
        }

        tools.hideItem(dom.categoryComboError);
        var category = dom.categoryCombo.GetValue();
        if (!category && category != 0) {
            result = false;
            tools.showItem(dom.categoryComboError);
        }

        tools.hideItem(dom.placeComboError);
        var place = dom.placeCombo.GetValue();
        if (!place && place != 0) {
            result = false;
            tools.showItem(dom.placeComboError);
        }

        tools.hideItem(dom.persianMeetingDateError);
        var persianDate = dom.persianMeetingDate.val().trim();
        var isPersianDateValid = tools.isValidPersianDate(persianDate);
        if (!isPersianDateValid) {
            result = false;
            tools.showItem(dom.persianMeetingDateError);
        }

        tools.hideItem(dom.startTimeInputError);
        var startTime = dom.startTimeInput.GetValue();
        if (!startTime) {
            result = false;
            tools.showItem(dom.startTimeInputError);
            var startTimeExistError = "زمان شروع جلسه وارد نشده است";
            dom.startTimeInputError.text(startTimeExistError);
        }
        var isStartTimeFormatValid = tools.isValidTime(startTime);
        if (!isStartTimeFormatValid) {
            result = false;
            tools.showItem(dom.startTimeInputError);
            var startTimeFormatError = "فرمت زمان شروع جلسه صحیح نیست";
            dom.startTimeInputError.text(startTimeFormatError);
        }
        var isStartMinValid = isTimeMinuteValid(startTime);
        if (!isStartMinValid) {
            result = false;
            tools.showItem(dom.startTimeInputError);
            var startTimeMinuteError = "مقدار دقیه بایستی 00 یا 30 باشد";
            dom.startTimeInputError.text(startTimeMinuteError);
        }

        tools.hideItem(dom.endTimeInputError);
        var endTime = dom.endTimeInput.GetValue();
        if (!endTime) {
            result = false;
            tools.showItem(dom.endTimeInputError);
            var endTimeExistError = "زمان پایان جلسه وارد نشده است";
            dom.endTimeInputError.text(endTimeExistError);
        }
        var isEndTimeFormatValid = tools.isValidTime(endTime);
        if (!isEndTimeFormatValid) {
            result = false;
            tools.showItem(dom.endTimeInputError);
            var endTimeFormatError = "فرمت زمان پایان جلسه صحیح نیست";
            dom.endTimeInputError.text(endTimeFormatError);
        }
        var isEndMinValid = isTimeMinuteValid(endTime);
        if (!isEndMinValid) {
            result = false;
            tools.showItem(dom.endTimeInputError);
            var endTimeMinuteError = "مقدار دقیقه بایستی 00 یا 30 باشد";
            dom.endTimeInputError.text(endTimeMinuteError);
        }

        var isStartTimeLittleThanEndTime = Number(startTime) < Number(endTime);
        if (!isStartTimeLittleThanEndTime) {
            tools.showItem(dom.endTimeInputError);
            dom.endTimeInputError.text("زمان پایان بایستی بزرگتر از زمان شروع تنظیم شود");
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
        var minUserCount = 2;
        if (inviteesListCount >= minUserCount) return true;

        var errorMessage = "برای ادامه بایستی حداقل " + minUserCount + " نفر به لیست شرکت کنندگان افزوده شود";
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

    function registerMeeting() {
        var canRegister = isFinalizeStepValid();
        if (!canRegister) return false;

        var url = controllerName + "saveMeeting";
        var apiParam = {
            meetingItem: generateMeetingInfoApiParam(),
            invitedUsers: generateMeetingInvitedApiParam(),
            persianMeetingDate: dom.persianMeetingDate.val()
        };

        motorsazanClient.connector.post(url, apiParam)
            .then(function (isSuccessful) {
                if (isSuccessful) {

                    var msg = "جلسه شما به شماره " + isSuccessful + " ثبت شد."
                    motorsazanClient.messageModal.success(msg);
                    location.href = "";
                }
                else {
                    var message = "امکان ثبت جلسه میسر نشد، برای رفع مشکل با تیم نرم افزاری تماس حاصل فرمایید";
                    motorsazanClient.messageModal.error(message);
                }
            });
    }

    function generateMeetingInfoApiParam() {
        return {
            MeetingNumber: "",
            MeetingCategoryId: dom.categoryCombo.GetValue(),
            Subject: dom.titleInput.GetValue(),
            Agenda: dom.descriptionMemo.GetValue(),
            Type: dom.areaCombo.GetValue(),
            MeetingPlaceId: dom.placeCombo.GetValue(),
            DepartmentId: dom.departmentCombo.GetValue(),
            StartTime: dom.startTimeInput.GetText(),
            EndTime: dom.endTimeInput.GetText(),
            RealEndTime: dom.endTimeInput.GetText(),
            RealStartTime: dom.startTimeInput.GetText()
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
                DepartmentChartId: tempItem[3] || "",
                EId: tempItem[0] || "",
                Dabir: isUserSelectedAsSecretary(eId),
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

        var EId = target.data('userid');
        removeFromInviteesList(EId);
        event.preventDefault();
    }

    // ---- End of (Button part) ----

    function initPage() {
        setDom();
        setEvents();

        dom.persianMeetingDate.change(handlePersianMeetingDateSelectionChange);
        changeStep(step.baseInfo);
    }

    function setDom() {
        dom.baseInfoStep = $("#baseInfoStep");
        dom.usersStep = $("#usersStep");
        dom.finalizeStep = $("#finalizeStep");

        dom.titleInput = ASPxClientTextBox.Cast("titleInput");
        dom.titleInputError = $("#titleInputError");
        dom.areaCombo = ASPxClientComboBox.Cast("areaCombo");
        dom.areaComboError = $("#areaComboError");
        dom.departmentCombo = ASPxClientComboBox.Cast("departmentCombo");
        dom.departmentComboError = $("#departmentComboError");
        dom.categoryCombo = ASPxClientComboBox.Cast("categoryCombo");
        dom.categoryComboParent = $("#categoryComboParent");
        dom.categoryComboError = $("#categoryComboError");
        dom.placeCombo = ASPxClientComboBox.Cast("placeCombo");
        dom.placeComboError = $("#placeComboError");
        dom.persianMeetingDate = $("#persianMeetingDate");
        dom.persianMeetingDateError = $("#persianMeetingDateError");
        dom.startTimeInput = ASPxClientTextBox.Cast("startTimeInput");
        dom.startTimeInputError = $("#startTimeInputError");
        dom.endTimeInput = ASPxClientTextBox.Cast("endTimeInput");
        dom.endTimeInputError = $("#endTimeInputError");
        dom.descriptionMemo = ASPxClientMemo.Cast("descriptionMemo");
        dom.descriptionMemoError = $("#descriptionMemoError");

        dom.userTypeCombo = ASPxClientComboBox.Cast("userTypeCombo");
        dom.userGrid = ASPxClientGridView.Cast("userGrid");
        dom.userGridParent = $("#userGridParent");
        dom.invitessUserTable = $("#inviteesUserTable");
        dom.outsideUserForm = $("#outsideUserForm");
        dom.outsideUserFirstName = ASPxClientTextBox.Cast("outsideUserFirstNameInput");
        dom.outsideUserLastName = ASPxClientTextBox.Cast("outsideUserLastNameInput");
        dom.outsideUserTitle = ASPxClientTextBox.Cast("outsideUserTitleInput");
        dom.outsideUserOrganization = ASPxClientTextBox.Cast("outsideUserOrganizationNameInput");
        dom.outsideUserFirstNameError = $("#outsideUserFirstNameInputError");
        dom.outsideUserLastNameError = $("#outsideUserLastNameInputError");
        dom.outsideUserTitleError = $("#outsideUserTitleInputError");
        dom.outsideUserOrganizationError = $("#outsideUserOrganizationNameInputError");

        dom.secretaryCombo = ASPxClientComboBox.Cast("secretaryCombo");
        dom.secretaryComboError = $("#secretaryComboError");

        dom.stepBackBtn = ASPxClientButton.Cast("stepBackBtn");
        dom.stepNextBtn = ASPxClientButton.Cast("stepNextBtn");
        dom.registerBtn = ASPxClientButton.Cast("registerMeetingBtn");
    }

    function setEvents() {
        dom.invitessUserTable.on("click", handleInviteesTableRemoveBtnClick);
    }


    $(document).ready(initPage);

    return {
        handleTitleInputTextBoxKeyUp: handleTitleInputTextBoxKeyUp,
        handleAreaComboChange: handleAreaComboChange,
        handleDepartmentComboChange: handleDepartmentComboChange,
        handleCategoryComboChange: handleCategoryComboChange,
        handlePlaceComboChange: handlePlaceComboChange,
        handleStartTimeInputTextBoxKeyUp: handleStartTimeInputTextBoxKeyUp,
        handleEndTimeInputTextBoxKeyUp: handleEndTimeInputTextBoxKeyUp,
        handleDescriptionMemoKeyUp: handleDescriptionMemoKeyUp,
        handleOutsideUserFirstNameInputKeyUp: handleOutsideUserFirstNameInputKeyUp,
        handleOutsideUserLastNameInputKeyUp: handleOutsideUserLastNameInputKeyUp,
        handleOutsideUserTitleInputKeyUp: handleOutsideUserTitleInputKeyUp,
        handleOutsideUserOrganizationNameInputKeyUp: handleOutsideUserOrganizationNameInputKeyUp,
        handleAddOutsideUserInfoBtnClick: handleAddOutsideUserInfoBtnClick,
        handleStepBackBtnClick: handleStepBackBtnClick,
        handleStepNextBtnClick: handleStepNextBtnClick,
        handleUserGridBeginCallback: handleUserGridBeginCallback,
        handleUserGridItemSelection: handleUserGridItemSelection,
        handleUserTypeComboChange: handleUserTypeComboChange,
        registerMeeting: registerMeeting,
        dom
    };
})();