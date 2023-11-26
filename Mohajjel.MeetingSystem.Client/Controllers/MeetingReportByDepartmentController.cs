using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Client.Filters;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategoryReport;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingReportByDepartment;
using Mohajjel.MeetingSystem.Shared.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class MeetingReportByDepartmentController : BaseController
    {
        // GET: MeetingReportByDepartment
        [AccessToFormValidation(FormCode = "007")]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult GetAllMeetingDepartmentCombo()
        {
            const string partialViewUrl = "~/Views/MeetingReportByDepartment/FilterForm/FilterFormGetAllMeetingDepartmentCombo.cshtml";

            var dataSource = ApiList.GetAllMainDepartment();

            return PartialView(partialViewUrl, dataSource);
        }

        #region MainGrid

        public ActionResult FillMeetingDepartmentReportGrid(InputGetMeetingReportByDepartmentId input,
            string persianStartDate, string persianEndDate, DatePeriodType datePeriodType)
        {
            const string partialViewUrl = "~/Views/MeetingReportByDepartment/Grid/MeetingReportGrid.cshtml";

            (input.StartDate, input.EndDate) = Tools.NormalizeDates(persianStartDate, persianEndDate, datePeriodType);
            var token = GetUserToken();

            var dataSource = ApiList.GetMeetingReportByDepartmentId(input, token);

            return PartialView(partialViewUrl, dataSource);
        }

        #endregion MainGrid
        #region ShowViewerPopupForMeetingModal

        public ActionResult ShowViewerPopupForMeetingModal(long meetingId)
        {
            const string partialViewUrl = "~/Views/MeetingReportByDepartment/ShowViewerModal/ShowViewerForm.cshtml";

            ViewBag.MeetingId = meetingId;

            return PartialView(partialViewUrl);
        }

        public ActionResult FillShowViewerGrid(InputGetMeetingObservationListByMeetingId input)
        {
            const string partialViewUrl = "~/Views/MeetingReportByDepartment/ShowViewerModal/ShowViewerGrid.cshtml";

            var dataSource = ApiList.GetMeetingObservationListByMeetingId(input);

            return PartialView(partialViewUrl, dataSource);

        }

        #endregion ShowViewerPopupForMeetingModal
    }
}