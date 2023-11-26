using System;
using System.Linq;
using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingPlace;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingPlace;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("MeetingPlace")]
    public class MeetingPlaceController : ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();

        /// <summary>
        ///     افزودن محل برگزاری جلسه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("AddPlace")]
        [HttpPost]
        [JwtValidation]
        [AccessToEventValidation(EventCode = "001", FormCode = "005")]
        public IHttpActionResult AddPlace(InputAddPlace input)
        {
            const string storedProcedureName = "HRS.prc_AddNewMeetingPlace";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "مکان برگزاری جلسه با عنوان   " + input.Name + " با موفقیت افزوده شد";
            return Ok(message);
        }

        /// <summary>
        ///     ویرایش محل برگزاری جلسه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("EditMeetingPlace")]
        [HttpPost]
        [JwtValidation]
        [AccessToEventValidation(EventCode = "002", FormCode = "005")]
        public IHttpActionResult EditMeetingPlace(InputEditMeetingPlace input)
        {
            const string storedProcedureName = "HRS.prc_EditMeetingPlace";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "مکان برگزاری جلسه با موفقیت ویرایش شد";
            return Ok(message);
        }
        /// <summary>
        ///     حذف محل برگزاری جلسه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("DeleteMeetingPlace")]
        [HttpPost]
        [JwtValidation]
        [AccessToEventValidation(EventCode = "003", FormCode = "005")]
        public IHttpActionResult DeleteMeetingPlace(InputDeleteMeetingPlace input)
        {
            const string storedProcedureName = "HRS.prc_DeleteMeetingPlace";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "مکان برگزاری جلسه با موفقیت حذف شد";
            return Ok(message);
        }

        /// <summary>
        ///     دریافت همه محل های برگزاری  جلسات
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllMeetingPlace")]
        [HttpPost]
        public IHttpActionResult GetAllMeetingPlace()
        {
            const string storedProcedureName = "HRS.prc_GetAllMeetingPlace";

            var result =
                _businessManager
                    .CallStoredProcedure<OutputGetAllMeetingPlace[]>(
                        storedProcedureName);

            return Ok(result);
        }
    }
}
