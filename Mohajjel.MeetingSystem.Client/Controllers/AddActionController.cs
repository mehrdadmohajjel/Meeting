
using System;
using System.Net.Mime;
using System.Web.Http;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.AddAction;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class AddActionController: BaseController
    {
        public ActionResult Index() => View();

        public ActionResult GetUserActiveMeetingCombo()
        {
            const string partialViewAddress = "~/Views/AddAction/AddForm/GetUserActiveMeetingCombo.cshtml";

            var token = GetUserToken();

            var input = new InputGetUserActiveMeeting()
            {
                UserId = GetCurrentUser().UserID
            };

            var dataSource = ApiList.GetUserActiveMeeting(input, token);

            return PartialView(partialViewAddress, dataSource);
        }

        public ActionResult AddFormNewActionDescriptionHtmlEditorPartial()
        {
            const string partialViewAddress = "~/Views/AddAction/AddForm/AddFormNewActionDescriptionHtmlEditorPartial.cshtml";

            return PartialView(partialViewAddress);

        }

        public ActionResult GetUserMeetingApprovalListByMeetingIdAndUserIdCombo(InputGetUserMeetingApprovalListByMeetingIdAndUserId input)
        {
            const string partialViewAddress = "~/Views/AddAction/AddForm/GetUserMeetingApprovalListCombo.cshtml";

            var token = GetUserToken();
            input.UserId = GetCurrentUser().UserID;

            var dataSource = ApiList.GetUserMeetingApprovalListByMeetingIdAndUserId(input, token);

            return PartialView(partialViewAddress, dataSource);
        }

        public ActionResult AddNewActionToApproval(InputAddNewActionToApproval input)
        {
            var token = GetUserToken();
            input.UserId = GetCurrentUser().UserID;

            var apiResult = ApiList.AddNewActionToApproval(input, token);
            return Content(apiResult);
        }


        #region MainGrid

        public ActionResult FillActionGrid(InputGetActionListByApprovalId input)
        {
            const string partialViewUrl = "~/Views/AddAction/Grid/ActionGrid.cshtml";

            if(input.ApprovalId == -1)
            {
                return PartialView(partialViewUrl);
            }

            var dataSource = ApiList.GetActionListByApprovalId(input);

            return PartialView(partialViewUrl, dataSource);

        }

        public string DeleteApprovalAction(InputDeleteApprovalAction input)
        {
            var token = GetUserToken();

            var result = ApiList.DeleteApprovalAction(input, token);

            return result;
        }

        #endregion MainGrid


        #region MeetingApprovalActionAttachmentModal

        public ActionResult MeetingApprovalActionAttachmentModal(long meetingApprovalActionId)
        {
            const string partialViewUrl = "~/Views/AddAction/Modals/AddAttachmentToMeetingApprovalActionForm.cshtml";

            ViewBag.MeetingApprovalActionId = meetingApprovalActionId;

            return PartialView(partialViewUrl);
        }

        public ActionResult FillMeetingApprovalActionAttachmentGrid(InputGetMeetingApprovalActionAttachmentFile input)
        {
            const string partialViewUrl = "~/Views/AddAction/Grid/MeetingApprovalActionAttachmentGrid.cshtml";

            if(input.MeetingApprovalActionId == -1)
            {
                return PartialView(partialViewUrl);
            }

            var dataSource = ApiList.GetMeetingApprovalActionAttachmentFile(input);

            return PartialView(partialViewUrl, dataSource);

        }

        public ActionResult AddUploadAttachments(InputAddUploadAttachmentToMeetingApprovalAction input)
        {
            var token = GetUserToken();
            input.UserId = GetCurrentUser().UserID;

            var apiResult = ApiList.AddUploadAttachmentToMeetingApprovalAction(input, token);

            return Json(apiResult);
        }

        public string RemoveMeetingApprovalActionDocument(InputRemoveMeetingApprovalActionDocument input)
        {
            var token = GetUserToken();

            var result = ApiList.RemoveMeetingApprovalActionDocument(input, token);

            return result;
        }

        public ActionResult GetMeetingApprovalActionAttachmentFileById(InputGetMeetingApprovalActionAttachmentFileById input)
        {
            var apiResult = ApiList.GetMeetingApprovalActionAttachmentFileById(input);

            var fileBytes = Convert.FromBase64String(apiResult.File);

            return File(fileBytes, MediaTypeNames.Application.Octet, apiResult.FileName);
        }

        #endregion MeetingApprovalActionAttachmentModal


    }
}