using Mohajjel.MeetingSystem.Shared.Models.Input.MeetingReportByDepartment;
using Mohajjel.MeetingSystem.Shared.Models.Output.MeetingReportByDepartment;
using System.Threading.Tasks;

namespace Mohajjel.MeetingSystem.Client.Api
{
    public static partial class ApiList
    {
        public static OutputGetMeetingReportByDepartmentId[] GetMeetingReportByDepartmentId(InputGetMeetingReportByDepartmentId values, string token)
        {
            var url = $"{BaseUrl}/MeetingReportByDepartment/";
            const string methodName = nameof(GetMeetingReportByDepartmentId);

            var task = Task.Run(
                async () => await ApiConnector<OutputGetMeetingReportByDepartmentId[]>.Post(
                    url,
                    methodName, parameters: values, token: token)
            );
            return task.GetAwaiter().GetResult();
        }
    }
}