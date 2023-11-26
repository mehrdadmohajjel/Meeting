using System.Web.Mvc;

namespace Mohajjel.MeetingSystem.Api
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters) =>
            filters.Add(new HandleErrorAttribute());
    }
}
