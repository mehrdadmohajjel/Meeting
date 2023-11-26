using Mohajjel.MeetingSystem.Client.Filters;
using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Client
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new ExceptionHandlerFilter());
            filters.Add(new JsonResultFilter());
        }
    }
}