
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
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategoryReport;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategoryReport;
using Mohajjel.MeetingSystem.Shared.Utilities;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class MeetingCategoryReportController: BaseController
    {
        [AccessToFormValidation(FormCode = "006")]
        public ActionResult Index() => View();

        public ActionResult GetAllMeetingCategoryCombo()
        {
            const string partialViewUrl = "~/Views/MeetingCategoryReport/FilterForm/FilterFormGetAllMeetingCategoryCombo.cshtml";

            var dataSource = ApiList.GetAllMeetingCategory();

            return PartialView(partialViewUrl, dataSource);
        }


        #region MainGrid

        public ActionResult FillMeetingCategoryReportGrid(InputGetMeetingReportByCategoryId input,
            string persianStartDate, string persianEndDate, DatePeriodType datePeriodType)
        {
            const string partialViewUrl = "~/Views/MeetingCategoryReport/Grid/MeetingCategoryReportGrid.cshtml";

            (input.StartDate, input.EndDate) = Tools.NormalizeDates(persianStartDate, persianEndDate, datePeriodType);
            var token = GetUserToken();

            var dataSource = ApiList.GetMeetingReportByCategoryId(input, token);

            return PartialView(partialViewUrl, dataSource);
        }

        #endregion MainGrid


        #region ShowViewerPopupForMeetingModal

        public ActionResult ShowViewerPopupForMeetingModal(long meetingId)
        {
            const string partialViewUrl = "~/Views/MeetingCategoryReport/ShowViewerModal/ShowViewerForm.cshtml";

            ViewBag.MeetingId = meetingId;

            return PartialView(partialViewUrl);
        }

        public ActionResult FillShowViewerGrid(InputGetMeetingObservationListByMeetingId input)
        {
            const string partialViewUrl = "~/Views/MeetingCategoryReport/ShowViewerModal/ShowViewerGrid.cshtml";

            var dataSource = ApiList.GetMeetingObservationListByMeetingId(input);

            return PartialView(partialViewUrl, dataSource);

        }

        #endregion ShowViewerPopupForMeetingModal
    }
}