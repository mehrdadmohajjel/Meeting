using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.Calendar;
using Mohajjel.MeetingSystem.Shared.Models.Output.Calendar;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("Calendar")]
    public class CalendarController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        ///     دریافت لیست سال ها از جدول تقویم
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllYears")]
        [HttpPost]
        public IHttpActionResult GetAllYears()
        {
            const string storedProcedureName = "[HRS].[prc_GetAllYears]";

            var result =
                _businessManager
                    .CallStoredProcedure<OutputGetAllYears[]>(
                        storedProcedureName);

            return Ok(result);
        }

        /// <summary>
        ///     دریافت روزهای یک ماه از یک سال
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetSpecialMonthDays")]
        [HttpPost]
        public IHttpActionResult GetSpecialMonthDays(InputGetSpecialMonthDays input)
        {
            const string storedProcedureName = "[HRS].[prc_GetSpecialMonthDays]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetSpecialMonthDays, OutputGetSpecialMonthDays[]>(
                        storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     دریافت یک روز خاص از تقویم
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetSpecialDay")]
        [HttpPost]
        public IHttpActionResult GetSpecialDay(InputGetSpecialDay input)
        {
            const string storedProcedureName = "[HRS].[prc_GetSpecialDay]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetSpecialDay, OutputGetSpecialDay>(
                        storedProcedureName, input);

            return Ok(result);
        }
    }
}
