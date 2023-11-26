using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.ReceivedTranscript;
using Mohajjel.MeetingSystem.Shared.Models.Output.ReceivedTranscript;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("ReceivedTranscript")]
    public class ReceivedTranscriptController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        ///     دریافت لیست رونوشت ها
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetMeetingTranscriptListByDate")]
        [HttpPost]
        public IHttpActionResult GetMeetingTranscriptListByDate(InputGetMeetingTranscriptListByDate input)
        {
            const string storedProcedureName = "[HRS].[prc_GetMeetingTranscriptListByDate]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetMeetingTranscriptListByDate, OutputGetMeetingTranscriptListByDate[]>(
                        storedProcedureName, input);

            return Ok(result);
        }
    }
}
