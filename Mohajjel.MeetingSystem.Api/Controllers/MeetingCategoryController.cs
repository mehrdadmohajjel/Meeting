using System;
using System.Linq;
using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;
using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingCategory;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingCategory;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("MeetingCategory")]
    public class MeetingCategoryController : ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();

        /// <summary>
        ///     ثبت شاخه جدید
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("AddNewCategory")]
        [HttpPost]
        [JwtValidation]
        [AccessToEventValidation(EventCode = "001", FormCode = "004")]
        public IHttpActionResult AddNewCategory(InputAddNewCategory input)
        {
            const string storedProcedureName = "HRS.prc_AddNewMeetingCategory";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "موضوع  "+ input.Title +" با موفقیت افزوده شد";
            return Ok(message);
        }

        /// <summary>
        ///     ویرایش موضوع جلسه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("EditCategory")]
        [HttpPost]
        [JwtValidation]
        [AccessToEventValidation(EventCode = "002", FormCode = "004")]
        public IHttpActionResult EditCategory(InputEditCategory input)
        {
            const string storedProcedureName = "HRS.prc_EditMeetingCategory";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "موضوع   با موفقیت ویرایش شد";
            return Ok(message);
        }


        /// <summary>
        ///     ویرایش موضوع جلسه
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("DeleteMeetingCategory")]
        [HttpPost]
        [JwtValidation]
        [AccessToEventValidation(EventCode = "003", FormCode = "004")]
        public IHttpActionResult DeleteMeetingCategory(InputDeleteMeetingCategory input)
        {
            const string storedProcedureName = "HRS.prc_DeleteMeetingCategory";

            var message = _businessManager.CallStoredProcedureAndReturnMessageIfExits(storedProcedureName, input);

            if(!string.IsNullOrEmpty(message))
            {
                return BadRequest(message);
            }

            message = "موضوع   با موفقیت ویرایش شد";
            return Ok(message);
        }
        
        /// <summary>
        ///     دریافت همه موضوعات جلسات
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllMeetingCategory")]
        [HttpPost]
        public IHttpActionResult GetAllMeetingCategory()
        {
            const string storedProcedureName = "HRS.prc_GetAllMeetingCategory";

            var result =
                _businessManager
                    .CallStoredProcedure<OutputGetAllMeetingCategory[]>(
                        storedProcedureName);

            return Ok(result);
        }


        /// <summary>
        ///     دریافت موضوعات جلسات امور
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllMeetingCategoryByUserDepartmentId")]
        [HttpPost]
        public IHttpActionResult GetAllMeetingCategoryByUserDepartmentId(
            InputGetAllMeetingCategoryByUserDepartmentId input)
        {
            const string storedProcedureName = "[CMMS].[prc_GetAllMeetingCategoryByUserDepartmentId]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetAllMeetingCategoryByUserDepartmentId,
                        OutputGetAllMeetingCategoryByUserDepartmentId[]>(
                        storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        ///     دریافت موضوعات جلسات امور کاربر
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetDepartmentCategoryList")]
        [HttpPost]
        public IHttpActionResult GetDepartmentCategoryList(
            InputGetDepartmentCategoryList input)
        {
            const string storedProcedureName = "[CMMS].[prc_GetDepartmentCategoryList]";

            var result =
                _businessManager
                    .CallStoredProcedure<InputGetDepartmentCategoryList,
                        OutputGetDepartmentCategoryList[]>(
                        storedProcedureName, input);

            return Ok(result);
        }

        /// <summary>
        /// آخرین کد موضوع جلسه 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetLastCategoryCode")]
        [HttpPost]
        public IHttpActionResult GetLastCategoryCode()
        {
            const string storedProcedureName = "HRS.prc_GetLastCategoryCode";

            var result =
                _businessManager.CallStoredProcedure<OutputGetLastCategoryCode>(storedProcedureName);

            return Ok(result);
        }

        /// <summary>
        ///     دریافت همه موضوعات جلسات
        /// </summary>
        /// <returns></returns>
        [RequestModelNullValidation]
        [RequestModelValidation]
        [Route("GetAllMainDepartment")]
        [HttpPost]
        public IHttpActionResult GetAllMainDepartment()
        {
            const string storedProcedureName = "HRS.prc_GetAllMainDepartment";

            var result =
                _businessManager
                    .CallStoredProcedure<OutputGetAllMainDepartment[]>(
                        storedProcedureName);

            return Ok(result);
        }
    }
}