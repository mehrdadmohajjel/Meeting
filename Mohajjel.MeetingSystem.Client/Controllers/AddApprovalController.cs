using DevExpress.Web.Mvc;
using System;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Models.Base;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddApproval;
using Mohajjel.MeetingSystem.Shared.Models.Input.EditMeeting;
using Mohajjel.MeetingSystem.Shared.Utilities;
using System.Diagnostics;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class AddApprovalController: BaseController
    {
        public string Description { get; set; }
        public long MeetingApprovalId { get; set; }

        public ActionResult Index(string message)
        {
            Session.Remove("MeetingId");
            if(!string.IsNullOrEmpty(message))
            {
                ViewBag.HasMessage = true;
                ViewBag.Message = message;
            }

            return View();
        }

        [HttpPost]
        public JsonResult GetSession(string sessionName)
        {
            var sessionValue = Session[sessionName];
            sessionValue = sessionValue ?? -1;
            return Json(sessionValue);
        }

        #region AddForm

        public ActionResult UserMeetingListCombo()
        {
            const string partialViewAddress = "~/Views/AddApproval/AddForm/UserMeetingListCombo.cshtml";

            var token = GetUserToken();
            var input = new InputGetDabirActiveMeeting()
            {
                UserId = GetCurrentUser().UserID
            };
            
            var dataSource = ApiList.GetDabirActiveMeeting(input, token);

            return PartialView(partialViewAddress, dataSource);
        }

        public ActionResult ApprovalMeetingAttendListCombo(InputGetAllAttendPeopleByMeetingId input)
        {
            const string partialViewAddress = "~/Views/AddApproval/AddForm/ApprovalMeetingAttendListCombo.cshtml";

            TempData["MeetingId"] = input.MeetingId;
            var token = GetUserToken();

            var dataSource = ApiList.GetAllAttendPeopleByMeetingId(input, token);

            return PartialView(partialViewAddress, dataSource);
        }

        public ActionResult AddNewApprovals(InputAddApprovals input, string persianDeadLineDate, int? attendUserId)
        {
            var token = GetUserToken();
            var userId = GetCurrentUser().UserID;

            TempData["MeetingId"] = input.MeetingId;
            Session["MeetingId"] = input.MeetingId;
            Session["MessageType"] = input.MessageType;

            input.SenderUserId = userId;
            input.ReceiverUserId = Convert.ToInt32(attendUserId) != 0 ? Convert.ToInt32(attendUserId) : (int?)null;
            input.DeadlineDate = Tools.ConvertToLatinDate(persianDeadLineDate);
            input.ResponsibleUserId = Convert.ToInt32(attendUserId) != 0 ? Convert.ToInt32(attendUserId) : (int?)null;

            var apiResult = ApiList.AddApprovals(input, token);

            TempData.Keep();
            return Content(apiResult);
        }

        public ActionResult AddDescriptionToMeeting(InputAddDescriptionToMeeting input)
        {
            var token = GetUserToken();
            input.UserId = GetCurrentUser().UserID;

            TempData["MeetingId"] = input.MeetingId;
            Session["MeetingId"] = input.MeetingId;

            var apiResult = ApiList.AddDescriptionToMeeting(input, token);

            TempData.Keep();
            return Content(apiResult);
        }

        #endregion AddForm

        #region Grid

        public ActionResult MeetingApprovalGrid(InputGetAllMeetingApprovalsByMeetingId input)
        {
            const string partialViewUrl = "~/Views/AddApproval/Grid/MeetingApprovalGrid.cshtml";

            var token = GetUserToken();

            if(input.MeetingId == -1 || input.MeetingId == 0)
            {
                if(TempData.ContainsKey("MeetingId"))
                {
                    var tempMeetingId = Convert.ToInt64(TempData["MeetingId"]);

                    if(tempMeetingId == 0)
                    {
                        return PartialView(partialViewUrl);
                    }

                    TempData.Keep();
                    var gridDataSource = ApiList.GetAllMeetingApprovalsByMeetingId(input, token);

                    return PartialView(partialViewUrl, gridDataSource);
                }
            }

            TempData["MeetingId"] = input.MeetingId;
            Session["MeetingId"] = input.MeetingId;

            var dataSource = ApiList.GetAllMeetingApprovalsByMeetingId(input, token);

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult DeleteFromApprovals(string gridKeys, long? meetingId)
        {
            var tempGridKey = gridKeys.Split('|');
            var token = GetUserToken();

            var input = new InputDeleteMeetingApprovals
            {
                MeetingApprovalId = Convert.ToInt64(tempGridKey[0]),
                UserId = GetCurrentUser().UserID
            };

            var apiResult = ApiList.DeleteMeetingApprovals(input, token);

            TempData.Keep();
            Session["MeetingId"] = meetingId;
            return Content(apiResult);
        }

        public ActionResult BatchEditingUpdateModel(MVCxGridViewBatchUpdateValues<InputMeetingApprovalListFromDb, object> updateValues, long? meetingId)
        {
            foreach(var approval in updateValues.Update)
            {
                UpdateApprovalsList(approval, updateValues);
            }

            TempData["MeetingId"] = meetingId;
            Session["MeetingId"] = meetingId;

            return RedirectToAction("Index" , new {meetingId});
        }

        public ActionResult ResetPage(long meetingId)
        {
            const string partialViewUrl = "~/Views/AddApproval/Index.cshtml";

            TempData.Keep();
            Session["MeetingId"] = meetingId;

            return PartialView(partialViewUrl);
        }

        protected void UpdateApprovalsList(InputMeetingApprovalListFromDb approval, MVCxGridViewBatchUpdateValues<InputMeetingApprovalListFromDb, object> updateValues)
        {
            try
            {
                var token = GetUserToken();
                var userId = GetCurrentUser().UserID;

                this.Description = approval.Description;
                this.MeetingApprovalId = approval.MeetingApprovalId;

                var input = new InputUpdateApproval
                {
                    UserId = GetCurrentUser().UserID,
                    MeetingApprovalId = approval.MeetingApprovalId,
                    MeetingApprovalDescription = approval.Description
                };

                var apiResult = ApiList.UpdateApproval(input, token);
            }
            catch(Exception e)
            {
                updateValues.SetErrorText("", e.Message);
            }
        }

        public ActionResult SetStatusAndSendMessage(long meetingId)
        {
            var token = GetUserToken();
            var input = new InputSetMeetingApprovalStatusAndSendMessage
            {
                UserId = GetCurrentUser().UserID,
                MessageType = Session["MessageType"] != null ? Convert.ToInt32(Session["MessageType"]) : 2,
                Description = "ثبت پیام",
                MeetingId = meetingId
            };

            var apiResult = ApiList.SetMeetingApprovalStatusAndSendMessage(input, token);

            return Content(apiResult);
        }

        #endregion Grid
    }
}