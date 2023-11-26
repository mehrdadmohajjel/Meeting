using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingManagementReport;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingManagementReport;
using System.Web.Http;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("MeetingManagementReport")]
    public class MeetingManagementReportController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();
        /// <summary>
        ///     لیست امور هر فرد 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserDepartmentListWithPermission")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetMeetingReportByDepartmentId(InputGetUserDepartmentListWithPermission input)
        {
            const string storedProcedureName = "[HRS].[prc_GetUserDepatmentListWithPermision]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUserDepartmentListWithPermission, OutputGetUserDepartmentListWithPermission[]>(storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     لیست امور هر فرد 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetUserDepartmentList")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetUserDepartmentList(InputGetUserDepartmentList input)
        {
            const string storedProcedureName = " [HRS].[prc_GetUserDepartmentList]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUserDepartmentList, OutputGetUserDepartmentList[]>(storedProcedureName, input);

            return Ok(result);
        }
        /// <summary>
        ///    گزارش مدیریتی صورتجلسات
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("GetMeetingManagementReportByDate")]
        [RequestModelNullValidation]
        [RequestModelValidation]
        [JwtValidation]
        public IHttpActionResult GetMeetingManagementReportByDate(InputGetMeetingManagementReportByDate input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingManagementReportByTypeAndDate]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingManagementReportByDate, OutputGetMeetingManagementReportByDate[]>(storedProcedureName, input);

            return Ok(result);
        }
        
    }
}
