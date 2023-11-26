using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingManagementReport;
using Mohajjel.MeetingSystem.Shared.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class MeetingManagementReportController : BaseController
    {
        // GET: MeetingManagementReport
        [AccessToFormValidation(FormCode = "010")]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult FilterFormDepartmentComboPartial()
        {
            const string partialViewUrl = "~/Views/MeetingManagementReport/FilterForm/FilterFormDepartmentComboPartial.cshtml";
            var token = GetUserToken();
            var input = new InputGetUserDepartmentListWithPermission
            {
                UserId = GetCurrentUser().UserID,
                SystemCode = "007",
                FormCode = "010"
            };

     

            var dataSource = ApiList.GetUserDepartmentListWithPermission(input, token);

            return PartialView(partialViewUrl, dataSource);

        }
        public ActionResult FilterFormMeetingTypeComboPartial()
        {
            const string partialViewUrl = "~/Views/MeetingManagementReport/FilterForm/FilterFormMeetingTypeComboPartial.cshtml";
            return PartialView(partialViewUrl);
        }
        public ActionResult FillMeetingManagementReportGrid(InputGetMeetingManagementReportByDate input,
            string persianStartDate, string persianEndDate, DatePeriodType datePeriodType)
        {
            const string partialViewUrl = "~/Views/MeetingManagementReport/Grid/ReportGrid.cshtml";

            (input.StartDate, input.EndDate) = Tools.NormalizeDates(persianStartDate, persianEndDate, datePeriodType);
            var token = GetUserToken();

            var dataSource = ApiList.GetMeetingManagementReportByDate(input, token);

            return PartialView(partialViewUrl, dataSource);
        }
        #region ShowViewerPopupForMeetingModal

        public ActionResult ShowViewerPopupForMeetingModal(long meetingId)
        {
            const string partialViewUrl = "~/Views/MeetingManagementReport/ShowViewerModal/ShowViewerForm.cshtml";

            ViewBag.MeetingId = meetingId;

            return PartialView(partialViewUrl);
        }

        public ActionResult FillShowViewerGrid(InputGetMeetingObservationListByMeetingId input)
        {
            const string partialViewUrl = "~/Views/MeetingManagementReport/ShowViewerModal/ShowViewerGrid.cshtml";

            var dataSource = ApiList.GetMeetingObservationListByMeetingId(input);

            return PartialView(partialViewUrl, dataSource);

        }

        #endregion ShowViewerPopupForMeetingModal
    }
}