using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.Home;
using Mohajjel.MeetingSystem.Shared.Models.Output.Home;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("Home")]
    public class HomeController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        ///     دریافت لیست جلسات تایید شده برای هر نفر
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetMeetingApprovalForEachUserByUserId")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult GetMeetingApprovalForEachUserByUserId(InputGetMeetingApprovalForEachUserByUserId input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingApprovalForEachUserByUserId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingApprovalForEachUserByUserId, OutputGetMeetingApprovalForEachUserByUserId[]>(
                        storedProcedureName, input);

            return Ok(result);
        }
        
        /// <summary>
        ///     دریافت اطلاعات آماری جلسات
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetMeetingStatistics")]
        [HttpPost]
        [JwtValidation]
        public IHttpActionResult GetMeetingStatistics(InputGetMeetingStatistics input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingStatistics]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingStatistics, OutputGetMeetingStatistics[]>(
                        storedProcedureName, input);

            return Ok(result);
        }
    }
}
