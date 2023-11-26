/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.meetingCategory = (function () {

    var dom = {};
    var state = {
        meetingCategoryId: 0,
        categeoryCode: null,
        departmentId: 0,
        meetingCategoryTitle: null,
        editFormDepartmentCombo: 0,
        editFormCategoryCode: null,
        editFormCategoryName: null
    };
    var tools = motorsazanClient.tools;
    var controllerName = "/MeetingCategory/";



    async function addMeetingCategory() {
        const canContinue = isAddFormValid();
        if (!canContinue) return false;

        const url = controllerName + "AddNewCategory";

        const apiParam = {
            title: dom.addFormCategoryName.GetValue(),
            code: dom.addFormCategoryCode.GetValue(),
            departmentId: dom.addFormDepartmentCombo.GetValue()
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);
        motorsazanClient.messageModal.success(apiResult);
        filterList();

        resetAddForm();
    }

    function cancelEditCategory() {
        dom.addFormDepartmentCombo.SetSelectedIndex(-1);
        dom.addFormCategoryName.SetText('');
        dom.addFormCategoryCode.SetText('');
    }


    async function editMeetingCategory() {
        const canContinue = isEditFormValid();
        if (!canContinue) return false;

        const url = controllerName + "EditCategory";

        const apiParam = {
            title: dom.editFormCategoryName.GetValue(),
            categoryCode: dom.editFormCategoryCode.GetValue(),
            departmentId: dom.editFormDepartmentCombo.GetValue(),
            CategoryId: state.meetingCategoryId
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);

        filterList();
        motorsazanClient.contentModal.hide();
        motorsazanClient.messageModal.success(apiResult);
        resetEditForm();
    }



    async function filterList() {

        const url = controllerName + "MeetingCategoryGird";

        const apiParam = {
        };
        const groupGridSource = await motorsazanClient.connector.post(url, apiParam);
        dom.gridParent.html(groupGridSource);
        setDom();
    }


    async function fillEditDepartmentCombo() {

        const url = controllerName + "GetDepartmentListForEdit";

        const apiParam = {
        };
        const groupGridSource = await motorsazanClient.connector.post(url, apiParam);
        dom.editFormDepartmentComboParent.html(groupGridSource);
        setDom();
    }

    function handleGridCallbackUrl(source) {

        const url = controllerName + "MeetingCategoryGird";
        source.callbackUrl = url;
    }



    function isAddFormValid() {
        var isValid = true;

        tools.hideItem(dom.addFormDepartmentComboError);
        var department = dom.addFormDepartmentCombo.GetValue();
        var isDepartmentValid = !tools.isNullOrEmpty(department);
        if (!isDepartmentValid) {
            isValid = false;
            tools.showItem(dom.addFormDepartmentComboError);
        }

        tools.hideItem(dom.addFormCategoryNameError);
        var categoryName = dom.addFormCategoryName.GetValue();
        var isCategoryNameValid = !tools.isNullOrEmpty(categoryName);
        if (!isCategoryNameValid) {
            isValid = false;
            tools.showItem(dom.addFormCategoryNameError);
        }

        return isValid;
    }

    function isEditFormValid() {
        var isValid = true;

        tools.hideItem(dom.editFormDepartmentComboError);
        var department = dom.editFormDepartmentCombo.GetValue();
        var isDepartmentValid = !tools.isNullOrEmpty(department);
        if (!isDepartmentValid) {
            isValid = false;
            tools.showItem(dom.editFormDepartmentComboError);
        }

        tools.hideItem(dom.editFormCategoryNameError);
        var categoryName = dom.editFormCategoryName.GetValue();
        var isCategoryNameValid = !tools.isNullOrEmpty(categoryName);
        if (!isCategoryNameValid) {
            isValid = false;
            tools.showItem(dom.editFormCategoryNameError);
         }

        return isValid;
    }
    function generateCategoryCode(s, e) {

        tools.hideItem(dom.addFormDepartmentComboError);

        var gridurl = "/MeetingCategory/GenerateCategoryCode";
        state.departmentId = dom.addFormDepartmentCombo.GetValue();
        var apiParam = {
            departmentId: state.departmentId
        };

        motorsazanClient.connector.post(gridurl, apiParam)
            .then(function (apiResult) {
                state.categeoryCode = apiResult;
                dom.addFormCategoryCode.SetValue(apiResult);
                setDom();
            });

        var department = dom.addFormDepartmentCombo.GetValue();
        var isDepartmentValid = !tools.isNullOrEmpty(department);
        if (!isDepartmentValid) {
            isValid = false;
            tools.showItem(dom.addFormDepartmentComboError);
        }


    }

    function handleAddFormCategoryNameKeyUp() {

        tools.hideItem(dom.addFormCategoryNameError);
        var categoryName = dom.addFormCategoryName.GetValue();
        var isCategoryNameValid = !tools.isNullOrEmpty(categoryName);
        if (!isCategoryNameValid) {
            tools.showItem(dom.addFormCategoryNameError);
        }

    }
    function handleEditFormDepartmentComboSelectedIndexChanged() {
        tools.hideItem(dom.editFormDepartmentComboError);
        var department = dom.editFormDepartmentCombo.GetValue();
        var isDepartmentValid = !tools.isNullOrEmpty(department);
        if (!isDepartmentValid) {
            isValid = false;
            tools.showItem(dom.editFormDepartmentComboError);
        }
    }
    function handleEditFormCategoryNameKeyUp() {
        tools.hideItem(dom.editFormCategoryNameError);
        var categoryName = dom.editFormCategoryName.GetValue();
        var isCategoryNameValid = !tools.isNullOrEmpty(categoryName);
        if (!isCategoryNameValid) {
            tools.showItem(dom.editFormCategoryNameError);
        }
    }

    function handleCustombuttonClick(s, e) {

        if (e.buttonID === "editBTN") {
            setDom();
            dom.grid.GetRowValues(e.visibleIndex, "MeetingCategoryId;Title;Code;DepartmentId", function (value) {

                state.editFormCategoryName = value[1];
                state.editFormCategoryCode = value[2];
                state.editFormDepartmentCombo = value[3];
                state.meetingCategoryId = value[0];
                const url = controllerName + "EditCategoryPartail";
                var title = "ویرایش موضوع جلسه";
                motorsazanClient.contentModal.ajaxShow(title, url, null, showeditSetDomInit);

            }
            );
        }

        else if (e.buttonID === "deleteBTN") {
            var grid = MVCxClientGridView.Cast(s);
            var key = grid.GetRowKey(e.visibleIndex);
            state.meetingCategoryId = key;
            var confirmContent = "آیا از حذف موضوع انتخابی مطمئن هستید؟";
            var title = "حذف موضوع جلسه";
            motorsazanClient.messageModal.confirm(confirmContent, removeMeetingCategory, title);
        }
    }

    function removeMeetingCategory() {
        var url = "/MeetingCategory/DeleteMeetingCategory";
        var apiParam = {
            CategoryId: state.meetingCategoryId
        };

        motorsazanClient.connector.post(url, apiParam)
            .then(function (isResultSuccessful) {
                if (!isResultSuccessful) return false;
                filterList();
                motorsazanClient.messageModal.success("موضوع  انتخابی با موفقیت حذف شد.");
            });
    }


    function init() {
        setDom();
    }
    function resetAddForm() {
        dom.addFormDepartmentCombo.SetSelectedIndex(-1);
        dom.addFormCategoryName.SetText('');
        dom.addFormCategoryCode.SetText('');
        tools.hideItem(dom.addFormDepartmentComboError);
        tools.hideItem(dom.addFormCategoryNameError);
    }

    function resetEditForm() {

        dom.editFormDepartmentCombo.SetSelectedIndex(-1);
        dom.editFormCategoryName.SetText('');
        dom.editFormCategoryCode.SetText('');
        tools.hideItem(dom.editFormDepartmentComboError);
        tools.hideItem(dom.editFormCategoryNameError);

    }

    function setDom() {
        dom.addFormDepartmentComboParent = $("#addFormDepartmentComboParent");
        dom.addFormDepartmentComboError = $("#addFormDepartmentComboError");
        dom.addFormDepartmentCombo = ASPxClientComboBox.Cast("addFormDepartmentCombo");

        dom.addFormCategoryCodeParent = $("#addFormCategoryCodeParent");
        dom.addFormCategoryCodeError = $("#addFormCategoryCodeError");
        dom.addFormCategoryCode = ASPxClientTextBox.Cast("addFormCategoryCode");

        dom.addFormCategoryNameParent = $("#addFormCategoryNameParent");
        dom.addFormCategoryNameError = $("#addFormCategoryNameError");
        dom.addFormCategoryName = ASPxClientTextBox.Cast("addFormCategoryName");


        dom.gridParent = $("#gridParent");
        dom.grid = ASPxClientGridView.Cast("grid");





    }
    function showEditDom() {
        dom.editFormDepartmentComboParent = $("#editFormDepartmentComboParent");
        dom.editFormDepartmentComboError = $("#editFormDepartmentComboError");
        dom.editFormDepartmentCombo = ASPxClientComboBox.Cast("editFormDepartmentCombo");

        dom.editFormCategoryCodeParent = $("#editFormCategoryCodeParent");
        dom.editFormCategoryCodeError = $("#editFormCategoryCodeError");
        dom.editFormCategoryCode = ASPxClientTextBox.Cast("editFormCategoryCode");

        dom.editFormCategoryNameParent = $("#editFormCategoryNameParent");
        dom.editFormCategoryNameError = $("#editFormCategoryNameError");
        dom.editFormCategoryName = ASPxClientTextBox.Cast("editFormCategoryName");



    }
    async function showeditSetDomInit() {
        showEditDom();

        await fillEditDepartmentCombo();

        dom.editFormDepartmentCombo.SetValue(state.editFormDepartmentCombo);
        dom.editFormCategoryName.SetText(state.editFormCategoryName);
        dom.editFormCategoryCode.SetText(state.editFormCategoryCode);

    }

    $(document).ready(init);

    return {
        addMeetingCategory: addMeetingCategory,
        handleGridCallbackUrl: handleGridCallbackUrl,
        generateCategoryCode: generateCategoryCode,
        handleAddFormCategoryNameKeyUp: handleAddFormCategoryNameKeyUp,
        handleCustombuttonClick: handleCustombuttonClick,
        cancelEditCategory: cancelEditCategory,
        editMeetingCategory: editMeetingCategory,
        handleEditFormCategoryNameKeyUp: handleEditFormCategoryNameKeyUp,
        handleEditFormDepartmentComboSelectedIndexChanged: handleEditFormDepartmentComboSelectedIndexChanged
    };

})();