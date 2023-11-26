using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.MyAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.MyAction;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("MyAction")]
    public class MyActionController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


        /// <summary>
        ///     دریافت لیست اقدامات یک پرسنل
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetUsersActionsList")]
        [HttpPost]
        public IHttpActionResult GetUsersActionsList(InputGetUsersActionsList input)
        {
            const string storedProcedureName = "[HRS].[prc_GetUsersActionsList]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetUsersActionsList, OutputGetUsersActionsList[]>(
                        storedProcedureName, input);

            return Ok(result);
        }
    }
}
