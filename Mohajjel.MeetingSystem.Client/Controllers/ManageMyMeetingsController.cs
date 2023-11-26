
using System;
using System.Net.Mime;
using System.Web.Http;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.DomainModels;
using Mohajjel.MeetingSystem.Shared.Models.Input.AddAction;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Models.Output.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Utilities;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class ManageMyMeetingsController: BaseController
    {
        [AccessToFormValidation(FormCode = "010")]
        public ActionResult Index() => View();

        #region MainGrid

        private static DateTime GetEnDate(int dateType, bool isStartDate, string persianDate)
        {
            if(dateType == (int)MeetingDatePeriodType.SpecialDate)
            {
                return Tools.ConvertToLatinDate(persianDate);
            }

            var now = DateTime.Now;
            var startDate = DateTime.Now;
            var endDate = DateTime.Now;

            var currentDayOfWeek = (int)now.DayOfWeek + 1;

            switch(dateType)
            {
                case (int)MeetingDatePeriodType.LastWeek:
                    startDate = DateTime.Now.AddDays(-(currentDayOfWeek + 7));
                    endDate = startDate.AddDays(6);
                    break;
                case (int)MeetingDatePeriodType.CurrentWeek:
                    startDate = DateTime.Now.AddDays(-currentDayOfWeek);
                    endDate = startDate.AddDays(6);
                    break;
                case (int)MeetingDatePeriodType.NextWeek:
                    startDate = DateTime.Now.AddDays(7 - currentDayOfWeek);
                    endDate = startDate.AddDays(6);
                    break;
            }

            return isStartDate ? startDate : endDate;
        }

        public ActionResult FillManageMyMeetingsGrid(string persianStartDate, string persianEndDate,
            MeetingDatePeriodType dateType = MeetingDatePeriodType.CurrentWeek)
        {
            const string partialViewUrl = "~/Views/ManageMyMeetings/Grid/ManageMyMeetingsGrid.cshtml";

            var token = GetUserToken();

            var userId = GetCurrentUser().UserID;
            var startDate = GetEnDate((int)dateType, true, persianStartDate);
            var endDate = GetEnDate((int)dateType, false, persianEndDate);

            var input = new InputGetUserMeetingByDate
            {
                UserId = userId,
                StartDate = startDate,
                EndDate = endDate
            };

            var dataSource = ApiList.GetUserMeetingByDate(input, token);

            return PartialView(partialViewUrl, dataSource);

        }

        #endregion MainGrid

        #region ShowViewerPopupForMeetingModal

        public ActionResult ShowViewerPopupForMeetingModal(long meetingId)
        {
            const string partialViewUrl = "~/Views/ManageMyMeetings/ShowViewerModal/ShowViewerForm.cshtml";

            ViewBag.MeetingId = meetingId;

            return PartialView(partialViewUrl);
        }

        public ActionResult FillShowViewerGrid(InputGetMeetingObservationListByMeetingId input)
        {
            const string partialViewUrl = "~/Views/ManageMyMeetings/ShowViewerModal/ShowViewerGrid.cshtml";

            var dataSource = ApiList.GetMeetingObservationListByMeetingId(input);

            return PartialView(partialViewUrl, dataSource);

        }

        #endregion ShowViewerPopupForMeetingModal

        #region SendTranscriptModal

        public ActionResult SendTranscriptModal(long meetingId)
        {
            const string partialViewUrl = "~/Views/ManageMyMeetings/SendTranscriptModal/SendTranscriptForm.cshtml";

            ViewBag.MeetingId = meetingId;

            return PartialView(partialViewUrl);
        }

        public ActionResult SendTranscriptReceiverListCombo()
        {
            const string partialViewUrl = "~/Views/Shared/ManageMyMeeting/SendTranscriptReceiverListCombo.cshtml";

            ViewData["Id"] = "sendTranscriptReceiverListCombo";
            ViewData["ControllerName"] = "ManageMyMeetings";
            ViewData["ActionName"] = "SendTranscriptReceiverListCombo";
            ViewData["JsSpaceName"] = "manageMyMeetings";
            ViewData["JsCallbackName"] = "handleSendTranscriptReceiverListComboChanged";

            return PartialView(partialViewUrl);
        }

        public ActionResult FillSendTranscriptGrid(InputGetMeetingTranscriptList input)
        {
            const string partialViewUrl = "~/Views/ManageMyMeetings/SendTranscriptModal/SendTranscriptGrid.cshtml";

            input.UserId = GetCurrentUser().UserID;

            var dataSource = ApiList.GetMeetingTranscriptList(input);

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult AddNewMeetingTranscript(InputAddNewMeetingTranscript input)
        {
            var token = GetUserToken();
            input.SenderUserId = GetCurrentUser().UserID;

            var apiResult = ApiList.AddNewMeetingTranscript(input, token);
            return Content(apiResult);
        }

        public string DeleteMeetingTranscript(InputDeleteMeetingTranscript input)
        {
            var token = GetUserToken();

            var result = ApiList.DeleteMeetingTranscript(input, token);

            return result;
        }

        #endregion SendTranscriptModal

    }
}