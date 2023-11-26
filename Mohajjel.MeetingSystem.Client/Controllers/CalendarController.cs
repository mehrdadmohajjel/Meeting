using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Mohajjel.MeetingSystem.Client.Api;
using Mohajjel.MeetingSystem.Shared.Enums;
using Mohajjel.MeetingSystem.Shared.Models.Input.Calendar;
using Mohajjel.MeetingSystem.Shared.Models.Input.ManageMyMeetings;
using Mohajjel.MeetingSystem.Shared.Models.Input.MyAction;
using Mohajjel.MeetingSystem.Shared.Models.Output.Calendar;
using Mohajjel.MeetingSystem.Shared.Utilities;


namespace Mohajjel.MeetingSystem.Client.Controllers
{
    public class CalendarController: BaseController
    {
        public ActionResult Index() => View();

        public ActionResult GetAllYearsCombo()
        {
            const string partialViewUrl = "~/Views/Calendar/FilterForm/FilterFormGetAllYearsCombo.cshtml";

            var dataSource = ApiList.GetAllYears();

            return PartialView(partialViewUrl, dataSource);
        }

        public ActionResult DayList(InputGetSpecialMonthDays input)
        {
            const string partialViewUrl = "~/Views/Calendar/FilterForm/DayList.cshtml";

            var dataSource = GetCalendar(input);

            return PartialView(partialViewUrl, dataSource);
        }

        private static List<OutputGetSpecialMonthDays> GetCalendar(InputGetSpecialMonthDays input)
        {
            var result = ApiList.GetSpecialMonthDays(input).ToList();

            while(result.Count % 7 != 0)
            {
                var emptyItem = new OutputGetSpecialMonthDays
                {
                    CalendarId = 0,
                    HolidayTypeId = null,
                    WeekDayName = " . ",
                    FaDate = "-/-/-",
                    Month = 13 //--> همواره بیرون از بازه
                };
                if(input.Month == 1)
                {
                    emptyItem.EnDate = Convert.ToDateTime("1/12/1001");
                    emptyItem.DayDescription = "اسفند";
                    result.Insert(0, emptyItem);
                }
                else
                {
                    if(input.Month == 12)
                    {
                        emptyItem.DayDescription = "فروردین";
                    }

                    emptyItem.EnDate = Convert.ToDateTime("1/1/1001");
                    result.Add(emptyItem);
                }
            }

            return result;

        }

        public ActionResult FillMeetingsGrid(long dayId)
        {
            const string partialViewUrl = "~/Views/Calendar/Grid/MeetingGrid.cshtml";

            if(dayId == 0)
            {
                return PartialView(partialViewUrl);
            }

            var dayInfo = GetDayInfo(dayId);

            if(dayInfo == null)
            {
                return PartialView(partialViewUrl);
            }

            var token = GetUserToken();

            var userId = GetCurrentUser().UserID;

            var input = new InputGetUserMeetingByDate
            {
                UserId = userId,
                StartDate = dayInfo.EnDate,
                EndDate = dayInfo.EnDate
            };

            var dataSource = ApiList.GetUserMeetingByDate(input, token);

            return PartialView(partialViewUrl, dataSource);

        }

        private static OutputGetSpecialDay GetDayInfo(long dayId)
        {
            var input = new InputGetSpecialDay
            {
                CalendarId = dayId
            };

            var result = ApiList.GetSpecialDay(input);
            return result;
        }


    }
}