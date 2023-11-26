using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategoryReport;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingReportByDepartment;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategoryReport;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingReportByDepartment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("MeetingReportByDepartment")]
    public class MeetingReportByDepartmentController : ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();
        /// <summary>
        ///     لیست جلسات براساس امور 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingReportByDepartmentId")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetMeetingReportByDepartmentId(InputGetMeetingReportByDepartmentId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingReportByDepartmentId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingReportByDepartmentId, OutputGetMeetingReportByDepartmentId[]>(storedProcedureName, input);

            return Ok(result);
        }

    }
}
