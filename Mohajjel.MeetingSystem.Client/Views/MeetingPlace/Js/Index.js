/// <reference path="../../../Client/DevExpressIntellisense/devexpress-web.d.ts" />
/// <reference path="~/Client/Src/Js/Utilites/Connector.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_MessageModal.js" />
/// <reference path="~/Client/Src/Js/Utilites/Tools.js" />
/// <reference path="~/Client/DevExpressIntellisense/devexpress-aspnetcore-bootstrap.d.ts" />
/// <reference path="~/Client/Src/Js/Views/Shared/Partials/_ContentModal.js" />
/// <reference path="~/Client/Src/Js/Views/Shared/Components/_Uploader.js" />

window.motorsazanClient = window.motorsazanClient || {};
window.motorsazanClient.meetingPlace = (function () {

    var dom = {};
    var state = {
        meetingPlaceId: 0,
        editFormPlaceName:null
    };
    var tools = motorsazanClient.tools;
    var controllerName = "/MeetingPlace/";



    async function addMeetingPlace() {
        const canContinue = isAddFormValid();
        if (!canContinue) return false;

        const url = controllerName + "AddPlace";

        const apiParam = {
            name: dom.addFormMeetingPlaceName.GetValue(),
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);
        motorsazanClient.messageModal.success(apiResult);
        filterList();

        resetAddForm();
    }


    async function editMeetingPlace() {
        const canContinue = isEditFormValid();
        if (!canContinue) return false;

        const url = controllerName + "EditMeetingPlace";

        const apiParam = {
            Name: dom.editFormMeetingPlaceName.GetValue(),
            MeetingPlaceId: state.meetingPlaceId
        };

        const apiResult = await motorsazanClient.connector.post(url, apiParam);

        filterList();
        motorsazanClient.contentModal.hide();
        motorsazanClient.messageModal.success(apiResult);
        resetEditForm();
    }



    async function filterList() {

        const url = controllerName + "MeetingPlaceGrid";

        const apiParam = {
        };
        const groupGridSource = await motorsazanClient.connector.post(url, apiParam);
        dom.gridParent.html(groupGridSource);
        setDom();
    }

    function handleGridCallbackUrl(source) {

        const url = controllerName + "MeetingPlaceGrid";
        source.callbackUrl = url ;
    }



    function isAddFormValid() {
        var isValid = true;



        tools.hideItem(dom.addFormMeetingPlaceNameError);
        var meetingPlaceName = dom.addFormMeetingPlaceName.GetValue();
        var isMeetingPlaceNameValid = !tools.isNullOrEmpty(meetingPlaceName);
        if (!isMeetingPlaceNameValid) {
            isValid = false;
            tools.showItem(dom.addFormMeetingPlaceNameError);
        }

        return isValid;
    }

    function isEditFormValid() {
        var isValid = true;



        tools.hideItem(dom.editFormMeetingPlaceNameError);
        var meetingPlaceName = dom.editFormMeetingPlaceName.GetValue();
        var isMeetingPlaceNameValid = !tools.isNullOrEmpty(meetingPlaceName);
        if (!isMeetingPlaceNameValid) {
            isValid = false;
            tools.showItem(dom.editFormMeetingPlaceNameError);
        }

        return isValid;
    }



    function handleAddFormMeetingPlaceKeyUp() {
        tools.hideItem(dom.addFormMeetingPlaceNameError);
        var meetingPlaceName = dom.addFormMeetingPlaceName.GetValue();
        var isMeetingPlaceNameValid = !tools.isNullOrEmpty(meetingPlaceName);
        if (!isMeetingPlaceNameValid) {
            tools.showItem(dom.addFormMeetingPlaceNameError);
        }
    }
    function handleEditFormMeetingPlaceKeyUp() {
        tools.hideItem(dom.editFormMeetingPlaceNameError);
        var meetingPlaceName = dom.editFormMeetingPlaceName.GetValue();
        var isMeetingPlaceNameValid = !tools.isNullOrEmpty(meetingPlaceName);
        if (!isMeetingPlaceNameValid) {
            tools.showItem(dom.editFormMeetingPlaceNameError);
        }

    }

    function handleCustombuttonClick(s, e) {
        if (e.buttonID === "editBTN") {
            dom.grid.GetRowValues(e.visibleIndex, "MeetingPlaceId;Name", function (value) {
                state.editFormPlaceName = value[1];
                state.meetingPlaceId = value[0];
                const url = controllerName + "EditMeetingPlacePartail";
                var title = "ویرایش محل برگزاری جلسه";
                motorsazanClient.contentModal.ajaxShow(title, url, null, showeditSetDomInit);
            }
            );
        }

        else if (e.buttonID === "deleteBTN") {
            var grid = MVCxClientGridView.Cast(s);
            var key = grid.GetRowKey(e.visibleIndex);
            state.meetingPlaceId = key;
            var confirmContent = "آیا از حذف محل  انتخابی مطمئن هستید؟";
            var title = "حذف موضوع جلسه";
            motorsazanClient.messageModal.confirm(confirmContent, removeMeetingPlace, title);
        }
    }
     function showeditSetDomInit() {
        showEditDom();
         dom.editFormMeetingPlaceName.SetText(state.editFormPlaceName);
    }

    function showEditDom() {
        dom.editFormMeetingPlaceNameParent = $("#editFormMeetingPlaceNameParent");
        dom.editFormMeetingPlaceNameError = $("#editFormMeetingPlaceNameError");
        dom.editFormMeetingPlaceName = ASPxClientTextBox.Cast("editFormMeetingPlaceName");

    }

    function removeMeetingPlace() {
        var url = "/MeetingPlace/DeleteMeetingPlace";
        var apiParam = {
            meetingPlaceId: state.meetingPlaceId
        };

        motorsazanClient.connector.post(url, apiParam)
            .then(function (isResultSuccessful) {
                if (!isResultSuccessful) return false;
                filterList();
                motorsazanClient.messageModal.success("محل برگزاری انتخابی با موفقیت حذف شد.");
            });
    }


    function init() {
        setDom();

    }
    function resetAddForm() {
        dom.addFormMeetingPlaceName.SetText('');
        tools.hideItem(dom.addFormMeetingPlaceNameError);
    }
    function resetEditForm() {
        dom.editFormMeetingPlaceName.SetText('');
        tools.hideItem(dom.editFormMeetingPlaceNameError);

    }
    function setDom() {


        dom.addFormMeetingPlaceNameParent = $("#addFormMeetingPlaceNameParent");
        dom.addFormMeetingPlaceNameError = $("#addFormMeetingPlaceNameError");
        dom.addFormMeetingPlaceName = ASPxClientTextBox.Cast("addFormMeetingPlaceName");


        dom.gridParent = $("#gridParent");
        dom.grid = ASPxClientGridView.Cast("grid");

    }

    $(document).ready(init);

    return {
        addMeetingPlace: addMeetingPlace,
        handleGridCallbackUrl: handleGridCallbackUrl,
        handleAddFormMeetingPlaceKeyUp: handleAddFormMeetingPlaceKeyUp,
        handleEditFormMeetingPlaceKeyUp: handleEditFormMeetingPlaceKeyUp,
        handleCustombuttonClick: handleCustombuttonClick,
        editMeetingPlace: editMeetingPlace
    };

})();