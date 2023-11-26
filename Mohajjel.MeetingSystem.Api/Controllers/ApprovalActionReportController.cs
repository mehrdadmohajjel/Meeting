using Mohajjel.MeetingSystem.Api.Business;
using Mohajjel.MeetingSystem.Api.Filters;
using System.Web.Http;

namespace Mohajjel.MeetingSystem.Api.Controllers
{
    [RoutePrefix("ApprovalActionReport")]
    public class ApprovalActionReportController: ApiController
    {
        private readonly BusinessManager _businessManager = new BusinessManager();


    }
}
